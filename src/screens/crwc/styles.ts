import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {color, spacingPresets} from '../../theme';
import {hpx, wpx} from '../../utility/responsive';
import {BaseStyles} from '../../utility/base-styles';
import {DEVICE_HEIGHT, DEVICE_WIDTH, isIos} from '../../utility';

const style = StyleSheet.create<{
  btnText: TextStyle;
  timerBg: ImageStyle;
  infoCircle: ImageStyle;
  distanceBg: ImageStyle;
  btnTextStyle: ViewStyle;
  cdDigitStyle: ViewStyle;
  tabViewStyle: ViewStyle;
  timerTextStyle: TextStyle;
  crwcLogoStyle: ImageStyle;
  bellIconStyle: ImageStyle;
  indicatorStyle: ViewStyle;
  shareViewStyle: ViewStyle;
  blackTextStyle: TextStyle;
  cdDigitTxtStyle: ViewStyle;
  tabContentStyle: ViewStyle;
  cdTimeLabelStyle: ViewStyle;
  cdSeparatorStyle: ViewStyle;
  commonIconStyle: ImageStyle;
  notiSubContainer: ViewStyle;
  tabMenuTextStyle: TextStyle;
  timerSubContainer: ViewStyle;
  tabContainerStyle: ViewStyle;
  timerDayTextStyle: TextStyle;
  distanceTitleText: TextStyle;
  mainContainerStyle: ViewStyle;
  labelContainerStyle: ViewStyle;
  bgCRWCDistanceStyle: ImageStyle;
  notificationViewStyle: ViewStyle;
  distanceTextSecondary: TextStyle;
  totalRunContainerStyle: ViewStyle;
  listItemContainerStyle: TextStyle;
  tabButtonMainContainer: ViewStyle;
  shareDownloadContainer: ViewStyle;
  secondaryLabelTextStyle: TextStyle;
  countDownContainerStyle: ViewStyle;
  sliderMiddleSpaceStyle: ImageStyle;
  notificationBellViewStyle: ViewStyle;
  labelContainerFocusedStyle: ViewStyle;
  tabContentMainContainerStyle: ViewStyle;
  totalRunContainerSecondaryStyle: ViewStyle;
}>({
  btnText: {
    color: color.palette.white,
  },
  timerBg: {
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    width: DEVICE_WIDTH * 0.91,
    height: DEVICE_WIDTH * 0.35,
  },
  infoCircle: {
    marginStart: hpx(10),
    width: DEVICE_WIDTH * 0.06,
    height: DEVICE_WIDTH * 0.06,
    tintColor: color.palette.green,
  },
  distanceBg: {
    padding: hpx(20),
    borderRadius: 10,
    marginTop: hpx(20),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: DEVICE_WIDTH * 0.91,
  },
  btnTextStyle: {
    height: 40,
    width: '97%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacingPresets.mediumPlus,
  },
  cdDigitStyle: {
    fontWeight: 'normal',
    fontFamily: 'Sarabun-Bold',
    backgroundColor: 'transparent',
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
  timerTextStyle: {
    fontSize: 22,
    color: color.palette.green,
  },
  crwcLogoStyle: {
    width: DEVICE_WIDTH * 0.21,
    height: DEVICE_WIDTH * 0.086,
  },
  bellIconStyle: {
    width: DEVICE_WIDTH * 0.054,
    height: DEVICE_WIDTH * 0.054,
    marginTop: -spacingPresets.tiny,
    marginLeft: DEVICE_WIDTH * 0.0427,
  },
  indicatorStyle: {
    height: 1,
  },
  shareViewStyle: {
    paddingHorizontal: wpx(16),
    backgroundColor: color.palette.lightYellow,
  },
  blackTextStyle: {
    fontSize: 14,
    color: color.palette.black,
  },
  cdDigitTxtStyle: {
    color: color.palette.green,
  },
  tabContentStyle: {
    alignContent: 'center',
  },
  cdTimeLabelStyle: {
    color: color.palette.white,
    fontWeight: 'bold',
  },
  cdSeparatorStyle: {
    paddingBottom: 15,
    color: color.palette.green,
  },
  commonIconStyle: {
    alignSelf: 'center',
    marginRight: wpx(15),
    width: DEVICE_WIDTH * 0.05,
    height: DEVICE_WIDTH * 0.05,
  },
  notiSubContainer: {
    flex: 1,
    padding: 10,
  },
  tabMenuTextStyle: {
    fontSize: 14,
  },
  timerSubContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerDayTextStyle: {
    fontSize: 9,
    color: color.palette.white,
  },
  distanceTitleText: {
    width: '45%',
  },
  mainContainerStyle: {
    flex: 1,
    backgroundColor: color.palette.lightYellow,
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
  bgCRWCDistanceStyle: {
    borderRadius: 20,
  },
  notificationViewStyle: {
    borderRadius: 15,
    alignSelf: 'center',
    flexDirection: 'row',
    width: DEVICE_WIDTH * 0.91,
    padding: DEVICE_WIDTH * 0.0427,
  },
  distanceTextSecondary: {
    marginLeft: '10%',
  },
  totalRunContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listItemContainerStyle: {
    borderRadius: wpx(20),
    marginBottom: DEVICE_HEIGHT * 0.012,
    paddingVertical: DEVICE_HEIGHT * 0.024,
    paddingHorizontal: DEVICE_WIDTH * 0.021,
    backgroundColor: color.palette.transparent,
  },
  tabButtonMainContainer: {
    height: hpx(40),
    marginTop: hpx(20),
    alignSelf: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    width: DEVICE_WIDTH * 0.91,
  },
  shareDownloadContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: DEVICE_HEIGHT * 0.014,
    marginRight: DEVICE_WIDTH * 0.026,
  },
  secondaryLabelTextStyle: {
    marginVertical: 0,
    borderStyle: 'solid',
  },
  countDownContainerStyle: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  sliderMiddleSpaceStyle: {
    marginTop: DEVICE_HEIGHT * 0.011,
  },
  notificationBellViewStyle: {
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: DEVICE_WIDTH * 0.05,
    height: DEVICE_WIDTH * 0.05,
  },
  labelContainerFocusedStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: DEVICE_HEIGHT * 0.05,
    width: (DEVICE_WIDTH * 0.915) / 2,
    borderTopLeftRadius: DEVICE_HEIGHT * 0.015,
    borderTopRightRadius: DEVICE_HEIGHT * 0.015,
  },
  tabContentMainContainerStyle: {
    alignItems: 'center',
    backgroundColor: color.palette.lightYellow,
  },
  totalRunContainerSecondaryStyle: {
    flexDirection: 'row',
    marginTop: hpx(10),
    justifyContent: 'space-between',
  },
});

export const SettingScreenStyles = {...BaseStyles, ...style};
