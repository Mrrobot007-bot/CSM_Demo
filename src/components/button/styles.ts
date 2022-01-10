import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {color} from '../../theme';
import {wpx} from '../../utility/responsive';
import {BaseStyles} from '../../utility/base-styles';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utility/constants';

const largeButtonWidth = DEVICE_WIDTH * 0.915;
const mediumButtonWidth = DEVICE_WIDTH * 0.445;

const style = StyleSheet.create<{
  iconStyle: ImageStyle;
  buttonLarge: ViewStyle;
  buttonSmall: ViewStyle;
  buttonMedium: ViewStyle;
  buttonPrimary: ViewStyle;
  buttonDisabled: ViewStyle;
  buttonContainer: ViewStyle;
  buttonSecondary: ViewStyle;
  buttonExtraLarge: ViewStyle;
  buttonExtraSmall: ViewStyle;
  buttonTextDisabled: TextStyle;
  iconStyleDisabled: ImageStyle;
}>({
  buttonContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    justifyContent: 'center',
    marginVertical: DEVICE_HEIGHT * 0.024,
  },
  buttonPrimary: {},

  buttonSecondary: {
    backgroundColor: color.buttonBackgroundSecondary,
  },
  buttonDisabled: {
    backgroundColor: color.buttonBackgroundDisabled,
  },

  buttonExtraLarge: {
    height: wpx(56),
    width: largeButtonWidth,
    borderRadius: DEVICE_HEIGHT * 0.045,
  },

  buttonLarge: {
    height: wpx(56),
    width: largeButtonWidth,
    borderRadius: DEVICE_HEIGHT * 0.042,
  },

  buttonMedium: {
    height: wpx(40),
    width: mediumButtonWidth,
    borderRadius: DEVICE_HEIGHT * 0.03,
  },

  buttonSmall: {
    height: wpx(40),
    borderRadius: DEVICE_HEIGHT * 0.03,
    paddingHorizontal: DEVICE_WIDTH * 0.0426,
  },

  buttonExtraSmall: {
    height: wpx(40),
    borderRadius: DEVICE_HEIGHT * 0.03,
    paddingHorizontal: DEVICE_WIDTH * 0.03,
  },

  iconStyle: {
    tintColor: color.buttonText,
    width: DEVICE_WIDTH * 0.064,
    height: DEVICE_WIDTH * 0.064,
    marginHorizontal: DEVICE_WIDTH * 0.0213,
  },

  buttonTextDisabled: {
    color: color.buttonTextDisabled,
  },

  iconStyleDisabled: {
    width: DEVICE_WIDTH * 0.064,
    height: DEVICE_WIDTH * 0.064,
    tintColor: color.buttonTextDisabled,
    marginHorizontal: DEVICE_WIDTH * 0.0213,
  },
});

export const ButtonComponentStyles = {...BaseStyles, ...style};
