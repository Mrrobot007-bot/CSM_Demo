import {StyleSheet, ViewStyle, TextStyle, ImageStyle} from 'react-native';

import {color, spacingPresets} from '../../theme';
import {hpx, wpx} from '../../utility/responsive';
import {BaseStyles} from '../../utility/base-styles';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utility';

const style = StyleSheet.create<{
  lineVew: ViewStyle;
  minMumStyle: ViewStyle;
  archiveIcon: ImageStyle;
  archiveTextStyle: TextStyle;
  crossIconStyle: ImageStyle;
  sendButtonStyle: ViewStyle;
  tildeIconStyle: ImageStyle;
  cancelButtonStyle: ViewStyle;
  submitButtonStyle: ViewStyle;
  uploadButtonStyle: ViewStyle;
  imagePreviewStyle: ImageStyle;
  mainContainerStyle: ViewStyle;
  uploadSectionStyle: ViewStyle;
  attachFileTextStyle: TextStyle;
  buttonContainerStyle: ViewStyle;
  archiveTextContainer: ViewStyle;
  activityTextContainer: ViewStyle;
  crossIconContainerStyle: ImageStyle;
  archiveIconTextContainer: ViewStyle;
  textInputPlaceHolderStyle: TextStyle;
  activityTextContainerClosedTeam: ViewStyle;
}>({
  mainContainerStyle: {
    marginVertical: hpx(16),
    paddingHorizontal: DEVICE_WIDTH * 0.042,
  },
  uploadSectionStyle: {
    flexDirection: 'row',
    marginVertical: DEVICE_HEIGHT * 0.024,
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

  activityTextContainer: {
    marginTop: hpx(13),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  activityTextContainerClosedTeam: {
    marginTop: hpx(7),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  archiveTextContainer: {
    marginTop: hpx(13),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hpx(24),
    justifyContent: 'center',
  },

  textInputPlaceHolderStyle: {
    color: color.textInputPlaceHolderText,
  },

  tildeIconStyle: {
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.07,
    height: DEVICE_WIDTH * 0.07,
  },

  cancelButtonStyle: {
    margin: 0,
    backgroundColor: 'transparent',
  },

  submitButtonStyle: {
    margin: 0,
    height: wpx(56),
  },

  buttonContainerStyle: {
    flexDirection: 'row',
    marginTop: hpx(16),
    justifyContent: 'space-between',
  },
  lineVew: {
    height: 1,
    marginTop: hpx(12),
    width: DEVICE_WIDTH * 0.91,
  },
  archiveIcon: {
    width: wpx(20),
    height: hpx(20),
    marginRight: wpx(6),
  },
  archiveTextStyle: {
    marginRight: wpx(16),
  },
  archiveIconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  minMumStyle: {
    alignSelf: 'flex-end',
    color: color.palette.grey9,
  },
});
export const CreateTeamStyles = {...BaseStyles, ...style};
