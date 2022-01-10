import {StyleSheet, ImageStyle, ViewStyle} from 'react-native';

import {color} from '../../theme';
import {hpx, wpx} from '../../utility/responsive';
import {BaseStyles} from '../../utility/base-styles';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utility/constants';

const styles = StyleSheet.create<{
  modalStyle: ViewStyle;
  longLineStyle: ViewStyle;
  blueTextStyle: ViewStyle;
  dashViewStyle: ViewStyle;
  safeAreaStyle: ViewStyle;
  blackTextStyle: ViewStyle;
  drawerItemStyle: ViewStyle;
  crossIconViewStyle: ImageStyle;
  headerContainerStyle: ViewStyle;
  marginLineBelowStyle: ViewStyle;
}>({
  headerContainerStyle: {
    height: hpx(50),
    alignSelf: 'center',
    flexDirection: 'row',
     alignItems: 'center',
    width: DEVICE_WIDTH * 0.91,
    justifyContent:'space-between',
  },

  crossIconViewStyle: {
    width: DEVICE_WIDTH * 0.064,
    height: DEVICE_WIDTH * 0.064,
  },
  blackTextStyle: {
    color: color.palette.black,
  },
  blueTextStyle: {},
  longLineStyle: {
    height: 2,
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.91,
  },
  marginLineBelowStyle: {
    marginTop: DEVICE_HEIGHT * 0.024,
  },
  drawerItemStyle: {
    alignSelf: 'center',
    marginTop: DEVICE_HEIGHT * 0.036,
  },
  dashViewStyle: {
    height: 1,
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.128,
    marginTop: DEVICE_HEIGHT * 0.036,
  },

  safeAreaStyle: {
    backgroundColor: color.palette.lightYellow_50,
  },

  modalStyle: {
    margin: 0,
    backgroundColor: color.palette.lightYellow_50,
  },
});

export const menuScreenStyles = {...BaseStyles, ...styles};
