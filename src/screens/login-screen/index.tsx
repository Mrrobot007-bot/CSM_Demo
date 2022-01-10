import {
  View,
  Image,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {path} from 'ramda';
import CheckBox from 'react-native-check-box';
import React, {useState, useEffect} from 'react';
import {StackActions} from '@react-navigation/native';
import DefaultPreference from 'react-native-default-preference';
import {useSelector, useDispatch, RootStateOrAny} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {color} from '../../theme';
import {
  FormTextInput,
  TextInputPreset,
  TextInputReturnKeyType,
} from '../../components/form-text-input';
import {Icon} from '../../components/icon';
import {API_URLS} from '../../services/urls';
import {Button} from '../../components/button';
import {translate} from '../../i18n/translate';
import {LoginScreenStyles as styles} from './styles';
import {postApiCall} from '../../services/api-services';
import {STATUS_CODES} from '../../services/status-codes';
import {addUser} from '../../redux/actions/user-actions';
import StorageHandler from '../../utility/storage-helper';
import {ProgressBar} from '../../components/progress-bar';
import {ICON_TYPES} from '../../components/icon/constants';
import PushNotification from 'react-native-push-notification';
import {DefaultDialog} from '../../components/default-dialog';
import AsyncStorage from '@react-native-community/async-storage';
import {SwitchOrganizationDialog} from './switch-organization-dialog';
import {LoginDataResponse} from '../../utility/object-types/auth-response';
import {AppTextStyles, Text, TextPresetStyles} from '../../components/text';
import {DefaultPreferenceKeys, SCREEN_ROUTES} from '../../utility/constants';
import {images, defaultAlert, isValidEmail, isValidText} from '../../utility';

/**
 * An Interface for possible props for the Login Screen
 */
interface ILoginScreenProps {
  /**
   * Navigation prop used to set the navigation stuff in the
   * component like, go back, move to other screen, etc.
   */
  navigation: any;
}

/**
 * LoginScreen - A screen to validate the user
 */
export const LoginScreen = (props: ILoginScreenProps) => {
  const dispatch = useDispatch();
  const passwordRef = React.useRef();
  const [
    isVisibleSwitchOrganizationDialog,
    setIsVisibleSwitchOrganizationDialog,
  ] = useState(false);
  const [password, setPassword] = useState('');
  const [deviceToken, setDeviceToken] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [organizations, setOrganizations] = useState([]);
  const [isLogInRemember, setIsLogInRemember] = useState(false);
  const [loginData, setLoginData] = useState<LoginDataResponse>(null);
  const [showDeactivatedDialog, setShowDeactivatedDialog] = useState(false);
  const apiReducer = useSelector((state: RootStateOrAny) => state.apiReducer);

  /**
   *function to load the initial data for login
   */
  useEffect(() => {
    updateSates();
    createChannels();
    getDeviceToken();
  }, []);

  const getDeviceToken = async () => {
    try {
      let fcm = await AsyncStorage.getItem(DefaultPreferenceKeys.DEVICE_TOKEN);
      if (fcm) {
        setDeviceToken(fcm);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * creating channels for push notification
   */
  const createChannels = () => {
    PushNotification.createChannel(
      {
        channelId: 'csm-channel',
        channelName: 'CSM Channel',
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  };

  /**
   * update the email and password
   */
  const updateSates = async () => {
    DefaultPreference.get(DefaultPreferenceKeys.EMAIL_ADDRESS).then(value => {
      setEmailAddress(value);
      if (value !== null || value !== '') {
        setIsLogInRemember(true);
      }
    });

    DefaultPreference.get(DefaultPreferenceKeys.PASSWORD).then(value => {
      setPassword(value);
    });

    DefaultPreference.set(
      DefaultPreferenceKeys.LOGOUT_CLICK_PERMISSION,
      'false',
    );
  };

  /**
   * function for login
   */
  const onLoginClick = async () => {
    DefaultPreference.get(DefaultPreferenceKeys.DEVICE_TOKEN).then(
      async value => {
        if (isLogInRemember) {
          // save the login credentials for future use
          DefaultPreference.set(
            DefaultPreferenceKeys.EMAIL_ADDRESS,
            emailAddress,
          );
          DefaultPreference.set(DefaultPreferenceKeys.PASSWORD, password);
        } else {
          DefaultPreference.set(DefaultPreferenceKeys.EMAIL_ADDRESS, null);
          DefaultPreference.set(DefaultPreferenceKeys.PASSWORD, null);
        }
        let parameters = {
          email: emailAddress,
          password: password,
          deviceToken: deviceToken,
        };

        const apiResponse = await dispatch(
          postApiCall(API_URLS.LOGIN, parameters),
        );
        try {
          if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
            let data: LoginDataResponse = path(['data'], apiResponse);
            console.log('login_data_1', JSON.stringify(data));
            if (data.organisationId.length > 1) {
              setOrganizations(data.organisationId);
              setIsVisibleSwitchOrganizationDialog(true);
              setLoginData({...data});
            } else {
              setOrganizations([]);
              setLoginData(null);
              setIsVisibleSwitchOrganizationDialog(false);
              if (data.onboarding) {
                dispatch(addUser(data));
                StorageHandler.clearAll();
              } else {
                dispatch(addUser(data));
                props.navigation.navigate(SCREEN_ROUTES.ONBOARDING_SCREEN, {
                  data: data,
                });
              }
            }
          } else if (
            path(['statusCode'], apiResponse) === STATUS_CODES.NO_CONTENT
          ) {
            setShowDeactivatedDialog(true);
          } else {
            defaultAlert(
              translate('modules.errorMessages.error'),
              path(['message'], apiResponse),
            );
          }
        } catch (e) {
          defaultAlert(translate('modules.errorMessages.error'), e.message);
        }
      },
    );
  };

  const isLoginDisabled =
    !isValidEmail(emailAddress, true) || !isValidText(password, true);

  return (
    <View style={styles.full}>
      <StatusBar hidden />
      <ImageBackground style={styles.full} source={images.loginBackground}>
        <Image style={styles.logoImageStyle} source={images.appLogo} />
        <KeyboardAwareScrollView
          enableResetScrollToCoords={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.defaultKeyboardAwareStyle,
            styles.keyboardAwareViewStyle,
          ]}>
          <FormTextInput
            onChangeText={setEmailAddress}
            topPlaceholderTx={'modules.auth.workEmailAddress'}
            topPlaceholderTextColor={color.textLight}
            preset={TextInputPreset.EMAIL}
            returnKeyType={TextInputReturnKeyType.NEXT}
            value={emailAddress}
            nextRef={passwordRef}
          />
          <View>
            <FormTextInput
              onChangeText={setPassword}
              topPlaceholderTx={'modules.auth.password'}
              topPlaceholderTextColor={color.textLight}
              preset={TextInputPreset.PASSWORD}
              returnKeyType={TextInputReturnKeyType.DONE}
              onSubmitEditing={onLoginClick}
              value={password}
              newRef={passwordRef}
            />

            <View style={styles.passwordTailContainerStyle}>
              <CheckBox
                style={styles.checkboxStyle}
                onClick={() => setIsLogInRemember(!isLogInRemember)}
                checkBoxColor={color.palette.white}
                isChecked={isLogInRemember}
                rightText={translate('modules.auth.rememberLogIn')}
                rightTextStyle={[
                  AppTextStyles[TextPresetStyles.FOOT_NOTE_BOLD],
                  styles.secondaryLabelTextStyle,
                ]}
                unCheckedImage={<View style={styles.unCheckedImageView} />}
                checkedImage={
                  <View style={styles.checkedImageView}>
                    <Icon
                      icon={ICON_TYPES.TICK}
                      style={styles.checkBoxIconStyle}
                    />
                  </View>
                }
              />
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate(
                    SCREEN_ROUTES.FORGOT_PASSWORD_SCREEN,
                  )
                }>
                <Text
                  preset={TextPresetStyles.FOOT_NOTE_BOLD}
                  style={styles.secondaryLabelTextStyle}
                  tx={'modules.auth.forgotPassword'}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Button
            tx={'modules.auth.logIn'}
            onPress={onLoginClick}
            disabled={isLoginDisabled}
            style={styles.logInButtonStyle}
          />

          <TouchableOpacity
            onPress={() =>
              props.navigation.dispatch(
                StackActions.replace(SCREEN_ROUTES.REGISTER_SCREEN),
              )
            }>
            <Text
              preset={TextPresetStyles.TEXT_LABEL}
              style={styles.secondaryLabelTextStyle}
              tx={'modules.auth.createNewAccount'}
            />
          </TouchableOpacity>

          <DefaultDialog
            isVisible={showDeactivatedDialog}
            hideDialog={() => setShowDeactivatedDialog(false)}
            header={translate('modules.auth.accountDeactivatedHeader')}
            description={translate('modules.auth.accountDeactivated')}
            button1Text={translate('modules.auth.reActivate')}
            button2Text={translate('common.cancel')}
            onButton1Click={() =>
              props.navigation.navigate(SCREEN_ROUTES.REACTIVATE_SCREEN)
            }
            onButton2Click={() => setShowDeactivatedDialog(false)}
            twoButtons
          />
        </KeyboardAwareScrollView>
      </ImageBackground>
      <SwitchOrganizationDialog
        navigation={props.navigation}
        isVisible={isVisibleSwitchOrganizationDialog}
        hideDialog={() => setIsVisibleSwitchOrganizationDialog(false)}
        organizations={organizations}
        loginData={loginData}
      />
      {apiReducer.loading && <ProgressBar />}
    </View>
  );
};
