import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {color} from '../../theme';
import {BaseStyles} from '../../utility/base-styles';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utility/constants';

const styles = StyleSheet.create<{
  iconStyle: ImageStyle;
  buttonStyle: ViewStyle;
  innerContainer: ViewStyle;
  errorTextStyle: TextStyle;
  centerTextStyle: TextStyle;
  webviewContainer: ViewStyle;
  mainContainerStyle: ViewStyle;
  iconContainerStyle: ViewStyle;
}>({
  iconStyle: {
    tintColor: color.palette.white,
    width: DEVICE_WIDTH * 0.106,
    height: DEVICE_WIDTH * 0.106,
  },
  buttonStyle: {
    marginVertical: 0,
    marginTop: DEVICE_HEIGHT * 0.14,
    marginBottom: DEVICE_HEIGHT * 0.036,
  },
  innerContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: color.palette.lightYellow,
  },
  errorTextStyle: {
    marginVertical: DEVICE_HEIGHT * 0.036,
  },
  centerTextStyle: {
    textAlign: 'center',
  },
  webviewContainer: {
    flex: 1,
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT
  },
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
});

export const WebViewStyles = {...BaseStyles, ...styles};
