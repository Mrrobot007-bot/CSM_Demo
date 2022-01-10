import {path} from 'ramda';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import HealthKit, {
  HKQuantityTypeIdentifier,
} from '@kingstinct/react-native-healthkit';
import React, {useState, useEffect} from 'react';
import {useHeaderHeight} from '@react-navigation/stack';
import {store} from '../../redux/store/configureStore';
import GoogleFit, {Scopes} from 'react-native-google-fit';
import DefaultPreference from 'react-native-default-preference';

import {
  isIos,
  isAndroid,
  showMessage,
  defaultAlert,
  DEVICE_HEIGHT,
  ACTIVITY_TYPES,
  INTENSITY_TYPES,
  PREFERENCE_VALUES,
  DefaultPreferenceKeys,
  getStepsFromKMDistance,
} from '../../utility';
import {translate} from '../../i18n';
import {HeaderView} from './header-view';
import {TrackingView} from './tracking-view';
import {API_URLS} from '../../services/urls';
import {color, spacingPresets} from '../../theme';
import {NotificationView} from './notification-view';
import Fitness from '@ovalmoney/react-native-fitness';
import {InAppManualEntryDialog} from './manual-entry';
import {InAppTrackerStyles as styles} from './styles';
import {getApiCall} from '../../services/api-services';
import {UserType} from '../../utility/object-types/user';
import {STATUS_CODES} from '../../services/status-codes';
import {SCREEN_MODES, trackerItemList} from './constants';
import {ButtonContainerView} from './button-container-view';
import {updateUser} from '../../redux/actions/user-actions';
import {addActivities} from '../../redux/actions/general-action';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {DefaultDropDownPicker} from '../../components/drop-down-picker';
import {ChallengeActivityTypes} from '../../utility/object-types/challenge';

/**
 * An Interface for possible props for the InAppTrackerDialog component
 */
interface IInAppTrackerDialogProps {
  /**
   * Navigation prop used to set the navigation stuff in the
   * component like, go back, move to other screen, etc.
   */
  navigation: any;
}

/**
 *
 * Component used to show In App tracker Dialog where user can record their activities
 */
export const InAppTrackerDialog = (props: IInAppTrackerDialogProps) => {
  const distanceCalculationTime = 1000 * 5;
  const [endTime, setEndTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [stepsCount, setStepsCount] = useState(0);
  const [lastEnteredTime, setLastEnteredTime] = useState(0);
  const [resetStopwatch, setResetStopwatch] = useState(false);
  const [isPickerOpened, setIsPickerOpened] = useState(false);
  const [totalTimeElapsed, setTotalTimeElapsed] = useState(0);
  const [selectedScreenMode, setSelectedScreenMode] = useState(
    SCREEN_MODES.INITIAL_MODE,
  );
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [totalDistanceCovered, setTotalDistanceCovered] = useState(0);
  const [totalTimeElapsedTemp, setTotalTimeElapsedTemp] = useState(0);
  const [selectedTracker, setSelectedTracker] = useState<string>(null);
  const [isDisabledTimeEntry, setIsDisabledTimeEntry] = useState(false);
  const [selectIntensityTracker, setSelectedIntensityTracker] =
    useState<INTENSITY_TYPES>(INTENSITY_TYPES.HIGH);
  const [isHealthDataPermissionAccepted, setIsHealthDataPermissionAccepted] =
    useState(false);

  const androidPermissions = [
    {
      kind: Fitness.PermissionKinds.Distances,
      access: Fitness.PermissionAccesses.Read,
    },
  ];

  /**
   * function used to load the initial data
   */
  useEffect(() => {
    if (isAndroid) {
      Fitness.isAuthorized(androidPermissions)
        .then(authorized => {
          setIsHealthDataPermissionAccepted(authorized);
        })
        .catch(error => {
          setIsHealthDataPermissionAccepted(false);
        });
    } else {
      DefaultPreference.get(DefaultPreferenceKeys.HEALTH_KIT_PERMISSION).then(
        value => {
          if (value === PREFERENCE_VALUES.HEALTH_KIT_PERMISSION_COMPLETED) {
            setIsHealthDataPermissionAccepted(true);
          } else {
            setIsHealthDataPermissionAccepted(false);
          }
        },
      );
    }

    getActivitiesData();
  }, []);

  /**
   * function to load Activity data
   */

  const getActivitiesData = async () => {
    try {
      let apiResponse = await dispatch(
        getApiCall(
          API_URLS.ACTIVITIES,
          props.navigation,
          getActivitiesData,
          false,
          true,
        ),
      );

      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        let ApiData: Array<ChallengeActivityTypes> =
          path(['data'], apiResponse) || [];
        dispatch(addActivities(ApiData));
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };

  /**
   * function to load initial data
   */

  useEffect(() => {
    if (
      selectedTracker != null &&
      startTime > 0 &&
      endTime > 0 &&
      endTime > startTime
    ) {
      setStepsCount(
        getStepsFromKMDistance(
          selectedTracker,
          selectIntensityTracker,
          endTime - startTime,
          totalDistanceCovered,
        ),
      );
    }
  }, [
    selectedTracker,
    startTime,
    endTime,
    totalDistanceCovered,
    selectIntensityTracker,
  ]);

  /**
   * function to load the initial data for the tracker
   */
  useEffect(() => {
    if (
      totalTimeElapsedTemp + distanceCalculationTime <= totalTimeElapsed &&
      isDistanceTrackerEnabled() &&
      selectedScreenMode !== SCREEN_MODES.MANUAL_TRACKING_MODE
    ) {
      setTotalTimeElapsedTemp(totalTimeElapsed);
      async function fetchDetails() {
        const startedDate = new Date(startTime - 1000).toString();
        const endedDate = new Date(new Date().getTime()).toString();

        const options = {
          scopes: [Scopes.FITNESS_ACTIVITY_READ],
        };

        if (isAndroid) {
          GoogleFit.checkIsAuthorized().then(async () => {
            if (GoogleFit.isAuthorized) {
              try {
                const stepsResult = await Fitness.getSteps({
                  startDate: startedDate,
                  endDate: endedDate,
                  interval: 'minute',
                });

                let totalDistanceInKm = 0;
                if (stepsResult && stepsResult.length) {
                  const syncTime: UserType = {
                    lastSyncTime: stepsResult[stepsResult.length - 1].endDate,
                  };
                  dispatch(updateUser(syncTime));
                  stepsResult.map(item => {
                    totalDistanceInKm = totalDistanceInKm + item.quantity;
                  });
                }
                setTotalDistanceCovered(
                  Math.round((totalDistanceInKm / 1000) * 100) / 100,
                );
              } catch (e) {}
            } else {
              GoogleFit.authorize(options)
                .then(authResult => {
                  if (authResult.success) {
                    dispatch('AUTH_SUCCESS');
                  } else {
                    showMessage(
                      translate(
                        'modules.errorMessages.pleaseEnableGoogleFitPermission',
                      ),
                    );
                  }
                })
                .catch(e => {});
            }
          });
        } else {
          try {
            const selectedTrackerValue = path(
              [`${selectedTracker}`],
              ACTIVITY_TYPES,
            );
            const isCycling =
              selectedTrackerValue === ACTIVITY_TYPES.CYCLING ||
              selectedTrackerValue === ACTIVITY_TYPES.CYCLING_HAND_CYCLING;

            const distanceDataType = isCycling
              ? HKQuantityTypeIdentifier.distanceCycling
              : HKQuantityTypeIdentifier.distanceWalkingRunning;

            HealthKit.subscribeToChanges(distanceDataType, () => {
              // refetch whichever queries you need
            });

            const {quantity, startDate, endDate} =
              await HealthKit.getMostRecentQuantitySample(distanceDataType);
            if (
              new Date(startedDate).getTime() <=
                new Date(startDate).getTime() &&
              startDate.getTime() !== lastEnteredTime
            ) {
              setLastEnteredTime(startDate.getTime());
              const totalDistance = totalDistanceCovered + quantity;
              setTotalDistanceCovered(totalDistance);

              const syncTime: UserType = {
                lastSyncTime: endDate.toString(),
              };
              dispatch(updateUser(syncTime));
            }
          } catch (e) {
            console.log(e);
          }
        }
      }
      fetchDetails();
    }
  }, [totalTimeElapsed]);

  /**
   * function for distance tracker
   * @returns
   */
  const isDistanceTrackerEnabled = () => {
    const selectedTrackerValue: string = selectedTracker;
    try {
      if (selectedTrackerValue) {
        const activities: Array<any> = path(
          ['generalReducer', 'activities'],
          store.getState(),
        );
        const selectedActivityText = activities
          .find((item: any) => item._id === selectedTrackerValue)
          .name.toLowerCase();
        return (
          selectedActivityText === ACTIVITY_TYPES.WALKING.toLowerCase() ||
          selectedActivityText ===
            ACTIVITY_TYPES.WALKING_WITH_CRUTCHES.toLowerCase() ||
          selectedActivityText === ACTIVITY_TYPES.CYCLING.toLowerCase() ||
          selectedActivityText ===
            ACTIVITY_TYPES.CYCLING_HAND_CYCLING.toLowerCase() ||
          selectedActivityText === ACTIVITY_TYPES.RUNNING.toLowerCase()
        );
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  };

  const dispatch = useDispatch();
  const inAppDialogHeight =
    DEVICE_HEIGHT -
    useBottomTabBarHeight() -
    useHeaderHeight() -
    (isIos ? spacingPresets.small : DEVICE_HEIGHT * 0.05);

  return (
    <View style={styles.full}>
      <View style={styles.topContainerStyle}>
        <View
          style={[
            styles.mainContainerStyle,
            selectedScreenMode === SCREEN_MODES.MANUAL_TRACKING_MODE && {
              height: inAppDialogHeight,
            },
          ]}>
          <HeaderView />
          {selectedScreenMode === SCREEN_MODES.MANUAL_TRACKING_MODE ? (
            <InAppManualEntryDialog
              selectedTracker={selectedTracker}
              totalDistanceCovered={totalDistanceCovered}
              selectIntensityTracker={selectIntensityTracker}
              stepsCount={stepsCount}
              startTime={startTime}
              endTime={endTime}
              isDisabledTimeEntry={isDisabledTimeEntry}
              setStartTime={setStartTime}
              setEndTime={setEndTime}
              isDistanceTrackerEnabled={isDistanceTrackerEnabled()}
              setTotalDistanceCovered={setTotalDistanceCovered}
              trackerItemList={trackerItemList()}
              setSelectedTracker={setSelectedTracker}
              setSelectedIntensityTracker={setSelectedIntensityTracker}
              setSelectedScreenMode={setSelectedScreenMode}
              setResetStopwatch={setResetStopwatch}
              dispatch={dispatch}
            />
          ) : (
            <View>
              {!isHealthDataPermissionAccepted && (
                <NotificationView
                  setIsHealthDataPermissionAccepted={
                    setIsHealthDataPermissionAccepted
                  }
                />
              )}
              <DefaultDropDownPicker
                style={styles.activityPickerStyle}
                value={selectedTracker}
                isOpenPicker={isPickerOpened}
                topPlaceholderTx={'modules.inAppTracking.activityType'}
                topPlaceholderTextColor={color.textInputPlaceHolderText}
                dropDownStyle={styles.activityPickerDropdownStyle}
                disabled={
                  selectedScreenMode === SCREEN_MODES.AUTO_TRACKING_RUNNING_MODE
                }
                setIsOpenPicker={item => setIsPickerOpened(item)}
                dropDownItems={trackerItemList()}
                onSetValue={(text: ACTIVITY_TYPES) => setSelectedTracker(text)}
              />
              <TrackingView
                totalTimeElapsed={totalTimeElapsed}
                totalDistanceCovered={totalDistanceCovered}
                selectedScreenMode={selectedScreenMode}
                isStopwatchStart={isStopwatchStart}
                resetStopwatch={resetStopwatch}
                isDistanceTrackerEnabled={isDistanceTrackerEnabled()}
                setTotalTimeElapsed={setTotalTimeElapsed}
              />
              <ButtonContainerView
                selectedScreenMode={selectedScreenMode}
                selectedTracker={selectedTracker}
                isStopwatchStart={isStopwatchStart}
                stepsCount={stepsCount}
                isHealthDataPermissionAccepted={isHealthDataPermissionAccepted}
                setTotalDistanceCovered={setTotalDistanceCovered}
                setStepsCount={setStepsCount}
                setStartTime={setStartTime}
                setEndTime={setEndTime}
                setSelectedScreenMode={setSelectedScreenMode}
                setIsStopwatchStart={setIsStopwatchStart}
                setResetStopwatch={setResetStopwatch}
                setIsDisabledTimeEntry={setIsDisabledTimeEntry}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
