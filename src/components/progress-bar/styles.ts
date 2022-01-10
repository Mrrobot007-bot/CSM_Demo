import {StyleSheet, ViewStyle} from 'react-native';

import {color} from '../../theme';
import {BaseStyles} from '../../utility/base-styles';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utility';

const styles = StyleSheet.create<{
  defaultStyle: ViewStyle;
  csDefaultStyle: ViewStyle;
  loaderBlockStyle: ViewStyle;
  loaderUnBlockStyle: ViewStyle;
  csLoaderBlockStyle: ViewStyle;
  progressBarContainer: ViewStyle;
  csLoaderUnBlockStyle: ViewStyle;
  csProgressBarContainer: ViewStyle;
}>({
  defaultStyle: {
    zIndex: 1,
    bottom: 200,
    alignSelf: 'center',
    position: 'absolute',
    width: DEVICE_WIDTH * 0.15,
    height: DEVICE_WIDTH * 0.15,
  },
  csDefaultStyle: {
    zIndex: 1,
    bottom: '20%',
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.3,
    height: DEVICE_WIDTH * 0.3,
  },
  loaderBlockStyle: {
    zIndex: 10,
    position: 'absolute',
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
  },
  loaderUnBlockStyle: {
    width: 50,
    zIndex: 10,
    height: 50,
    alignSelf: 'center',
    position: 'absolute',
    bottom: DEVICE_HEIGHT < 720 ? DEVICE_HEIGHT * 0.2 : DEVICE_HEIGHT * 0.15,
  },
  csLoaderBlockStyle: {
    zIndex: 10,
    width: DEVICE_WIDTH,
  },
  progressBarContainer: {
    flex: 1,
    position: 'absolute',
    width: DEVICE_WIDTH,
    alignItems: 'center',
    height: DEVICE_HEIGHT,
    justifyContent: 'center',
    backgroundColor: color.overlayBlack,
  },
  csLoaderUnBlockStyle: {
    width: 50,
    zIndex: 10,
    height: 50,
    alignSelf: 'center',
    bottom: DEVICE_HEIGHT < 720 ? DEVICE_HEIGHT * 0.2 : DEVICE_HEIGHT * 0.15,
  },
  csProgressBarContainer: {
    flex: 1,
    zIndex: 10,
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const ProgressBarStyle = {...BaseStyles, ...styles};
