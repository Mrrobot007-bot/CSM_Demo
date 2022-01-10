import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {color} from '../../theme';
import {BaseStyles} from '../../utility/base-styles';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utility';

const styles = StyleSheet.create<{
  iconStyle: ImageStyle;
  buttonStyle: ViewStyle;
  errorTextStyle: TextStyle;
  mainContainerStyle: ViewStyle;
  iconContainerStyle: ViewStyle;
  backToHomeTextStyle: TextStyle;
}>({
  mainContainerStyle: {
    flex: 1,
    alignItems: 'center',
    paddingTop: DEVICE_HEIGHT * 0.18,
    marginTop: -DEVICE_HEIGHT * 0.024,
    paddingHorizontal: DEVICE_WIDTH * 0.106,
  },
  iconContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: DEVICE_WIDTH * 0.278,
    height: DEVICE_WIDTH * 0.278,
    borderRadius: DEVICE_WIDTH * 0.278,
  },
  iconStyle: {
    width: DEVICE_WIDTH * 0.106,
    height: DEVICE_WIDTH * 0.106,
    tintColor: color.palette.white,
  },
  errorTextStyle: {
    marginVertical: DEVICE_HEIGHT * 0.036,
  },
  buttonStyle: {
    marginVertical: 0,
    marginTop: DEVICE_HEIGHT * 0.14,
    marginBottom: DEVICE_HEIGHT * 0.036,
  },
  backToHomeTextStyle: {},
});

export const ErrorScreenStyles = {...BaseStyles, ...styles};
