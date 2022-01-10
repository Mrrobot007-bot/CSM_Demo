import {StyleSheet, ViewStyle, TextStyle, ImageStyle} from 'react-native';

import {hpx, wpx} from '../../../utility/responsive';
import {color, spacingPresets} from '../../../theme';
import {BaseStyles} from '../../../utility/base-styles';
import {DEVICE_HEIGHT, DEVICE_WIDTH, getPrimaryColor} from '../../../utility';

const style = StyleSheet.create<{
  blackText: TextStyle;
  progressView: ViewStyle;
  addIconStyle: ImageStyle;
  dateTextStyle: TextStyle;
  grayTextStyle: TextStyle;
  colonTextStyle: TextStyle;
  challengesImageStyle: any;
  sendButtonStyle: ViewStyle;
  buttonTextStyle: TextStyle;
  progressBarView: ViewStyle;
  userImageStyle: ImageStyle;
  progressViewTime: ViewStyle;
  buttonIconStyle: ImageStyle;
  boostrHeaderStyle: ViewStyle;
  viewMoreTextStyle: TextStyle;
  boostrImageStyle: ImageStyle;
  boostrDataListStyle: ViewStyle;
  countDownIconStyle: ImageStyle;
  extraComponentStyle: ViewStyle;
  secondRowPart1Style: ViewStyle;
  part3ContainerStyle: ViewStyle;
  part1ContainerStyle: ViewStyle;
  descriptionTextStyle: TextStyle;
  lightYellowTextStyle: ViewStyle;
  listItemContainerStyle: TextStyle;
  bottomButtonItemStyle: ImageStyle;
  daysRemainingTextStyle: TextStyle;
  challengeInfo2ViewStyle: ViewStyle;
  mainTitleContainerStyle: ViewStyle;
  submitUserInfoViewStyle: ViewStyle;
  getDayTimeContainerStyle: ViewStyle;
  submitUserInfo2ViewStyle: ViewStyle;
  submitClimbOpenViewStyle: ViewStyle;
  showLeaderBoardTextStyle: TextStyle;
  sendBoosterComponentStyle: ViewStyle;
  toggleSwitchContainerStyle: ViewStyle;
  bottomButtonContainerStyle: ViewStyle;
  percentageBarContainerStyle: ViewStyle;
  submitDayRemainingViewStyle: ViewStyle;
  farOutEndDateContainerStyle: ViewStyle;
  farOutCountDownContainerStyle: ViewStyle;
  percentageBarTimeContainerStyle: ViewStyle;
  submitDistancePercentageDiffLeftStyle: ViewStyle;
}>({
  sendBoosterComponentStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wpx(10),
    justifyContent: 'space-between',
    marginTop: wpx(spacingPresets.medium),
    backgroundColor: getPrimaryColor(0.05),
    marginBottom: wpx(spacingPresets.smaller),
    paddingVertical: wpx(spacingPresets.medium),
    paddingHorizontal: wpx(spacingPresets.smaller),
  },
  sendButtonStyle: {
    marginVertical: 0,
  },
  listItemContainerStyle: {
    borderRadius: wpx(10),
    marginBottom: DEVICE_HEIGHT * 0.012,
    paddingVertical: DEVICE_HEIGHT * 0.024,
    backgroundColor: getPrimaryColor(0.05),
    paddingHorizontal: DEVICE_WIDTH * 0.021,
  },

  part1ContainerStyle: {
    flexDirection: 'row',
    marginBottom: DEVICE_HEIGHT * 0.0254,
  },

  userImageStyle: {
    width: DEVICE_WIDTH * 0.085,
    height: DEVICE_WIDTH * 0.085,
    borderRadius: DEVICE_WIDTH * 0.085,
    marginRight: DEVICE_WIDTH * 0.021,
  },

  boostrImageStyle: {
    width: '100%',
    borderRadius: 10,
    height: DEVICE_WIDTH * 0.5,
    marginTop: DEVICE_HEIGHT * 0.024,
  },
  bottomButtonContainerStyle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: DEVICE_HEIGHT * 0.037,
  },

  bottomButtonItemStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: DEVICE_WIDTH * 0.016,
  },

  buttonIconStyle: {
    width: wpx(20),
    height: wpx(20),
    marginRight: DEVICE_WIDTH * 0.0133,
  },
  buttonTextStyle: {
    lineHeight: 11,
    color: getPrimaryColor(),
  },

  dateTextStyle: {
    color: color.palette.grey9,
  },

  lightYellowTextStyle: {
    color: color.palette.lightYellow,
  },

  mainTitleContainerStyle: {
    marginTop: DEVICE_HEIGHT * 0.035,
    marginBottom: spacingPresets.small,
  },
  submitClimbOpenViewStyle: {
    zIndex: -1,
    marginTop: -5,
    alignSelf: 'center',
    borderBottomEndRadius: 10,
    width: DEVICE_WIDTH * 0.91,
    borderBottomStartRadius: 10,
    backgroundColor: color.palette.white,
    paddingBottom: DEVICE_HEIGHT * 0.024,
    paddingHorizontal: DEVICE_WIDTH * 0.045,
  },
  submitUserInfoViewStyle: {
    width: '100%',
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor: color.palette.grey11,
    paddingVertical: DEVICE_HEIGHT * 0.012,
    paddingHorizontal: DEVICE_WIDTH * 0.021,
  },

  submitUserInfo2ViewStyle: {
    width: '100%',
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: DEVICE_HEIGHT * 0.012,
    backgroundColor: color.palette.grey11,
    paddingVertical: DEVICE_HEIGHT * 0.024,
    paddingHorizontal: DEVICE_WIDTH * 0.021,
  },

  challengeInfo2ViewStyle: {
    height: 20,
    marginLeft: 8,
    borderLeftWidth: 1,
    flexDirection: 'row',
    borderLeftColor: color.palette.grey6,
  },

  submitDistancePercentageDiffLeftStyle: {
    paddingLeft: DEVICE_WIDTH * 0.021,
  },

  submitDayRemainingViewStyle: {
    flexWrap: 'wrap',
    borderRadius: 10,
    justifyContent: 'center',
    paddingVertical: DEVICE_HEIGHT * 0.002,
    paddingHorizontal: DEVICE_WIDTH * 0.021,
    backgroundColor: color.palette.warningYellow,
  },

  daysRemainingTextStyle: {
    color: color.palette.grey4,
  },

  grayTextStyle: {
    color: color.palette.grey5,
  },

  progressView: {
    alignSelf: 'center',
    flexDirection: 'row',
    width: DEVICE_WIDTH * 0.826,
    justifyContent: 'space-between',
  },

  progressBarView: {
    width: DEVICE_WIDTH * 0.75,
  },

  progressViewTime: {
    alignSelf: 'center',
    flexDirection: 'row',
    width: DEVICE_WIDTH * 0.826,
    justifyContent: 'space-between',
  },
  blackText: {
    color: color.palette.black,
  },

  percentageBarContainerStyle: {
    marginTop: spacingPresets.medium,
  },

  percentageBarTimeContainerStyle: {
    marginTop: spacingPresets.tiny,
  },

  challengesImageStyle: {
    borderRadius: 10,
    width: DEVICE_WIDTH * 0.786,
    marginTop: DEVICE_HEIGHT * 0.012,
    height: DEVICE_WIDTH * 0.786 * 0.637,
  },

  farOutEndDateContainerStyle: {
    width: '50%',
  },

  part3ContainerStyle: {
    flex: 1,
    borderRadius: 10,
    paddingTop: DEVICE_HEIGHT * 0.012,
    backgroundColor: color.palette.white,
    paddingBottom: DEVICE_HEIGHT * 0.024,
    paddingHorizontal: DEVICE_WIDTH * 0.043,
  },

  farOutCountDownContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: DEVICE_HEIGHT * 0.017,
  },

  countDownIconStyle: {
    width: DEVICE_WIDTH * 0.106,
    height: DEVICE_WIDTH * 0.106,
  },

  secondRowPart1Style: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  showLeaderBoardTextStyle: {
    color: color.palette.grey9,
    marginTop: DEVICE_HEIGHT * 0.036,
  },

  toggleSwitchContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: DEVICE_HEIGHT * 0.024,
  },

  colonTextStyle: {
    marginHorizontal: 4,
  },
  getDayTimeContainerStyle: {
    alignItems: 'center',
  },

  descriptionTextStyle: {
    marginTop: DEVICE_HEIGHT * 0.024,
    marginBottom: DEVICE_HEIGHT * 0.036,
  },

  addIconStyle: {
    width: 16,
    height: 16,
    marginRight: spacingPresets.tiny,
  },

  boostrHeaderStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  viewMoreTextStyle: {
    color: getPrimaryColor(),
  },

  extraComponentStyle: {
    width: 1,
    height: 50,
  },

  boostrDataListStyle: {
    marginTop: hpx(24),
    marginBottom: hpx(24),
    marginHorizontal: DEVICE_WIDTH * 0.042,
  },
});
export const BoostrComponentStyles = {...BaseStyles, ...style};
