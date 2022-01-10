import {path} from 'ramda';
import React, {useState} from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import {ImageBackground, View, TouchableOpacity, StatusBar} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  images,
  showMessage,
  defaultAlert,
  isValidEmail,
  SCREEN_ROUTES,
  isValidPassword,
  getPrimaryColor,
} from '../../utility';
import {color} from '../../theme';
import {translate} from '../../i18n';
import {
  TextInputPreset,
  TextInputReturnKeyType,
} from '../../components/form-text-input';
import {Icon} from '../../components/icon';
import {Text} from '../../components/text';
import {API_URLS} from '../../services/urls';
import {Button} from '../../components/button';
import {ButtonType} from '../../components/button';
import {STATUS_CODES} from '../../services/status-codes';
import {ProgressBar} from '../../components/progress-bar';
import {ICON_TYPES} from '../../components/icon/constants';
import {ForgotPasswordScreenStyles as styles} from './styles';
import {FormTextInput} from '../../components/form-text-input';
import {TextPresetStyles} from '../../components/text/constants';
import {postApiCall, putApiCall} from '../../services/api-services';

/**
 * An Interface for possible props for the ForgotPassword Screen
 */
interface IForgotPasswordScreenProps {
  /**
   * Prop used to provide the navigation stuff
   */
  navigation: any;
}

/**
 *
 * Type of screen, which can be switched as per requirement
 */
enum SCREEN_TYPE {
  SEND_EMAIL = 'sendEmail',
  SENT_EMAIL = 'sentEmail',
  UPDATE_PASSWORD = 'updatePassword',
}

/**
 *
 * A File used for 3 screens, i.e
 * Forgot password screen,
 * Email sent screen
 * Reset/Update password screen
 */

const OTP_TIME = 30;

/**
 *
 * ForgotPasswordScreen- used to provide the option to reset password
 */
export const ForgotPasswordScreen = (props: IForgotPasswordScreenProps) => {
  const dispatch = useDispatch();
  const apiReducer = useSelector((state: RootStateOrAny) => state.apiReducer);

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [screenType, setScreenType] = useState(SCREEN_TYPE.SEND_EMAIL);
  const [password, setPassword] = useState('');
  const [reEnteredPassword, setReEnteredPassword] = useState('');
  const reEnterPasswordRef = React.useRef();
  const [resetPasswordToken, setResetPasswordToken] = useState('');
  const [seconds, setSeconds] = React.useState(OTP_TIME);

  let interval: any;
  const startTimer = () => {
    interval = setInterval(() => {
      setSeconds(lastTimerCount => {
        lastTimerCount <= 1 && clearInterval(interval);
        return lastTimerCount - 1;
      });
    }, 1000);
  };

  React.useEffect(() => {
    return () => clearInterval(interval);
  }, []);

  const resetTimer = () => {
    setSeconds(OTP_TIME);
    clearInterval(interval);
    startTimer();
  };

  /**
   *
   * A method to get the screen icon as per selected screen type
   */
  const selectedIcon = () => {
    switch (screenType) {
      case SCREEN_TYPE.SEND_EMAIL:
        return ICON_TYPES.LOCK_QUESTION;

      case SCREEN_TYPE.SENT_EMAIL:
        return ICON_TYPES.EMAIL;

      case SCREEN_TYPE.UPDATE_PASSWORD:
        return ICON_TYPES.LOCK_PASS;
    }
  };

  /**
   *
   * A method to get the screen title as per selected screen type
   */
  const selectedTitleTx = () => {
    switch (screenType) {
      case SCREEN_TYPE.SEND_EMAIL:
        return 'modules.auth.forgotYourPassword';

      case SCREEN_TYPE.SENT_EMAIL:
        return 'modules.auth.checkYourEmail';

      case SCREEN_TYPE.UPDATE_PASSWORD:
        return 'modules.auth.createNewPassword';
    }
  };

  /**
   *
   * A method to get the screen title description as per selected screen type
   */
  const selectedDescriptionTx = () => {
    switch (screenType) {
      case SCREEN_TYPE.SEND_EMAIL:
        return 'modules.auth.forgotPasswordDescription';

      case SCREEN_TYPE.SENT_EMAIL:
        return 'modules.auth.checkYourEmailDescription';

      case SCREEN_TYPE.UPDATE_PASSWORD:
        return 'modules.auth.createNewPasswordDescription';
    }
  };

  /**
   *
   * A method to get the user input text components as per selected screen type
   */
  const selectedInputContent = () => {
    switch (screenType) {
      case SCREEN_TYPE.SEND_EMAIL:
        return (
          <View style={styles.emailInputStyle}>
            <FormTextInput
              onChangeText={setEmail}
              topPlaceholderTx={'modules.auth.workEmailAddress'}
              topPlaceholderTextColor={color.textLight}
              preset={TextInputPreset.EMAIL}
              returnKeyType={TextInputReturnKeyType.DONE}
              isRequired
              checkValidation
              onSubmitEditing={onForgotPasswordButtonClick}
            />
          </View>
        );

      case SCREEN_TYPE.SENT_EMAIL:
        return (
          <View style={styles.emailInputStyle}>
            <OTPInputView
              style={styles.otpContainerStyle}
              pinCount={4}
              onCodeChanged={setOtp}
              autoFocusOnLoad
              keyboardType={'default'}
              codeInputFieldStyle={styles.otpBoxStyle}
            />
            <TouchableOpacity
              onPress={resendOtp}
              disabled={seconds > 0}
              style={styles.resendOtpContainerStyle}>
              <Text
                preset={TextPresetStyles.BUTTON_1}
                style={
                  seconds > 0
                    ? styles.resendOtpNotActiveTextStyle
                    : styles.resendOtpActiveTextStyle
                }>
                {`${translate('common.resend')} ${
                  seconds > 0 ? `(${seconds})` : ''
                }`}
              </Text>
            </TouchableOpacity>
          </View>
        );

      case SCREEN_TYPE.UPDATE_PASSWORD:
        return (
          <View style={styles.emailInputStyle}>
            <FormTextInput
              onChangeText={setPassword}
              topPlaceholderTx={'modules.auth.newPassword'}
              topPlaceholderTextColor={color.textLight}
              preset={TextInputPreset.PASSWORD}
              returnKeyType={TextInputReturnKeyType.NEXT}
              isRequired
              checkValidation
              nextRef={reEnterPasswordRef}
            />

            <FormTextInput
              onChangeText={setReEnteredPassword}
              topPlaceholderTx={'modules.auth.reEnterPassword'}
              topPlaceholderTextColor={color.textLight}
              preset={TextInputPreset.PASSWORD}
              returnKeyType={TextInputReturnKeyType.DONE}
              isRequired
              inputError={
                password !== reEnteredPassword
                  ? translate('modules.errorMessages.notMatchingWithPassword')
                  : null
              }
              onSubmitEditing={onCreatePasswordClick}
              newRef={reEnterPasswordRef}
            />
          </View>
        );
    }
  };

  /**
   *
   * A method to get the action button as per selected screen type
   */
  const selectedButtonContent = () => {
    switch (screenType) {
      case SCREEN_TYPE.SEND_EMAIL:
        return (
          <Button
            tx={'common.send'}
            onPress={onForgotPasswordButtonClick}
            style={styles.sendButtonStyle}
            disabled={!isValidEmail(email, true)}
            type={ButtonType.SECONDARY}
          />
        );

      case SCREEN_TYPE.SENT_EMAIL:
        return (
          <Button
            tx={'modules.auth.validate'}
            onPress={onOtpSubmit}
            disabled={!otp || otp.length !== 4}
            style={styles.sendButtonStyle}
            type={ButtonType.SECONDARY}
          />
        );

      case SCREEN_TYPE.UPDATE_PASSWORD:
        return (
          <Button
            tx={'modules.auth.create'}
            onPress={onCreatePasswordClick}
            style={styles.sendButtonStyle}
            disabled={
              !isValidPassword(password, true) ||
              !isValidPassword(reEnteredPassword, true)
            }
            type={ButtonType.SECONDARY}
          />
        );
    }
  };

  /**
   *
   * Action on resendOtp
   */
  const resendOtp = async () => {
    const parameters = {email: email};
    const apiResponse = await dispatch(
      postApiCall(API_URLS.RESEND_OTP, parameters),
    );
    try {
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        showMessage(translate('modules.auth.otpSent'));
        resetTimer();
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

  /**
   *
   * Action on send password request click
   */
  const onForgotPasswordButtonClick = async () => {
    const parameters = {email: email};
    const apiResponse = await dispatch(
      postApiCall(API_URLS.FORGOT_PASSWORD, parameters),
    );

    try {
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        setScreenType(SCREEN_TYPE.SENT_EMAIL);
        startTimer();
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

  /**
   *
   * Action on ok click on email confirmation screen
   */
  const onOtpSubmit = async () => {
    const parameters = {
      email: email,
      otp: otp,
    };
    const apiResponse = await dispatch(
      postApiCall(API_URLS.VERIFY_OTP, parameters),
    );

    try {
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        setResetPasswordToken(path(['data'], apiResponse));
        setScreenType(SCREEN_TYPE.UPDATE_PASSWORD);
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

  /**
   *
   * Action on create password request, after new password provided by user
   */
  const onCreatePasswordClick = async () => {
    const parameters = {
      token_id: resetPasswordToken,
      password: password,
    };
    try {
      const apiResponse = await dispatch(
        putApiCall(
          API_URLS.RESET_PASSWORD,
          parameters,
          props.navigation,
          onCreatePasswordClick,
        ),
      );
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        showMessage(translate('modules.auth.passwordResetSuccessfully'));
        props.navigation.navigate(SCREEN_ROUTES.LOGIN_SCREEN);
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };

  return (
    <ImageBackground
      source={images.blueBackground}
      style={[styles.mainContainerStyle, {backgroundColor: getPrimaryColor()}]}>
      <StatusBar hidden />
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.defaultKeyboardAwareStyle]}>
        <View style={styles.screenIconContainerStyle}>
          <Icon
            icon={selectedIcon()}
            style={{
              ...styles.screenIconImageStyle,
              tintColor: getPrimaryColor(),
            }}
          />
        </View>
        <Text
          preset={TextPresetStyles.SMALL_TITLE}
          style={styles.titleTextStyle}
          tx={selectedTitleTx()}
        />
        <Text
          preset={TextPresetStyles.DESCRIPTION}
          style={styles.descriptionTextStyle}
          tx={selectedDescriptionTx()}
        />

        {selectedInputContent()}
        {selectedButtonContent()}

        {screenType === SCREEN_TYPE.SEND_EMAIL && (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate(SCREEN_ROUTES.LOGIN_SCREEN)
            }>
            <Text
              preset={TextPresetStyles.TEXT_LABEL}
              style={styles.secondaryLabelTextStyle}
              tx={'modules.auth.backToLogin'}
            />
          </TouchableOpacity>
        )}
      </KeyboardAwareScrollView>
      {apiReducer.loading && <ProgressBar />}
    </ImageBackground>
  );
};
