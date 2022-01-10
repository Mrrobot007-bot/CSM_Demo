import {StyleSheet, ViewStyle, TextStyle, ImageStyle} from 'react-native';
import {color, spacingPresets} from '../../theme';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utility/constants';
import {BaseStyles} from '../../utility/base-styles';


const styles = StyleSheet.create<{
  flexRow: ViewStyle;
  grayText: TextStyle;
  blackText: TextStyle;
  stepsText: ImageStyle;
  goalActivity: ViewStyle;
  progressView: ViewStyle;
  goalContainer: ViewStyle;
  blueTextStyle: ViewStyle;
  titleContainer: ViewStyle;
  tildeIconView: ImageStyle;
  blackTextStyle: ViewStyle;
  stepsCountView: ViewStyle;
  progressBarView: ViewStyle;
  lightYellowText: ViewStyle;
  progressViewTime: ViewStyle;
  yourGoalTextView: TextStyle;
  goalActivityInner: ViewStyle;
  mainTitleContainer: ViewStyle;
  submitUserInfoView: ViewStyle;
  sliderMiddleSpace: ImageStyle;
  mainContainerStyle: ViewStyle;
  shareContainerStyle: ViewStyle;
  noDataContainerStyle: ViewStyle;
  lightYellowTextStyle: ViewStyle;
  goalActivityMiddleLine: ViewStyle;
  secondaryLabelTextStyle: TextStyle;
  submitUserInfoViewInner: ViewStyle;
  submitPercentageCompleteView: ViewStyle;
  submitDistancePercentageDiffLeft: ViewStyle;
  submitDistancePercentageDiffRight: ViewStyle;
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
  progressView: {
    marginTop: spacingPresets.medium,
    paddingHorizontal: DEVICE_WIDTH * 0.021,
  },
  goalContainer: {
    borderRadius: 25,
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.91,
    marginTop: DEVICE_HEIGHT * 0.024,
    paddingBottom: DEVICE_HEIGHT * 0.024,
    backgroundColor: color.palette.white,
    paddingHorizontal: DEVICE_WIDTH * 0.0425,
  },
  blueTextStyle: {},
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: DEVICE_WIDTH * 0.043,
  },
  tildeIconView: {
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.05,
    height: DEVICE_WIDTH * 0.05,
   
    paddingRight: DEVICE_WIDTH * 0.1,
  },
  blackTextStyle: {
    color: color.palette.black,
  },
  stepsCountView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: DEVICE_HEIGHT * 0.005,
  },
  progressBarView: {
    width: DEVICE_WIDTH * 0.75,
  },
  lightYellowTextStyle: {
    color: color.palette.lightYellow_50,
  },
  goalActivityInner: {
    justifyContent: 'center',
    width: DEVICE_WIDTH * 0.413,
    paddingLeft: DEVICE_WIDTH * 0.042,
  },
  mainTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: DEVICE_HEIGHT * 0.035,
  },

  shareContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: DEVICE_HEIGHT * 0.014,
    marginRight: DEVICE_WIDTH * 0.026,
  },
  mainContainerStyle: {
    backgroundColor: color.palette.white,
  },
  submitPercentageCompleteView: {
    flexDirection: 'row',
    paddingTop: DEVICE_HEIGHT * 0.002,
  },
  submitDistancePercentageDiffRight: {
    paddingRight: DEVICE_WIDTH * 0.021,
  },
  submitDistancePercentageDiffLeft: {
    paddingLeft: DEVICE_WIDTH * 0.021,
  },

  lightYellowText: {
    color: color.palette.lightYellow,
  },
  submitUserInfoViewInner: {
    alignItems: 'center',
    justifyContent: 'center',
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

  secondaryLabelTextStyle: {
    marginVertical: 0,
    borderStyle: 'solid',
  },

  goalActivityMiddleLine: {
    width: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    height: DEVICE_HEIGHT * 0.06,
    backgroundColor: color.palette.grey6,
  },

  yourGoalTextView: {
    color: color.palette.black,
  },

  sliderMiddleSpace: {
    marginTop: DEVICE_HEIGHT * 0.011,
  },

  progressViewTime: {
    marginTop: spacingPresets.tiny,
    paddingHorizontal: DEVICE_WIDTH * 0.021,
  },

  noDataContainerStyle: {
    alignItems: 'center',
    padding: spacingPresets.mediumPlus,
    marginTop: DEVICE_HEIGHT * 0.024,
  },
});
export const ActivityIndicatorStyles = {...BaseStyles, ...styles};
