import {ImageStyle, StyleSheet, ViewStyle} from 'react-native';

import {spacingPresets} from '../../theme';
import {hpx} from '../../utility/responsive';
import {BaseStyles} from '../../utility/base-styles';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utility/constants';

const width = DEVICE_WIDTH * 0.915;

const styles = StyleSheet.create<{
  wrapperStyle: ViewStyle;
  dropDownStyle: ViewStyle;
  infoIconStyle: ImageStyle;
  arrowIconStyle: ImageStyle;
  labelContainerStyle: ViewStyle;
  dropDownContainerStyle: ViewStyle;
}>({
  wrapperStyle: {
    width,
    paddingVertical: DEVICE_HEIGHT * 0.012,
  },
  dropDownStyle: {
    borderWidth: 0,
    height: hpx(40),
  },
  infoIconStyle: {
    width: DEVICE_WIDTH * 0.064,
    height: DEVICE_WIDTH * 0.064,
  },
  arrowIconStyle: {
    width: DEVICE_WIDTH * 0.064,
    height: DEVICE_WIDTH * 0.064,
  },
  labelContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: spacingPresets.tiny,
  },
  dropDownContainerStyle: {
    height: 40,
  },
});

export const DropDownStyles = {...BaseStyles, ...styles};
