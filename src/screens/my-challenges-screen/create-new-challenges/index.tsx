import {path} from 'ramda';
import moment from 'moment';
import {View} from 'react-native';
import {useIsFocused} from '@react-navigation/core';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';

import {
  isValidDate,
  isValidName,
  showMessage,
  defaultAlert,
  getPrimaryColor,
  getLiveChallenges,
  isValidCoordinate,
  GOOGLE_PLACES_API_KEY,
  INFO_CONTENT_ID_TYPES,
  CREATE_CHALLENGES_TYPE,
} from '../../../utility';
import {color} from '../../../theme';
import {FundRise} from './fund-rise';
import {translate} from '../../../i18n';
import {Description} from './description';
import {UploadImage} from './upload-image';
import {ActivityScreen} from './activities';
import {
  FormTextInput,
  TextInputPreset,
  TextInputReturnKeyType,
} from '../../../components/form-text-input';
import {Icon} from '../../../components/icon';
import {API_URLS} from '../../../services/urls';
import {hpx} from '../../../utility/responsive';
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import {TeamInviteList} from './team-invite-list';
import {UserInviteList} from './user-invite-list';
import {Button} from '../../../components/button';
import {InfoComponent} from '../../../components/info';
import {ButtonPreset} from '../../../components/button';
import {RelayChallengesStyles as styles} from './styles';
import React, {useState, useEffect, useRef} from 'react';
import {STATUS_CODES} from '../../../services/status-codes';
import {ProgressBar} from '../../../components/progress-bar';
import {ICON_TYPES} from '../../../components/icon/constants';
import {Text, TextPresetStyles} from '../../../components/text';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {ChallengeType} from '../../../utility/object-types/challenge';
import {getApiCall, postApiCall} from '../../../services/api-services';
import {DefaultDropDownPicker} from '../../../components/drop-down-picker';
import {ActivitiesType} from '../../../utility/object-types/auth-response';
import {BoostrScreen, HeaderTypes} from '../../../components/boostr-screen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ClosedAndTeamChallengeToggle} from './closed-and-team-challenge-toggle';

/**
 * An Interface for possible props for the CreateNewChallenge Screen
 */
interface ICreateNewChallengeScreenProps {
  /**
   * Navigation prop used to set the navigation stuff in the
   * component like, go back, move to other screen, etc.
   */
  navigation: any;

  /**
   * here route prop used to get any item sent from last screen
   */
  route: any;
}

/**
 * CreateNewChallengeScreen - A common screen used to create any type of challenges
 */
export const CreateNewChallengeScreen = (
  props: ICreateNewChallengeScreenProps,
) => {
  const mapRef = useRef<MapView>(null);
  const [activities, setActivities] = useState([]);
  const [inviteListId, setInviteListId] = useState([]);
  const [fundRaiseUrl, setFundRaiseUrl] = useState(null);
  const [isPickerOpened, setIsPickerOpened] = useState();
  const challengeData: ChallengeType =
    path(['route', 'params', 'challengeData'], props) || null;

  const [lat, setLat] = useState(0.0);
  const [lng, setLng] = useState(0.0);
  const [placeId, setPlaceId] = useState('1');
  const [address, setAddress] = useState(
    path(['address'], challengeData) || null,
  );
  const [message, setMessage] = useState(
    path(['description'], challengeData) || '',
  );
  const [imageUrl, setImageUrl] = useState(
    path(['image'], challengeData) || '',
  );
  const [startDate, setStartDate] = useState(
    path(['startDate'], challengeData)
      ? moment(new Date(challengeData.startDate))
          .format('DD/MM/YYYY')
          .toString()
      : '',
  );
  const [distance, setDistance] = useState(
    path(['totalDistanceInKm'], challengeData)
      ? `${path(['totalDistanceInKm'], challengeData)}`
      : '',
  );
  const [challengeName, setChallengeName] = useState(
    path(['challengeName'], challengeData) || '',
  );
  const [selectedTracker, setSelectedTracker] = useState(null);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [teamChallengeToggle, setTeamChallengeToggle] = useState(
    path(['isTeamChallenge'], challengeData) || false,
  );
  const [inviteUrl, setInviteUrl] = useState(API_URLS.INVITES_LIST);
  const [challengeType] = useState(props.route.params.challengeType);
  const [closedChallengeToggle, setClosedChallengeToggle] = useState(
    path(['closed'], challengeData) || false,
  );
  const mapAutoCompleteRef = useRef<GooglePlacesAutocompleteRef>(null);
  const [startTime, setStartTime] = useState(
    path(['timeDaily'], challengeData)
      ? moment(new Date(parseInt(`${path(['timeDaily'], challengeData)}`)))
          .format('hh:mm a')
          .toString()
      : moment(new Date()).format('hh:mm a').toString(),
  );
  const [charityChallengeToggle, setCharityChallengeToggle] = useState(false);
  const [endDate, setEndDate] = useState(
    path(['endDate'], challengeData)
      ? moment(new Date(challengeData.endDate)).format('DD/MM/YYYY').toString()
      : '',
  );
  const userReducer = useSelector((state: RootStateOrAny) => state.userReducer);

  /**
   * Setting start date in edit mode
   */
  const setUpdatedStartDate = (text: string) => {
    setStartDate(text);
    if (
      endDate &&
      endDate !== '' &&
      new Date(
        moment(moment(text, 'DD/MM/YYYY')).format('MM/DD/YYYY'),
      ).getTime() >=
        new Date(
          moment(moment(endDate, 'DD/MM/YYYY')).format('MM/DD/YYYY'),
        ).getTime()
    ) {
      const endD = moment(
        new Date(
          moment(moment(text, 'DD/MM/YYYY')).format('MM/DD/YYYY'),
        ).getTime() +
          1000 * 60 * 60 * 24,
      )
        .format('DD/MM/YYYY')
        .toString();

      setEndDate(endD);
    }
  };

  /**
   * Setting end date in edit mode
   */
  const setUpdatedEndDate = (text: string) => {
    if (
      new Date(
        moment(moment(text, 'DD/MM/YYYY')).format('MM/DD/YYYY'),
      ).getTime() <=
      new Date(
        moment(moment(startDate, 'DD/MM/YYYY')).format('MM/DD/YYYY'),
      ).getTime()
    ) {
      const endD = moment(
        new Date(
          moment(moment(startDate, 'DD/MM/YYYY')).format('MM/DD/YYYY'),
        ).getTime() +
          1000 * 60 * 60 * 24,
      )
        .format('DD/MM/YYYY')
        .toString();

      setEndDate(endD);
    } else {
      setEndDate(text);
    }
  };

  const dispatch = useDispatch();
  const isUpdateMode: boolean =
    path(['route', 'params', 'isUpdateMode'], props) || false;

  /**
   * Comparing 2 activities
   */
  const compareActivities = (
    separatedServerIds: Array<string>,
    separatedLocalIds: Array<string>,
  ) => {
    separatedServerIds.sort();
    separatedLocalIds.sort();

    return (
      JSON.stringify(separatedServerIds) == JSON.stringify(separatedLocalIds)
    );
  };

  /**
   * Getting activities list from server
   */
  const getActivities = async () => {
    try {
      const apiResponse = await dispatch(
        getApiCall(
          `${API_URLS.ACTIVITIES}?type=challenge`,
          props.navigation,
          getActivities,
          true,
        ),
      );
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        let newArray: Array<Object> = [];
        let activities: Array<ActivitiesType> =
          path(['data'], apiResponse) || [];
        activities.map((e: ActivitiesType) => {
          let obj = {label: e.name, value: e._id};
          newArray.push(obj);

          let separatedServerIds = [e._id];
          try {
            separatedServerIds = `${separatedServerIds[0]}`.split(',');
          } catch (e) {}

          const includedActivities: Array<any> =
            path(['includedActivities'], challengeData) || [];

          let separatedLocalIds: Array<any> = includedActivities.map(item =>
            path(['_id'], item),
          );

          compareActivities(separatedServerIds, separatedLocalIds);

          if (compareActivities(separatedServerIds, separatedLocalIds)) {
            setSelectedTracker(e._id);
          }
        });
        setActivities(newArray);
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };

  useEffect(() => {
    getActivities();

    if (isUpdateMode) {
      try {
        mapAutoCompleteRef.current.setAddressText(
          path(['address'], challengeData),
        );

        mapRef.current.animateToCoordinate(
          {
            latitude: path(['location', 'latitude'], challengeData),
            longitude: path(['location', 'longitude'], challengeData),
          },
          1000,
        );
      } catch (e) {}
    }
  }, []);

  /**
   * Action on create/update challenge click
   */
  const onCreateClick = async () => {
    var activity_id: Array<Object> = [];
    activity_id.push(selectedTracker);
    let activityIds = activity_id;
    try {
      activityIds = `${activity_id[0]}`.split(',');
    } catch (e) {}

    const commonParameters = {
      name: challengeName,
      user_id: userReducer.user._id,
      activity_type_id: activityIds,
      start_date: moment(
        new Date(moment(moment(startDate, 'DD/MM/YYYY')).format('MM/DD/YYYY')),
      ).toString(),
      closed: closedChallengeToggle,
      image: imageUrl ? [imageUrl] : [],
      invitedUsersId: inviteListId,
      message: message === null || message === '' ? ' ' : message,
    };

    let challengeRelatedParameters = {};

    switch (challengeType) {
      case CREATE_CHALLENGES_TYPE.RELAY:
        {
          challengeRelatedParameters = {
            type: CREATE_CHALLENGES_TYPE.RELAY,
            distance: parseFloat(distance),
            end_date: moment(
              new Date(
                moment(moment(endDate, 'DD/MM/YYYY')).format('MM/DD/YYYY'),
              ),
            ).toString(),
            team_challenge: teamChallengeToggle,
            fund_raise: charityChallengeToggle,
            fundraise_url: fundRaiseUrl || ' ',
          };
        }
        break;

      case CREATE_CHALLENGES_TYPE.TIME_TRIAL:
        {
          challengeRelatedParameters = {
            type: CREATE_CHALLENGES_TYPE.TIME_TRIAL,
            distance: parseFloat(distance),
            end_date: moment(
              new Date(
                moment(moment(endDate, 'DD/MM/YYYY')).format('MM/DD/YYYY'),
              ),
            ).toString(),
            team_challenge: teamChallengeToggle,
          };
        }
        break;

      case CREATE_CHALLENGES_TYPE.HAPPY_FEET:
        {
          challengeRelatedParameters = {
            type: CREATE_CHALLENGES_TYPE.HAPPY_FEET,
            distance: parseFloat(distance),
            end_date: moment(
              new Date(
                moment(moment(endDate, 'DD/MM/YYYY')).format('MM/DD/YYYY'),
              ),
            ).toString(),
            fund_raise: charityChallengeToggle,
            fundraise_url: fundRaiseUrl || ' ',
          };
        }
        break;

      case CREATE_CHALLENGES_TYPE.MEET_UP:
        {
          challengeRelatedParameters = {
            type: CREATE_CHALLENGES_TYPE.MEET_UP,
            distance: parseFloat(distance),
            time: moment(startTime, 'hh:mm: a').valueOf(),
            team_challenge: teamChallengeToggle,
            address: address,
            location: [lat, lng],
            recurring: true,
          };
        }
        break;

      case CREATE_CHALLENGES_TYPE.FAR_OUT:
        {
          challengeRelatedParameters = {
            type: CREATE_CHALLENGES_TYPE.FAR_OUT,
            end_date: moment(
              new Date(
                moment(moment(endDate, 'DD/MM/YYYY')).format('MM/DD/YYYY'),
              ),
            ).toString(),
            team_challenge: teamChallengeToggle,
            fund_raise: charityChallengeToggle,
            fundraise_url: fundRaiseUrl || ' ',
          };
        }
        break;
    }
    const parameters = {...commonParameters, ...challengeRelatedParameters};
    isUpdateMode ? updateChallenge(parameters) : createChallenge(parameters);
  };

  /**
   * Action on create challenge
   */
  const createChallenge = async (parameters: object) => {
    try {
      const apiResponse = await dispatch(
        postApiCall(
          API_URLS.CREATE_CHALLENGE,
          parameters,
          true,
          props.navigation,
          onCreateClick,
        ),
      );
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        showMessage(translate('modules.myChallenges.challengeCreated'));
        getLiveChallenges(userReducer, true);
        props.navigation.pop(2);
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };

  /**
   * Action on update challenge
   */
  const updateChallenge = async (parameters: object) => {
    try {
      const apiResponse = await dispatch(
        postApiCall(
          `${API_URLS.UPDATE_CHALLENGE}?id=${path(['_id'], challengeData)}`,
          parameters,
          true,
          props.navigation,
          onCreateClick,
        ),
      );
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        showMessage(translate('modules.myChallenges.challengeUpdated'));
        getLiveChallenges(userReducer, true);
        props.navigation.pop(2);
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };

  const viewActivity = () => {
    if (
      challengeType == CREATE_CHALLENGES_TYPE.RELAY ||
      challengeType == CREATE_CHALLENGES_TYPE.HAPPY_FEET
    ) {
      return (
        <ActivityScreen
          challengeName={challengeName}
          challengeDistance={distance}
          setDistance={setDistance}
          setChallengeName={setChallengeName}
          navigation={props.navigation}
          challengeType={challengeType}
        />
      );
    } else {
      return null;
    }
  };

  /**
   * setting time for meetup challenge
   */
  const setManualStartTime = (time: string) => {
    setStartTime(time);
  };

  /**
   * checking all mandatory fields and setting create button disabled or enabled
   */
  const isCreateDisabled = () => {
    let isDisabled =
      selectedTracker === null ||
      selectedTracker === '' ||
      !isValidDate(startDate, true) ||
      !isValidName(challengeName, true);

    if (!isDisabled) {
      switch (challengeType) {
        case CREATE_CHALLENGES_TYPE.MEET_UP:
          isDisabled = !isValidCoordinate(lat, lng);
          break;

        case CREATE_CHALLENGES_TYPE.FAR_OUT:
          isDisabled =
            !isValidDate(endDate, true) ||
            new Date(startDate).getTime() >= new Date(endDate).getTime();
          break;

        default:
          isDisabled =
            !isValidDate(endDate, true) ||
            new Date(startDate).getTime() >= new Date(endDate).getTime() ||
            distance === '' ||
            distance === null;
          break;
      }
    }

    return isDisabled;
  };

  let minimumDateForStart = new Date();
  let minimumDateForEnd = new Date();
  minimumDateForEnd.setDate(minimumDateForEnd.getDate() + 1);

  const maximumDateForStart = new Date(
    new Date().setFullYear(new Date().getFullYear() + 10),
  );
  const maximumDateForEnd = new Date(
    new Date(minimumDateForEnd).setFullYear(new Date().getFullYear() + 10),
  );

  /**
   * Location view for meet up challenge
   */
  const locationView = () => {
    return (
      <View>
        <View style={styles.inputContainerStyle}>
          <Icon icon={ICON_TYPES.SEARCH} style={styles.leftIconStyle} />
          <GooglePlacesAutocomplete
            ref={mapAutoCompleteRef}
            placeholder={translate('modules.myChallenges.search')}
            query={{
              key: GOOGLE_PLACES_API_KEY,
              language: 'en',
            }}
            styles={{
              textInput: {
                height: hpx(30),
              },
            }}
            fetchDetails={true}
            onPress={(data, details = null) => {
              console.log('LocationData==>', JSON.stringify(details));
              setLat(path(['geometry', 'location', 'lat'], details));
              setLng(path(['geometry', 'location', 'lng'], details));
              setPlaceId(path(['place_id'], details));
              setAddress(path(['formatted_address'], details));
              mapRef.current.animateToCoordinate(
                {
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                },
                1000,
              );
            }}
          />
        </View>
        <View>
          <MapView
            style={styles.mapViewStyle}
            provider={PROVIDER_GOOGLE}
            ref={mapRef}
            followsUserLocation={true}
            showsUserLocation={true}
            showsCompass={false}
            toolbarEnabled={true}
            zoomEnabled={true}
            rotateEnabled={false}
            initialRegion={{
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}>
            <Marker
              coordinate={{latitude: lat, longitude: lng}}
              key={placeId}
            />
          </MapView>
          <View style={styles.mapOverlayStyle} />
        </View>
      </View>
    );
  };

  return (
    <BoostrScreen
      headerType={useIsFocused ? HeaderTypes.NORMAL_BACK : HeaderTypes.NONE}
      navigation={props.navigation}
      title={
        isUpdateMode
          ? translate('modules.myChallenges.editChallenge')
          : translate('modules.myChallenges.createNew')
      }>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'always'}
        contentContainerStyle={styles.keyboardAwareScrollViewContainer}>
        <Description challengeType={challengeType} />

        <View style={styles.mainContainer}>
          <DefaultDropDownPicker
            style={styles.activityPickerStyle}
            value={selectedTracker}
            isOpenPicker={isPickerOpened}
            setIsOpenPicker={(item: any) => setIsPickerOpened(item)}
            dropDownItems={activities}
            topPlaceholderTx={'modules.inAppTracking.activityType'}
            topPlaceholderTextColor={color.textInputPlaceHolderText}
            onSetValue={text => setSelectedTracker(text)}
            dropDownStyle={styles.activityPickerDropdownStyle}
          />

          {/* Activity Section view to choose Distance */}
          {viewActivity()}

          {challengeType != CREATE_CHALLENGES_TYPE.FAR_OUT ? (
            <FormTextInput
              onChangeText={setDistance}
              topPlaceholderTx={'modules.inAppTracking.distanceKm'}
              topPlaceholderTextColor={color.textInputPlaceHolderText}
              preset={TextInputPreset.NUMBER}
              customInputStyle={styles.activityPickerDropdownStyle}
              checkValidation
              value={distance}
            />
          ) : null}

          <FormTextInput
            onChangeText={setChallengeName}
            topPlaceholderTx={'modules.myChallenges.challengeName'}
            topPlaceholderTextColor={color.textInputPlaceHolderText}
            preset={TextInputPreset.NAME}
            checkValidation
            value={challengeName}
          />

          <FormTextInput
            onChangeText={setUpdatedStartDate}
            value={
              startDate
                ? moment(
                    new Date(
                      moment(moment(startDate, 'DD/MM/YYYY')).format(
                        'MM/DD/YYYY',
                      ),
                    ),
                  ).toString()
                : null
            }
            disableKeyboardInput={true}
            editable={false}
            checkValidation
            topPlaceholderTx={'modules.myChallenges.startDate'}
            inlinePlaceholderTx={'modules.auth.dateformat'}
            topPlaceholderTextColor={color.textInputPlaceHolderText}
            preset={TextInputPreset.CALENDAR}
            minimumDate={minimumDateForStart}
            maximumDate={maximumDateForStart}
          />
          {challengeType != CREATE_CHALLENGES_TYPE.MEET_UP ? (
            <FormTextInput
              onChangeText={setUpdatedEndDate}
              value={
                endDate
                  ? moment(
                      new Date(
                        moment(moment(endDate, 'DD/MM/YYYY')).format(
                          'MM/DD/YYYY',
                        ),
                      ),
                    ).toString()
                  : null
              }
              disableKeyboardInput={true}
              editable={false}
              checkValidation
              topPlaceholderTx={'modules.myChallenges.endDate'}
              inlinePlaceholderTx={'modules.auth.dateformat'}
              topPlaceholderTextColor={color.textInputPlaceHolderText}
              preset={TextInputPreset.CALENDAR}
              returnKeyType={'done'}
              minimumDate={minimumDateForEnd}
              maximumDate={maximumDateForEnd}
              isClickDisabled={startDate === null || startDate === ''}
            />
          ) : null}
          {challengeType == CREATE_CHALLENGES_TYPE.MEET_UP ? (
            <View>
              <FormTextInput
                onChangeText={setManualStartTime}
                value={startTime}
                disableKeyboardInput={true}
                editable={false}
                checkValidation
                topPlaceholderTx={'common.time'}
                inlinePlaceholderTx={'common.timePlaceHolder'}
                topPlaceholderTextColor={color.textInputPlaceHolderText}
                preset={TextInputPreset.TIME}
                returnKeyType={'next'}
                customInputStyle={styles.activityPickerDropdownStyle}
              />

              <View style={styles.locationTextContainerStyle}>
                <Text
                  preset={TextPresetStyles.TEXT_LABEL}
                  text={`${translate('common.location')}*`}
                />
                {locationView()}
              </View>
            </View>
          ) : null}

          <View style={styles.activityTextContainer}>
            <Text
              preset={TextPresetStyles.FOOT_NOTE_BOLD}
              style={styles.textInputPlaceHolderStyle}
              tx={'modules.myChallenges.closedChallenge'}
            />

            <InfoComponent
              style={{...styles.tildeIconStyle, tintColor: getPrimaryColor()}}
              infoContentId={
                INFO_CONTENT_ID_TYPES.CREATE_CHALLENGE_CLOSED_CHALLENGE
              }
            />
          </View>

          <ClosedAndTeamChallengeToggle
            isUpdateMode={
              isUpdateMode ||
              challengeType === CREATE_CHALLENGES_TYPE.HAPPY_FEET ||
              challengeType === CREATE_CHALLENGES_TYPE.MEET_UP
            }
            closedChallengeToggle={closedChallengeToggle}
            teamChallengeToggle={teamChallengeToggle}
            setClosedChallengeToggle={setClosedChallengeToggle}
            setTeamChallengeToggle={(item: boolean) => {
              setInviteUrl(
                item ? API_URLS.TEAM_INVITES_LIST : API_URLS.INVITES_LIST,
              );
              setTeamChallengeToggle(item);
            }}
          />

          {isUpdateMode ||
          challengeType === CREATE_CHALLENGES_TYPE.HAPPY_FEET ||
          challengeType ===
            CREATE_CHALLENGES_TYPE.MEET_UP ? null : teamChallengeToggle ? (
            <TeamInviteList
              setInviteListId={setInviteListId}
              isUpdateMode={false}
            />
          ) : (
            <UserInviteList
              setInviteListId={setInviteListId}
              isUpdateMode={false}
            />
          )}

          <FormTextInput
            value={message}
            onChangeText={setMessage}
            topPlaceholderTx={'modules.myChallenges.message'}
            topPlaceholderTextColor={color.palette.grey9}
            preset={TextInputPreset.DESCRIPTION}
            returnKeyType={TextInputReturnKeyType.DONE}
            checkValidation
            onSubmitEditing={() => {}}
            blurOnSubmit={true}
          />

          <FundRise
            setCharityChallengeToggle={setCharityChallengeToggle}
            charityChallengeToggle={charityChallengeToggle}
            challengeType={challengeType}
            setFundRaiseUrl={setFundRaiseUrl}
            fundRaiseUrl={fundRaiseUrl}
          />

          <UploadImage
            imageUrl={imageUrl}
            setImageUrl={url => setImageUrl(url)}
            setShowProgressBar={setShowProgressBar}
          />

          {isUpdateMode ? (
            <View style={styles.updateModeButtonStyle}>
              <Button
                tx={'common.cancel'}
                onPress={() => props.navigation.goBack(null)}
                preset={ButtonPreset.MEDIUM}
                customTextStyle={{color: getPrimaryColor()}}
                style={styles.cancelButtonStyle}
              />

              <Button
                tx={'common.save'}
                onPress={onCreateClick}
                disabled={isCreateDisabled()}
                preset={ButtonPreset.MEDIUM}
              />
            </View>
          ) : (
            <Button
              tx={'modules.myChallenges.create'}
              onPress={onCreateClick}
              disabled={isCreateDisabled()}
            />
          )}
        </View>
      </KeyboardAwareScrollView>
      {showProgressBar && <ProgressBar />}
    </BoostrScreen>
  );
};
