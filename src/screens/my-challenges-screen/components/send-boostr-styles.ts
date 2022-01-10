import {StyleSheet, ViewStyle, TextStyle, ImageStyle} from 'react-native';

import {hpx} from '../../../utility/responsive';
import {color, spacingPresets} from '../../../theme';
import {BaseStyles} from '../../../utility/base-styles';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../../utility';

const style = StyleSheet.create<{
  minMumStyle: ViewStyle;
  crossIconStyle: ImageStyle;
  sendButtonStyle: ViewStyle;
  uploadButtonStyle: ViewStyle;
  mainContainerStyle: ViewStyle;
  uploadSectionStyle: ViewStyle;
  imagePreviewStyle: ImageStyle;
  attachFileTextStyle: TextStyle;
  crossIconContainerStyle: ImageStyle;
}>({
  mainContainerStyle: {
    paddingVertical: DEVICE_HEIGHT * 0.036,
    paddingHorizontal: DEVICE_WIDTH * 0.042,
  },
  uploadSectionStyle: {
    marginTop: hpx(12),
    marginBottom: hpx(8),
    flexDirection: 'row',
  },
  attachFileTextStyle: {
    color: color.palette.grey9,
    marginTop: DEVICE_HEIGHT * 0.02,
  },

  uploadButtonStyle: {
    marginVertical: 0,
    marginRight: spacingPresets.mediumPlus,
  },

  imagePreviewStyle: {
    width: 50,
    borderWidth: 1,
    alignSelf: 'flex-end',
  },

  crossIconContainerStyle: {
    top: -5,
    right: -5,
    position: 'absolute',
  },
  crossIconStyle: {
    width: DEVICE_WIDTH * 0.04,
    height: DEVICE_WIDTH * 0.04,
    tintColor: color.palette.white,
    borderRadius: DEVICE_WIDTH * 0.02,
    backgroundColor: color.palette.black,
  },

  sendButtonStyle: {
    marginVertical: 0,
    marginTop: DEVICE_HEIGHT * 0.06,
  },
  minMumStyle: {
    alignSelf: 'flex-end',
    color: color.palette.grey9,
  },
});
export const SendBoostrStyles = {...BaseStyles, ...style};
