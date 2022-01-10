import {StyleSheet, ImageStyle, ViewStyle, TextStyle} from 'react-native';

import {color, spacingPresets} from '../../../theme';
import {hpx, wpx} from '../../../utility/responsive';
import {BaseStyles} from '../../../utility/base-styles';
import {RFValue} from 'react-native-responsive-fontsize';
import {SendBoostrStyles} from '../components/send-boostr-styles';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../../utility/constants';

const iconSize = RFValue(24, DEVICE_HEIGHT);

const style = StyleSheet.create<{
  dotStyle: ViewStyle;
  mapViewStyle: ViewStyle;
  mainContainer: ViewStyle;
  leftIconStyle: ImageStyle;
  titleContainer: ViewStyle;
  mapOverlayStyle: ViewStyle;
  noDataViewStyle: ViewStyle;
  tildeIconStyle: ImageStyle;
  uploadButtonView: ViewStyle;
  inviteSearchView: ViewStyle;
  removeIconStyle: ImageStyle;
  imageSliderStyle: ImageStyle;
  cancelButtonStyle: ViewStyle;
  carouselContainer: ViewStyle;
  chooseOwnTextStyle: ViewStyle;
  selectedInviteView: ViewStyle;
  inviteListMainView: ViewStyle;
  inputContainerStyle: ViewStyle;
  inviteUserViewStyle: ViewStyle;
  uploadedImageStyle: ImageStyle;
  activityPickerStyle: ViewStyle;
  descriptionTextView: ViewStyle;
  inviteUserImageView: ImageStyle;
  inviteUserEmailStyle: TextStyle;
  imageUploadTextStyle: ViewStyle;
  descriptionInnerView: ViewStyle;
  activeImageContainer: ViewStyle;
  activityTextContainer: ViewStyle;
  updateModeButtonStyle: ViewStyle;
  selectDistanceDotStyle: ViewStyle;
  ActivityTextHeadingView: ViewStyle;
  inviteListViewContainer: ViewStyle;
  ActivityTextDistanceView: ViewStyle;
  descriptionViewContainer: ViewStyle;
  selectedDistanceRow2Style: ViewStyle;
  selectedDistanceItemStyle: ViewStyle;
  textInputPlaceHolderStyle: ViewStyle;
  selectedInviteListFlatView: ViewStyle;
  locationTextContainerStyle: ViewStyle;
  selectedDistanceIconStyle: ImageStyle;
  secondaryDistanceItemStyle: ViewStyle;
  activityPickerDropdownStyle: ViewStyle;
  selectedInviteListViewContainer: ViewStyle;
  selectDistanceDotContainerStyle: ViewStyle;
  selectedDistanceItemImageStyle: ImageStyle;
  keyboardAwareScrollViewContainer: ViewStyle;
  selectedDistanceSelectionOverlay: ViewStyle;
  selectedDistanceTextItemContainer: ViewStyle;
  selectedDistanceTextItemImageContainer: ImageStyle;
}>({
  keyboardAwareScrollViewContainer: {
    paddingTop: DEVICE_HEIGHT * 0.01,
    paddingBottom: DEVICE_HEIGHT * 0.05,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: DEVICE_HEIGHT * 0.03,
    paddingRight: DEVICE_WIDTH * 0.05,
  },
  tildeIconStyle: {
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.07,
    height: DEVICE_WIDTH * 0.07,
  },
  mainContainer: {
    paddingHorizontal: DEVICE_WIDTH * 0.042,
  },
  descriptionViewContainer: {
    borderRadius: 25,
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.91,
    marginTop: DEVICE_HEIGHT * 0.023,
    paddingTop: DEVICE_HEIGHT * 0.011,
    paddingBottom: DEVICE_HEIGHT * 0.023,
    paddingHorizontal: DEVICE_WIDTH * 0.042,
  },
  activityTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: DEVICE_HEIGHT * 0.023,
  },
  carouselContainer: {
    bottom: -DEVICE_HEIGHT * 0.02,
  },
  activeImageContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    width: DEVICE_WIDTH * 0.44,
    height: DEVICE_WIDTH * 0.44,
    marginTop: DEVICE_HEIGHT * 0.0127,
    marginHorizontal: DEVICE_WIDTH * 0.016,
  },
  ActivityTextHeadingView: {
    flexWrap: 'wrap',
    color: color.palette.white,
    paddingBottom: DEVICE_HEIGHT * 0.01,
    paddingHorizontal: DEVICE_WIDTH * 0.04,
  },
  ActivityTextDistanceView: {
    flexWrap: 'wrap',
    color: color.palette.white,
    paddingBottom: DEVICE_HEIGHT * 0.023,
    paddingHorizontal: DEVICE_WIDTH * 0.04,
  },
  activityPickerStyle: {
    marginTop: DEVICE_HEIGHT * 0.04,
  },

  activityPickerDropdownStyle: {
    borderWidth: 1,
    borderColor: color.palette.grey6,
  },
  textInputPlaceHolderStyle: {
    color: color.textInputPlaceHolderText,
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
    marginTop: DEVICE_HEIGHT * 0.023,
    color: color.textInputPlaceHolderText,
  },
  descriptionInnerView: {
    flexDirection: 'row',
    marginTop: DEVICE_HEIGHT * 0.011,
  },
  dotStyle: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginTop: DEVICE_HEIGHT * 0.005,
    marginRight: DEVICE_WIDTH * 0.032,
  },
  descriptionTextView: {
    width: DEVICE_WIDTH * 0.798,
  },

  selectedDistanceItemStyle: {
    width: DEVICE_WIDTH * 0.44,
    height: DEVICE_WIDTH * 0.44,
  },
  selectedDistanceItemImageStyle: {
    borderRadius: 16,
  },

  secondaryDistanceItemStyle: {
    marginRight: 5,
    marginLeft: DEVICE_WIDTH * 0.03,
  },

  selectedDistanceRow2Style: {
    flexDirection: 'row',
    marginTop: DEVICE_WIDTH * 0.03,
  },

  selectedDistanceTextItemContainer: {
    bottom: 0,
    width: '100%',
    height: '50%',
    position: 'absolute',
    justifyContent: 'flex-end',
  },
  selectedDistanceTextItemImageContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },

  selectedDistanceSelectionOverlay: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    position: 'absolute',
  },

  selectedDistanceIconStyle: {
    alignSelf: 'flex-end',
    width: DEVICE_WIDTH * 0.064,
    height: DEVICE_WIDTH * 0.064,
    margin: spacingPresets.smaller,
    tintColor: color.palette.white,
  },

  selectDistanceDotStyle: {
    width: DEVICE_WIDTH * 0.016,
    height: DEVICE_WIDTH * 0.016,
    marginTop: DEVICE_HEIGHT * 0.024,
    borderRadius: DEVICE_WIDTH * 0.016,
    marginHorizontal: DEVICE_WIDTH * 0.021,
  },
  selectDistanceDotContainerStyle: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  chooseOwnTextStyle: {
    marginTop: DEVICE_HEIGHT * 0.023,
  },
  inviteListViewContainer: {
    maxHeight: hpx(150),
    backgroundColor: color.palette.white,
  },
  inviteSearchView: {
    width: '100%',
    paddingVertical: 0,
    paddingTop: hpx(12),
  },
  selectedInviteListFlatView: {
    marginTop: hpx(8),
    maxHeight: DEVICE_HEIGHT * 0.35,
  },
  inviteListMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hpx(8),
  },
  inviteUserImageView: {
    marginLeft: wpx(16),
    width: DEVICE_WIDTH * 0.07,
    height: DEVICE_WIDTH * 0.07,
    borderRadius: DEVICE_WIDTH * 0.07,
  },
  inviteUserViewStyle: {
    flexWrap: 'wrap',
    paddingLeft: wpx(8),
    flexDirection: 'row',
  },

  noDataViewStyle: {
    flex: 1,
    alignItems: 'center',
  },
  inviteUserEmailStyle: {
    color: color.textInputLabel,
  },
  selectedInviteListViewContainer: {
    marginTop: 5,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hpx(8),
    justifyContent: 'space-between',
  },
  selectedInviteView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeIconStyle: {
    width: wpx(20),
    height: wpx(20),
    marginRight: wpx(10),
  },

  cancelButtonStyle: {
    marginVertical: 0,
    backgroundColor: 'transparent',
    width: DEVICE_WIDTH * 0.915 * 0.5 - DEVICE_WIDTH * 0.0426,
  },

  updateModeButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftIconStyle: {
    width: iconSize,
    height: iconSize,
    marginLeft: DEVICE_WIDTH * 0.02,
    marginTop: DEVICE_WIDTH * 0.015,
    tintColor: color.textInputPlaceHolderText,
  },
  inputContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: DEVICE_HEIGHT * 0.005,
    borderRadius: DEVICE_HEIGHT * 0.0075,
    backgroundColor: color.textInputBackground,
  },

  imageSliderStyle: {
    backgroundColor: 'transparent',
    marginTop: DEVICE_HEIGHT * 0.012,
  },

  mapOverlayStyle: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'transparent',
  },

  mapViewStyle: {
    flex: 1,
    width: wpx(343),
    height: hpx(187),
    marginTop: hpx(8),
  },

  locationTextContainerStyle: {
    paddingVertical: DEVICE_HEIGHT * 0.012,
  },
});

export const RelayChallengesStyles = {
  ...BaseStyles,
  ...style,
  ...SendBoostrStyles,
};
