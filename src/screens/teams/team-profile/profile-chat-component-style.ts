import {StyleSheet, ViewStyle, TextStyle, ImageStyle} from 'react-native';
import {color, spacingPresets} from '../../../theme';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../../utility';
import {BaseStyles} from '../../../utility/base-styles';
import {wpx} from '../../../utility/responsive';

const style = StyleSheet.create<{
  blackText: TextStyle;
  progressView: ViewStyle;
  dateTextStyle: TextStyle;
  grayTextStyle: TextStyle;
  colonTextStyle: TextStyle;
  challengesImageStyle: any;
  progressBarView: ViewStyle;
  buttonTextStyle: TextStyle;
  sendButtonStyle: ViewStyle;
  userImageStyle: ImageStyle;
  buttonIconStyle: ImageStyle;
  progressViewTime: ViewStyle;
  boostrHeaderStyle: ViewStyle;
  boostrImageStyle: ImageStyle;
  part3ContainerStyle: ViewStyle;
  countDownIconStyle: ImageStyle;
  secondRowPart1Style: ViewStyle;
  part1ContainerStyle: ViewStyle;
  lightYellowTextStyle: ViewStyle;
  descriptionTextStyle: TextStyle;
  daysRemainingTextStyle: TextStyle;
  listItemContainerStyle: TextStyle;
  bottomButtonItemStyle: ImageStyle;
  mainTitleContainerStyle: ViewStyle;
  submitUserInfoViewStyle: ViewStyle;
  challengeInfo2ViewStyle: ViewStyle;
  getDayTimeContainerStyle: ViewStyle;
  showLeaderBoardTextStyle: TextStyle;
  submitUserInfo2ViewStyle: ViewStyle;
  submitClimbOpenViewStyle: ViewStyle;
  sendBoosterComponentStyle: ViewStyle;
  bottomButtonContainerStyle: ViewStyle;
  toggleSwitchContainerStyle: ViewStyle;
  farOutEndDateContainerStyle: ViewStyle;
  percentageBarContainerStyle: ViewStyle;
  submitDayRemainingViewStyle: ViewStyle;
  farOutCountDownContainerStyle: ViewStyle;
  percentageBarTimeContainerStyle: ViewStyle;
  submitDistancePercentageDiffLeftStyle: ViewStyle;
}>({
  sendBoosterComponentStyle: {
    elevation: 2,
    shadowRadius: 2,
    shadowOpacity: 0.2,
    shadowColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wpx(10),
    marginHorizontal: wpx(16),
    justifyContent: 'space-between',
    shadowOffset: {width: 0, height: 2},
    backgroundColor: color.palette.white,
    marginTop: wpx(spacingPresets.medium),
    marginBottom: wpx(spacingPresets.smaller),
    paddingVertical: wpx(spacingPresets.medium),
    paddingHorizontal: wpx(spacingPresets.smaller),
  },
  sendButtonStyle: {
    marginVertical: 0,
  },
  listItemContainerStyle: {
    elevation: 2,
    shadowRadius: 2,
    shadowOpacity: 0.2,
    shadowColor: '#000',
    borderRadius: wpx(10),
    shadowOffset: {width: 0, height: 2},
    marginBottom: DEVICE_HEIGHT * 0.012,
    backgroundColor: color.palette.white,
    paddingVertical: DEVICE_HEIGHT * 0.024,
    paddingHorizontal: DEVICE_WIDTH * 0.021,
    marginHorizontal: DEVICE_WIDTH * 0.042,
  },

  part1ContainerStyle: {
    flexDirection: 'row',
    marginBottom: DEVICE_HEIGHT * 0.0254,
  },

  userImageStyle: {
    width: DEVICE_WIDTH * 0.085,
    height: DEVICE_WIDTH * 0.085,
    marginRight: DEVICE_WIDTH * 0.021,
    borderRadius: DEVICE_WIDTH * 0.085,
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
    borderLeftWidth: 1,
    height: 20,
    marginLeft: 8,
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

  boostrHeaderStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
export const profileChatComponentStyles = {...BaseStyles, ...style};
