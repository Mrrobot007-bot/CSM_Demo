import {StyleSheet, ViewStyle, TextStyle, ImageStyle} from 'react-native';

import {color, spacingPresets} from '../../../theme';
import {BaseStyles} from '../../../utility/base-styles';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../../utility';

const style = StyleSheet.create<{
  blackText: TextStyle;
  progressView: ViewStyle;
  spinnerStyle: ViewStyle;
  grayTextStyle: TextStyle;
  blackTextStyle: TextStyle;
  labelTextStyle: TextStyle;
  colonTextStyle: TextStyle;
  challengesImageStyle: any;
  exitIconStyle: ImageStyle;
  tildeIconView: ImageStyle;
  arrowIconStyle: ImageStyle;
  progressBarView: ViewStyle;
  userInviteStyle: ViewStyle;
  joinButtonStyle: ViewStyle;
  innerLoaderStyle: ViewStyle;
  progressViewTime: ViewStyle;
  sliderImageStyle: ViewStyle;
  shareImageStyle: ImageStyle;
  userDisplayStyle: ImageStyle;
  activityIconStyle: ImageStyle;
  tildeIconShareView: ImageStyle;
  shareContainerStyle: ViewStyle;
  part3ContainerStyle: ViewStyle;
  countDownIconStyle: ImageStyle;
  downloadImageStyle: ImageStyle;
  secondRowPart1Style: ViewStyle;
  descriptionTextStyle: TextStyle;
  walkRunningViewStyle: ViewStyle;
  sliderInnerViewStyle: ViewStyle;
  lightYellowTextStyle: ViewStyle;
  manageInviteLineStyle: ViewStyle;
  manageInviteIconStyle: ImageStyle;
  daysRemainingTextStyle: TextStyle;
  challengeInfo2ViewStyle: ViewStyle;
  secondaryLabelTextStyle: TextStyle;
  submitUserInfoViewStyle: ViewStyle;
  mainTitleContainerStyle: ViewStyle;
  getDayTimeContainerStyle: ViewStyle;
  showLeaderBoardTextStyle: TextStyle;
  submitUserInfo2ViewStyle: ViewStyle;
  submitClimbOpenViewStyle: ViewStyle;
  sliderUpcomingImageStyle: ViewStyle;
  challengeDetailsViewStyle: ViewStyle;
  innerLoaderContainerStyle: ViewStyle;
  manageInviteContainerStyle: ViewStyle;
  toggleSwitchContainerStyle: ViewStyle;
  sliderImageBackgroundStyle: ViewStyle;
  farOutEndDateContainerStyle: ViewStyle;
  percentageBarContainerStyle: ViewStyle;
  submitDayRemainingViewStyle: ViewStyle;
  shareViewMainContainerStyle: ViewStyle;
  leaveChallengeContainerStyle: ViewStyle;
  submitUserInfoViewInnerStyle: ViewStyle;
  secondRowDescriptionTextStyle: TextStyle;
  farOutCountDownContainerStyle: ViewStyle;
  paginationLoaderContainerStyle: ViewStyle;
  percentageBarTimeContainerStyle: ViewStyle;
  manageInvitePart1ContainerStyle: ViewStyle;
  manageInvitePart2ContainerStyle: ViewStyle;
  submitDistancePercentageDiffLeftStyle: ViewStyle;
}>({
  submitUserInfoViewInnerStyle: {
    justifyContent: 'center',
  },
  secondaryLabelTextStyle: {
    marginVertical: 0,
    borderStyle: 'solid',
  },
  blackTextStyle: {
    color: color.palette.black,
  },

  challengeDetailsViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  sliderImageBackgroundStyle: {
    zIndex: 0,
    borderRadius: 15,
    marginBottom: -3,
    overflow: 'hidden',
    alignSelf: 'center',
    justifyContent: 'center',
    width: DEVICE_WIDTH * 0.91,
    height: DEVICE_HEIGHT * 0.08,
    marginTop: DEVICE_HEIGHT * 0.012,
    backgroundColor: color.palette.black_20,
  },

  sliderImageStyle: {
    position: 'absolute',
    width: DEVICE_WIDTH * 0.91,
    height: DEVICE_HEIGHT * 0.08,
  },

  sliderUpcomingImageStyle: {
    position: 'absolute',
    width: DEVICE_WIDTH * 0.91,
    height: DEVICE_HEIGHT * 0.08,
  },

  sliderInnerViewStyle: {
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
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
    width: DEVICE_WIDTH * 0.027,
    height: DEVICE_WIDTH * 0.027,
    tintColor: color.palette.lightYellow,
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
    paddingVertical: spacingPresets.tiny,
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
    backgroundColor: color.palette.white,
    paddingBottom: DEVICE_HEIGHT * 0.024,
    paddingHorizontal: DEVICE_WIDTH * 0.045,
  },
  submitUserInfoViewStyle: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: color.palette.grey11,
    paddingVertical: DEVICE_HEIGHT * 0.012,
    paddingHorizontal: DEVICE_WIDTH * 0.021,
  },

  submitUserInfo2ViewStyle: {
    width: '100%',
    borderRadius: 10,
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
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: DEVICE_HEIGHT * 0.024,
  },

  exitIconStyle: {
    width: DEVICE_WIDTH * 0.053,
    height: DEVICE_WIDTH * 0.053,
    marginRight: DEVICE_WIDTH * 0.02,
  },

  shareContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: color.palette.white,
  },
  tildeIconView: {
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.05,
    height: DEVICE_WIDTH * 0.05,
  },

  downloadImageStyle: {
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.05,
    height: DEVICE_WIDTH * 0.05,
    marginHorizontal: DEVICE_WIDTH * 0.026,
  },

  shareImageStyle: {
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.05,
    height: DEVICE_WIDTH * 0.05,
    marginLeft: DEVICE_WIDTH * 0.026,
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

  shareViewMainContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: DEVICE_HEIGHT * 0.024,
  },

  paginationLoaderContainerStyle: {
    width: '100%',
    height: 100,
    marginBottom: 50,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },

  spinnerStyle: {
    zIndex: 10,
    width: 100,
    height: 100,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  innerLoaderContainerStyle: {
    height: 120,
    width: '100%',
    alignItems: 'center',
  },
  innerLoaderStyle: {
    flex: 1,
    zIndex: 10,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  secondRowDescriptionTextStyle: {
    marginVertical: spacingPresets.medium,
  },

  labelTextStyle: {
    color: color.palette.grey9,
  },
});
export const ChallengesStyles = {...BaseStyles, ...style};
