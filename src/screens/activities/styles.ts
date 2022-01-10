import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {color, spacingPresets} from '../../theme';
import {hpx, wpx} from '../../utility/responsive';
import {BaseStyles} from '../../utility/base-styles';
import {DEVICE_HEIGHT, DEVICE_WIDTH, isAndroid} from '../../utility';

const styles = StyleSheet.create<{
  flexRow: ViewStyle;
  tabView: ViewStyle;
  textStyle: TextStyle;
  tildeView: ImageStyle;
  marginStyle: ViewStyle;
  tabViewStyle: ViewStyle;
  activityView: ViewStyle;
  tabContainer: ViewStyle;
  indicatorStyle: ViewStyle;
  tildeIconView: ImageStyle;
  grayBorderStyle: ViewStyle;
  shareIconStyle: ImageStyle;
  tabViewTextStyle: ViewStyle;
  stepsButtonStyle: ViewStyle;
  mainContainerStyle: ViewStyle;
  labelContainerStyle: ViewStyle;
  tildeIconViewShare: ImageStyle;
  distanceButtonStyle: ViewStyle;
  shareContainerStyle: ViewStyle;
  shareMainContainerStyle: ViewStyle;
  descriptionViewStyle: ViewStyle;
  activityContainerStyle: ViewStyle;
  rightIconContainerStyle: ViewStyle;
  rightComponentIconStyle: ImageStyle;
  labelContainerFocusedStyle: ViewStyle;

  //bar chart
  mainStyle: ViewStyle;
  barLabelStyle: TextStyle;
  barTypeLabelStyle: TextStyle;
  noDataTextStyle: TextStyle;
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
  shareMainContainerStyle: {
    backgroundColor: '#fff',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  shareContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
    margin: 10,
  },
  tildeIconView: {
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.05,
    height: DEVICE_WIDTH * 0.05,
  },
  tildeIconViewShare: {
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.05,
    height: DEVICE_WIDTH * 0.05,
    paddingRight: DEVICE_WIDTH * 0.1,
  },
  tabContainer: {
    flex: 1,
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.91,
  },
  tabView: {
    width: wpx(343),
    height: hpx(40),
    borderRadius: 26,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hpx(8),
    justifyContent: 'space-between',
    backgroundColor: color.palette.grey10,
  },
  tabViewTextStyle: {
    width: wpx(167),
    height: hpx(32),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {},
  distanceButtonStyle: {
    width: wpx(167),
    height: hpx(32),
    marginRight: wpx(8),
  },
  stepsButtonStyle: {
    width: wpx(167),
    height: hpx(32),
    marginLeft: wpx(8),
  },
  descriptionViewStyle: {
    width: wpx(343),
    padding: hpx(8),
    // borderRadius: 25,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    backgroundColor: color.palette.white,
  },
  shareIconStyle: {
    alignSelf: 'center',
    marginRight: wpx(10),
    width: DEVICE_WIDTH * 0.05,
    height: DEVICE_WIDTH * 0.05,
  },
  activityContainerStyle: {
    width: wpx(327),
    height: hpx(54),
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hpx(8),
    paddingHorizontal: wpx(15),
    justifyContent: 'space-between',
    backgroundColor: color.palette.grey11,
  },
  activityView: {
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hpx(2),
    paddingHorizontal: wpx(8),
    justifyContent: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
  grayBorderStyle: {
    borderColor: color.textInputPlaceHolderText,
  },
  marginStyle: {
    marginLeft: wpx(8),
  },
  tildeView: {
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.06,
    height: DEVICE_WIDTH * 0.06,
    paddingRight: DEVICE_WIDTH * 0.1,
  },

  barTypeLabelStyle: {
    marginLeft: 15,
    marginBottom: -40,
    color: color.palette.grey9,
  },

  barLabelStyle: {
    color: color.palette.grey9,
  },

  noDataTextStyle: {
    textAlign: 'center',
    marginVertical: DEVICE_HEIGHT * 0.02,
  },

  mainStyle: {
    marginLeft: isAndroid ? -spacingPresets.smaller : 0,
  },
});

export const ActivitiesStyles = {...BaseStyles, ...styles};
