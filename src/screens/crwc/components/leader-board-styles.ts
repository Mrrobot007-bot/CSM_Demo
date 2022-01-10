import {StyleSheet, ViewStyle, TextStyle, ImageStyle} from 'react-native';

import {color, spacingPresets} from '../../../theme';
import {hpx, wpx} from '../../../utility/responsive';
import {BaseStyles} from '../../../utility/base-styles';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../../utility';

const style = StyleSheet.create<{
  viewMore: ViewStyle;
  blackText: TextStyle;
  tildeView: ImageStyle;
  sectionStyle: ViewStyle;
  serialNoView: ViewStyle;
  addIconStyle: ImageStyle;
  tableMainView: ViewStyle;
  arrowIconStyle: ImageStyle;
  headerLabelStyle: TextStyle;
  upDownArrowStyle: ImageStyle;
  userTableMainView: ViewStyle;
  teamPercentageBar: ViewStyle;
  dataContainerStyle: ViewStyle;
  leaderBoardNameView: ViewStyle;
  leaderBoardContainer: ViewStyle;
  leaderBoardImageView: ViewStyle;
  tableImageIconStyle: ImageStyle;
  tableDescriptionView: ViewStyle;
  arrowIconInactiveStyle: ImageStyle;
  mainTitleContainerStyle: ViewStyle;
  teamNumberContainerStyle: ViewStyle;
  leaderBoardHeadingContainer: ViewStyle;
  userBoardTextContainerStyle: ViewStyle;
  companyTableImageIconStyle: ImageStyle;
  leaderBoardMainContainerStyle: ViewStyle;
  leaderBoardItemContainerStyle: ViewStyle;
  leaderBoardAndViewMoreContainer: ViewStyle;
  teamLeaderBoardPart1containerStyle: ViewStyle;
  teamLeaderBoardPart2containerStyle: ViewStyle;
  teamLeaderBoardPart3containerStyle: ViewStyle;
  teamLeaderBoardPart4containerStyle: ViewStyle;
  teamLeaderBoardPart5containerStyle: ViewStyle;
}>({
  viewMore: {
    flex: 1,
    height: hpx(10),
    marginEnd: wpx(20),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  blackText: {
    color: color.palette.black,
  },
  tildeView: {
    width: DEVICE_WIDTH * 0.06,
    height: DEVICE_WIDTH * 0.06,
  },
  serialNoView: {
    color: color.palette.lightYellow,
  },
  sectionStyle: {
    height: hpx(50),
  },
  addIconStyle: {
    width: wpx(16),
    height: hpx(16),
    marginRight: spacingPresets.tiny,
  },
  tableMainView: {
    alignSelf: 'center',
    borderBottomWidth: 1,
    width: DEVICE_WIDTH * 0.91,
    borderBottomColor: color.palette.white,
    paddingVertical: spacingPresets.smaller,
  },
  arrowIconStyle: {
    width: DEVICE_WIDTH * 0.05,
    height: DEVICE_WIDTH * 0.05,
  },
  headerLabelStyle: {
    color: color.palette.white,
  },
  upDownArrowStyle: {
    width: DEVICE_WIDTH * 0.042,
    height: DEVICE_WIDTH * 0.042,
  },
  userTableMainView: {
    alignSelf: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: DEVICE_WIDTH * 0.829,
    paddingVertical: DEVICE_HEIGHT * 0.013,
    borderBottomColor: color.palette.white,
    backgroundColor: color.palette.lightYellow_50,
  },
  teamPercentageBar: {
    width: '94.8%',
    alignSelf: 'center',
    marginTop: spacingPresets.smaller,
  },
  dataContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leaderBoardNameView: {
    color: color.palette.lightYellow,
  },
  leaderBoardContainer: {
    backgroundColor: color.palette.lightYellow,
  },
  leaderBoardImageView: {
    color: color.palette.lightYellow,
  },
  tableImageIconStyle: {
    width: wpx(40),
    height: wpx(15),
    resizeMode: 'contain',
  },
  tableDescriptionView: {
    marginTop: DEVICE_HEIGHT * 0.023,
  },
  arrowIconInactiveStyle: {
    width: DEVICE_WIDTH * 0.05,
    height: DEVICE_WIDTH * 0.05,
    tintColor: color.palette.black,
  },
  mainTitleContainerStyle: {
    marginTop: DEVICE_HEIGHT * 0.025,
    marginBottom: spacingPresets.small,
  },
  teamNumberContainerStyle: {
    width: 20,
    height: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leaderBoardHeadingContainer: {
    width: DEVICE_WIDTH * 0.91,
    backgroundColor: color.palette.black,
    alignSelf: 'center',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: DEVICE_HEIGHT * 0.0075,
  },
  userBoardTextContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacingPresets.medium,
  },
  companyTableImageIconStyle: {
    width: wpx(24),
    height: wpx(24),
    borderRadius: wpx(12),
  },
  leaderBoardMainContainerStyle: {
    flex: 1,
    marginTop: hpx(24),
    width: DEVICE_WIDTH * 0.91,
    alignSelf: 'center',
  },
  leaderBoardItemContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leaderBoardAndViewMoreContainer: {
    marginTop: DEVICE_HEIGHT * 0.035,
    width: DEVICE_WIDTH * 0.82,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
});
export const TeamLeaderBoardStyles = {...BaseStyles, ...style};
