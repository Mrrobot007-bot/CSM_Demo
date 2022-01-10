import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {HomeStyles} from '../home/styles';
import {color, spacingPresets} from '../../theme';
import {hpx, wpx} from '../../utility/responsive';
import {BaseStyles} from '../../utility/base-styles';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utility';

const style = StyleSheet.create<{
  flexRow: ViewStyle;
  noTeamView: ViewStyle;
  yellowText: ViewStyle;
  profileImage: ViewStyle;
  activityView: ViewStyle;
  bioTextStyle: ViewStyle;
  steaksMainView: ViewStyle;
  infoIconStyle: ImageStyle;
  teamImageStyle: ImageStyle;
  rewardIconStyle: ViewStyle;
  rewardContainer: ViewStyle;
  buttonContainer: ViewStyle;
  currentActivates: ViewStyle;
  rightArrowStyle: ImageStyle;
  userNameTextStyle: ViewStyle;
  teamTextContainer: ViewStyle;
  rewardsNumberView: ViewStyle;
  listMainContainer: ViewStyle;
  acceptButtonStyle: ViewStyle;
  userDisplayStyle: ImageStyle;
  teamMemberMainView: ViewStyle;
  mainContainerStyle: ViewStyle;
  steaksMainTextView: ViewStyle;
  declineButtonStyle: TextStyle;
  noCurrentActivates: ViewStyle;
  teamStatusTextStyle: TextStyle;
  inviteByImageStyle: ImageStyle;
  descriptionTextStyle: TextStyle;
  archiveMainContainer: ViewStyle;
  noSteaksMainTextView: ViewStyle;
  manageInviteIconStyle: ImageStyle;
  teamImageTextContainer: ViewStyle;
  rightArrowContainerView: ViewStyle;
  keyBoardScrollViewStyle: ViewStyle;
  myCreatedTeamImageStyle: ImageStyle;
  submitClimbOpenViewStyle: ViewStyle;
  inviteTeamRenderListStyle: ViewStyle;
  archiveListInputContainer: ViewStyle;
  archiveSuggestionInputView: ViewStyle;
  rewardsNumberViewContainer: ViewStyle;
  manageInvitesContainerStyle: ViewStyle;
  archiveDescriptionContainer: ViewStyle;
}>({
  mainContainerStyle: {
    flex: 1,
    alignSelf: 'center',
  },

  teamStatusTextStyle: {
    color: color.textInputPlaceHolderText,
  },

  keyBoardScrollViewStyle: {
    paddingTop: DEVICE_HEIGHT * 0.01,
    paddingBottom: DEVICE_HEIGHT * 0.03,
  },
  profileImage: {
    width: wpx(100),
    height: wpx(100),
    alignSelf: 'center',
    borderRadius: wpx(100),
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
    marginVertical: hpx(16),
    marginHorizontal: wpx(16),
  },
  currentActivates: {
    flexWrap: 'wrap',
    marginTop: hpx(16),
    flexDirection: 'row',
    marginBottom: hpx(32),
    marginHorizontal: wpx(16),
  },
  activityView: {
    flexWrap: 'wrap',
    marginTop: hpx(8),
    marginLeft: wpx(8),
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
    bottom: 15,
    height: 20,
    borderWidth: 2,
    borderRadius: 20,
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'black',
    justifyContent: 'center',
    borderColor: color.palette.lightYellow,
  },
  yellowText: {
    color: color.palette.lightYellow,
  },
  // invite challenge styles
  listMainContainer: {
    borderRadius: 25,
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.91,
    marginTop: DEVICE_HEIGHT * 0.012,
    backgroundColor: color.palette.white,
    paddingHorizontal: DEVICE_WIDTH * 0.042,
    paddingVertical: DEVICE_HEIGHT * 0.023,
  },
  inviteByImageStyle: {
    borderRadius: 10,
    width: DEVICE_WIDTH * 0.83,
    marginTop: DEVICE_HEIGHT * 0.011,
    height: DEVICE_WIDTH * 0.83 * 0.6,
  },
  descriptionTextStyle: {
    marginTop: DEVICE_HEIGHT * 0.023,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  declineButtonStyle: {
    marginRight: DEVICE_WIDTH * 0.162,
  },
  acceptButtonStyle: {
    marginVertical: 0,
    width: DEVICE_WIDTH * 0.41,
  },

  infoIconStyle: {
    width: DEVICE_WIDTH * 0.064,
    height: DEVICE_WIDTH * 0.064,
  },
  submitClimbOpenViewStyle: {
    zIndex: -1,
    marginTop: -5,
    alignSelf: 'center',
    borderBottomEndRadius: 10,
    width: DEVICE_WIDTH * 0.91,
    borderBottomStartRadius: 10,
    backgroundColor: color.palette.white,
    paddingBottom: DEVICE_HEIGHT * 0.024,
    paddingHorizontal: DEVICE_WIDTH * 0.045,
  },
  userDisplayStyle: {
    width: DEVICE_WIDTH * 0.0426,
    height: DEVICE_WIDTH * 0.0426,
    paddingLeft: DEVICE_WIDTH * 0.01,
    marginRight: DEVICE_WIDTH * 0.01,
    borderRadius: DEVICE_WIDTH * 0.0426,
  },

  manageInviteIconStyle: {
    width: DEVICE_WIDTH * 0.053,
    height: DEVICE_WIDTH * 0.053,
    marginRight: spacingPresets.tiny,
  },

  manageInvitesContainerStyle: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    margin: spacingPresets.medium,
  },
  archiveMainContainer: {
    flex: 1,
    marginVertical: hpx(16),
    width:'100%'
  },
  archiveDescriptionContainer: {
    paddingTop: hpx(16),
    paddingHorizontal: wpx(16),
  },
  archiveSuggestionInputView: {
    paddingVertical: 0,
    paddingTop: hpx(16),
    alignSelf:'center'
  },
  archiveListInputContainer: {
    flex: 1,
    alignSelf: 'center',
  },
  inviteTeamRenderListStyle: {
    marginTop: hpx(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export const MyTeamStyles = {...BaseStyles, ...HomeStyles, ...style};
