import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {color} from '../../theme';
import {hpx, wpx} from '../../utility/responsive';
import {BaseStyles} from '../../utility/base-styles';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utility';

const style = StyleSheet.create<{
  flexRow: ViewStyle;
  dateTextStyle: TextStyle;
  grayTextStyle: TextStyle;
  blackTextStyle: TextStyle;
  bellIconStyle: ImageStyle;
  buttonTextStyle: TextStyle;
  userImageStyle: ImageStyle;
  buttonIconStyle: ImageStyle;
  challengeNameView: ViewStyle;
  boostrImageStyle: ImageStyle;
  challengeTextStyle: TextStyle;
  mainContainerStyle: ViewStyle;
  part1ContainerStyle: ViewStyle;
  notificationViewStyle: ViewStyle;
  listItemContainerStyle: TextStyle;
  bottomButtonItemStyle: ImageStyle;
  secondaryLabelTextStyle: TextStyle;
  sliderMiddleSpaceStyle: ImageStyle;
  notificationBellViewStyle: ViewStyle;
  notificationBellTextStyle: ViewStyle;
  bottomButtonContainerStyle: ViewStyle;
}>({
  notificationBellTextStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: DEVICE_WIDTH * 0.82,
    justifyContent: 'space-between',
    paddingHorizontal: DEVICE_HEIGHT * 0.01,
  },
  notificationViewStyle: {
    borderRadius: 15,
    alignSelf: 'center',
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
  sliderMiddleSpaceStyle: {
    marginTop: DEVICE_HEIGHT * 0.011,
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
  blackTextStyle: {
    color: color.palette.black,
  },
  flexRow: {
    flexDirection: 'row',
  },
  challengeNameView: {
    borderRadius: wpx(10),
    paddingVertical: hpx(2),
    paddingHorizontal: wpx(8),
    backgroundColor: color.palette.darkGrey,
  },
  challengeTextStyle: {
    color: color.palette.lightYellow,
  },
  mainContainerStyle: {
    backgroundColor: color.palette.lightYellow,
    flex: 1,
    width: wpx(343),
    alignSelf: 'center',
  },

  listItemContainerStyle: {
    elevation: 2,
    shadowRadius: 2,
    shadowOpacity: 0.2,
    shadowColor: '#000',
    borderRadius: wpx(20),
    shadowOffset: {width: 0, height: 2},
    marginBottom: DEVICE_HEIGHT * 0.012,
    backgroundColor: color.palette.white,
    paddingVertical: DEVICE_HEIGHT * 0.024,
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
    justifyContent: 'space-between',
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

  grayTextStyle: {
    color: color.palette.grey5,
  },
});

export const NewsFeedScreenStyles = {...BaseStyles, ...style};
