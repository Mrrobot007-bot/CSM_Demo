import {StyleSheet, ViewStyle, TextStyle, ImageStyle} from 'react-native';

import {wpx} from '../../utility/responsive';
import {color, spacingPresets} from '../../theme';
import {BaseStyles} from '../../utility/base-styles';
import {DEVICE_HEIGHT, DEVICE_WIDTH, isIos} from '../../utility/constants';

const styles = StyleSheet.create<{
  flexRow: ViewStyle;
  grayText: TextStyle;
  blackText: TextStyle;
  stepsText: ImageStyle;
  goalActivity: ViewStyle;
  tabViewStyle: ViewStyle;
  progressView: ViewStyle;
  goalContainer: ViewStyle;
  titleContainer: ViewStyle;
  blackTextStyle: ViewStyle;
  stepsCountView: ViewStyle;
  indicatorStyle: ViewStyle;
  tildeIconView: ImageStyle;
  lightYellowText: ViewStyle;
  progressBarView: ViewStyle;
  progressViewTime: ViewStyle;
  yourGoalTextView: TextStyle;
  goalActivityInner: ViewStyle;
  mainContainerStyle: ViewStyle;
  mainTitleContainer: ViewStyle;
  sliderMiddleSpace: ImageStyle;
  submitUserInfoView: ViewStyle;
  labelContainerStyle: ViewStyle;
  lightYellowTextStyle: ViewStyle;
  goalActivityMiddleLine: ViewStyle;
  secondaryLabelTextStyle: TextStyle;
  submitUserInfoViewInner: ViewStyle;
  labelContainerFocusedStyle: ViewStyle;
  submitPercentageCompleteView: ViewStyle;
  submitDistancePercentageDiffLeft: ViewStyle;
  submitDistancePercentageDiffRight: ViewStyle;

  // Streak component design
  dateViewStyle: ViewStyle;
  steaksContainerStyle: ViewStyle;
  descriptionTextStyle: ViewStyle;
  noDataContainerStyle: ViewStyle;
  streakSliderViewStyle: ViewStyle;
  sliderCompleteViewStyle: ViewStyle;

  // Rewards Section
  titleContainerStyle: ViewStyle;
  carouselContainerStyle: ViewStyle;
  mainTitleContainerStyle: ViewStyle;
  futureRewardsTextContainer: ViewStyle;
  futureRewardsMainContainer: ViewStyle;
  futureRewardsImageContainer: ViewStyle;
  pageIndicatorContainerStyle: ViewStyle;
  unclaimedRewardsContainerStyle: ViewStyle;

  // How it works
  tildeStyle: ImageStyle;
  longLineStyle: ViewStyle;
  subContainerView: ViewStyle;
  crossIconViewStyle: ImageStyle;
  howItWorksDescriptionStyle: ViewStyle;
  howItWorksHeaderTildeStyle: ViewStyle;
  howItWorksHeaderContainerStyle: ViewStyle;
  howItWorksSubHeaderContainerStyle: ViewStyle;

  // claim Rewards
  dotView: ViewStyle;
  dotFullView: ViewStyle;
  shareViewStyle: ViewStyle;
  couponViewStyle: ViewStyle;
  dotMainViewContainer: ViewStyle;
  claimRewardsImageStyle: ImageStyle;
  claimRewardsDiscountView: ViewStyle;

  // futureRewards
  rewardsOverlay: ViewStyle;
  bottomMarginView: ViewStyle;
  rewardsCountStyle: TextStyle;
  futureRewardButtonView: ViewStyle;
  shareAndDownloadContainer: ViewStyle;
}>({
  flexRow: {
    flexDirection: 'row',
  },
  grayText: {
    color: color.palette.grey5,
  },
  blackText: {
    color: color.palette.black,
  },
  stepsText: {
    color: color.palette.grey5,
    paddingLeft: DEVICE_WIDTH * 0.009,
  },
  goalActivity: {
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    width: DEVICE_WIDTH * 0.826,
    height: DEVICE_HEIGHT * 0.09,
    marginTop: DEVICE_HEIGHT * 0.014,
    marginBottom: DEVICE_HEIGHT * 0.02,
    backgroundColor: color.palette.grey11,
  },
  tabViewStyle: {
    padding: 0,
    elevation: 0,
    alignSelf: 'center',
    borderBottomWidth: 1,
    backgroundColor: isIos
      ? color.palette.transparent
      : color.palette.lightYellow_50,
    width: DEVICE_WIDTH * 0.915,
    marginTop: DEVICE_HEIGHT * 0.03,
    height: isIos ? DEVICE_HEIGHT * 0.05 + 10 : DEVICE_HEIGHT * 0.05 + 7,
  },
  progressView: {
    alignSelf: 'center',
    flexDirection: 'row',
    width: DEVICE_WIDTH * 0.826,
    justifyContent: 'space-between',
  },
  goalContainer: {
    borderRadius: 25,
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.91,
    height: DEVICE_HEIGHT * 0.245,
    marginTop: DEVICE_HEIGHT * 0.024,
    backgroundColor: color.palette.white,
  },
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: DEVICE_WIDTH * 0.043,
  },
  blackTextStyle: {
    color: color.palette.black,
  },
  stepsCountView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: DEVICE_HEIGHT * 0.005,
  },
  indicatorStyle: {
    height: 1,
  },
  tildeIconView: {
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.064,
    height: DEVICE_WIDTH * 0.064,
    paddingRight: DEVICE_WIDTH * 0.1,
  },
  lightYellowText: {
    color: color.palette.lightYellow,
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
  yourGoalTextView: {
    color: color.palette.black,
  },
  goalActivityInner: {
    justifyContent: 'center',
    width: DEVICE_WIDTH * 0.413,
    paddingLeft: DEVICE_WIDTH * 0.042,
  },
  mainContainerStyle: {
    flex: 1,
    backgroundColor: color.palette.lightYellow,
  },
  mainTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: DEVICE_HEIGHT * 0.035,
  },
  sliderMiddleSpace: {
    marginTop: DEVICE_HEIGHT * 0.011,
  },
  submitUserInfoView: {
    borderRadius: 5,
    alignSelf: 'center',
    flexDirection: 'row',
    width: DEVICE_WIDTH * 0.829,
    height: DEVICE_HEIGHT * 0.075,
    justifyContent: 'space-between',
    backgroundColor: color.palette.grey11,
    paddingHorizontal: DEVICE_WIDTH * 0.021,
  },
  labelContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: DEVICE_HEIGHT * 0.05,
    backgroundColor: isIos
      ? color.palette.transparent
      : color.palette.lightYellow_50,
    width: (DEVICE_WIDTH * 0.915) / 2,
    borderTopLeftRadius: DEVICE_HEIGHT * 0.015,
    borderTopRightRadius: DEVICE_HEIGHT * 0.015,
  },
  lightYellowTextStyle: {
    color: color.palette.lightYellow_50,
  },
  goalActivityMiddleLine: {
    width: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    height: DEVICE_HEIGHT * 0.06,
    backgroundColor: color.palette.grey6,
  },
  secondaryLabelTextStyle: {
    marginVertical: 0,
    borderStyle: 'solid',
  },
  submitUserInfoViewInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelContainerFocusedStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: DEVICE_HEIGHT * 0.05,
    width: (DEVICE_WIDTH * 0.915) / 2,
    borderTopLeftRadius: DEVICE_HEIGHT * 0.015,
    borderTopRightRadius: DEVICE_HEIGHT * 0.015,
  },
  submitPercentageCompleteView: {
    flexDirection: 'row',
    paddingTop: DEVICE_HEIGHT * 0.002,
  },
  submitDistancePercentageDiffLeft: {
    paddingLeft: DEVICE_WIDTH * 0.021,
  },
  submitDistancePercentageDiffRight: {
    paddingRight: DEVICE_WIDTH * 0.021,
  },

  // Streaks component design

  dateViewStyle: {
    paddingTop: DEVICE_HEIGHT * 0.023,
    paddingHorizontal: DEVICE_WIDTH * 0.0426,
  },
  steaksContainerStyle: {
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.91,
    marginBottom: DEVICE_HEIGHT * 0.02,
  },
  descriptionTextStyle: {
    marginTop: DEVICE_HEIGHT * 0.037,
  },
  noDataContainerStyle: {
    alignItems: 'center',
    padding: spacingPresets.mediumPlus,
  },
  streakSliderViewStyle: {
    borderRadius: 15,
    width: DEVICE_WIDTH * 0.91,
    height: DEVICE_HEIGHT * 0.184,
    marginTop: DEVICE_HEIGHT * 0.023,
  },
  sliderCompleteViewStyle: {
    paddingTop: DEVICE_HEIGHT * 0.011,
    paddingHorizontal: DEVICE_WIDTH * 0.0426,
  },

  // rewards component section
  titleContainerStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: DEVICE_WIDTH * 0.043,
  },
  carouselContainerStyle: {
    marginTop: DEVICE_HEIGHT * 0.023,
  },
  mainTitleContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: DEVICE_HEIGHT * 0.053,
    paddingRight: DEVICE_WIDTH * 0.01,
  },
  futureRewardsTextContainer: {
    flexWrap: 'wrap',
    color: color.palette.white,
    paddingBottom: DEVICE_HEIGHT * 0.023,
    paddingHorizontal: DEVICE_WIDTH * 0.0426,
  },
  futureRewardsImageContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: DEVICE_WIDTH * 0.44,
    height: DEVICE_WIDTH * 0.44,
    marginTop: DEVICE_HEIGHT * 0.0127,
    marginHorizontal: DEVICE_WIDTH * 0.016,
  },
  futureRewardsMainContainer: {
    alignSelf: 'center',
    marginTop: DEVICE_HEIGHT * 0.011,
    marginBottom: DEVICE_HEIGHT * 0.05,
  },
  pageIndicatorContainerStyle: {
    bottom: -DEVICE_HEIGHT * 0.03,
  },
  unclaimedRewardsContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: DEVICE_HEIGHT * 0.07,
    paddingRight: DEVICE_WIDTH * 0.01,
  },

  // how it works page
  tildeStyle: {
    width: DEVICE_WIDTH * 0.05,
    height: DEVICE_WIDTH * 0.05,
    tintColor: color.palette.black,
    marginRight: DEVICE_WIDTH * 0.027,
  },
  longLineStyle: {
    height: 2,
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.91,
    marginTop: DEVICE_HEIGHT * 0.025,
  },
  subContainerView: {
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.91,
  },
  crossIconViewStyle: {
    width: DEVICE_WIDTH * 0.064,
    height: DEVICE_WIDTH * 0.064,
  },
  howItWorksDescriptionStyle: {
    marginTop: DEVICE_HEIGHT * 0.036,
  },
  howItWorksHeaderTildeStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  howItWorksHeaderContainerStyle: {
    width: DEVICE_WIDTH,
    justifyContent: 'flex-end',
    paddingBottom: DEVICE_HEIGHT * 0.011,
    backgroundColor: color.palette.lightYellow,
  },
  howItWorksSubHeaderContainerStyle: {
    alignSelf: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    width: DEVICE_WIDTH * 0.915,
    justifyContent: 'space-between',
    paddingBottom: DEVICE_HEIGHT * 0.024,
  },

  // Claim Reward
  dotView: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginRight: DEVICE_WIDTH * 0.032,
  },
  dotFullView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: DEVICE_HEIGHT * 0.008,
  },
  shareViewStyle: {
    paddingHorizontal: wpx(16),
    backgroundColor: color.palette.lightYellow,
  },
  couponViewStyle: {
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    width: DEVICE_WIDTH * 0.91,
    height: DEVICE_HEIGHT * 0.083,
    justifyContent: 'space-between',
    marginTop: DEVICE_HEIGHT * 0.048,
    paddingHorizontal: DEVICE_WIDTH * 0.0426,
  },
  dotMainViewContainer: {
    marginTop: DEVICE_HEIGHT * 0.01,
  },
  claimRewardsImageStyle: {
    width: DEVICE_WIDTH * 0.91,
    alignSelf: 'center',
    height: DEVICE_WIDTH * 0.91 * 0.6,
    marginTop: DEVICE_HEIGHT * 0.023,
    borderRadius: 10,
    overflow: 'hidden',
  },
  claimRewardsDiscountView: {
    marginTop: DEVICE_HEIGHT * 0.024,
  },

  // futureRewards
  rewardsOverlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },

  bottomMarginView: {
    width: 1,
    height: DEVICE_HEIGHT * 0.05,
  },
  rewardsCountStyle: {
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.91,
    marginTop: DEVICE_HEIGHT * 0.018,
    marginBottom: DEVICE_HEIGHT * 0.006,
  },
  futureRewardButtonView: {
    marginTop: DEVICE_HEIGHT * 0.06,
  },
  shareAndDownloadContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: DEVICE_HEIGHT * 0.023,
  },
});
export const GoalsRewardsStyles = {...BaseStyles, ...styles};
