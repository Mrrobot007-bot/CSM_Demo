import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {color, spacingPresets} from '../../theme';
import {BaseStyles} from '../../utility/base-styles';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utility';

const styles = StyleSheet.create<{
  titleTextStyle: TextStyle;
  headerContainerStyle: ViewStyle;
  mainHeaderImageStyle: ImageStyle;
  mainHeaderContainerStyle: ViewStyle;
  customTitleContainerStyle: ViewStyle;
  hideBackImageContainerStyle: ViewStyle;
  leftComponentContainerStyle: ViewStyle;
  rightComponentContainerStyle: ViewStyle;
  titleComponentContainerStyle: ViewStyle;
  mainDisableHeaderImageStyle: ImageStyle;
}>({
  titleTextStyle: {
    color: color.textSecondary,
    maxWidth: DEVICE_WIDTH * 0.43,
  },
  headerContainerStyle: {
    height: 32,
    width: DEVICE_WIDTH,
    alignItems: 'center',
    position: 'absolute',
    flexDirection: 'row',
    bottom: DEVICE_HEIGHT * 0.011,
    justifyContent: 'space-between',
    paddingHorizontal: DEVICE_WIDTH * 0.042,
  },
  mainHeaderImageStyle: {
    borderBottomLeftRadius: DEVICE_HEIGHT * 0.024,
    borderBottomRightRadius: DEVICE_HEIGHT * 0.024,
  },
  mainHeaderContainerStyle: {
    width: DEVICE_WIDTH,
  },
  customTitleContainerStyle: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: spacingPresets.mediumPlus - 2,
  },
  hideBackImageContainerStyle: {
    height: 1,
    bottom: 0,
    width: '91%',
    alignSelf: 'center',
    position: 'absolute',
  },
  leftComponentContainerStyle: {
    width: DEVICE_WIDTH * 0.25,
  },
  rightComponentContainerStyle: {
    alignItems: 'flex-end',
    width: DEVICE_WIDTH * 0.25,
  },
  titleComponentContainerStyle: {
    minWidth: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainDisableHeaderImageStyle: {},
});

export const HeaderStyles = {...BaseStyles, ...styles};
