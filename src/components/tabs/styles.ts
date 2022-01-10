import {ImageStyle, StyleSheet, ViewStyle} from 'react-native';

import {color} from '../../theme';
import {spacingPresets} from '../../theme/spacing';
import {BaseStyles} from '../../utility/base-styles';
import {DEVICE_HEIGHT} from '../../utility/constants';

const styles = StyleSheet.create<{
  tabView: ViewStyle;
  barStyle: ViewStyle;
  iconStyle: ImageStyle;
  middleStyle: ImageStyle;
  androidExtraViewStyle: ViewStyle;
}>({
  tabView: {
    alignItems: 'center',
    top: DEVICE_HEIGHT * 0.02,
    height: DEVICE_HEIGHT * 0.084,
  },
  barStyle: {
    width: 45,
    height: 4,
    borderRadius: 2,
    marginTop: spacingPresets.small,
    backgroundColor: color.palette.lightYellow,
  },
  iconStyle: {
    width: DEVICE_HEIGHT * 0.0344,
    height: DEVICE_HEIGHT * 0.0344,
  },
  middleStyle: {
    elevation: 10,
    borderRadius: 100,
    alignSelf: 'center',
    position: 'absolute',
    width: DEVICE_HEIGHT * 0.084,
    height: DEVICE_HEIGHT * 0.084,
    bottom: DEVICE_HEIGHT * 0.04 * -1,
    backgroundColor: 'transparent',
  },

  androidExtraViewStyle: {
    position: 'absolute',
    height: DEVICE_HEIGHT * 0.084,
    width: DEVICE_HEIGHT * 0.084,
    borderRadius: DEVICE_HEIGHT * 0.084,
    bottom: DEVICE_HEIGHT * 0.04,
  },
});

export const TabsStyles = {...BaseStyles, ...styles};
