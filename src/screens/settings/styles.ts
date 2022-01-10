import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {color, spacingPresets} from '../../theme';
import {DEVICE_HEIGHT, DEVICE_WIDTH, isIos} from '../../utility';

import {BaseStyles} from '../../utility/base-styles';
import {hpx, wpx} from '../../utility/responsive';

const style = StyleSheet.create<{
  mainContainerStyle: ViewStyle;
  mainViewContainer: ViewStyle;
  mainTitleContainerStyle: ViewStyle;
  formInputStyle: ViewStyle;
  keyboardAwareViewStyle: ViewStyle;
  onboarding2Heading: ViewStyle;
  checkboxStyle: ViewStyle;
  onboarding2Description: ViewStyle;
  onboarding2ContainerStyle: ViewStyle;
  activitiesCheckboxTextStyle: ViewStyle;
  optInsView: TextStyle;
  onboarding2CheckboxStyle: ViewStyle;
  checkSelectedStyles: ImageStyle;
  checkUnSelectedStyles: ViewStyle;
  checkIconStyle: ImageStyle;
  checkBoxTextStyle: TextStyle;
  locationDescriptionStyle: TextStyle;
  onboarding2ToggleView: ViewStyle;
  nextButtonStyle: ViewStyle;
  activityContainerStyle: ViewStyle;
  profileQuestionFootNote: TextStyle;
  activityCheckboxStyle: ViewStyle;

  notificationInnerView: ViewStyle;
  bioTextStyle: TextStyle;
  uploadImageButtonView: ViewStyle;
  uploadedImageStyle: ImageStyle;

  uploadButtonView: ViewStyle;
  imageUploadTextStyle: ViewStyle;
  uploadSectionStyle: ViewStyle;
  uploadButtonStyle: ViewStyle;
  imagePreviewStyle: ImageStyle;
  crossIconContainerStyle: ImageStyle;
  crossIconStyle: ImageStyle;
  sendButtonStyle: ViewStyle;
  attachFileTextStyle: TextStyle;
  buttonContainer: ViewStyle;
  declineButtonStyle: TextStyle;
  acceptButtonStyle: ViewStyle;
  lineVew: ViewStyle;
  deActiveAccountText: TextStyle;
  dialogTextStyle: TextStyle;
}>({
  mainContainerStyle: {
    flex: 1,
    backgroundColor: color.palette.lightYellow,
  },
  mainViewContainer: {
    width: DEVICE_WIDTH * 0.91,
    alignSelf: 'center',
  },
  mainTitleContainerStyle: {
    marginTop: DEVICE_HEIGHT * 0.035,
    marginBottom: spacingPresets.small,
  },
  formInputStyle: {
    marginTop: DEVICE_HEIGHT * 0.01,
  },
  onboarding2Description: {
    width: DEVICE_WIDTH * 0.915,
  },
  checkBoxTextStyle: {
    color: color.textInputPlaceHolderText,
  },
  onboarding2ContainerStyle: {
    marginTop: DEVICE_HEIGHT * 0.036,
    alignSelf: 'center',
    alignItems: 'center',
  },

  keyboardAwareViewStyle: {
    paddingTop: DEVICE_HEIGHT * 0.01,
    paddingBottom: DEVICE_HEIGHT * 0.15,
  },

  onboarding2Heading: {
    marginTop: isIos ? DEVICE_HEIGHT * 0.06 : DEVICE_HEIGHT * 0.04,
  },

  checkboxStyle: {
    width: DEVICE_WIDTH * 0.3,
  },

  activitiesCheckboxTextStyle: {
    marginHorizontal: spacingPresets.tiny,
    fontSize: hpx(12),
  },

  optInsView: {
    width: DEVICE_WIDTH * 0.9,
    marginTop: DEVICE_HEIGHT * 0.023,
    color: color.textInputPlaceHolderText,
  },

  onboarding2CheckboxStyle: {
    width: DEVICE_WIDTH * 0.9,
    marginTop: DEVICE_HEIGHT * 0.023,
  },

  checkUnSelectedStyles: {
    backgroundColor: color.textLight,
    width: DEVICE_WIDTH * 0.053,
    height: DEVICE_WIDTH * 0.053,
    borderRadius: DEVICE_WIDTH * 0.0053,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
  },
  checkSelectedStyles: {
    width: DEVICE_WIDTH * 0.053,
    height: DEVICE_WIDTH * 0.053,
    borderRadius: DEVICE_WIDTH * 0.0053,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    tintColor: 'white',
  },
  checkIconStyle: {
    width: DEVICE_WIDTH * 0.03,
    height: DEVICE_WIDTH * 0.03,
    tintColor: color.textLight,
  },

  locationDescriptionStyle: {
    color: color.textInputPlaceHolderText,
    width: DEVICE_WIDTH * 0.915,
    marginTop: DEVICE_HEIGHT * 0.023,
    marginBottom: DEVICE_HEIGHT * 0.024,
  },

  onboarding2ToggleView: {
    flexDirection: 'row',
    width: DEVICE_WIDTH * 0.915,
    justifyContent: 'space-between',
  },

  nextButtonStyle: {
    marginTop: DEVICE_HEIGHT * 0.06,
  },

  activityContainerStyle: {
    flexDirection: 'row',
    marginTop: DEVICE_HEIGHT * 0.023,
    width: DEVICE_WIDTH * 0.915,
    flexWrap: 'wrap',
    alignItems: 'center',
  },

  profileQuestionFootNote: {
    marginTop: DEVICE_HEIGHT * 0.012,
  },
  uploadedImageStyle: {
    marginTop: DEVICE_HEIGHT * 0.023,
    height: DEVICE_HEIGHT * 0.25,
    width: DEVICE_WIDTH * 0.91,
    borderRadius: 10,
  },
  uploadButtonView: {
    height: DEVICE_HEIGHT * 0.059,
    width: DEVICE_WIDTH * 0.194,
    backgroundColor: color.palette.black,
    marginTop: DEVICE_HEIGHT * 0.023,
    alignSelf: 'flex-start',
  },
  imageUploadTextStyle: {
    color: color.textInputPlaceHolderText,
    marginTop: DEVICE_HEIGHT * 0.023,
  },
  uploadSectionStyle: {
    flexDirection: 'row',
    marginTop: DEVICE_HEIGHT * 0.024,
  },
  attachFileTextStyle: {
    marginTop: DEVICE_HEIGHT * 0.02,
    color: color.palette.grey9,
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
    position: 'absolute',
    right: -5,
    top: -5,
  },
  crossIconStyle: {
    tintColor: color.palette.white,
    backgroundColor: color.palette.black,
    width: DEVICE_WIDTH * 0.04,
    height: DEVICE_WIDTH * 0.04,
    borderRadius: DEVICE_WIDTH * 0.02,
  },

  sendButtonStyle: {
    marginVertical: 0,
    marginTop: DEVICE_HEIGHT * 0.06,
  },
  buttonContainer: {
    marginTop: DEVICE_HEIGHT * 0.035,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  declineButtonStyle: {
    marginRight: DEVICE_WIDTH * 0.2,
  },
  acceptButtonStyle: {
    marginVertical: 0,
    width: DEVICE_WIDTH * 0.41,
  },
  lineVew: {
    width: DEVICE_WIDTH * 0.91,
    height: 1,
    marginTop: hpx(32),
  },
  deActiveAccountText: {
    alignSelf: 'center',
    color: color.palette.darkRed,
    marginTop: hpx(32),
    marginBottom: hpx(52),
  },
  //default dialog style
  dialogTextStyle: {
    color: color.palette.lightblue,
    marginVertical: DEVICE_HEIGHT * 0.015,
  },

  activityCheckboxStyle: {
    width: DEVICE_WIDTH * 0.3,
    height: 44,
    alignSelf: 'baseline',
    justifyContent: 'center',
  },

  notificationInnerView: {
    marginLeft: wpx(26),
  },
  bioTextStyle: {
    color: color.textInputPlaceHolderText,
    textAlign: 'right',
  },
  uploadImageButtonView: {
    alignSelf: 'flex-start',
    paddingLeft: wpx(16),
  },
});

export const SettingScreenStyles = {...BaseStyles, ...style};
