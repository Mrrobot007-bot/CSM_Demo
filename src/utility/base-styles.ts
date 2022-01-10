import {
  TextStyle,
  ViewStyle,
  StyleSheet,
  Dimensions,
  ImageStyle,
} from 'react-native';
import {hpx} from './responsive';

import {color, spacingPresets} from '../theme';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export const BaseStyles = StyleSheet.create<{
  full: ViewStyle;
  rowStyle: ViewStyle;
  menuStyle: ImageStyle;
  boostrDummy: ViewStyle;
  shadowStyle: ViewStyle;
  menuBarStyle: ViewStyle;
  appButtonStyle: ViewStyle;
  noDataTextStyle: TextStyle;
  centerTextStyle: TextStyle;
  headerTitleStyle: ViewStyle;
  absoluteViewStyle: ViewStyle;
  defaultHeaderStyle: ViewStyle;
  textUnderLineStyle: TextStyle;
  secondaryHeaderStyle: ViewStyle;
  transparentHeaderStyle: ViewStyle;
  defaultKeyboardAwareStyle: ViewStyle;
}>({
  defaultHeaderStyle: {
    borderWidth: 0,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 0,
    shadowRadius: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
    backgroundColor: color.palette.white,
  },

  secondaryHeaderStyle: {
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
    backgroundColor: color.palette.white,
  },

  transparentHeaderStyle: {
    elevation: 0,
    borderBottomWidth: 0,
    backgroundColor: color.palette.transparent,
  },

  headerTitleStyle: {
    flex: 1,
    alignItems: 'center',
  },

  full: {
    flex: 1,
  },

  appButtonStyle: {
    alignSelf: 'center',
    position: 'absolute',
    width: DEVICE_WIDTH - DEVICE_WIDTH * 0.17,
    bottom: DEVICE_HEIGHT < 720 ? DEVICE_HEIGHT * 0.025 : DEVICE_HEIGHT * 0.05,
  },

  menuBarStyle: {
    paddingHorizontal: DEVICE_WIDTH * 0.042,
  },

  rowStyle: {
    flexDirection: 'row',
  },

  defaultKeyboardAwareStyle: {
    alignItems: 'center',
    paddingBottom: DEVICE_HEIGHT * 0.036,
  },

  textUnderLineStyle: {
    textDecorationLine: 'underline',
  },

  menuStyle: {
    width: DEVICE_WIDTH * 0.064,
    height: DEVICE_WIDTH * 0.064,
  },

  centerTextStyle: {
    textAlign: 'center',
  },

  absoluteViewStyle: {
    position: 'absolute',
  },

  noDataTextStyle: {
    textAlign: 'center',
    marginVertical: spacingPresets.mediumPlus,
    marginHorizontal: spacingPresets.mediumPlus,
  },

  boostrDummy: {
    width: 1,
    height: DEVICE_HEIGHT * 0.08,
  },

  shadowStyle: {
    elevation: 2,
    shadowRadius: 2,
    shadowOpacity: 0.2,
    marginBottom: hpx(16),
    shadowColor: color.palette.black,
    shadowOffset: {width: 0, height: 2},
    backgroundColor: color.palette.white,
  },
});
