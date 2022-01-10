import {RFValue} from 'react-native-responsive-fontsize';
import {StyleSheet, ViewStyle, ImageStyle} from 'react-native';

import {color} from '../../theme';
import {hpx} from '../../utility/responsive';
import {BaseStyles} from '../../utility/base-styles';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utility/constants';

const width = DEVICE_WIDTH * 0.915;
const iconSize = RFValue(24, DEVICE_HEIGHT);

const styles = StyleSheet.create<{
  inputStyle: ViewStyle;
  wrapperStyle: ViewStyle;
  leftIconStyle: ImageStyle;
  infoIconStyle: ImageStyle;
  rightIconStyle: ImageStyle;
  searchInputStyle: ViewStyle;
  inputContainerStyle: ViewStyle;
  labelContainerStyle: ViewStyle;
  descriptionInputStyle: ViewStyle;
  leftIconContainerStyle: ViewStyle;
}>({
  inputStyle: {
    justifyContent: 'center',
    width: width - iconSize - DEVICE_WIDTH * 0.064,
  },
  wrapperStyle: {
    width,
    paddingVertical: DEVICE_HEIGHT * 0.012,
  },
  leftIconStyle: {
    width: iconSize,
    height: iconSize,
    marginRight: DEVICE_WIDTH * 0.021,
  },
  infoIconStyle: {
    width: DEVICE_WIDTH * 0.064,
    height: DEVICE_WIDTH * 0.064,
  },
  rightIconStyle: {
    width: iconSize,
    height: iconSize,
    tintColor: color.palette.grey9,
    marginLeft: DEVICE_WIDTH * 0.021,
  },
  searchInputStyle: {
    width: width - iconSize * 2 - DEVICE_WIDTH * 0.085,
  },
  inputContainerStyle: {
    height: hpx(40),
    flexDirection: 'row',
    alignItems: 'center',
    padding: DEVICE_HEIGHT * 0.012,
    justifyContent: 'space-between',
    borderRadius: DEVICE_HEIGHT * 0.0075,
    backgroundColor: color.textInputBackground,
  },
  labelContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  descriptionInputStyle: {
    width: '100%',
  },
  leftIconContainerStyle: {
    alignItems: 'center',
  },
});

export const FormTextInputStyle = {...BaseStyles, ...styles};
