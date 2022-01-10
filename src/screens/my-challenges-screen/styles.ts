import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {wpx} from '../../utility/responsive';
import {color, spacingPresets} from '../../theme';
import {BaseStyles} from '../../utility/base-styles';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utility';

const style = StyleSheet.create<{
  tabViewStyle: ViewStyle;
  flexRowStyle: ViewStyle;
  serialNoView: ViewStyle;
  tableMainView: ViewStyle;
  mainContainer: ViewStyle;
  dropDownStyle: ViewStyle;
  grayTextStyle: TextStyle;
  bellIconStyle: ImageStyle;
  tildeIconView: ImageStyle;
  arrowViewStyle: ViewStyle;
  blackTextStyle: TextStyle;
  indicatorStyle: ViewStyle;
  infoIconStyle: ImageStyle;
  userInviteStyle: ViewStyle;
  arrowIconStyle: ImageStyle;
  stepsTextStyle: ImageStyle;
  joinButtonStyle: ViewStyle;
  buttonContainer: ViewStyle;
  dismissTextStyle: ViewStyle;
  headerLogoStyle: ImageStyle;
  headerMenuStyle: ImageStyle;
  wellnessViewStyle: ViewStyle;
  userDisplayStyle: ImageStyle;
  progressViewStyle: ViewStyle;
  goalActivityStyle: ViewStyle;
  acceptButtonStyle: ViewStyle;
  listMainContainer: ViewStyle;
  goalContainerStyle: ViewStyle;
  mainContainerStyle: ViewStyle;
  plusIconViewStyle: ImageStyle;
  declineButtonStyle: TextStyle;
  dropDownPickerStyle: ViewStyle;
  inviteByImageStyle: ImageStyle;
  leaderBoardNameView: ViewStyle;
  wellnessImageStyle: ImageStyle;
  closeIconViewStyle: ImageStyle;
  shareContainerStyle: ViewStyle;
  labelContainerStyle: ViewStyle;
  tildeIconShareView: ImageStyle;
  titleContainerStyle: ViewStyle;
  stepsCountViewStyle: ViewStyle;
  tildeIconViewStyle: ImageStyle;
  leaderBoardImageView: ViewStyle;
  descriptionTextStyle: TextStyle;
  walkRunningViewStyle: ViewStyle;
  lightYellowTextStyle: ViewStyle;
  sliderInnerViewStyle: ViewStyle;
  tableImageIconStyle: ImageStyle;
  tableDescriptionView: ViewStyle;
  notificationViewStyle: ViewStyle;
  progressViewTimeStyle: ViewStyle;
  yourGoalTextViewStyle: TextStyle;
  descriptionImageStyle: ImageStyle;
  goalActivityInnerStyle: ViewStyle;
  wellnessImageViewStyle: ViewStyle;
  daysRemainingTextStyle: TextStyle;
  mainTitleContainerStyle: ViewStyle;
  submitUserInfoViewStyle: ViewStyle;
  challengeInfo2ViewStyle: ViewStyle;
  secondaryLabelTextStyle: TextStyle;
  sliderMiddleSpaceStyle: ImageStyle;
  rightIconContainerStyle: ViewStyle;
  submitUserInfo2ViewStyle: ViewStyle;
  submitClimbOpenViewStyle: ViewStyle;
  startTrackingButtonStyle: ViewStyle;
  rightComponentIconStyle: ImageStyle;
  openChallengeSubContainer: ViewStyle;
  createChallengeIconStyle: ImageStyle;
  createChallengeTitleStyle: TextStyle;
  notificationBellTextStyle: ViewStyle;
  notificationBellViewStyle: ViewStyle;
  challengeDetailsViewStyle: ViewStyle;
  submitUserInfo2InnerStyle: ViewStyle;
  headerRightContainerStyle: ImageStyle;
  createChallengeButtonStyle: ViewStyle;
  labelContainerFocusedStyle: ViewStyle;
  leaderBoardHeadingContainer: ViewStyle;
  openChallengeMainContainer: ImageStyle;
  liveChallengeMainContainer: ImageStyle;
  sliderImageBackgroundStyle: ImageStyle;
  goalActivityMiddleLineStyle: ViewStyle;
  submitDayRemainingViewStyle: ViewStyle;
  submitUserInfoViewInnerStyle: ViewStyle;
  notificationDismissViewStyle: ViewStyle;
  createChallengeSliderDotStyle: ViewStyle;
  createChallengeSubTextDotStyle: ViewStyle;
  createChallengeSubTextListStyle: ViewStyle;
  leaderBoardAndViewMoreContainer: ViewStyle;
  createChallengeIconContainerStyle: ViewStyle;
  submitPercentageCompleteViewStyle: ViewStyle;
  createChallengesMainContainerStyle: ViewStyle;
  createChallengeActiveSliderDotStyle: ViewStyle;
  submitDistancePercentageDiffLeftStyle: ViewStyle;
  submitDistancePercentageDiffRightStyle: ViewStyle;
}>({
  mainContainerStyle: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: color.palette.lightYellow,
  },
  tabViewStyle: {
    padding: 0,
    elevation: 0,
    alignSelf: 'center',
    borderBottomWidth: 1,
    width: DEVICE_WIDTH * 0.915,
    height: DEVICE_HEIGHT * 0.05 + 12,
    backgroundColor: color.palette.lightYellow,
  },

  labelContainerStyle: {
    paddingTop: 6,
    alignItems: 'center',
    justifyContent: 'center',
    height: DEVICE_HEIGHT * 0.05,
    backgroundColor: 'transparent',
    width: (DEVICE_WIDTH * 0.915) / 4,
    borderTopLeftRadius: DEVICE_HEIGHT * 0.015,
    borderTopRightRadius: DEVICE_HEIGHT * 0.015,
  },

  labelContainerFocusedStyle: {
    paddingTop: 6,
    alignItems: 'center',
    justifyContent: 'center',
    height: DEVICE_HEIGHT * 0.056,
    width: (DEVICE_WIDTH * 0.915) / 4,
    borderTopLeftRadius: DEVICE_HEIGHT * 0.015,
    borderTopRightRadius: DEVICE_HEIGHT * 0.015,
  },

  indicatorStyle: {
    height: 1,
  },

  rightIconContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rightComponentIconStyle: {
    width: DEVICE_WIDTH * 0.048,
    height: DEVICE_WIDTH * 0.048,
    marginRight: DEVICE_WIDTH * 0.01,
    tintColor: color.palette.lightYellow,
  },

  createChallengesMainContainerStyle: {
    width: '100%',
    height: '100%',
    paddingTop: DEVICE_HEIGHT * 0.036,
    paddingHorizontal: DEVICE_WIDTH * 0.0425,
    backgroundColor: color.palette.lightYellow_88,
  },

  createChallengeIconContainerStyle: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: DEVICE_WIDTH * 0.278,
    height: DEVICE_WIDTH * 0.278,
    marginVertical: DEVICE_HEIGHT * 0.06,
    borderRadius: (DEVICE_WIDTH * 0.278) / 2,
  },

  createChallengeIconStyle: {
    width: DEVICE_WIDTH * 0.15,
    height: DEVICE_WIDTH * 0.15,
  },

  createChallengeTitleStyle: {
    alignSelf: 'center',
    marginBottom: DEVICE_HEIGHT * 0.027,
  },

  createChallengeSubTextDotStyle: {
    width: 5,
    height: 5,
    marginTop: 5,
    borderRadius: 5,
    backgroundColor: 'black',
    marginRight: spacingPresets.smaller,
  },

  createChallengeSubTextListStyle: {
    flexDirection: 'row',
    marginTop: DEVICE_HEIGHT * 0.01,
    paddingHorizontal: DEVICE_WIDTH * 0.0425,
  },

  createChallengeButtonStyle: {
    position: 'absolute',
    bottom: DEVICE_HEIGHT * 0.106,
  },

  createChallengeSliderDotStyle: {
    width: DEVICE_WIDTH * 0.016,
    height: DEVICE_WIDTH * 0.016,
  },

  createChallengeActiveSliderDotStyle: {
    width: DEVICE_WIDTH * 0.016,
    height: DEVICE_WIDTH * 0.016,
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
  submitPercentageCompleteViewStyle: {
    flexDirection: 'row',
    paddingTop: DEVICE_HEIGHT * 0.002,
  },
  submitDistancePercentageDiffRightStyle: {
    paddingRight: DEVICE_WIDTH * 0.021,
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
  submitUserInfo2InnerStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  submitUserInfo2ViewStyle: {
    width: '100%',
    borderRadius: 5,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: DEVICE_HEIGHT * 0.012,
    backgroundColor: color.palette.grey11,
    paddingVertical: DEVICE_HEIGHT * 0.024,
    paddingHorizontal: DEVICE_WIDTH * 0.021,
  },
  userDisplayStyle: {
    width: DEVICE_WIDTH * 0.0426,
    height: DEVICE_WIDTH * 0.0426,
    paddingLeft: DEVICE_WIDTH * 0.01,
    marginRight: DEVICE_WIDTH * 0.01,
    borderRadius: DEVICE_WIDTH * 0.0426,
  },
  lightYellowTextStyle: {
    color: color.palette.lightYellow,
  },
  submitUserInfoViewInnerStyle: {
    justifyContent: 'center',
  },
  submitUserInfoViewStyle: {
    width: '100%',
    borderRadius: 5,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: color.palette.grey11,
    paddingVertical: DEVICE_HEIGHT * 0.012,
    paddingHorizontal: DEVICE_WIDTH * 0.021,
  },
  walkRunningViewStyle: {
    borderRadius: 15,
    flexDirection: 'row',
    backgroundColor: color.palette.black,
    paddingVertical: DEVICE_HEIGHT * 0.002,
    paddingHorizontal: DEVICE_WIDTH * 0.021,
  },
  userInviteStyle: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: DEVICE_HEIGHT * 0.0254,
  },
  flexRowStyle: {
    flexDirection: 'row',
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
  mainContainer: {
    flex: 1,
    backgroundColor: color.palette.lightYellow_50,
  },
  startTrackingButtonStyle: {
    marginVertical: 0,
    backgroundColor: color.palette.black,
  },
  notificationBellViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: DEVICE_WIDTH * 0.018,
  },
  secondaryLabelTextStyle: {
    marginVertical: 0,
    borderStyle: 'solid',
  },
  mainTitleContainerStyle: {
    marginTop: DEVICE_HEIGHT * 0.035,
    marginBottom: spacingPresets.small,
  },
  titleContainerStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: DEVICE_WIDTH * 0.043,
  },
  goalContainerStyle: {
    borderRadius: 25,
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.91,
    height: DEVICE_HEIGHT * 0.215,
    marginTop: DEVICE_HEIGHT * 0.024,
    backgroundColor: color.palette.white,
  },
  goalActivityStyle: {
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    width: DEVICE_WIDTH * 0.826,
    height: DEVICE_HEIGHT * 0.09,
    backgroundColor: color.palette.grey11,
    marginVertical: DEVICE_HEIGHT * 0.023,
  },
  plusIconViewStyle: {
    width: DEVICE_WIDTH * 0.05,
    height: DEVICE_WIDTH * 0.05,
    marginRight: DEVICE_WIDTH * 0.026,
  },
  closeIconViewStyle: {
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.04,
    height: DEVICE_WIDTH * 0.04,
  },
  notificationDismissViewStyle: {
    backgroundColor: 'black',
    borderRadius: 15,
    width: DEVICE_WIDTH * 0.133,
    height: DEVICE_HEIGHT * 0.07,
    justifyContent: 'space-around',
    paddingTop: DEVICE_HEIGHT * 0.01,
  },
  dismissTextStyle: {
    alignSelf: 'center',
    color: color.palette.white,
  },
  arrowViewStyle: {
    width: DEVICE_WIDTH * 0.04,
    height: DEVICE_WIDTH * 0.04,
  },
  tildeIconViewStyle: {
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.05,
    height: DEVICE_WIDTH * 0.05,
    paddingRight: DEVICE_WIDTH * 0.1,
  },
  goalActivityInnerStyle: {
    justifyContent: 'center',
    width: DEVICE_WIDTH * 0.413,
    paddingLeft: DEVICE_WIDTH * 0.042,
  },

  goalActivityMiddleLineStyle: {
    width: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    height: DEVICE_HEIGHT * 0.06,
    backgroundColor: color.palette.grey6,
  },
  stepsTextStyle: {
    color: color.palette.grey5,
    paddingLeft: DEVICE_WIDTH * 0.009,
  },
  stepsCountViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: DEVICE_HEIGHT * 0.005,
  },
  yourGoalTextViewStyle: {
    color: color.palette.black,
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
  blackTextStyle: {
    color: color.palette.black,
  },

  grayTextStyle: {
    color: color.palette.grey5,
  },
  sliderMiddleSpaceStyle: {
    marginTop: DEVICE_HEIGHT * 0.011,
  },
  wellnessViewStyle: {
    borderRadius: 20,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: DEVICE_WIDTH * 0.91,
    height: DEVICE_HEIGHT * 0.125,
    marginTop: DEVICE_HEIGHT * 0.035,
    paddingLeft: DEVICE_WIDTH * 0.021,
    backgroundColor: color.palette.white,
  },
  wellnessImageViewStyle: {
    justifyContent: 'center',
    width: DEVICE_WIDTH * 0.6,
    paddingRight: DEVICE_WIDTH * 0.01,
    paddingLeft: DEVICE_HEIGHT * 0.042,
  },
  notificationBellTextStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: DEVICE_WIDTH * 0.82,
    justifyContent: 'space-between',
    paddingHorizontal: DEVICE_HEIGHT * 0.01,
  },
  wellnessImageStyle: {
    borderRadius: 20,
    width: DEVICE_WIDTH * 0.181,
    height: DEVICE_WIDTH * 0.181,
  },
  notificationViewStyle: {
    alignSelf: 'center',
    borderRadius: 15,
    flexDirection: 'row',
    width: DEVICE_WIDTH * 0.91,
    height: DEVICE_HEIGHT * 0.075,
    backgroundColor: color.palette.white,
  },
  bellIconStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: DEVICE_WIDTH * 0.06,
    height: DEVICE_WIDTH * 0.06,
  },
  progressViewStyle: {
    alignSelf: 'center',
    flexDirection: 'row',
    width: DEVICE_WIDTH * 0.826,
    justifyContent: 'space-between',
  },
  progressViewTimeStyle: {
    alignSelf: 'center',
    flexDirection: 'row',
    width: DEVICE_WIDTH * 0.826,
    justifyContent: 'space-between',
    marginTop: DEVICE_HEIGHT * 0.006,
  },

  headerRightContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: DEVICE_WIDTH * 0.155,
    marginRight: DEVICE_WIDTH * 0.01,
    height: DEVICE_WIDTH * 0.155 * 0.56,
    tintColor: color.palette.lightYellow,
  },

  headerLogoStyle: {
    width: DEVICE_WIDTH * 0.226,
    height: DEVICE_WIDTH * 0.226 * 0.27,
    tintColor: color.palette.lightYellow,
  },

  headerMenuStyle: {
    width: DEVICE_WIDTH * 0.064,
    height: DEVICE_WIDTH * 0.064,
  },

  challengeInfo2ViewStyle: {
    height: 20,
    marginLeft: 8,
    borderLeftWidth: 1,
    flexDirection: 'row',
    borderLeftColor: color.palette.grey6,
  },
  daysRemainingTextStyle: {
    color: color.palette.grey4,
  },

  challengeDetailsViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  arrowIconStyle: {
    width: DEVICE_WIDTH * 0.05,
    height: DEVICE_WIDTH * 0.05,
  },

  leaderBoardAndViewMoreContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: DEVICE_WIDTH * 0.82,
    justifyContent: 'space-between',
    marginTop: DEVICE_HEIGHT * 0.035,
  },
  leaderBoardHeadingContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    width: DEVICE_WIDTH * 0.829,
    marginTop: DEVICE_HEIGHT * 0.023,
    backgroundColor: color.palette.black,
    paddingVertical: DEVICE_HEIGHT * 0.013,
  },
  serialNoView: {
    color: color.palette.lightYellow,
    paddingLeft: DEVICE_WIDTH * 0.029,
  },
  leaderBoardImageView: {
    color: color.palette.lightYellow,
    paddingLeft: DEVICE_WIDTH * 0.0373,
  },
  leaderBoardNameView: {
    width: DEVICE_WIDTH * 0.46,
    color: color.palette.lightYellow,
    paddingLeft: DEVICE_WIDTH * 0.0426,
  },
  tableMainView: {
    alignSelf: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: DEVICE_WIDTH * 0.829,
    backgroundColor: color.palette.grey12,
    paddingVertical: DEVICE_HEIGHT * 0.013,
    borderBottomColor: color.palette.white,
  },
  tableImageIconStyle: {
    width: wpx(24),
    height: wpx(24),
    borderRadius: wpx(24),
    marginLeft: DEVICE_WIDTH * 0.029,
  },
  tableDescriptionView: {
    marginTop: DEVICE_HEIGHT * 0.023,
  },
  descriptionImageStyle: {
    borderRadius: 10,
    width: DEVICE_WIDTH * 0.83,
    marginTop: DEVICE_HEIGHT * 0.011,
    height: DEVICE_WIDTH * 0.83 * 0.6,
  },
  openChallengeMainContainer: {
    flex: 1,
  },
  liveChallengeMainContainer: {
    flex: 1,
    marginBottom: DEVICE_HEIGHT * 0.1,
  },
  openChallengeSubContainer: {
    alignItems: 'center',
  },
  joinButtonStyle: {
    width: DEVICE_WIDTH * 0.82,
  },

  listMainContainer: {
    borderRadius: 25,
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.91,
    marginTop: DEVICE_HEIGHT * 0.012,
    backgroundColor: color.palette.white,
    paddingVertical: DEVICE_HEIGHT * 0.023,
    paddingHorizontal: DEVICE_WIDTH * 0.042,
  },
  inviteByImageStyle: {
    borderRadius: 10,
    width: DEVICE_WIDTH * 0.83,
    marginTop: DEVICE_HEIGHT * 0.011,
    height: DEVICE_WIDTH * 0.83 * 0.6,
  },
  descriptionTextStyle: {
    marginTop: DEVICE_HEIGHT * 0.023,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  declineButtonStyle: {
    marginRight: DEVICE_WIDTH * 0.162,
  },
  acceptButtonStyle: {
    marginVertical: 0,
    width: DEVICE_WIDTH * 0.41,
  },

  infoIconStyle: {
    width: DEVICE_WIDTH * 0.064,
    height: DEVICE_WIDTH * 0.064,
  },

  dropDownPickerStyle: {
    marginTop: DEVICE_HEIGHT * 0.01,
  },

  dropDownStyle: {
    borderWidth: 1,
    borderColor: color.palette.grey6,
  },
});

export const MyChallengesScreenStyles = {...BaseStyles, ...style};
