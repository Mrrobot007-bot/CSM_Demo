import {
  View,
  Image,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {path} from 'ramda';
import CheckBox from 'react-native-check-box';
import React, {useEffect, useState} from 'react';
import {StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  images,
  isValidName,
  isValidEmail,
  defaultAlert,
  SCREEN_ROUTES,
  isValidPassword,
  DefaultPreferenceKeys,
} from '../../utility';
import {color} from '../../theme';
import {
  FormTextInput,
  TextInputPreset,
  TextInputReturnKeyType,
} from '../../components/form-text-input';
import {API_URLS} from '../../services/urls';
import {Button} from '../../components/button';
import {translate} from '../../i18n/translate';
import {RegisterScreenStyles as styles} from './styles';
import {postApiCall} from '../../services/api-services';
import {ProgressBar} from '../../components/progress-bar';
import {STATUS_CODES} from '../../services/status-codes';
import {addUser} from '../../redux/actions/user-actions';
import DefaultPreference from 'react-native-default-preference';
import {DefaultDialog} from '../../components/default-dialog';
import {AppTextStyles, Text, TextPresetStyles} from '../../components/text';

/**
 * An Interface for possible props for the Register Screen
 */
interface IRegisterScreenProps {
  /**
   * Navigation prop used to set the navigation stuff in the
   * component like, go back, move to other screen, etc.
   */
  navigation: any;
}

/**
 * RegisterScreen - A screen used to provide a view to register the user details
 */
const RegisterScreen = (props: IRegisterScreenProps) => {
  const lastNameRef = React.useRef();
  const passwordRef = React.useRef();
  const firstNameRef = React.useRef();
  const reEnterPasswordRef = React.useRef();
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState(null);
  const [emailAddress, setEmailAddress] = useState(null);
  const [passwordError, setPasswordError] = useState('');
  const [deviceToken, setDeviceToken] = useState<any>('');
  const [passwordStatus, setPasswordStatus] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(true);
  const [reEnteredPassword, setReEnteredPassword] = useState('');
  const [showDeactivatedDialog, setShowDeactivatedDialog] = useState(false);

  const isCreateAccountDisabled =
    !isValidEmail(emailAddress, true) ||
    !isValidName(firstName, true) ||
    !isValidName(lastName, true) ||
    !isValidPassword(password, true) ||
    !isValidPassword(reEnteredPassword, true) ||
    password !== reEnteredPassword ||
    !passwordStatus ||
    !isTermsAccepted;

  const dispatch = useDispatch();
  const apiReducer = useSelector((state: RootStateOrAny) => state.apiReducer);
  /**
   * function to load device token
   */
  useEffect(() => {
    getDeviceToken();
  }, []);

  /**
   * function for getting device token
   */
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
   *
   * Action on send create account request click after all the required details provided by user
   */
  const onCreateAccountClick = async () => {
    if (!isCreateAccountDisabled) {
      DefaultPreference.get(DefaultPreferenceKeys.DEVICE_TOKEN).then(
        async value => {
          // if (value) {
          try {
            const parameters = {
              email: emailAddress,
              password: password,
              firstName: firstName,
              lastName: lastName,
              deviceToken: deviceToken,
            };

            const apiResponse = await dispatch(
              postApiCall(API_URLS.REGISTER, parameters),
            );

            if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
              const responseData: Object = path(['data'], apiResponse);
              const LoginData: any = {
                ...responseData,
                organisationId: [path(['organisationId'], responseData)] || [],
              };
              dispatch(addUser(LoginData));
              props.navigation.dispatch(
                StackActions.replace(SCREEN_ROUTES.ONBOARDING_SCREEN, {
                  data: LoginData,
                }),
              );
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
    }
  };

  /**
   * password handling function
   * @param txt
   */
  const passwordHandler = (txt: string) => {
    let passwordRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
    );
    setPassword(txt);
    if (txt === '') {
      setPasswordStatus(false);
      setPasswordError('modules.auth.pleaseEnterPassword');
    } else if (!passwordRegex.test(txt)) {
      setPasswordStatus(false);
      setPasswordError('modules.auth.passwordValidation');
    } else {
      setPassword(txt);
      setPasswordStatus(true);
      setPasswordError('');
    }
  };

  return (
    <ImageBackground style={styles.full} source={images.registerBackground}>
      <StatusBar hidden />
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
          isRequired
          checkValidation
          nextRef={firstNameRef}
        />

        <FormTextInput
          onChangeText={setFirstName}
          topPlaceholderTx={'modules.auth.firstName'}
          topPlaceholderTextColor={color.textLight}
          preset={TextInputPreset.NAME}
          returnKeyType={TextInputReturnKeyType.NEXT}
          isRequired
          checkValidation
          newRef={firstNameRef}
          nextRef={lastNameRef}
        />

        <FormTextInput
          onChangeText={setLastName}
          topPlaceholderTx={'modules.auth.lastName'}
          topPlaceholderTextColor={color.textLight}
          preset={TextInputPreset.NAME}
          returnKeyType={TextInputReturnKeyType.NEXT}
          isRequired
          checkValidation
          newRef={lastNameRef}
          nextRef={passwordRef}
        />

        <FormTextInput
          onChangeText={passwordHandler}
          topPlaceholderTx={'modules.auth.password'}
          topPlaceholderTextColor={color.textLight}
          preset={TextInputPreset.PASSWORD}
          returnKeyType={TextInputReturnKeyType.NEXT}
          isRequired
          newRef={passwordRef}
          nextRef={reEnterPasswordRef}
        />
        {passwordError !== '' ? (
          <Text
            preset={TextPresetStyles.TEXT_ERROR}
            style={styles.passwordValidation}
            text={translate(passwordError)}
          />
        ) : null}

        <FormTextInput
          onChangeText={setReEnteredPassword}
          topPlaceholderTx={'modules.auth.reEnterPassword'}
          topPlaceholderTextColor={color.textLight}
          preset={TextInputPreset.PASSWORD}
          returnKeyType={TextInputReturnKeyType.DONE}
          isRequired
          onSubmitEditing={onCreateAccountClick}
          newRef={reEnterPasswordRef}
        />
        {password !== reEnteredPassword ? (
          <Text
            preset={TextPresetStyles.TEXT_ERROR}
            style={styles.passwordValidation}
            tx={'modules.errorMessages.notMatchingWithPassword'}
          />
        ) : null}

        <View style={styles.checkBoxContainerStyle}>
          <CheckBox
            style={styles.checkboxStyle}
            onClick={() => setIsTermsAccepted(!isTermsAccepted)}
            checkBoxColor={color.palette.white}
            isChecked={isTermsAccepted}
            rightTextStyle={[
              AppTextStyles[TextPresetStyles.TEXT_LABEL],
              styles.secondaryLabelTextStyle,
            ]}
          />
          <Text
            onPress={() => setIsTermsAccepted(!isTermsAccepted)}
            preset={TextPresetStyles.FOOT_NOTE_HEAVY}
            style={styles.checkBoxTextStyle}>
            {`${translate('modules.auth.registerTermsTextPart1')}`}{' '}
            <Text
              style={styles.textUnderLineStyle}
              onPress={() =>
                props.navigation.navigate(SCREEN_ROUTES.TERMS_CONDITION_SCREEN)
              }>
              {`${translate('modules.auth.registerTermsTextPart2')}`}{' '}
            </Text>
            {`${translate('modules.auth.registerTermsTextPart3')}`}{' '}
            <Text
              style={styles.textUnderLineStyle}
              onPress={() =>
                props.navigation.navigate(SCREEN_ROUTES.PRIVACY_POLICY_SCREEN)
              }>
              {`${translate('modules.auth.registerTermsTextPart4')}`}{' '}
            </Text>
          </Text>
        </View>

        <Button
          tx={'modules.auth.createAccount'}
          onPress={onCreateAccountClick}
          disabled={isCreateAccountDisabled}
          style={styles.createAccountButtonStyle}
        />

        <TouchableOpacity
          onPress={() =>
            props.navigation.dispatch(
              StackActions.replace(SCREEN_ROUTES.LOGIN_SCREEN),
            )
          }>
          <Text
            preset={TextPresetStyles.TEXT_LABEL}
            style={styles.secondaryLabelTextStyle}
            tx={'modules.auth.alreadyHaveAccount'}
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

      {apiReducer.loading && <ProgressBar />}
    </ImageBackground>
  );
};

export {RegisterScreen};
