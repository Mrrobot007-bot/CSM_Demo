import {StyleSheet, ViewStyle, TextStyle, ImageStyle} from 'react-native';

import {color, spacingPresets} from '../../../theme';
import {hpx, wpx} from '../../../utility/responsive';
import {BaseStyles} from '../../../utility/base-styles';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../../utility';

const style = StyleSheet.create<{
  tildeView: ImageStyle;
  serialNoView: ViewStyle;
  addIconStyle: ImageStyle;
  tableMainView: ViewStyle;
  arrowIconStyle: ImageStyle;
  headerLabelStyle: TextStyle;
  upDownArrowStyle: ImageStyle;
  teamPercentageBar: ViewStyle;
  userTableMainView: ViewStyle;
  mainContainerStyle: ViewStyle;
  leaderBoardNameView: ViewStyle;
  leaderBoardImageView: ViewStyle;
  tableImageIconStyle: ImageStyle;
  tableDescriptionView: ViewStyle;
  arrowIconInactiveStyle: ImageStyle;
  teamNumberContainerStyle: ViewStyle;
  userBoardTextContainerStyle: ViewStyle;
  leaderBoardHeadingContainer: ViewStyle;
  leaderBoardAndViewMoreContainer: ViewStyle;
  teamLeaderBoardPart1containerStyle: ViewStyle;
  teamLeaderBoardPart2containerStyle: ViewStyle;
  teamLeaderBoardPart3containerStyle: ViewStyle;
  teamLeaderBoardPart4containerStyle: ViewStyle;
  teamLeaderBoardPart5containerStyle: ViewStyle;
}>({
  leaderBoardAndViewMoreContainer: {
    width: DEVICE_WIDTH * 0.82,
    marginTop: DEVICE_HEIGHT * 0.035,

    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leaderBoardHeadingContainer: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    backgroundColor: color.palette.black,
    paddingVertical: DEVICE_HEIGHT * 0.0075,
  },
  serialNoView: {
    color: color.palette.lightYellow,
  },
  leaderBoardImageView: {
    color: color.palette.lightYellow,
  },
  leaderBoardNameView: {
    color: color.palette.lightYellow,
  },
  tableMainView: {
    alignSelf: 'center',
    borderBottomWidth: 1,
    width: DEVICE_WIDTH * 0.829,
    borderBottomColor: color.palette.white,
    paddingVertical: spacingPresets.smaller,
  },

  userTableMainView: {
    alignSelf: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: DEVICE_WIDTH * 0.829,
    paddingVertical: DEVICE_HEIGHT * 0.013,
    borderBottomColor: color.palette.white,
  },
  tableImageIconStyle: {
    width: wpx(24),
    height: wpx(24),
    borderRadius: wpx(12),
  },
  tableDescriptionView: {
    marginTop: DEVICE_HEIGHT * 0.023,
  },

  headerLabelStyle: {
    color: color.palette.white,
  },

  upDownArrowStyle: {
    width: DEVICE_WIDTH * 0.042,
    height: DEVICE_WIDTH * 0.042,
  },

  teamLeaderBoardPart1containerStyle: {
    width: '10%',
    alignItems: 'center',
  },

  teamLeaderBoardPart2containerStyle: {
    width: '14%',
  },

  teamLeaderBoardPart3containerStyle: {
    width: '39%',
  },

  teamLeaderBoardPart4containerStyle: {
    width: '25%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  teamLeaderBoardPart5containerStyle: {
    width: '12%',
    alignItems: 'center',
  },

  arrowIconStyle: {
    width: DEVICE_WIDTH * 0.05,
    height: DEVICE_WIDTH * 0.05,
  },
  arrowIconInactiveStyle: {
    width: DEVICE_WIDTH * 0.05,
    height: DEVICE_WIDTH * 0.05,
    tintColor: color.palette.black,
  },

  teamPercentageBar: {
    width: '94.8%',
    alignSelf: 'center',
    marginTop: spacingPresets.smaller,
  },

  teamNumberContainerStyle: {
    width: 16,
    height: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.palette.darkGrey,
  },

  userBoardTextContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: spacingPresets.medium,
  },

  addIconStyle: {
    width: 16,
    height: 16,
    marginRight: spacingPresets.tiny,
  },
  tildeView: {
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.06,
    height: DEVICE_WIDTH * 0.06,
    paddingRight: DEVICE_WIDTH * 0.1,
  },

  mainContainerStyle: {
    flex: 1,
    width: wpx(343),
    marginTop: hpx(24),
    alignSelf: 'center',
  },
});
export const TeamLeaderBoardStyles = {...BaseStyles, ...style};
