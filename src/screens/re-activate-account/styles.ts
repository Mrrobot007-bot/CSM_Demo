import {StyleSheet, ImageStyle, ViewStyle, TextStyle} from 'react-native';

import {color} from '../../theme';
import {BaseStyles} from '../../utility/base-styles';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utility/constants';

const style = StyleSheet.create<{
  checkboxStyle: ViewStyle;
  checkBoxColor: ViewStyle;
  rememberMeView: ViewStyle;
  logoImageStyle: ImageStyle;
  logInButtonStyle: ViewStyle;
  checkedImageView: ViewStyle;
  mainContainerStyle: ViewStyle;
  unCheckedImageView: ViewStyle;
  checkBoxIconStyle: ImageStyle;
  keyboardAwareViewStyle: ViewStyle;
  secondaryLabelTextStyle: TextStyle;
  passwordTailContainerStyle: ViewStyle;
}>({
  mainContainerStyle: {
    flex: 1,
    alignItems: 'center',
  },

  logoImageStyle: {
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.426,
    marginTop: DEVICE_HEIGHT * 0.15,
    height: DEVICE_WIDTH * 0.426 * 0.275,
  },

  keyboardAwareViewStyle: {
    paddingTop: DEVICE_HEIGHT * 0.11,
  },
  passwordTailContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  logInButtonStyle: {
    marginVertical: 0,
    marginTop: DEVICE_HEIGHT * 0.1,
    marginBottom: DEVICE_HEIGHT * 0.024,
  },

  secondaryLabelTextStyle: {
    marginVertical: 0,
    borderStyle: 'solid',
    color: color.palette.white,
  },
  rememberMeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkboxStyle: {
    width: DEVICE_WIDTH * 0.45,
  },
  checkBoxColor: {
    color: color.palette.white,
  },
  unCheckedImageView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: DEVICE_WIDTH * 0.053,
    height: DEVICE_WIDTH * 0.053,
    backgroundColor: color.textLight,
    borderRadius: DEVICE_WIDTH * 0.0053,
  },
  checkedImageView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: DEVICE_WIDTH * 0.053,
    height: DEVICE_WIDTH * 0.053,
    backgroundColor: color.textLight,
    borderRadius: DEVICE_WIDTH * 0.0053,
  },
  checkBoxIconStyle: {
    width: DEVICE_WIDTH * 0.03,
    height: DEVICE_WIDTH * 0.03,
  },
});

export const LoginScreenStyles = {...BaseStyles, ...style};
