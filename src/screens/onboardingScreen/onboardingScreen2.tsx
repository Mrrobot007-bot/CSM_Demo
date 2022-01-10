import {path} from 'ramda';
import moment from 'moment';
import HealthKit, {
  HKQuantityTypeIdentifier,
} from '@kingstinct/react-native-healthkit';
import CheckBox from 'react-native-check-box';
import React, {useEffect, useState} from 'react';
import {View, ImageBackground} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import Fitness from '@ovalmoney/react-native-fitness';
import DefaultPreference from 'react-native-default-preference';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  images,
  isAndroid,
  isValidDate,
  isValidName,
  defaultAlert,
  getPrimaryColor,
  PREFERENCE_VALUES,
  DefaultPreferenceKeys,
} from '../../utility';
import {color} from '../../theme';
import {
  FormTextInput,
  TextInputPreset,
  TextInputReturnKeyType,
} from '../../components/form-text-input';
import {Icon} from '../../components/icon';
import {API_URLS} from '../../services/urls';
import {translate} from '../../i18n/translate';
import {Button} from '../../components/button';
import {
  ActivitiesType,
  LoginDataResponse,
  OnBoardingCategoryType,
} from '../../utility/object-types/auth-response';
import {ButtonType} from '../../components/button';
import {store} from '../../redux/store/configureStore';
import {STATUS_CODES} from '../../services/status-codes';
import {addUser} from '../../redux/actions/user-actions';
import {ProgressBar} from '../../components/progress-bar';
import {OnboardingScreenStyles as styles} from './styles';
import {ICON_TYPES} from '../../components/icon/constants';
import {OnBoardingCategories} from './onboardingCategories';
import {DefaultDialog} from '../../components/default-dialog';
import {getApiCall, putApiCall} from '../../services/api-services';
import {DefaultDropDownPicker} from '../../components/drop-down-picker';
import {optionStatusTypes, UserType} from '../../utility/object-types/user';
import {AppTextStyles, Text, TextPresetStyles} from '../../components/text';
import {RegisterDataResponse} from '../../utility/object-types/auth-response';
import {UploadImage} from '../my-challenges-screen/create-new-challenges/upload-image';

/**
 * types of gender list
 */
const genderList = [
  {label: translate('modules.auth.male'), value: 'male'},
  {label: translate('modules.auth.female'), value: 'female'},
  {label: translate('modules.auth.preferNotToSay'), value: 'Prefer not to say'},
];

/**
 * preferred unit types for distance
 */
const preferredUnit = [
  {label: translate('common.kilometers'), value: 'kilometers'},
  {label: translate('common.miles'), value: 'miles'},
];

/**
 * An Interface for possible props for the onboarding component
 */
interface IOnBoardingScreen2ScreenProps {
  /**
   * Navigation prop used to set the navigation stuff in the
   * component like, go back, move to other screen, etc.
   */
  navigation: any;

  /**
   * props type is used to click on OnNext press
   */
  onNextPress(): void;

  /**
   * props is used for userData
   */
  userData: UserType;
}

/**
 *  android permissions items for google fit
 */
const androidPermissions = [
  {
    kind: Fitness.PermissionKinds.Distances,
    access: Fitness.PermissionAccesses.Read,
  },
];

/**
 *  OnboardingScreen2 - Screen used to fill the details of onboarding section
 */
const OnboardingScreen2 = (props: IOnBoardingScreen2ScreenProps) => {
  const apiReducer = useSelector((state: RootStateOrAny) => state.apiReducer);
  let minimumDateForDob = new Date();
  minimumDateForDob.setFullYear(minimumDateForDob.getFullYear() - 13);
  const [signUpUserData] = useState<RegisterDataResponse>(
    path(['userData'], props),
  );
  const [dob, setDob] = useState('');
  const [bio, setBio] = useState('');
  const [gender, setGender] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [nickName, setNickName] = useState('');
  const [yesMake, setYesMake] = useState(false);
  const [yesSend, setYesSend] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [activities, setActivities] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [genderOpener, setGenderOpener] = useState(false);
  const [activityHeight, setActivityHeight] = useState(0);
  const [yesWheelChair, setYesWheelChair] = useState(false);
  const [yesNotifyGoals, setYesNotifyGaols] = useState(false);
  const [unitMeasureType, setUnitMeasureType] = useState(null);
  const [showProgressBar, setShowProgressBar] = useState(false);

  const [categoriesAndValues, setCategoriesAndValues] = useState<
    Array<OnBoardingCategoryType>
  >([]);
  const [pushNotification, setPushNotification] = useState(false);
  const [emailNotification, setEmailNotification] = useState(false);
  const [unitMeasureOpener, setUnitMeasureOpener] = useState(false);
  const [isOtherDropDownOpened, setIsOtherDropDownOpened] = useState(false);
  const [isHealthDataPermissionAccepted, setIsHealthDataPermissionAccepted] =
    useState(false);
  const [selectedOnboardingItemList, setSelectedOnboardingItemList] = useState(
    [],
  );

  /**
   * function is used to load the intial data
   */
  useEffect(() => {
    if (isAndroid) {
      Fitness.isAuthorized(androidPermissions)
        .then(authorized => {
          if (authorized) {
            setToggle(true);
          } else {
            setToggle(false);
          }
          setIsHealthDataPermissionAccepted(authorized);
        })
        .catch(error => {
          setToggle(false);
          setIsHealthDataPermissionAccepted(false);
        });
    } else {
      DefaultPreference.get(DefaultPreferenceKeys.HEALTH_KIT_PERMISSION).then(
        value => {
          if (value === PREFERENCE_VALUES.HEALTH_KIT_PERMISSION_COMPLETED) {
            setToggle(true);
            setIsHealthDataPermissionAccepted(true);
          } else {
            setToggle(false);
            setIsHealthDataPermissionAccepted(false);
          }
        },
      );
    }
  }, []);

  /**
   * function is used to det the dob
   * @param text
   */
  const setUpdatedDob = (text: string) => {
    if (
      new Date(
        moment(moment(text, 'DD/MM/YYYY')).format('MM/DD/YYYY'),
      ).getTime() > new Date(minimumDateForDob).getTime()
    ) {
      setDob(
        moment(new Date(minimumDateForDob)).format('DD/MM/YYYY').toString(),
      );
    } else {
      setDob(text);
    }
  };

  /**
   * function is used for different types of dropdown
   * @param value
   */
  const dropDownSet = (value: string = null) => {
    if (value == 'gender') {
      setGenderOpener(!genderOpener);
      setUnitMeasureOpener(false);
      setIsOtherDropDownOpened(true);
    } else if (value == 'unitMeasure') {
      setUnitMeasureOpener(!unitMeasureOpener);
      setGenderOpener(false);
      setIsOtherDropDownOpened(true);
    } else {
      setIsOtherDropDownOpened(false);
      setUnitMeasureOpener(false);
      setGenderOpener(false);
    }
  };

  /**
   * function is submit the onboarding form
   */
  const onNextButtonPress = () => {
    const selectedActivities = activities.filter(
      item => item.selected === true,
    );
    if (selectedActivities.length > 0) {
      submitForm();
    } else {
      defaultAlert('Please choose activities', '');
    }
  };

  const dispatch = useDispatch();

  /**
   * function to get the activities to choose
   */
  const getActivities = async () => {
    try {
      let apiResponse = await dispatch(
        getApiCall(
          `${API_URLS.ACTIVITIES}?type=group`,
          props.navigation,
          getActivities,
          true,
        ),
      );
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        let activities: Array<ActivitiesType> =
          path(['data'], apiResponse) || [];
        activities.map((e: ActivitiesType) => (e['selected'] = false));
        let floatingPointPart = (activities.length / 3) % 1;
        let integerPart = Math.floor(activities.length / 3);
        let ActivityHeight = integerPart * 44;
        let addHeight = floatingPointPart == 0 ? 0 : 44;
        let finalHeight = ActivityHeight + addHeight;
        setActivityHeight(finalHeight);
        setActivities(activities);
        getCategoriesAndValues();
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };

  /**
   * function is used to get categories and ita values
   */
  const getCategoriesAndValues = async () => {
    try {
      let apiResponse = await dispatch(
        getApiCall(API_URLS.GET_CATEGORY_AND_VALUES),
      );
      if (path(['statusCode'], apiResponse) == STATUS_CODES.STATUS_OK) {
        const categoriesData: Array<OnBoardingCategoryType> =
          path(['data'], apiResponse) || [];

        const selectedList = categoriesData.map(item => {
          return {
            category_id: item._id,
            value_id: null,
          };
        });

        setSelectedOnboardingItemList(selectedList);
        setCategoriesAndValues(categoriesData);
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };

  /**
   *
   * @param activityId function is used for selecting the values
   */
  const onActivitySelect = (activityId: number) => {
    let updatedList = activities.map(item => {
      if (item._id == activityId) return {...item, selected: !item.selected};
      return item;
    });
    setActivities(updatedList);
  };

  /**
   * function to load the initial data
   */
  useEffect(() => {
    getActivities();
  }, []);

  const setYesNotifyGaolsFun = () => {
    setYesNotifyGaols(!yesNotifyGoals);
    setPushNotification(!yesNotifyGoals);
    setEmailNotification(!yesNotifyGoals);
    console.log('notifyGoals==>', yesNotifyGoals);
    if (yesNotifyGoals != true) {
      setPushNotification(true), setEmailNotification(true);
    }
  };

  /**
   * function for submitting the onboarding form
   */
  const submitForm = async () => {
    let activityArr: Array<string> = [];
    activities.map(e => {
      if (e.selected) activityArr.push(e._id);
    });
    let params = {
      nickname: nickName,
      dob: moment(moment(dob, 'DD/MM/YYYY')).format('MM/DD/YYYY').toString(),
      gender: gender,
      activity: activityArr,
      unitOfType: unitMeasureType,
      optSetting: [
        pushNotification
          ? {name: 'pushnotification', optionStatusTypes: optionStatusTypes.ON}
          : {
              name: 'pushnotification',
              optionStatusTypes: optionStatusTypes.OFF,
            },
        emailNotification
          ? {name: 'emailnotification', optionStatusTypes: optionStatusTypes.ON}
          : {
              name: 'emailnotification',
              optionStatusTypes: optionStatusTypes.OFF,
            },

        yesSend
          ? {name: 'advertisment', optionStatusTypes: optionStatusTypes.ON}
          : {name: 'advertisment', optionStatusTypes: optionStatusTypes.OFF},
        yesMake
          ? {name: 'profileVisible', optionStatusTypes: optionStatusTypes.ON}
          : {name: 'profileVisible', optionStatusTypes: optionStatusTypes.OFF},
      ],
      profileImageUrl:
        imageUrl ||
        'https://cms-runing-worldcup.s3.us-east-2.amazonaws.com/waveyThumbnailImage84',
      wheelchair: yesWheelChair,
      boostr: toggle,
      bio: bio || ' ',
      category: selectedOnboardingItemList,
    };
    console.log('submitForm==>1', JSON.stringify(params));
    try {
      let apiResponse = await dispatch(
        putApiCall(
          API_URLS.ONBOARDING + signUpUserData._id,
          params,
          props.navigation,
          submitForm,
        ),
      );
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        let data: LoginDataResponse = path(['data'], apiResponse);
        const storeData: any = path(['userReducer', 'user'], store.getState());
        data = {
          ...storeData,
          ...data,
          organisationId: path(['organisationId'], storeData) || [],
          onboarding: false,
          sessionId: storeData.sessionId || data.sessionId,
        };
        dispatch(addUser(data));
        props.onNextPress();
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };

  let activityArr: Array<string> = [];
  activities.map(e => {
    if (e.selected) activityArr.push(e._id);
  });

  const isNextDisabled =
    !isValidDate(dob, true) ||
    !isValidName(nickName, true) ||
    gender === null ||
    activityArr.length === 0 ||
    unitMeasureType === null ||
    (selectedOnboardingItemList.length > 0 &&
      selectedOnboardingItemList.find((item: any) => item.value_id === null));

  /**
   * function for taking ios healthKit permission
   */
  const callIosPermissions = async () => {
    const response = await HealthKit.requestAuthorization([
      HKQuantityTypeIdentifier.distanceCycling,
      HKQuantityTypeIdentifier.distanceWalkingRunning,
    ]);
    setIsHealthDataPermissionAccepted(response);
    if (response) {
      setToggle(true);
    } else {
      setToggle(false);
    }
    DefaultPreference.set(
      DefaultPreferenceKeys.HEALTH_KIT_PERMISSION,
      `${response}`,
    );
  };

  /**
   * function for getting the android permission
   */
  const callAndroidPermissions = async () => {
    Fitness.requestPermissions(androidPermissions)
      .then(authorized => {
        if (authorized) {
          setToggle(true);
        } else {
          setToggle(false);
        }
        setIsHealthDataPermissionAccepted(authorized);
      })
      .catch(error => {
        setToggle(false);
        setIsHealthDataPermissionAccepted(false);
      });
  };

  /**
   * function for allowing permission
   */
  const onAllowClick = () => {
    if (isAndroid) {
      callAndroidPermissions();
    } else {
      callIosPermissions();
    }
  };

  return (
    <ImageBackground
      style={[styles.full, {backgroundColor: getPrimaryColor()}]}
      source={images.blueBackground}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableResetScrollToCoords={false}
        contentContainerStyle={[
          styles.defaultKeyboardAwareStyle,
          styles.keyboardAwareViewStyle,
        ]}>
        <View style={styles.onboarding2Heading}>
          <Text
            preset={TextPresetStyles.HEADLINE_DARK}
            style={styles.secondaryLabelTextStyle}
            tx={'modules.auth.profileQuestions'}
          />
        </View>

        <View style={styles.onboarding2ContainerStyle}>
          <FormTextInput
            onChangeText={setUpdatedDob}
            value={
              dob
                ? moment(
                    new Date(
                      moment(moment(dob, 'DD/MM/YYYY')).format('MM/DD/YYYY'),
                    ),
                  ).toString()
                : null
            }
            disableKeyboardInput={true}
            editable={false}
            checkValidation
            topPlaceholderTx={'modules.auth.dateOfBirth'}
            inlinePlaceholderTx={'modules.auth.dateformat'}
            topPlaceholderTextColor={color.textLight}
            preset={TextInputPreset.CALENDAR}
            returnKeyType={'done'}
            isRequired
            maximumDate={minimumDateForDob}
          />

          <DefaultDropDownPicker
            value={gender}
            isOpenPicker={genderOpener}
            setIsOpenPicker={() => dropDownSet('gender')}
            dropDownItems={genderList}
            topPlaceholderTx={'modules.auth.gender'}
            topPlaceholderTextColor={color.textLight}
            onSetValue={text => setGender(text)}
            isRequired
          />

          <FormTextInput
            onChangeText={setNickName}
            topPlaceholderTx={'modules.auth.nickName'}
            topPlaceholderTextColor={color.textLight}
            preset={TextInputPreset.NAME}
            isRequired
            checkValidation
            returnKeyType={'done'}
            value={nickName}
            style={styles.formInputStyle}
          />

          <View style={styles.onboarding2Description}>
            <Text
              preset={TextPresetStyles.CAPTION_2}
              style={[styles.checkBoxTextStyle]}
              tx={'modules.auth.onboarding2DescriptionYourNickName'}
            />

            <Text
              preset={TextPresetStyles.FOOT_NOTE_BOLD}
              style={[styles.checkBoxTextStyle, styles.profileQuestionFootNote]}
              tx={'modules.auth.onboarding2DescriptionWhichOf'}
            />
          </View>

          <View
            style={[[styles.activityContainerStyle, {height: activityHeight}]]}>
            {activities.map((item, index) => {
              return (
                <CheckBox
                  key={item._id}
                  style={[styles.activityCheckboxStyle]}
                  onClick={() => onActivitySelect(item._id)}
                  checkBoxColor={color.palette.white}
                  isChecked={item.selected}
                  rightText={`${item.name}`}
                  rightTextStyle={[
                    AppTextStyles[TextPresetStyles.FOOT_NOTE],
                    styles.checkboxTextStyle,
                  ]}
                  unCheckedImage={<View style={styles.checkUnSelectedStyles} />}
                  checkedImage={
                    <Icon
                      icon={ICON_TYPES.TICK_2}
                      style={styles.checkSelectedStyles}
                    />
                  }
                />
              );
            })}
          </View>

          <DefaultDropDownPicker
            value={unitMeasureType}
            isOpenPicker={unitMeasureOpener}
            setIsOpenPicker={() => dropDownSet('unitMeasure')}
            dropDownItems={preferredUnit}
            topPlaceholderTx={'modules.auth.preferredUnit'}
            topPlaceholderTextColor={color.textLight}
            onSetValue={text => setUnitMeasureType(text)}
            isRequired
          />

          <Text
            preset={TextPresetStyles.FOOT_NOTE_BOLD}
            style={styles.optInsView}
            tx={'modules.auth.optIns'}
          />

          <CheckBox
            style={[styles.onboarding2CheckboxStyle]}
            onClick={() => setYesNotifyGaolsFun()}
            checkBoxColor={color.palette.white}
            isChecked={yesNotifyGoals}
            rightText={translate('modules.settings.notifyNotifications')}
            rightTextStyle={[
              AppTextStyles[TextPresetStyles.FOOT_NOTE],
              styles.checkBoxTextStyle,
            ]}
            unCheckedImage={<View style={styles.checkUnSelectedStyles} />}
            checkedImage={
              <Icon
                icon={ICON_TYPES.TICK_2}
                style={styles.checkSelectedStyles}
              />
            }
          />
          <View style={styles.notificationInnerView}>
            <CheckBox
              style={[styles.onboarding2CheckboxStyle]}
              onClick={() => {
                setPushNotification(!pushNotification);
                setYesNotifyGaols(emailNotification && !pushNotification);
              }}
              checkBoxColor={color.palette.white}
              isChecked={pushNotification}
              rightText={translate('modules.settings.pushNotification')}
              rightTextStyle={[
                AppTextStyles[TextPresetStyles.FOOT_NOTE],
                styles.checkBoxTextStyle,
              ]}
              unCheckedImage={<View style={styles.checkUnSelectedStyles} />}
              checkedImage={
                <Icon
                  icon={ICON_TYPES.TICK_2}
                  style={styles.checkSelectedStyles}
                />
              }
            />
            <CheckBox
              style={[styles.onboarding2CheckboxStyle]}
              onClick={() => {
                setEmailNotification(!emailNotification);
                setYesNotifyGaols(!emailNotification && pushNotification);
              }}
              checkBoxColor={color.palette.white}
              isChecked={emailNotification}
              rightText={translate('modules.settings.email')}
              rightTextStyle={[
                AppTextStyles[TextPresetStyles.FOOT_NOTE],
                styles.checkBoxTextStyle,
              ]}
              unCheckedImage={<View style={styles.checkUnSelectedStyles} />}
              checkedImage={
                <Icon
                  icon={ICON_TYPES.TICK_2}
                  style={styles.checkSelectedStyles}
                />
              }
            />
          </View>
          <CheckBox
            style={[styles.checkboxStyle, styles.onboarding2CheckboxStyle]}
            onClick={() => setYesSend(!yesSend)}
            checkBoxColor={color.palette.white}
            isChecked={yesSend}
            rightText={translate('modules.settings.offersAndInformation')}
            rightTextStyle={[
              AppTextStyles[TextPresetStyles.FOOT_NOTE],
              styles.checkBoxTextStyle,
            ]}
            unCheckedImage={<View style={styles.checkUnSelectedStyles} />}
            checkedImage={
              <Icon
                icon={ICON_TYPES.TICK_2}
                style={styles.checkSelectedStyles}
              />
            }
          />
          <CheckBox
            style={[styles.checkboxStyle, styles.onboarding2CheckboxStyle]}
            onClick={() => setYesMake(!yesMake)}
            checkBoxColor={color.palette.white}
            isChecked={yesMake}
            rightText={translate('modules.settings.goalsVisible')}
            rightTextStyle={[
              AppTextStyles[TextPresetStyles.FOOT_NOTE],
              styles.checkBoxTextStyle,
            ]}
            unCheckedImage={<View style={styles.checkUnSelectedStyles} />}
            checkedImage={
              <Icon
                icon={ICON_TYPES.TICK_2}
                style={styles.checkSelectedStyles}
              />
            }
          />
          <CheckBox
            style={[styles.checkboxStyle, styles.onboarding2CheckboxStyle]}
            onClick={() => setYesWheelChair(!yesWheelChair)}
            checkBoxColor={color.palette.white}
            isChecked={yesWheelChair}
            rightText={translate('modules.settings.wheelChairUser')}
            rightTextStyle={[
              AppTextStyles[TextPresetStyles.FOOT_NOTE],
              styles.checkBoxTextStyle,
            ]}
            unCheckedImage={<View style={styles.checkUnSelectedStyles} />}
            checkedImage={
              <Icon
                icon={ICON_TYPES.TICK_2}
                style={styles.checkSelectedStyles}
              />
            }
          />

          <OnBoardingCategories
            categoriesAndValues={categoriesAndValues}
            selectedItemList={selectedOnboardingItemList}
            setSelectedItemList={setSelectedOnboardingItemList}
            otherDropDownSet={dropDownSet}
            isOtherDropDownOpened={isOtherDropDownOpened}
          />

          <FormTextInput
            onChangeText={setBio}
            topPlaceholderTx={'modules.settings.bio'}
            topPlaceholderTextColor={color.textLight}
            preset={TextInputPreset.BIO}
            returnKeyType={TextInputReturnKeyType.DONE}
            checkValidation
            blurOnSubmit={true}
          />
          <Text
            preset={TextPresetStyles.FOOT_NOTE_BOLD}
            style={styles.bioTextStyle}
            text={`${bio.length}${'/120'}`}
          />
          <View style={styles.uploadImageButtonView}>
            <UploadImage
              imageUrl={imageUrl}
              setImageUrl={url => setImageUrl(url)}
              labelTextStyle={styles.imageUploadTextStyle}
              setShowProgressBar={setShowProgressBar}
              textPreset={TextPresetStyles.TEXT_LABEL}
            />
          </View>
          <Text
            preset={TextPresetStyles.FOOT_NOTE_BOLD}
            style={[styles.locationDescriptionStyle]}
            tx={
              isAndroid
                ? 'modules.auth.onboarding2DescriptionToFunctionAndroid'
                : 'modules.auth.onboarding2DescriptionToFunctionIos'
            }
          />

          <View style={styles.onboarding2ToggleView}>
            <Text
              preset={TextPresetStyles.SUB_HEADLINE}
              style={styles.checkBoxTextStyle}
              tx={'modules.auth.yes'}
            />
            <ToggleSwitch
              isOn={toggle}
              onColor={color.palette.black}
              offColor={color.palette.black}
              onToggle={() => {
                toggle ? setToggle(!toggle) : setShowDialog(!showDialog);
              }}
            />
          </View>

          <Button
            tx={'modules.auth.next'}
            type={ButtonType.SECONDARY}
            onPress={onNextButtonPress}
            disabled={isNextDisabled}
            style={styles.nextButtonStyle}
          />
        </View>
      </KeyboardAwareScrollView>
      <DefaultDialog
        isVisible={showDialog}
        hideDialog={() => setShowDialog(false)}
        header={
          isAndroid
            ? translate('modules.inAppTracking.accessBoostrHeaderAndroid')
            : translate('modules.inAppTracking.accessBosstrHeaderIos')
        }
        description={
          isAndroid
            ? translate('modules.inAppTracking.androidAccessBoostrDescription')
            : translate(
                'modules.inAppTracking.modules.inAppTracking.iosAccessBoostrDescription',
              )
        }
        button1Text={translate('common.dontAllow')}
        button2Text={translate('common.ok')}
        onButton1Click={() => setShowDialog(false)}
        onButton2Click={() => onAllowClick()}
        button2TextStyle={styles.dialogTextStyle}
        button1TextStyle={styles.dialogTextStyle}
        twoButtons
      />
      {(apiReducer.loading || showProgressBar) && <ProgressBar />}
    </ImageBackground>
  );
};

export {OnboardingScreen2};
