import {StyleSheet, ViewStyle, TextStyle, ImageStyle} from 'react-native';

import {color, spacingPresets} from '../../../theme';
import {BaseStyles} from '../../../utility/base-styles';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../../utility';

const style = StyleSheet.create<{
  blackText: TextStyle;
  progressView: ViewStyle;
  grayTextStyle: TextStyle;
  blackTextStyle: TextStyle;
  colonTextStyle: TextStyle;
  tildeIconView: ImageStyle;
  challengesImageStyle: any;
  arrowIconStyle: ImageStyle;
  userInviteStyle: ViewStyle;
  progressBarView: ViewStyle;
  joinButtonStyle: ViewStyle;
  progressViewTime: ViewStyle;
  sliderImageStyle: ViewStyle;
  userDisplayStyle: ImageStyle;
  activityIconStyle: ImageStyle;
  countDownIconStyle: ImageStyle;
  secondRowPart1Style: ViewStyle;
  shareContainerStyle: ViewStyle;
  tildeIconShareView: ImageStyle;
  part3ContainerStyle: ViewStyle;
  descriptionTextStyle: TextStyle;
  manageInviteLineStyle: ViewStyle;
  sliderInnerViewStyle: ViewStyle;
  walkRunningViewStyle: ViewStyle;
  lightYellowTextStyle: ViewStyle;
  manageInviteIconStyle: ImageStyle;
  daysRemainingTextStyle: TextStyle;
  mainTitleContainerStyle: ViewStyle;
  submitClimbOpenViewStyle: ViewStyle;
  submitUserInfoViewStyle: ViewStyle;
  submitUserInfo2ViewStyle: ViewStyle;
  challengeInfo2ViewStyle: ViewStyle;
  secondaryLabelTextStyle: TextStyle;
  showLeaderBoardTextStyle: TextStyle;
  getDayTimeContainerStyle: ViewStyle;
  challengeDetailsViewStyle: ViewStyle;
  sliderImageBackgroundStyle: ViewStyle;
  toggleSwitchContainerStyle: ViewStyle;
  percentageBarContainerStyle: ViewStyle;
  submitDayRemainingViewStyle: ViewStyle;
  manageInviteContainerStyle: ViewStyle;
  farOutEndDateContainerStyle: ViewStyle;
  submitUserInfoViewInnerStyle: ViewStyle;
  leaveChallengeContainerStyle: ViewStyle;
  farOutCountDownContainerStyle: ViewStyle;
  manageInvitePart1ContainerStyle: ViewStyle;
  manageInvitePart2ContainerStyle: ViewStyle;
  percentageBarTimeContainerStyle: ViewStyle;
  submitDistancePercentageDiffLeftStyle: ViewStyle;
}>({
  blackText: {
    color: color.palette.black,
  },
  progressView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.826,
  },
  grayTextStyle: {
    color: color.palette.grey5,
  },
  blackTextStyle: {
    color: color.palette.black,
  },
  submitUserInfoViewInnerStyle: {
    justifyContent: 'center',
  },
  secondaryLabelTextStyle: {
    marginVertical: 0,
    borderStyle: 'solid',
  },
  challengeDetailsViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sliderImageBackgroundStyle: {
    width: DEVICE_WIDTH * 0.91,
    height: DEVICE_HEIGHT * 0.08,
    alignSelf: 'center',
    borderRadius: 15,
    justifyContent: 'center',
    marginTop: DEVICE_HEIGHT * 0.012,
    marginBottom: -3,
    overflow: 'hidden',
    zIndex: 0,
    backgroundColor: color.palette.black_20,
  },
  sliderImageStyle: {
    width: DEVICE_WIDTH * 0.91,
    height: DEVICE_HEIGHT * 0.08,
    position: 'absolute',
  },
  sliderInnerViewStyle: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: DEVICE_WIDTH * 0.037,
    backgroundColor: color.palette.white_70,
  },
  arrowIconStyle: {
    width: DEVICE_WIDTH * 0.05,
    height: DEVICE_WIDTH * 0.05,
    marginHorizontal: spacingPresets.tiny,
  },

  activityIconStyle: {
    width: DEVICE_WIDTH * 0.05,
    height: DEVICE_WIDTH * 0.05,
    marginHorizontal: spacingPresets.tiny,
  },

  userInviteStyle: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: DEVICE_HEIGHT * 0.0254,
  },
  userDisplayStyle: {
    width: DEVICE_WIDTH * 0.0426,
    height: DEVICE_WIDTH * 0.0426,
    paddingLeft: DEVICE_WIDTH * 0.01,
    marginRight: DEVICE_WIDTH * 0.01,
    borderRadius: DEVICE_WIDTH * 0.0426,
  },

  walkRunningViewStyle: {
    borderRadius: 15,
    flexDirection: 'row',
    backgroundColor: color.palette.black,
    paddingVertical: DEVICE_HEIGHT * 0.002,
    paddingHorizontal: DEVICE_WIDTH * 0.021,
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
    paddingBottom: DEVICE_HEIGHT * 0.024,
    backgroundColor: color.palette.white,
    paddingHorizontal: DEVICE_WIDTH * 0.045,
  },
  submitUserInfoViewStyle: {
    width: '100%',
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor: color.palette.grey11,
    paddingHorizontal: DEVICE_WIDTH * 0.021,
    paddingVertical: DEVICE_HEIGHT * 0.012,
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

  progressBarView: {
    width: DEVICE_WIDTH * 0.75,
  },

  progressViewTime: {
    alignSelf: 'center',
    flexDirection: 'row',
    width: DEVICE_WIDTH * 0.826,
    justifyContent: 'space-between',
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
    paddingBottom: DEVICE_HEIGHT * 0.024,
    backgroundColor: color.palette.white,
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

  leaveChallengeContainerStyle: {
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: DEVICE_HEIGHT * 0.024,
  },

  shareContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: DEVICE_HEIGHT * 0.024,
  },
  tildeIconView: {
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.05,
    height: DEVICE_WIDTH * 0.05,
  },
  tildeIconShareView: {
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.05,
    height: DEVICE_WIDTH * 0.05,
    paddingRight: DEVICE_WIDTH * 0.1,
  },

  manageInviteContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: DEVICE_HEIGHT * 0.03,
    paddingHorizontal: DEVICE_WIDTH * 0.072,
  },

  manageInvitePart1ContainerStyle: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  manageInvitePart2ContainerStyle: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  manageInviteIconStyle: {
    width: DEVICE_WIDTH * 0.053,
    height: DEVICE_WIDTH * 0.053,
    marginRight: spacingPresets.tiny,
  },

  manageInviteLineStyle: {
    width: 1,
    height: '100%',
  },

  joinButtonStyle: {
    width: DEVICE_WIDTH * 0.82,
  },
});
export const TeamComponentStyles = {...BaseStyles, ...style};
