import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {color} from '../../../theme';
import {hpx, wpx} from '../../../utility/responsive';
import {BaseStyles} from '../../../utility/base-styles';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../../utility';

const style = StyleSheet.create<{
  profileImage: ViewStyle;
  bioTextStyle: ViewStyle;
  tabViewStyle: ViewStyle;
  indicatorStyle: ViewStyle;
  userNameTextStyle: ViewStyle;
  mainContainerStyle: ViewStyle;
  labelContainerStyle: ViewStyle;
  labelContainerFocusedStyle: ViewStyle;

  // currentWeek style
  activityView: ViewStyle;
  marginStyle: ViewStyle;
  tildeIconView: ImageStyle;
  tildeIconViewShare: ImageStyle;
  activityContainerStyle: ViewStyle;

  //editChallenge
  lineVew: ViewStyle;
  archiveIcon: ImageStyle;
  exitIconStyle: ImageStyle;
  archiveTextStyle: TextStyle;
  leaveChallengeContainerStyle: ViewStyle;

  // tab
  flexRow: ViewStyle;
  manageView: ViewStyle;
  dateContainer: ViewStyle;
  teamImageStyle: ImageStyle;
  tabMainContainer: ViewStyle;
  mainContainerScrollViewStyle: ViewStyle;
}>({
  mainContainerStyle: {
    flex: 1,
    backgroundColor: color.palette.lightYellow,
  },
  profileImage: {
    height: wpx(100),
    width: wpx(100),
    alignSelf: 'center',
    borderRadius: wpx(100),
  },
  userNameTextStyle: {
    alignSelf: 'center',
    marginTop: hpx(16),
    marginBottom: hpx(4),
    marginHorizontal: wpx(16),
  },
  bioTextStyle: {
    marginTop: hpx(16),
    alignSelf: 'center',
    marginBottom: hpx(32),
    marginHorizontal: wpx(16),
  },
  indicatorStyle: {
    height: 1,
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
    width: (DEVICE_WIDTH * 0.915) / 3,
    borderTopLeftRadius: DEVICE_HEIGHT * 0.015,
    borderTopRightRadius: DEVICE_HEIGHT * 0.015,
  },

  labelContainerFocusedStyle: {
    width: (DEVICE_WIDTH * 0.915) / 3,
    alignItems: 'center',
    paddingTop: 6,
    borderTopLeftRadius: DEVICE_HEIGHT * 0.015,
    borderTopRightRadius: DEVICE_HEIGHT * 0.015,
    height: DEVICE_HEIGHT * 0.056,
    justifyContent: 'center',
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
  activityContainerStyle: {
    width: wpx(327),
    height: hpx(54),
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'row',
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
    justifyContent: 'center',
    paddingHorizontal: wpx(8),
  },
  marginStyle: {
    marginLeft: wpx(8),
  },

  lineVew: {
    height: 1,
    marginTop: hpx(32),
    width: DEVICE_WIDTH * 0.91,
  },
  archiveIcon: {
    width: wpx(20),
    height: hpx(20),
    marginRight: wpx(6),
  },
  archiveTextStyle: {
    marginRight: wpx(16),
  },
  leaveChallengeContainerStyle: {
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: hpx(24),
    marginTop: DEVICE_HEIGHT * 0.024,
  },

  exitIconStyle: {
    width: DEVICE_WIDTH * 0.053,
    height: DEVICE_WIDTH * 0.053,
    marginRight: DEVICE_WIDTH * 0.02,
  },

  tabMainContainer: {
    flex: 1,
    width: wpx(343),
    alignSelf: 'center',
  },
  dateContainer: {
    width: wpx(343),
    height: hpx(46),
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hpx(8),
    paddingHorizontal: wpx(10),
    justifyContent: 'space-between',
    backgroundColor: color.palette.grey10,
  },
  flexRow: {
    flexDirection: 'row',
  },
  manageView: {
    marginTop: hpx(12),
    alignItems: 'center',
  },

  teamImageStyle: {
    borderRadius: 15,
    alignSelf: 'center',
    borderWidth: wpx(2),
    width: DEVICE_WIDTH * 0.2,
    height: DEVICE_WIDTH * 0.2,
    borderColor: color.palette.lightYellow,
  },

  mainContainerScrollViewStyle: {
    marginTop: DEVICE_WIDTH * 0.12,
  },
});

export const TeamProfileScreenStyle = {...BaseStyles, ...style};
