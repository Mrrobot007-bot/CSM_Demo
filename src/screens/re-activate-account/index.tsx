import {path} from 'ramda';
import React, {useState, useEffect} from 'react';
import DefaultPreference from 'react-native-default-preference';
import {View, ImageBackground, Image, StatusBar} from 'react-native';
import {useSelector, useDispatch, RootStateOrAny} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  images,
  showMessage,
  isValidEmail,
  defaultAlert,
  SCREEN_ROUTES,
  getPrimaryColor,
  isValidPassword,
} from '../../utility';
import {color} from '../../theme';
import {translate} from '../../i18n';
import {
  FormTextInput,
  TextInputPreset,
  TextInputReturnKeyType,
} from '../../components/form-text-input';
import {API_URLS} from '../../services/urls';
import {Button} from '../../components/button';
import {ButtonType} from '../../components/button';
import {LoginScreenStyles as styles} from './styles';
import {StackActions} from '@react-navigation/routers';
import {postApiCall} from '../../services/api-services';
import {STATUS_CODES} from '../../services/status-codes';
import {ProgressBar} from '../../components/progress-bar';
import {DefaultPreferenceKeys} from '../../utility/constants';

/**
 * An Interface for possible props for the ReactivateAccount Screen
 */
interface IReactivateAccountScreenProps {
  /**
   * Navigation prop used to set the navigation stuff in the
   * component like, go back, move to other screen, etc.
   */
  navigation: any;
}

/**
 * ReactivateAccountScreen - A screen used to reactivate the deactivated account
 */
export const ReactivateAccountScreen = (
  props: IReactivateAccountScreenProps,
) => {
  const dispatch = useDispatch();
  const passwordRef = React.useRef();
  const [password, setPassword] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const apiReducer = useSelector((state: RootStateOrAny) => state.apiReducer);

  useEffect(() => {
    updateSates();
  }, []);

  const updateSates = async () => {
    DefaultPreference.set(
      DefaultPreferenceKeys.LOGOUT_CLICK_PERMISSION,
      'false',
    );
  };

  const onReactivateClick = async () => {
    let parameters = {
      email: emailAddress,
      password: password,
      deviceToken: '',
    };

    const apiResponse = await dispatch(
      postApiCall(API_URLS.ACTIVATE_ACCOUNT, parameters),
    );
    try {
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        showMessage(translate('modules.auth.reactivated'));
        props.navigation.dispatch(
          StackActions.replace(SCREEN_ROUTES.LOGIN_SCREEN),
        );
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

  const isReactivateDisabled =
    !isValidEmail(emailAddress, true) || !isValidPassword(password, true);

  return (
    <View style={styles.full}>
      <StatusBar hidden />
      <ImageBackground
        style={[
          styles.mainContainerStyle,
          {backgroundColor: getPrimaryColor()},
        ]}
        source={images.blueBackground}>
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
              onSubmitEditing={onReactivateClick}
              value={password}
              newRef={passwordRef}
            />
          </View>
          <Button
            tx={'modules.auth.reActivate'}
            onPress={onReactivateClick}
            disabled={isReactivateDisabled}
            style={styles.logInButtonStyle}
            type={ButtonType.SECONDARY}
          />
        </KeyboardAwareScrollView>
        {apiReducer.loading && <ProgressBar />}
      </ImageBackground>
    </View>
  );
};
