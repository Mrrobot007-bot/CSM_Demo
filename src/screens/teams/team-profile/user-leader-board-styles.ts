import {StyleSheet, ViewStyle, TextStyle, ImageStyle} from 'react-native';

import {wpx} from '../../../utility/responsive';
import {TeamProfileScreenStyle} from './styles';
import {color, spacingPresets} from '../../../theme';
import {BaseStyles} from '../../../utility/base-styles';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../../utility';

const style = StyleSheet.create<{
  serialNoView: ViewStyle;
  tableMainView: ViewStyle;
  addIconStyle: ImageStyle;
  arrowIconStyle: ImageStyle;
  headerLabelStyle: TextStyle;
  upDownArrowStyle: ViewStyle;
  teamPercentageBar: ViewStyle;
  userTableMainView: ViewStyle;
  leaderBoardNameView: ViewStyle;
  tableImageIconStyle: ImageStyle;
  tableDescriptionView: ViewStyle;
  leaderBoardImageView: ViewStyle;
  mostImprovedListStyle: ViewStyle;
  mostImprovedMainStyle: ViewStyle;
  moreItemsTableMainView: ViewStyle;
  arrowIconInactiveStyle: ImageStyle;
  teamNumberContainerStyle: ViewStyle;
  mostImprovedSectionStyle: ViewStyle;
  relayFooterContainerStyle: ViewStyle;
  leaderBoardHeadingContainer: ViewStyle;
  userBoardTextContainerStyle: ViewStyle;
  meetUpFastestLeaderBoardStyle: ViewStyle;
  relayFooterTailContainerStyle: ViewStyle;
  leaderBoardAndViewMoreContainer: ViewStyle;
  relayFooterFirstRowContainerStyle: ViewStyle;
  userLeaderBoardPart1containerStyle: ViewStyle;
  userLeaderBoardPart2containerStyle: ViewStyle;
  userLeaderBoardPart3containerStyle: ViewStyle;
  userLeaderBoardPart4containerStyle: ViewStyle;
  userLeaderBoardPart5containerStyle: ViewStyle;
  relayFooterSecondRowContainerStyle: ViewStyle;
  teamLeaderBoardPart1containerStyle: ViewStyle;
  teamLeaderBoardPart2containerStyle: ViewStyle;
  teamLeaderBoardPart3containerStyle: ViewStyle;
  teamLeaderBoardPart4containerStyle: ViewStyle;
  teamLeaderBoardPart5containerStyle: ViewStyle;
  userMostImprovedPart1containerStyle: ViewStyle;
  userMostImprovedPart2containerStyle: ViewStyle;
  userMostImprovedPart3containerStyle: ViewStyle;
  userMostImprovedPart4containerStyle: ViewStyle;
}>({
  leaderBoardAndViewMoreContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
    width: wpx(343),
    alignSelf: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.palette.white,
    paddingVertical: DEVICE_HEIGHT * 0.013,
    borderBottomColor: color.palette.grey12,
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
    color: color.palette.white,
    textAlign: 'center',
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
  teamNumberContainerStyle: {
    backgroundColor: color.palette.darkGrey,
    width: 16,
    height: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  teamPercentageBar: {
    width: '94.8%',
    alignSelf: 'center',
    marginTop: spacingPresets.smaller,
  },
  userTableMainView: {
    paddingVertical: DEVICE_HEIGHT * 0.013,
    alignSelf: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: color.palette.white,
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
});
export const UserLeaderBoardStyles = {
  ...BaseStyles,
  ...style,
  ...TeamProfileScreenStyle,
};
