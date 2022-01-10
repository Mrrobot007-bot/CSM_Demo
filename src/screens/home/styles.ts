import {StyleSheet, ViewStyle, TextStyle, ImageStyle} from 'react-native';

import {hpx} from '../../utility/responsive';
import {color, spacingPresets} from '../../theme';
import {SettingScreenStyles} from '../crwc/styles';
import {BaseStyles} from '../../utility/base-styles';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utility/constants';

const style = StyleSheet.create<{
  mainContainer: ViewStyle;
  grayTextStyle: TextStyle;
  blackTextStyle: TextStyle;
  bellIconStyle: ImageStyle;
  dismissTextStyle: ViewStyle;
  wellnessViewStyle: ViewStyle;
  lightGrayTextStyle: TextStyle;
  wellnessImageStyle: ImageStyle;
  closeIconViewStyle: ImageStyle;
  notificationViewStyle: ViewStyle;
  wellnessImageViewStyle: ViewStyle;
  secondaryLabelTextStyle: TextStyle;
  sliderMiddleSpaceStyle: ImageStyle;
  mainTitleContainerStyle: ViewStyle;
  crwcTimerContainerStyle: ImageStyle;
  startTrackingButtonStyle: ViewStyle;
  wellnessDescriptionStyle: TextStyle;
  notificationBellTextStyle: ViewStyle;
  notificationBellViewStyle: ViewStyle;
  crwcInfoIconContainerStyle: ViewStyle;
  notificationDismissViewStyle: ViewStyle;
  wellnessListFootComponentStyle: ViewStyle;
}>({
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

  closeIconViewStyle: {
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.04,
    height: DEVICE_WIDTH * 0.04,
  },
  notificationDismissViewStyle: {
    marginEnd: 16,
    borderRadius: 15,
    alignSelf: 'center',
    backgroundColor: 'black',
    justifyContent: 'center',
    width: DEVICE_WIDTH * 0.133,
    height: DEVICE_HEIGHT * 0.07,
  },
  dismissTextStyle: {
    alignSelf: 'center',
    color: color.palette.white,
  },

  blackTextStyle: {
    color: color.palette.black,
  },

  grayTextStyle: {
    color: color.palette.grey5,
  },

  lightGrayTextStyle: {
    color: color.palette.grey9,
  },
  sliderMiddleSpaceStyle: {
    marginTop: DEVICE_HEIGHT * 0.011,
  },
  wellnessViewStyle: {
    elevation: 2,
    shadowRadius: 2,
    borderRadius: 20,
    shadowOpacity: 0.2,
    shadowColor: '#000',
    alignSelf: 'center',
    flexDirection: 'row',
    paddingVertical: hpx(8),
    width: DEVICE_WIDTH * 0.91,
    marginTop: DEVICE_HEIGHT * 0.035,
    shadowOffset: {width: 0, height: 2},
    backgroundColor: color.palette.white,
    paddingHorizontal: DEVICE_WIDTH * 0.021,
  },
  wellnessImageViewStyle: {
    flex: 1,
    paddingLeft: DEVICE_WIDTH * 0.042,
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
    width: DEVICE_WIDTH * 0.185,
    height: DEVICE_WIDTH * 0.185,
  },
  notificationViewStyle: {
    borderRadius: 15,
    flexDirection: 'row',
    alignSelf: 'center',
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
  wellnessListFootComponentStyle: {
    width: 1,
    height: DEVICE_HEIGHT * 0.07,
  },

  wellnessDescriptionStyle: {
    marginTop: 2,
  },
  crwcTimerContainerStyle: {
    borderRadius: hpx(20),
  },
  crwcInfoIconContainerStyle: {
    height: DEVICE_WIDTH * 0.1,
  },
});

export const HomeStyles = {...BaseStyles, ...SettingScreenStyles, ...style};
