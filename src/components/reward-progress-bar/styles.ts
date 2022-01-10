import {StyleSheet, ViewStyle, ImageStyle} from 'react-native';

import {color} from '../../theme';
import {BaseStyles} from '../../utility/base-styles';
import {isAndroid} from '../../utility';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utility/constants';

const styles = StyleSheet.create<{
  iconStyle: ImageStyle;
  grayDotColor: ViewStyle;
  dotViewStyle: ViewStyle;
  whiteDotColor: ViewStyle;
  dateViewStyle: ViewStyle;
  blackTextStyle: ViewStyle;
  progressBarStyle: ViewStyle;
  mainContainerStyle: ViewStyle;
  iconContainerStyle: ViewStyle;
  textContainerStyle: ViewStyle;
  streakSliderViewStyle: ViewStyle;
  activeProgressBarStyle: ViewStyle;
  sliderCompleteViewStyle: ViewStyle;
  activeDotProgressBarStyle: ViewStyle;
}>({
  iconStyle: {
    width: DEVICE_WIDTH * 0.064,
    height: DEVICE_WIDTH * 0.064,
  },
  grayDotColor: {
    backgroundColor: color.palette.grey5,
  },
  dotViewStyle: {
    width: 5,
    height: 5,
    borderRadius: 5,
  },
  whiteDotColor: {
    backgroundColor: color.palette.white,
  },
  dateViewStyle: {
    paddingTop: DEVICE_HEIGHT * 0.023,
    paddingHorizontal: DEVICE_WIDTH * 0.0426,
  },
  blackTextStyle: {
    color: color.palette.black,
  },
  progressBarStyle: {
    height: 20,
    width: '100%',
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    backgroundColor: color.palette.grey6,
  },
  mainContainerStyle: {
    width: DEVICE_WIDTH * 0.832,
    paddingVertical: DEVICE_HEIGHT * 0.011,
  },
  iconContainerStyle: {
    flexDirection: 'row',
    paddingHorizontal: 2,
    justifyContent: 'space-between',
  },
  textContainerStyle: {
    flexDirection: 'row',
    paddingHorizontal: 0,
    justifyContent: 'space-between',
    marginTop: DEVICE_HEIGHT * 0.006,
  },
  streakSliderViewStyle: {
    borderRadius: 15,
    width: DEVICE_WIDTH * 0.91,
    height: DEVICE_HEIGHT * 0.184,
    marginTop: DEVICE_HEIGHT * 0.023,
  },
  activeProgressBarStyle: {
    height: 20,
    borderRadius: 10,
    position: 'absolute',
    bottom: isAndroid ? DEVICE_HEIGHT * 0.036 : 28.2,
  },
  sliderCompleteViewStyle: {
    paddingTop: DEVICE_HEIGHT * 0.011,
    paddingHorizontal: DEVICE_WIDTH * 0.0426,
  },
  activeDotProgressBarStyle: {
    height: 20,
    paddingLeft: 8,
    paddingRight: 8,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'space-between',
    bottom: isAndroid ? DEVICE_HEIGHT * 0.036 : 28.2,
  },
});
export const RewardProgressBarStyles = {...BaseStyles, ...styles};
