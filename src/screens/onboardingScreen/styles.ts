import {StyleSheet, ImageStyle, ViewStyle, TextStyle} from 'react-native';

import {wpx} from '../../utility/responsive';
import {color, spacingPresets} from '../../theme';
import {BaseStyles} from '../../utility/base-styles';
import {DEVICE_HEIGHT, DEVICE_WIDTH, isIos} from '../../utility/constants';

const style = StyleSheet.create<{
  // Main page style
  sliderDotStyle: ViewStyle;
  formInputStyle: ViewStyle;
  sliderLabelStyle: TextStyle;
  sliderLabelTextRight: TextStyle;
  sliderDotActiveStyle: ViewStyle;
  sliderLabelContainerStyle: ViewStyle;
  sliderPaginationContainerStyle: ViewStyle;

  // common onboarding style
  onboarding1InnerView: ViewStyle;
  secondaryLabelTextStyle: TextStyle;

  // onboarding-1 style
  logoImageStyle: ImageStyle;
  onboarding1WorkNeverFeltText: TextStyle;
  onBoarding1CompanyLogoStyle: ImageStyle;
  onboarding1DescriptionTextStyle: TextStyle;

  // onboarding-2 style
  optInsView: TextStyle;
  bioTextStyle: TextStyle;
  checkboxStyle: ViewStyle;
  nextButtonStyle: ViewStyle;
  crossIconStyle: ImageStyle;
  checkIconStyle: ImageStyle;
  uploadButtonView: ViewStyle;
  checkBoxTextStyle: TextStyle;
  checkboxTextStyle: ViewStyle;
  uploadButtonStyle: ViewStyle;
  uploadSectionStyle: ViewStyle;
  imagePreviewStyle: ImageStyle;
  onboarding2Heading: ViewStyle;
  uploadedImageStyle: ImageStyle;
  checkSelectedStyles: ImageStyle;
  imageUploadTextStyle: ViewStyle;
  uploadImageButtonView: ViewStyle;
  activityCheckboxStyle: ViewStyle;
  checkUnSelectedStyles: ViewStyle;
  onboarding2ToggleView: ViewStyle;
  notificationInnerView: ViewStyle;
  onboarding2Description: ViewStyle;
  keyboardAwareViewStyle: ViewStyle;
  activityContainerStyle: ViewStyle;
  profileQuestionFootNote: TextStyle;
  locationDescriptionStyle: TextStyle;
  crossIconContainerStyle: ImageStyle;
  onboarding2CheckboxStyle: ViewStyle;
  onboarding2ContainerStyle: ViewStyle;

  // onboarding-3 style
  onboarding3IconStyle: ImageStyle;
  dotViewStyle: ViewStyle;
  onboarding3InnerViewStyle: ViewStyle;
  onboarding3descriptionTextStyle: TextStyle;
  onboarding3DescriptionTextMainViewStyle: ViewStyle;
  onboarding3DescriptionTextMiddleViewStyle: ViewStyle;

  // onboarding-4 style
  onboarding4TitleStyle: TextStyle;
  onboarding4ScreenshotStyle: ImageStyle;
  onboarding5ScreenshotStyle: ImageStyle;
  onboarding4DescriptionStyle: TextStyle;
  onboarding5DescriptionStyle: TextStyle;
  onboarding4DescriptionTextMainView: ViewStyle;

  // onboarding-5 style
  letsGoButtonStyleButtonStyle: ViewStyle;

  //default dialog style
  dialogTextStyle: TextStyle;
}>({
  // Main page style
  sliderPaginationContainerStyle: {
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: DEVICE_WIDTH,
    bottom: DEVICE_HEIGHT * 0.036,
    paddingHorizontal: DEVICE_WIDTH * 0.042,
    height: DEVICE_HEIGHT * 0.03,
  },

  sliderDotStyle: {
    marginHorizontal: 5,
    width: DEVICE_WIDTH * 0.016,
    height: DEVICE_WIDTH * 0.016,
    borderRadius: DEVICE_WIDTH * 0.008,
    backgroundColor: color.palette.grey,
  },

  sliderDotActiveStyle: {
    width: DEVICE_WIDTH * 0.016,
    height: DEVICE_WIDTH * 0.016,
    marginHorizontal: 5,
    borderRadius: DEVICE_WIDTH * 0.008,
    backgroundColor: color.palette.lightYellow,
  },

  sliderLabelStyle: {
    color: color.textSecondary,
  },

  sliderLabelContainerStyle: {
    width: DEVICE_WIDTH * 0.25,
  },

  sliderLabelTextRight: {
    textAlign: 'right',
  },
  formInputStyle: {
    marginTop: DEVICE_HEIGHT * 0.01,
  },

  onboarding1InnerView: {
    flex: 1,
    alignItems: 'center',
    paddingTop: DEVICE_HEIGHT * 0.157,
  },

  secondaryLabelTextStyle: {
    color: color.textSecondary,
  },

  // onboarding-1 style
  logoImageStyle: {
    width: DEVICE_WIDTH * 0.53,
    alignSelf: 'center',
    marginTop: DEVICE_HEIGHT * 0.024,
    height: DEVICE_WIDTH * 0.53 * 0.275,
  },

  onboarding1DescriptionTextStyle: {
    textAlign: 'center',
    color: color.textSecondary,
    marginTop: DEVICE_HEIGHT * 0.084,
    paddingHorizontal: DEVICE_HEIGHT * 0.04,
  },

  onboarding1WorkNeverFeltText: {
    marginTop: DEVICE_HEIGHT * 0.04,
  },

  onBoarding1CompanyLogoStyle: {
    alignSelf: 'center',
    position: 'absolute',
    resizeMode: 'contain',
    width: DEVICE_WIDTH * 0.32,
    bottom: DEVICE_HEIGHT * 0.12,
    height: DEVICE_WIDTH * 0.32 * 0.56,
    tintColor: color.palette.lightYellow,
  },

  // onboarding-2 style
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

  onboarding2ContainerStyle: {
    marginTop: DEVICE_HEIGHT * 0.036,
    alignSelf: 'center',
    alignItems: 'center',
  },

  checkboxTextStyle: {
    color: color.textLight,
    marginHorizontal: spacingPresets.tiny,
  },

  onboarding2Description: {
    width: DEVICE_WIDTH * 0.915,
  },

  optInsView: {
    color: color.textLight,
    width: DEVICE_WIDTH * 0.9,
    marginTop: DEVICE_HEIGHT * 0.023,
  },

  onboarding2CheckboxStyle: {
    width: DEVICE_WIDTH * 0.9,
    marginTop: DEVICE_HEIGHT * 0.023,
  },

  checkSelectedStyles: {
    tintColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: DEVICE_WIDTH * 0.053,
    height: DEVICE_WIDTH * 0.053,
    backgroundColor: color.palette.black,
  },

  checkUnSelectedStyles: {
    alignItems: 'center',
    justifyContent: 'center',
    width: DEVICE_WIDTH * 0.053,
    height: DEVICE_WIDTH * 0.053,
    backgroundColor: color.textLight,
    borderRadius: DEVICE_WIDTH * 0.0053,
  },

  checkIconStyle: {
    width: DEVICE_WIDTH * 0.03,
    height: DEVICE_WIDTH * 0.03,
  },

  checkBoxTextStyle: {
    color: color.textLight,
  },

  locationDescriptionStyle: {
    color: color.textLight,
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
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
    width: DEVICE_WIDTH * 0.915,
    marginTop: DEVICE_HEIGHT * 0.023,
  },
  uploadedImageStyle: {
    borderRadius: 10,
    width: DEVICE_WIDTH * 0.91,
    height: DEVICE_HEIGHT * 0.25,
    marginTop: DEVICE_HEIGHT * 0.023,
  },
  uploadButtonView: {
    alignSelf: 'flex-start',
    width: DEVICE_WIDTH * 0.194,
    height: DEVICE_HEIGHT * 0.059,
    marginTop: DEVICE_HEIGHT * 0.023,
    backgroundColor: color.palette.black,
  },
  imageUploadTextStyle: {
    color: color.textLight,
    marginTop: DEVICE_HEIGHT * 0.023,
  },
  uploadSectionStyle: {
    flexDirection: 'row',
    marginTop: DEVICE_HEIGHT * 0.024,
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
  profileQuestionFootNote: {
    marginTop: DEVICE_HEIGHT * 0.012,
  },
  notificationInnerView: {
    marginLeft: wpx(26),
  },
  bioTextStyle: {
    color: color.textLight,
    alignSelf: 'flex-end',
    paddingRight: wpx(15),
  },
  uploadImageButtonView: {
    paddingLeft: wpx(16),
    alignSelf: 'flex-start',
  },

  // onboarding-3 style
  onboarding3IconStyle: {
    borderWidth: 2,
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.64,
    height: DEVICE_WIDTH * 0.64,
    marginTop: DEVICE_HEIGHT * 0.132,
    borderColor: color.palette.white,
    borderRadius: DEVICE_WIDTH * 0.32,
  },

  onboarding3InnerViewStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: DEVICE_HEIGHT * 0.06,
  },

  onboarding3DescriptionTextMainViewStyle: {
    marginTop: DEVICE_HEIGHT * 0.036,
  },
  dotViewStyle: {
    width: 5,
    height: 5,
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor: 'white',
    marginBottom: spacingPresets.tiny,
    marginRight: spacingPresets.smaller,
  },
  onboarding3DescriptionTextMiddleViewStyle: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  onboarding3descriptionTextStyle: {
    marginBottom: spacingPresets.tiny,
  },

  // onboarding-4 style
  onboarding4ScreenshotStyle: {
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.83,
    height: DEVICE_WIDTH * 0.83 * 1.028,
  },

  onboarding5ScreenshotStyle: {
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.83,
    height: DEVICE_WIDTH * 0.83 * 1.028,
  },

  onboarding4TitleStyle: {
    alignSelf: 'center',
    marginTop: spacingPresets.mediumPlus,
  },

  onboarding4DescriptionTextMainView: {
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.915,
    marginTop: spacingPresets.small,
  },

  onboarding4DescriptionStyle: {
    textAlign: 'center',
    paddingHorizontal: DEVICE_WIDTH * 0.08,
  },

  onboarding5DescriptionStyle: {
    textAlign: 'center',
    marginBottom: spacingPresets.medium,
    paddingHorizontal: DEVICE_WIDTH * 0.08,
  },

  // onboarding-5 style
  letsGoButtonStyleButtonStyle: {
    position: 'absolute',
    bottom: spacingPresets.huge,
  },

  //default dialog style
  dialogTextStyle: {
    color: color.palette.lightblue,
    marginVertical: DEVICE_HEIGHT * 0.015,
  },

  activityCheckboxStyle: {
    height: 44,
    alignSelf: 'baseline',
    justifyContent: 'center',
    width: DEVICE_WIDTH * 0.3,
  },
});

export const OnboardingScreenStyles = {...BaseStyles, ...style};
