import React, {useEffect, useState} from 'react';

import {color} from '../../theme';
import {BoostrScreen, HeaderTypes} from '../../components/boostr-screen';
import {
  defaultAlert,
  getPrimaryColor,
  isAndroid,
  isValidDate,
  isValidDescription,
  isValidName,
  isValidPassword,
  logoutUser,
  showMessage,
} from '../../utility';
import {ScrollView} from 'react-native-gesture-handler';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import {getApiCall, putApiCall} from '../../services/api-services';
import {API_URLS} from '../../services/urls';
import {STATUS_CODES} from '../../services/status-codes';
import {path} from 'ramda';
import moment from 'moment';
import {TouchableOpacity, View} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import {AppTextStyles, Text, TextPresetStyles} from '../../components/text';
import {SettingScreenStyles as styles} from './styles';
import {
  FormTextInput,
  TextInputPreset,
  TextInputReturnKeyType,
} from '../../components/form-text-input';
import {Button} from '../../components/button';
import {translate} from '../../i18n';
import {useIsFocused} from '@react-navigation/core';
import {SectionTitle} from '../../components/section-title';
import {DefaultDropDownPicker} from '../../components/drop-down-picker';
import {
  ActivitiesType,
  LoginDataResponse,
  OnBoardingCategoryResponseType,
  OnBoardingCategoryType,
} from '../../utility/object-types/auth-response';
import CheckBox from 'react-native-check-box';
import {Icon} from '../../components/icon';
import {ICON_TYPES} from '../../components/icon/constants';
import {ButtonPreset} from '../../components/button';
import {optionStatusTypes, UserType} from '../../utility/object-types/user';
import {addUser} from '../../redux/actions/user-actions';
import {UploadImage} from '../my-challenges-screen/create-new-challenges/upload-image';
import {ProgressBar} from '../../components/progress-bar';
import {OnBoardingCategories} from '../onboardingScreen/onboardingCategories';
import {store} from '../../redux/store/configureStore';

interface ISettingScreenProps {
  navigation: any;
}
const genderList = [
  {label: translate('modules.auth.male'), value: 'male'},
  {label: translate('modules.auth.female'), value: 'female'},
  {label: translate('modules.auth.preferNotToSay'), value: 'Prefer not to say'},
];

const preferredUnit = [
  {label: translate('common.kilometers'), value: 'kilometers'},
  {label: translate('common.miles'), value: 'miles'},
];

export const SettingScreen = (props: ISettingScreenProps) => {
  const user: UserType = useSelector(
    (state: RootStateOrAny) => state.userReducer,
  ).user;

  const [dob, setDob] = useState(
    path(['dob'], user)
      ? moment(new Date(path(['dob'], user)))
          .format('DD/MM/YYYY')
          .toString()
      : '',
  );
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
  const [pushNotification, setPushNotification] = useState(
    path(['optSetting', 0, 'optionStatusTypes'], user) === optionStatusTypes.ON,
  );
  const [emailNotification, setEmailNotification] = useState(
    path(['optSetting', 1, 'optionStatusTypes'], user) === optionStatusTypes.ON,
  );

  const [yesNotifyGoals, setYesNotifyGaols] = useState(
    pushNotification && emailNotification,
  );
  const [yesSend, setYesSend] = useState(
    path(['optSetting', 2, 'optionStatusTypes'], user) === optionStatusTypes.ON,
  );
  const [yesMake, setYesMake] = useState(
    path(['optSetting', 3, 'optionStatusTypes'], user) === optionStatusTypes.ON,
  );

  const [yesWheelChair, setYesWheelChair] = useState(
    path(['wheelchair'], user),
  );
  const [nickName, setNickName] = useState(path(['nickname'], user) || '');
  const [toggle, setToggle] = useState(path(['boostr'], user));

  const [activities, setActivities] = useState([]);

  const [unitMeasureType, setUnitMeasureType] = useState(
    path(['unitOFType'], user),
  );

  const [gender, setGender] = useState(
    path(['gender'], user) || genderList[0].value,
  );

  const [genderOpener, setGenderOpener] = useState(false);
  const [unitMeasureOpener, setUnitMeasureOpener] = useState(false);
  const [bio, setBio] = useState<string>(path(['bio'], user || ''));
  const [imageUrl, setImageUrl] = useState(path(['profilePic'], user) || null);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [reEnteredPassword, setReEnteredPassword] = useState('');
  const [canDraw, setCanDraw] = useState(false);
  const [activityHeight, setActivityHeight] = useState(0);

  const [selectedOnboardingItemList, setSelectedOnboardingItemList] = useState(
    [],
  );
  const [isOtherDropDownOpened, setIsOtherDropDownOpened] = useState(false);
  const [categoriesAndValues, setCategoriesAndValues] = useState<
    Array<OnBoardingCategoryType>
  >([]);

  const dispatch = useDispatch();

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

        const selectedActivities: Array<string> =
          path(['activities'], user) || [];
        const updatedActivities = activities.map(activity => {
          if (
            path(['_id'], activity) ===
            selectedActivities.find(
              selectedActivity => selectedActivity === activity._id,
            )
          ) {
            return {
              ...activity,
              selected: true,
            };
          } else {
            return activity;
          }
        });
        let floatingPointPart = (activities.length / 3) % 1;
        let integerPart = Math.floor(activities.length / 3);
        let ActivityHeight = integerPart * 44;
        let addHeight = floatingPointPart == 0 ? 0 : 44;
        let finalHeight = ActivityHeight + addHeight;
        setActivityHeight(finalHeight);
        setActivities(updatedActivities);

        getCategoriesAndValues();
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
    setTimeout(() => {
      setCanDraw(true);
    }, 1000);
  };

  const getCategoriesAndValues = async () => {
    try {
      let apiResponse = await dispatch(
        getApiCall(API_URLS.GET_CATEGORY_AND_VALUES),
      );

      if (path(['statusCode'], apiResponse) == STATUS_CODES.STATUS_OK) {
        let categoriesData: Array<OnBoardingCategoryType> =
          path(['data'], apiResponse) || [];
        const userSelectedList: Array<OnBoardingCategoryResponseType> =
          path(['category'], user) || [];

        const selectedList = categoriesData.map(item => {
          let selectedValueId = null;
          try {
            const selectedValue = userSelectedList.find(
              (uItem: any) =>
                path(['category_id'], uItem) === path(['_id'], item),
            );

            selectedValueId = path(['value_id'], selectedValue);
          } catch (e) {}

          return {
            category_id: item._id,
            value_id: selectedValueId,
          };
        });

        setSelectedOnboardingItemList(selectedList);
        setCategoriesAndValues(categoriesData);
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };

  const submitForm = async () => {
    let activityArr: Array<string> = [];
    activities.map(e => {
      if (e.selected) activityArr.push(e._id);
    });
    let params = {
      deviceToken: user.sessionId,
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
      profileImageUrl: imageUrl || '',
      boostr: toggle,
      bio: bio,
      wheelchair: yesWheelChair,
      currentPassword: currentPassword,
      newPassword: password,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      category: selectedOnboardingItemList,
    };

    try {
      let apiResponse = await dispatch(
        putApiCall(
          API_URLS.EDIT_PROFILE + user._id,
          params,
          props.navigation,
          submitForm,
        ),
      );

      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        showMessage(translate('modules.settings.profileUpdated'));
        setCurrentPassword('');
        setPassword('');
        setReEnteredPassword('');
        dispatch(
          addUser({
            ...store.getState().userReducer.user,
            nickname: nickName,
            dob: moment(moment(dob, 'DD/MM/YYYY'))
              .format('MM/DD/YYYY')
              .toString(),
            gender: gender,
            unitOFType: unitMeasureType,
            boostr: toggle,
            bio: bio,
            activities: activityArr,
            optSetting: [
              pushNotification
                ? {
                    name: 'pushnotification',
                    optionStatusTypes: optionStatusTypes.ON,
                  }
                : {
                    name: 'pushnotification',
                    optionStatusTypes: optionStatusTypes.OFF,
                  },
              emailNotification
                ? {
                    name: 'emailnotification',
                    optionStatusTypes: optionStatusTypes.ON,
                  }
                : {
                    name: 'emailnotification',
                    optionStatusTypes: optionStatusTypes.OFF,
                  },

              yesSend
                ? {
                    name: 'advertisment',
                    optionStatusTypes: optionStatusTypes.ON,
                  }
                : {
                    name: 'advertisment',
                    optionStatusTypes: optionStatusTypes.OFF,
                  },
              yesMake
                ? {
                    name: 'profileVisible',
                    optionStatusTypes: optionStatusTypes.ON,
                  }
                : {
                    name: 'profileVisible',
                    optionStatusTypes: optionStatusTypes.OFF,
                  },
            ],
            profilePic: imageUrl || '',
            category: selectedOnboardingItemList,
          }),
        );
      }
    } catch (e) {}
  };

  const deActivateAccount = async () => {
    try {
      let apiResponse = await dispatch(
        getApiCall(
          API_URLS.DEACTIVATE_ACCOUNT,
          props.navigation,
          deActivateAccount,
          true,
        ),
      );
      if (path(['statusCode'], apiResponse) == STATUS_CODES.STATUS_OK) {
        showMessage(translate('modules.auth.deactivated'));
        logoutUser(props.navigation);
      } else {
        defaultAlert(
          translate('modules.errorMessages.error'),
          path(['message'], apiResponse),
        );
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };

  var minimumDateForDob = new Date();
  minimumDateForDob.setFullYear(minimumDateForDob.getFullYear() - 13);

  let activityArr: Array<string> = [];
  activities.map(e => {
    if (e.selected) activityArr.push(e._id);
  });
  const onActivitySelect = (activityId: string) => {
    let updatedList = activities.map(item => {
      if (item._id == activityId) return {...item, selected: !item.selected};
      return item;
    });
    setActivities(updatedList);
  };

  const isSaveDisabled = () => {
    if (currentPassword == '' && password == '' && reEnteredPassword == '') {
      let toBeReturn =
        !isValidDate(dob, true) ||
        !isValidName(nickName, true) ||
        !activities ||
        activities.length <= 0 ||
        unitMeasureType === null ||
        (selectedOnboardingItemList.length > 0 &&
          selectedOnboardingItemList.find(
            (item: any) => item.value_id === null,
          ));
      !isValidDescription(bio, true) || bio.length > 120 || imageUrl === null;
      return toBeReturn;
    } else if (
      (currentPassword != '' && password != '') ||
      reEnteredPassword != ''
    ) {
      if (password === reEnteredPassword && password != '') {
        let checkPasswordStatus = password === reEnteredPassword;
        let toBeReturn =
          !isValidDate(dob, true) ||
          !isValidName(nickName, true) ||
          !activities ||
          activities.length <= 0 ||
          unitMeasureType === null ||
          (selectedOnboardingItemList.length > 0 &&
            selectedOnboardingItemList.find(
              (item: any) => item.value_id === null,
            ));
        !isValidDescription(bio, true) ||
          bio.length > 120 ||
          imageUrl === null ||
          !checkPasswordStatus ||
          !isValidPassword(currentPassword) ||
          !isValidPassword(password);

        return toBeReturn;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  return (
    <BoostrScreen
      title={translate('modules.settings.title')}
      navigation={props.navigation}
      headerType={useIsFocused() ? HeaderTypes.NORMAL_BACK : HeaderTypes.NONE}>
      <ScrollView style={styles.mainContainerStyle}>
        <View>
          <SectionTitle
            tx={'modules.settings.basicInformation'}
            style={styles.mainTitleContainerStyle}
          />

          <View style={styles.mainViewContainer}>
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
              topPlaceholderTextColor={color.textInputPlaceHolderText}
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
              topPlaceholderTextColor={color.textInputPlaceHolderText}
              onSetValue={text => setGender(text)}
              isRequired
            />
            <FormTextInput
              onChangeText={setNickName}
              topPlaceholderTx={'modules.auth.nickName'}
              topPlaceholderTextColor={color.textInputPlaceHolderText}
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
                style={[
                  styles.checkBoxTextStyle,
                  styles.profileQuestionFootNote,
                ]}
                tx={'modules.auth.onboarding2DescriptionWhichOf'}
              />
            </View>
            <View
              style={[
                [styles.activityContainerStyle, {height: activityHeight}],
              ]}>
              {activities.map((item, index) => {
                return (
                  <CheckBox
                    key={item._id}
                    style={[styles.activityCheckboxStyle]}
                    onClick={() => onActivitySelect(item._id)}
                    checkBoxColor={color.palette.white}
                    isChecked={item.selected}
                    rightText={item.name}
                    rightTextStyle={[
                      AppTextStyles[TextPresetStyles.FOOT_NOTE],
                      styles.activitiesCheckboxTextStyle,
                    ]}
                    unCheckedImage={
                      <View style={styles.checkUnSelectedStyles} />
                    }
                    checkedImage={
                      <Icon
                        icon={ICON_TYPES.TICK_2}
                        style={{
                          ...styles.checkSelectedStyles,
                          backgroundColor: getPrimaryColor(),
                        }}
                      />
                    }
                  />
                );
              })}
            </View>

            {canDraw ? (
              <View>
                <DefaultDropDownPicker
                  value={unitMeasureType}
                  isOpenPicker={unitMeasureOpener}
                  setIsOpenPicker={() => dropDownSet('unitMeasure')}
                  dropDownItems={preferredUnit}
                  topPlaceholderTx={'modules.auth.preferredUnit'}
                  topPlaceholderTextColor={color.textInputPlaceHolderText}
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
                  rightTextStyle={[AppTextStyles[TextPresetStyles.FOOT_NOTE]]}
                  unCheckedImage={<View style={styles.checkUnSelectedStyles} />}
                  checkedImage={
                    <View
                      style={{
                        ...styles.checkSelectedStyles,
                        backgroundColor: getPrimaryColor(),
                      }}>
                      <Icon
                        icon={ICON_TYPES.TICK}
                        style={styles.checkIconStyle}
                      />
                    </View>
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
                    rightTextStyle={[AppTextStyles[TextPresetStyles.FOOT_NOTE]]}
                    unCheckedImage={
                      <View style={styles.checkUnSelectedStyles} />
                    }
                    checkedImage={
                      <View
                        style={{
                          ...styles.checkSelectedStyles,
                          backgroundColor: getPrimaryColor(),
                        }}>
                        <Icon
                          icon={ICON_TYPES.TICK}
                          style={styles.checkIconStyle}
                        />
                      </View>
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
                    rightTextStyle={[AppTextStyles[TextPresetStyles.FOOT_NOTE]]}
                    unCheckedImage={
                      <View style={styles.checkUnSelectedStyles} />
                    }
                    checkedImage={
                      <View
                        style={{
                          ...styles.checkSelectedStyles,
                          backgroundColor: getPrimaryColor(),
                        }}>
                        <Icon
                          icon={ICON_TYPES.TICK}
                          style={styles.checkIconStyle}
                        />
                      </View>
                    }
                  />
                </View>
                <CheckBox
                  style={[
                    styles.checkboxStyle,
                    styles.onboarding2CheckboxStyle,
                  ]}
                  onClick={() => setYesSend(!yesSend)}
                  checkBoxColor={color.palette.white}
                  isChecked={yesSend}
                  rightText={translate('modules.settings.offersAndInformation')}
                  rightTextStyle={[AppTextStyles[TextPresetStyles.FOOT_NOTE]]}
                  unCheckedImage={<View style={styles.checkUnSelectedStyles} />}
                  checkedImage={
                    <View
                      style={{
                        ...styles.checkSelectedStyles,
                        backgroundColor: getPrimaryColor(),
                      }}>
                      <Icon
                        icon={ICON_TYPES.TICK}
                        style={styles.checkIconStyle}
                      />
                    </View>
                  }
                />
                <CheckBox
                  style={[
                    styles.checkboxStyle,
                    styles.onboarding2CheckboxStyle,
                  ]}
                  onClick={() => setYesMake(!yesMake)}
                  checkBoxColor={color.palette.white}
                  isChecked={yesMake}
                  rightText={translate('modules.settings.goalsVisible')}
                  rightTextStyle={[AppTextStyles[TextPresetStyles.FOOT_NOTE]]}
                  unCheckedImage={<View style={styles.checkUnSelectedStyles} />}
                  checkedImage={
                    <View
                      style={{
                        ...styles.checkSelectedStyles,
                        backgroundColor: getPrimaryColor(),
                      }}>
                      <Icon
                        icon={ICON_TYPES.TICK}
                        style={styles.checkIconStyle}
                      />
                    </View>
                  }
                />
                <CheckBox
                  style={[
                    styles.checkboxStyle,
                    styles.onboarding2CheckboxStyle,
                  ]}
                  onClick={() => setYesWheelChair(!yesWheelChair)}
                  checkBoxColor={color.palette.white}
                  isChecked={yesWheelChair}
                  rightText={translate('modules.settings.wheelChairUser')}
                  rightTextStyle={[AppTextStyles[TextPresetStyles.FOOT_NOTE]]}
                  unCheckedImage={<View style={styles.checkUnSelectedStyles} />}
                  checkedImage={
                    <View
                      style={{
                        ...styles.checkSelectedStyles,
                        backgroundColor: getPrimaryColor(),
                      }}>
                      <Icon
                        icon={ICON_TYPES.TICK}
                        style={styles.checkIconStyle}
                      />
                    </View>
                  }
                />

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
                    tx={toggle ? 'modules.auth.yes' : 'modules.myChallenges.no'}
                  />
                  <ToggleSwitch
                    isOn={toggle}
                    onColor={getPrimaryColor()}
                    offColor={color.palette.grey6}
                    onToggle={() => {
                      setToggle(!toggle);
                    }}
                  />
                </View>
              </View>
            ) : null}

            <OnBoardingCategories
              categoriesAndValues={categoriesAndValues}
              selectedItemList={selectedOnboardingItemList}
              setSelectedItemList={setSelectedOnboardingItemList}
              otherDropDownSet={dropDownSet}
              isOtherDropDownOpened={isOtherDropDownOpened}
              topPlaceholderTextColor={color.textInputPlaceHolderText}
            />
          </View>

          {canDraw && (
            <SectionTitle
              tx={'modules.settings.profile'}
              style={styles.mainTitleContainerStyle}
            />
          )}
        </View>

        {canDraw && (
          <View style={styles.mainViewContainer}>
            <FormTextInput
              onChangeText={setBio}
              topPlaceholderTx={'modules.settings.bio'}
              topPlaceholderTextColor={color.palette.grey9}
              preset={TextInputPreset.BIO}
              returnKeyType={TextInputReturnKeyType.DONE}
              checkValidation
              blurOnSubmit={true}
              value={bio}
            />
            <Text
              preset={TextPresetStyles.FOOT_NOTE_BOLD}
              style={styles.bioTextStyle}
              text={`${bio.length}${'/120'}`}
            />

            <UploadImage
              imageUrl={imageUrl}
              setImageUrl={url => setImageUrl(url)}
              setShowProgressBar={setShowProgressBar}
              textPreset={TextPresetStyles.TEXT_LABEL}
            />
          </View>
        )}
        {canDraw && (
          <SectionTitle
            tx={'modules.settings.resetPassword'}
            style={styles.mainTitleContainerStyle}
          />
        )}
        {canDraw && (
          <View style={styles.mainViewContainer}>
            <FormTextInput
              onChangeText={setCurrentPassword}
              topPlaceholderTx={'modules.settings.currentPassword'}
              topPlaceholderTextColor={color.textInputPlaceHolderText}
              preset={TextInputPreset.PASSWORD}
              returnKeyType={TextInputReturnKeyType.NEXT}
              checkValidation
            />

            <FormTextInput
              onChangeText={setPassword}
              topPlaceholderTx={'modules.settings.newPassword'}
              topPlaceholderTextColor={color.textInputPlaceHolderText}
              preset={TextInputPreset.PASSWORD}
              returnKeyType={TextInputReturnKeyType.NEXT}
              checkValidation
            />

            <FormTextInput
              onChangeText={setReEnteredPassword}
              topPlaceholderTx={'modules.settings.ReEnterPassword'}
              topPlaceholderTextColor={color.textInputPlaceHolderText}
              preset={TextInputPreset.PASSWORD}
              returnKeyType={TextInputReturnKeyType.DONE}
              inputError={
                password !== reEnteredPassword
                  ? translate('modules.errorMessages.notMatchingWithPassword')
                  : null
              }
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
                <Text
                  preset={TextPresetStyles.FOOT_NOTE_BOLD}
                  style={[
                    styles.declineButtonStyle,
                    {color: getPrimaryColor()},
                  ]}
                  tx={'common.cancel'}
                />
              </TouchableOpacity>
              <Button
                onPress={() => submitForm()}
                preset={ButtonPreset.MEDIUM}
                disabled={isSaveDisabled()}
                tx={'common.save'}
                style={styles.acceptButtonStyle}
              />
            </View>
            <View
              style={[styles.lineVew, {backgroundColor: getPrimaryColor()}]}
            />

            <TouchableOpacity onPress={() => deActivateAccount()}>
              <Text
                preset={TextPresetStyles.FOOT_NOTE_BOLD}
                style={styles.deActiveAccountText}
                tx={'modules.settings.deactivateAccount'}
              />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      {showProgressBar && <ProgressBar />}
    </BoostrScreen>
  );
};
