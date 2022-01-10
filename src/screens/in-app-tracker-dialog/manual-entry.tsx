import {path} from 'ramda';
import moment from 'moment';
import {connect} from 'react-redux';
import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import CheckBox from 'react-native-check-box';
import {useNavigation} from '@react-navigation/core';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {
  showMessage,
  INTENSITY_TYPES,
  getPrimaryColor,
  getActivitiesData,
  INFO_CONTENT_ID_TYPES,
  getKMDistanceFromSteps,
} from '../../utility';
import {color} from '../../theme';
import {translate} from '../../i18n';
import {SCREEN_MODES} from './constants';
import {Icon} from '../../components/icon';
import {API_URLS} from '../../services/urls';
import {Button} from '../../components/button';
import {InfoComponent} from '../../components/info';
import {InAppTrackerStyles as styles} from './styles';
import {STATUS_CODES} from '../../services/status-codes';
import {postApiCall} from '../../services/api-services';
import {ICON_TYPES} from '../../components/icon/constants';
import {DefaultDropDownPicker} from '../../components/drop-down-picker';
import {AppTextStyles, Text, TextPresetStyles} from '../../components/text';
import {UserConfirmationDialog} from '../../components/user-confirmation-dialog';
import {FormTextInput, TextInputPreset} from '../../components/form-text-input';

/**
 * types of intensity to be selected in the app
 */
const intensityTypes = [
  {label: INTENSITY_TYPES.HIGH, value: INTENSITY_TYPES.HIGH},
  {label: INTENSITY_TYPES.MODERATE, value: INTENSITY_TYPES.MODERATE},
  {label: INTENSITY_TYPES.LIGHT, value: INTENSITY_TYPES.LIGHT},
];

const timeFormat = "'hh:mm a";

/**
 * different types of props to be used in manual entry
 */
interface IInAppManualEntryDialogProps {
  trackerItemList: Array<Object>;
  stepsCount: number;
  selectedTracker: string;
  isDistanceTrackerEnabled: boolean;
  totalDistanceCovered: number;
  selectIntensityTracker: string;
  startTime: number;
  endTime: number;
  isDisabledTimeEntry: boolean;
  setSelectedIntensityTracker: (text: INTENSITY_TYPES) => void;
  setSelectedTracker: (text: string) => void;
  setStartTime: (time: number) => void;
  setEndTime: (time: number) => void;
  setTotalDistanceCovered: (distance: number) => void;
  setSelectedScreenMode: (mode: SCREEN_MODES) => void;
  setResetStopwatch: (isSet: boolean) => void;
  dispatch: any;
}

/**
 * Component used to show the final confirmation dialog at the time of record submission
 */
const InAppManualEntry = (props: IInAppManualEntryDialogProps) => {
  const navigation = useNavigation();
  const [isPickerOpened, setIsPickerOpened] = useState(false);
  const [shouldShowRetry, setShouldShowRetry] = useState(false);
  const [showFinishDialog, setShowFinishDialog] = useState(false);
  const [isPickerIntensityOpened, setIsPickerIntensityOpened] = useState(false);
  const [isEndDateInvalid, setIsEndDateInvalid] = useState(false);
  const [startTime, setStartTime] = useState(
    props.startTime
      ? moment(new Date(props.startTime)).format('hh:mm a').toString()
      : null,
  );
  const [endTime, setEndTime] = useState(
    props.endTime
      ? moment(new Date(props.endTime)).format('hh:mm a').toString()
      : null,
  );
  const [isConfirmationThere, setIsConfirmationThere] = useState(false);

  const setManualStartTime = (time: string) => {
    setStartTime(time);

    if (
      time &&
      endTime &&
      moment(time, timeFormat).valueOf() >=
        moment(endTime, timeFormat).valueOf()
    ) {
      setIsEndDateInvalid(true);
    } else {
      setIsEndDateInvalid(false);
    }

    try {
      props.setStartTime(moment(time, timeFormat).valueOf());
    } catch (e) {
      props.setStartTime(new Date().getTime());
    }
  };

  /**
   *  End time of tracker function
   * @param time
   */
  const setManualEndTime = (time: string) => {
    if (
      startTime &&
      time &&
      moment(startTime, timeFormat).valueOf() >=
        moment(time, timeFormat).valueOf()
    ) {
      setIsEndDateInvalid(true);
    } else {
      setIsEndDateInvalid(false);
    }
    setEndTime(time);
    try {
      props.setEndTime(moment(time, timeFormat).valueOf());
    } catch (e) {
      props.setEndTime(new Date().getTime());
    }
  };

  /**
   * submit funtion to be start a tracker
   */
  const submitPress = async () => {
    const distance =
      props.totalDistanceCovered <= 0
        ? getKMDistanceFromSteps(props.stepsCount)
        : props.totalDistanceCovered;

    let parameters = {
      userId: path(['user', '_id'], props),
      activityTypeId: props.selectedTracker,
      startTime: props.startTime,
      endTime: props.endTime,
      distance: distance,
      steps: props.stepsCount,
      intensity: props.selectIntensityTracker,
    };
    try {
      const apiResponse = await props.dispatch(
        postApiCall(
          API_URLS.CREATE_USER_ACTIVITY,
          parameters,
          true,
          navigation,
          submitPress,
        ),
      );

      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        getActivitiesData(null, props.dispatch, false);

        props.setResetStopwatch(true);
        setShowFinishDialog(true);
        setShouldShowRetry(false);
      } else if (
        path(['statusCode'], apiResponse) === STATUS_CODES.BAD_REQUEST
      ) {
        showMessage(`Error! : ${path(['message'], apiResponse)}`);
        setShouldShowRetry(true);
      } else {
        showMessage(`Error! : ${path(['message'], apiResponse)}`);
        setShouldShowRetry(true);
      }
    } catch (e) {
      showMessage(`Error! : ${path(['message'], e)}`);
      setShouldShowRetry(true);
    }
  };

  const isSubmitDisabled =
    startTime === null ||
    endTime === null ||
    !isConfirmationThere ||
    startTime > endTime;

  const ShareButton = () => {
    return (
      <TouchableOpacity style={styles.finishDialogShareContainerStyle}>
        <Icon
          icon={ICON_TYPES.SHARE}
          style={{
            ...styles.finishDialogShareIconStyle,
            tintColor: getPrimaryColor(),
          }}
        />
        <Text
          preset={TextPresetStyles.CAPTION_1}
          tx={'common.share'}
          style={[
            styles.finishDialogShareTextStyle,
            {color: getPrimaryColor()},
          ]}
        />
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <DefaultDropDownPicker
        style={styles.activityPickerStyle}
        value={props.selectedTracker}
        isOpenPicker={isPickerOpened}
        setIsOpenPicker={item => setIsPickerOpened(item)}
        dropDownItems={props.trackerItemList}
        topPlaceholderTx={'modules.inAppTracking.activityType'}
        topPlaceholderTextColor={color.textInputPlaceHolderText}
        onSetValue={(text: string) => {
          props.setSelectedTracker(text);
        }}
        dropDownStyle={styles.activityPickerDropdownStyle}
        isRequired
      />

      <FormTextInput
        onChangeText={setManualStartTime}
        value={props.isDisabledTimeEntry ? startTime : null}
        disableKeyboardInput={true}
        editable={false}
        disabled={props.isDisabledTimeEntry}
        checkValidation
        topPlaceholderTx={'modules.inAppTracking.startTime'}
        inlinePlaceholderTx={'common.timePlaceHolder'}
        topPlaceholderTextColor={color.textInputPlaceHolderText}
        preset={TextInputPreset.TIME}
        returnKeyType={'next'}
        customInputStyle={styles.activityPickerDropdownStyle}
        isRequired
      />

      <FormTextInput
        onChangeText={setManualEndTime}
        value={props.isDisabledTimeEntry ? endTime : null}
        disableKeyboardInput={true}
        inputError={
          isEndDateInvalid && endTime
            ? translate('modules.inAppTracking.endTimeError')
            : null
        }
        editable={false}
        checkValidation
        disabled={props.isDisabledTimeEntry}
        topPlaceholderTx={'modules.inAppTracking.endTime'}
        inlinePlaceholderTx={'common.timePlaceHolder'}
        topPlaceholderTextColor={color.textInputPlaceHolderText}
        preset={TextInputPreset.TIME}
        returnKeyType={'next'}
        customInputStyle={styles.activityPickerDropdownStyle}
        isRequired
      />

      <DefaultDropDownPicker
        value={props.selectIntensityTracker}
        isOpenPicker={isPickerIntensityOpened}
        setIsOpenPicker={item => setIsPickerIntensityOpened(item)}
        dropDownItems={intensityTypes}
        topPlaceholderTx={'modules.inAppTracking.intensity'}
        topPlaceholderTextColor={color.textInputPlaceHolderText}
        onSetValue={(text: INTENSITY_TYPES) =>
          props.setSelectedIntensityTracker(text)
        }
        topRightComponent={
          <InfoComponent
            style={styles.tildeIconStyle}
            infoContentId={INFO_CONTENT_ID_TYPES.MANUAL_TRACKING_INTENSITY}
          />
        }
        dropDownStyle={styles.activityPickerDropdownStyle}
        isRequired
      />

      {props.isDistanceTrackerEnabled && (
        <FormTextInput
          onChangeText={text => props.setTotalDistanceCovered(parseInt(text))}
          disableKeyboardInput={true}
          value={
            props.isDisabledTimeEntry
              ? `${Math.round(props.totalDistanceCovered * 1000) / 1000}`
              : null
          }
          checkValidation
          topPlaceholderTx={'modules.inAppTracking.distanceKm'}
          topPlaceholderTextColor={color.textInputPlaceHolderText}
          preset={TextInputPreset.NUMBER}
          returnKeyType={'done'}
          disabled={props.isDisabledTimeEntry}
          topRightComponent={
            <InfoComponent
              style={styles.tildeIconStyle}
              infoContentId={INFO_CONTENT_ID_TYPES.MANUAL_TRACKING_DISTANCE}
            />
          }
          customInputStyle={styles.activityPickerDropdownStyle}
        />
      )}

      <View
        style={[
          styles.stepsCountMainContainer,
          {backgroundColor: getPrimaryColor(0.05)},
        ]}>
        <Text
          preset={TextPresetStyles.FOOT_NOTE_BOLD}
          text={`${translate('common.equivalence')}:`}
        />
        <View style={styles.stepsCountMainInnerContainer}>
          <Text
            preset={TextPresetStyles.SMALL_TITLE_BOLD}
            text={`${Math.round(props.stepsCount)}`}
            style={styles.countValueStyle}
          />
          <Text preset={TextPresetStyles.FOOT_NOTE_BOLD} tx={'common.steps'} />
        </View>
      </View>

      <View style={styles.checkBoxMainContainer}>
        <CheckBox
          style={styles.checkBoxStyle}
          onClick={() => setIsConfirmationThere(!isConfirmationThere)}
          checkBoxColor={color.palette.black}
          isChecked={isConfirmationThere}
          rightText={translate('modules.inAppTracking.confirmationMessage')}
          rightTextStyle={[
            AppTextStyles[TextPresetStyles.FOOT_NOTE],
            styles.blackTextStyles,
          ]}
        />
      </View>
      <Button
        text={
          shouldShowRetry
            ? translate('common.retry')
            : translate('common.submit')
        }
        onPress={submitPress}
        disabled={isSubmitDisabled}
      />

      <UserConfirmationDialog
        icon={ICON_TYPES.CHECK_CIRCLE}
        title={translate('modules.inAppTracking.yourDataSaved')}
        description={translate(
          'modules.inAppTracking.yourDataSavedDescription',
        )}
        isVisible={showFinishDialog}
        okButtonText={translate('common.restart')}
        onOkClick={() => {
          props.setTotalDistanceCovered(0);
          props.setResetStopwatch(false);
          setShowFinishDialog(false);
        }}
        onHideDialog={() => {
          setShowFinishDialog(false);
          props.setSelectedScreenMode(SCREEN_MODES.INITIAL_MODE);
        }}
      />
    </ScrollView>
  );
};

function mapStateToProps(state: any) {
  return {
    user: state.userReducer.user,
  };
}

export const InAppManualEntryDialog = connect(
  mapStateToProps,
  {},
)(InAppManualEntry);
