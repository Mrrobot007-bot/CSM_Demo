import {StyleSheet, ImageStyle, ViewStyle, TextStyle} from 'react-native';

import {color} from '../../theme';
import {hpx, wpx} from '../../utility/responsive';
import {BaseStyles} from '../../utility/base-styles';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utility/constants';

const style = StyleSheet.create<{
  checkboxStyle: ViewStyle;
  checkBoxColor: ViewStyle;
  logoImageStyle: ImageStyle;
  checkBoxTextStyle: TextStyle;
  passwordValidation: TextStyle;
  checkBoxContainerStyle: ViewStyle;
  keyboardAwareViewStyle: ViewStyle;
  secondaryLabelTextStyle: TextStyle;
  createAccountButtonStyle: ViewStyle;
}>({
  logoImageStyle: {
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.32,
    marginTop: DEVICE_HEIGHT * 0.05,
    height: DEVICE_WIDTH * 0.32 * 0.275,
  },

  keyboardAwareViewStyle: {
    paddingTop: DEVICE_HEIGHT * 0.0344,
  },

  createAccountButtonStyle: {
    marginVertical: 0,
    marginTop: DEVICE_HEIGHT * 0.036,
    marginBottom: DEVICE_HEIGHT * 0.024,
  },

  secondaryLabelTextStyle: {
    marginVertical: 0,
    borderStyle: 'solid',
    color: color.palette.white,
  },

  checkBoxContainerStyle: {
    flexDirection: 'row',
    width: DEVICE_WIDTH * 0.915,
    marginTop: DEVICE_HEIGHT * 0.012,
  },

  checkboxStyle: {
    paddingRight: DEVICE_WIDTH * 0.021,
  },
  checkBoxColor: {
    color: color.palette.white,
  },

  checkBoxTextStyle: {
    flex: 1,
    flexDirection: 'row',
    color: color.textLight,
  },
  passwordValidation: {
    alignSelf: 'flex-start',
    marginTop: -hpx(4),
    paddingHorizontal: wpx(16),
  },
});

export const RegisterScreenStyles = {...BaseStyles, ...style};
