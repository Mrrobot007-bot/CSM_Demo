import {ImageStyle, StyleSheet, ViewStyle} from 'react-native';

import {color} from '../../theme';
import {hpx, wpx} from '../../utility/responsive';
import {BaseStyles} from '../../utility/base-styles';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utility';

const style = StyleSheet.create<{
  flexRow: ViewStyle;
  noTeamView: ViewStyle;
  yellowText: ViewStyle;
  alignCenter: ViewStyle;
  activityView: ViewStyle;
  bioTextStyle: ViewStyle;
  profileImage: ImageStyle;
  teamImageStyle: ViewStyle;
  steaksMainView: ViewStyle;
  userMessageView: ViewStyle;
  rewardContainer: ImageStyle;
  rewardIconStyle: ImageStyle;
  rightArrowStyle: ImageStyle;
  teamTextContainer: ViewStyle;
  currentActivates: ViewStyle;
  userNameTextStyle: ViewStyle;
  mainContainerStyle: ViewStyle;
  teamMemberMainView: ViewStyle;
  rewardsNumberView: ViewStyle;
  noCurrentActivates: ViewStyle;
  steaksMainTextView: ViewStyle;
  noSteaksMainTextView: ViewStyle;
  teamImageTextContainer: ViewStyle;
  myCreatedTeamImageStyle: ImageStyle;
  rightArrowContainerView: ViewStyle;
  profileImageContainerStyle: ViewStyle;
  rewardsNumberViewContainer: ViewStyle;
}>({
  mainContainerStyle: {
    flex: 1,
    backgroundColor: color.palette.lightYellow,
    paddingTop: DEVICE_HEIGHT * 0.039,
  },
  alignCenter: {
    alignSelf: 'center',
  },
  userMessageView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    alignSelf: 'center',
    borderWidth: wpx(1),
    width: DEVICE_WIDTH * 0.2,
    height: DEVICE_WIDTH * 0.2,
    borderRadius: DEVICE_WIDTH * 0.2,
    borderColor: color.palette.lightYellow,
  },

  profileImageContainerStyle: {
    bottom: -DEVICE_WIDTH * 0.1,
  },
  userNameTextStyle: {
    marginTop: hpx(24),
    alignSelf: 'center',
    marginBottom: hpx(16),
    marginHorizontal: wpx(16),
  },
  bioTextStyle: {
    alignSelf: 'center',
    marginBottom: hpx(32),
    marginHorizontal: wpx(16),
  },
  noCurrentActivates: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginVertical: hpx(8),
    marginHorizontal: wpx(16),
  },
  currentActivates: {
    flexWrap: 'wrap',
    marginTop: hpx(8),
    flexDirection: 'row',
    marginBottom: hpx(32),
    marginHorizontal: wpx(16),
  },
  activityView: {
    flexWrap: 'wrap',
    marginTop: hpx(8),
    marginRight: wpx(8),
    alignItems: 'center',
    borderRadius: wpx(10),
    paddingVertical: hpx(4),
    justifyContent: 'center',
    paddingHorizontal: wpx(8),
    backgroundColor: color.palette.black,
  },
  steaksMainView: {
    width: wpx(343),
    alignSelf: 'center',
    borderRadius: hpx(15),
    marginVertical: hpx(16),
    backgroundColor: color.palette.grey11,
  },
  steaksMainTextView: {
    paddingVertical: hpx(16),
    paddingHorizontal: wpx(16),
  },
  noSteaksMainTextView: {
    paddingBottom: hpx(16),
    paddingHorizontal: wpx(16),
  },
  noTeamView: {
    width: wpx(343),
    alignSelf: 'center',
    marginVertical: hpx(16),
  },
  teamMemberMainView: {
    width: wpx(343),
    borderRadius: 10,
    marginTop: hpx(8),
    flexDirection: 'row',
    backgroundColor: color.palette.white,
  },
  teamImageTextContainer: {
    width: wpx(300),
    flexDirection: 'row',
  },
  teamImageStyle: {
    width: wpx(50),
    height: wpx(53),
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: 'grey',
    marginVertical: hpx(10),
    marginHorizontal: wpx(16),
  },
  teamTextContainer: {
    justifyContent: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
  myCreatedTeamImageStyle: {
    width: wpx(16),
    height: hpx(15),
    marginLeft: wpx(8),
  },
  rightArrowContainerView: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  rightArrowStyle: {
    width: wpx(24),
    height: hpx(24),
    marginLeft: wpx(8),
  },
  rewardsNumberViewContainer: {
    marginRight: 8,
  },
  rewardContainer: {
    width: 27,
    height: 27,
    marginRight: 4,
  },
  rewardIconStyle: {
    width: 27,
    height: 27,
  },
  rewardsNumberView: {
    left: 15,
    width: 20,
    height: 20,
    bottom: 15,
    borderWidth: 2,
    borderRadius: 20,
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: 'black',
    justifyContent: 'center',
    borderColor: color.palette.lightYellow,
  },
  yellowText: {
    color: color.palette.lightYellow,
  },
});

export const ProfileScreenStyle = {...BaseStyles, ...style};
