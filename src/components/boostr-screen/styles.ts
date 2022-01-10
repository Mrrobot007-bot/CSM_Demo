import {ImageStyle, StyleSheet, ViewStyle} from 'react-native';

import {DEVICE_WIDTH} from '../../utility';
import {hpx} from '../../utility/responsive';
import {color, spacingPresets} from '../../theme';
import {BaseStyles} from '../../utility/base-styles';

const styles = StyleSheet.create<{
  headerLogoStyle: ImageStyle;
  mainContainerStyle: ViewStyle;
  drawerContainerStyle: ViewStyle;
  trackerContainerStyle: ViewStyle;
  rightIconContainerStyle: ViewStyle;
  leftIconContainerStyle: ImageStyle;
  rightComponentIconStyle: ImageStyle;
  headerRightContainerStyle: ImageStyle;
}>({
  headerLogoStyle: {
    width: DEVICE_WIDTH * 0.226,
    height: DEVICE_WIDTH * 0.226 * 0.275,
    tintColor: color.palette.lightYellow,
  },
  mainContainerStyle: {
    flex: 1,
    backgroundColor: color.palette.lightYellow,
    paddingVertical: hpx(spacingPresets.medium),
  },
  drawerContainerStyle: {
    position: 'absolute',
  },
  trackerContainerStyle: {
    bottom: 0,
    width: DEVICE_WIDTH,
    position: 'absolute',
  },

  rightIconContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  leftIconContainerStyle: {
    width: DEVICE_WIDTH * 0.064,
    height: DEVICE_WIDTH * 0.064,
  },

  rightComponentIconStyle: {
    width: DEVICE_WIDTH * 0.048,
    height: DEVICE_WIDTH * 0.048,
    marginRight: DEVICE_WIDTH * 0.01,
    tintColor: color.palette.lightYellow,
  },

  headerRightContainerStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    resizeMode: 'contain',
    width: DEVICE_WIDTH * 0.155,
    marginRight: DEVICE_WIDTH * 0.01,
    height: DEVICE_WIDTH * 0.155 * 0.56,
    tintColor: color.palette.lightYellow,
  },
});

export const BoostScreenStyles = {...BaseStyles, ...styles};
