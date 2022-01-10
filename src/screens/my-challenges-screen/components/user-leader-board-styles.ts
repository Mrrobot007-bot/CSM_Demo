import {StyleSheet, ViewStyle, TextStyle, ImageStyle} from 'react-native';

import {hpx, wpx} from '../../../utility/responsive';
import {color, spacingPresets} from '../../../theme';
import {BaseStyles} from '../../../utility/base-styles';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../../utility';

const style = StyleSheet.create<{
  serialNoView: ViewStyle;
  tableMainView: ViewStyle;
  addIconStyle: ImageStyle;
  whiteTextStyle: TextStyle;
  headerLabelStyle: TextStyle;
  upDownArrowStyle: ViewStyle;
  mainContainerStyle: ViewStyle;
  tableContainerStyle: ViewStyle;
  leaderBoardNameView: ViewStyle;
  leaderBoardImageView: ViewStyle;
  tableImageIconStyle: ImageStyle;
  tableDescriptionView: ViewStyle;
  mostImprovedListStyle: ViewStyle;
  mostImprovedMainStyle: ViewStyle;
  moreItemsTableMainView: ViewStyle;
  mostImprovedSectionStyle: ViewStyle;
  relayFooterContainerStyle: ViewStyle;
  userBoardTextContainerStyle: ViewStyle;
  leaderBoardHeadingContainer: ViewStyle;
  leaderboardItemContainerStyle: ViewStyle;
  meetUpFastestLeaderBoardStyle: ViewStyle;
  relayFooterTailContainerStyle: ViewStyle;
  leaderBoardAndViewMoreContainer: ViewStyle;
  relayFooterFirstRowContainerStyle: ViewStyle;
  relayFooterSecondRowContainerStyle: ViewStyle;
  userLeaderBoardPart1containerStyle: ViewStyle;
  userLeaderBoardPart2containerStyle: ViewStyle;
  userLeaderBoardPart3containerStyle: ViewStyle;
  userLeaderBoardPart4containerStyle: ViewStyle;
  userLeaderBoardPart5containerStyle: ViewStyle;
  userMostImprovedPart1containerStyle: ViewStyle;
  userMostImprovedPart2containerStyle: ViewStyle;
  userMostImprovedPart3containerStyle: ViewStyle;
  userMostImprovedPart4containerStyle: ViewStyle;
}>({
  leaderBoardAndViewMoreContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: DEVICE_WIDTH * 0.82,
    justifyContent: 'space-between',
    marginTop: DEVICE_HEIGHT * 0.035,
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
    flexDirection: 'row',
    alignItems: 'center',
    width: DEVICE_WIDTH * 0.829,
    backgroundColor: color.palette.grey12,
    paddingVertical: DEVICE_HEIGHT * 0.013,
    borderBottomColor: color.palette.white,
  },

  moreItemsTableMainView: {
    width: '100%',
    alignSelf: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: DEVICE_HEIGHT * 0.013,
    borderBottomColor: color.palette.white,
  },
  tableImageIconStyle: {
    width: wpx(24),
    height: wpx(24),
    borderRadius: wpx(24),
  },
  tableDescriptionView: {
    marginTop: DEVICE_HEIGHT * 0.023,
  },

  headerLabelStyle: {
    textAlign: 'center',
    color: color.palette.white,
  },

  upDownArrowStyle: {
    width: DEVICE_WIDTH * 0.042,
    height: DEVICE_WIDTH * 0.042,
  },

  userLeaderBoardPart1containerStyle: {
    width: '8.5%',
    alignItems: 'center',
  },

  userMostImprovedPart1containerStyle: {
    width: '9%',
    alignItems: 'center',
  },

  userLeaderBoardPart2containerStyle: {
    width: '14%',
    alignItems: 'center',
  },
  userMostImprovedPart2containerStyle: {
    width: '15%',
  },

  userLeaderBoardPart3containerStyle: {
    width: '43%',
    alignItems: 'flex-start',
  },

  userMostImprovedPart3containerStyle: {
    width: '36%',
    alignItems: 'flex-start',
  },

  userLeaderBoardPart4containerStyle: {
    width: '26%',
    alignItems: 'flex-start',
  },

  userMostImprovedPart4containerStyle: {
    width: '40%',
  },

  userLeaderBoardPart5containerStyle: {
    width: '8.5%',
  },

  mostImprovedSectionStyle: {
    width: '100%',
    borderRadius: 10,
    marginTop: DEVICE_HEIGHT * 0.024,
    paddingVertical: DEVICE_HEIGHT * 0.024,
    paddingHorizontal: DEVICE_WIDTH * 0.021,
  },

  mostImprovedListStyle: {
    marginVertical: DEVICE_HEIGHT * 0.012,
  },

  mostImprovedMainStyle: {
    marginTop: DEVICE_HEIGHT * 0.036,
  },

  meetUpFastestLeaderBoardStyle: {
    marginTop: DEVICE_HEIGHT * 0.036,
  },

  relayFooterTailContainerStyle: {
    width: '34.5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  relayFooterFirstRowContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  relayFooterSecondRowContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: DEVICE_HEIGHT * 0.024,
  },

  relayFooterContainerStyle: {
    borderBottomEndRadius: 5,
    borderBottomLeftRadius: 5,
    paddingVertical: DEVICE_HEIGHT * 0.012,
    paddingHorizontal: DEVICE_WIDTH * 0.021,
  },

  addIconStyle: {
    width: 16,
    height: 16,
    marginRight: spacingPresets.tiny,
  },

  userBoardTextContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: spacingPresets.medium,
  },
  whiteTextStyle: {
    color: color.palette.white,
  },

  leaderboardItemContainerStyle: {
    flex: 1,
    width: wpx(343),
    alignSelf: 'center',
  },

  mainContainerStyle: {
    flex: 1,
    width: wpx(343),
    marginTop: hpx(24),
    alignSelf: 'center',
  },

  tableContainerStyle: {
    width: wpx(343),
  },
});
export const UserLeaderBoardStyles = {...BaseStyles, ...style};
