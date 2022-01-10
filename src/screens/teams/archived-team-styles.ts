import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {color} from '../../theme';
import {MyTeamStyles} from './styles';
import {hpx, wpx} from '../../utility/responsive';
import {BaseStyles} from '../../utility/base-styles';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utility';

const style = StyleSheet.create<{ 

  statusIconStyle: ImageStyle;
  statusTextStyle: TextStyle;
  removeTextStyle: TextStyle;
  deleteIconStyle: ImageStyle;
  removeButtonStyle: ViewStyle;
  mainContainerStyle: ViewStyle;
  listContainerStyle: ViewStyle;
  profileImageStyle: ImageStyle;
  textContainerStyle: ViewStyle;
  hideDetailsInnerView: ViewStyle;
  statusContainerStyle: ViewStyle;
  peopleCountTextStyle: ViewStyle;
  detailsViewContainer: ViewStyle;
  sectionContainerStyle: ViewStyle;
  dropDownContainerStyle: ViewStyle;
  hideDetailsViewContainer: ViewStyle;
  adminDetailsViewContainer: ViewStyle;
  detailsImageNameContainer: ViewStyle; 
  
}>({
  mainContainerStyle: {
    flex: 1,
    width: '100%',
  },
  dropDownContainerStyle: {
    borderWidth: 1,
    borderColor: color.palette.grey6,
  },
  peopleCountTextStyle: {
    marginVertical: DEVICE_HEIGHT * 0.011,
  },
  detailsViewContainer: {
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hpx(8),
    width: DEVICE_WIDTH * 0.91,
    justifyContent: 'space-between',
    backgroundColor: color.palette.white,
    marginTop: DEVICE_HEIGHT * 0.006,
  },

  adminDetailsViewContainer: {
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hpx(8),
    width: DEVICE_WIDTH * 0.91,
    justifyContent: 'space-between',
    marginTop: DEVICE_HEIGHT * 0.006,
    paddingRight: DEVICE_WIDTH * 0.042,
    backgroundColor: color.palette.white,
  },
  detailsImageNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: DEVICE_WIDTH * 0.021,
  },
  profileImageStyle: {
    width: DEVICE_WIDTH * 0.1,
    height: DEVICE_WIDTH * 0.1,
    borderRadius: DEVICE_WIDTH * 0.1,
    marginVertical: DEVICE_WIDTH * 0.02,
  },
  textContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: DEVICE_WIDTH * 0.5,
    paddingLeft: DEVICE_WIDTH * 0.021,
  },
  statusContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: DEVICE_WIDTH * 0.3,
    justifyContent: 'flex-end',
    paddingRight: DEVICE_WIDTH * 0.042,
  },
  statusIconStyle: {
    width: DEVICE_WIDTH * 0.04,
    height: DEVICE_WIDTH * 0.04,
    borderRadius: DEVICE_WIDTH * 0.04,
  },
  statusTextStyle: {
    paddingLeft: DEVICE_WIDTH * 0.013,
  },
  deleteIconStyle: {
    alignSelf: 'center',
    marginBottom: hpx(4),
    width: DEVICE_WIDTH * 0.04,
    height: DEVICE_WIDTH * 0.04,
    tintColor: color.palette.lightYellow,
  },
  removeTextStyle: {
    color: color.palette.lightYellow,
    alignSelf: 'center',
  },
  hideDetailsViewContainer: {
    width: wpx(343),
    borderRadius: 10,
    marginTop: hpx(8),
    backgroundColor: color.palette.white,
  },
  hideDetailsInnerView: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  removeButtonStyle: {
    width: wpx(50),
    height: wpx(53),
    borderRadius: 15,
    marginRight: wpx(4),
    alignItems: 'center',
    marginVertical: hpx(10),
    justifyContent: 'center',
    marginHorizontal: wpx(16),
    backgroundColor: color.palette.black,
  },
  sectionContainerStyle: {
    flex: 1,
    borderRadius: 10,
    alignSelf: 'center',
  },
  listContainerStyle: {
    alignSelf: 'center',
  },
});

export const ArchivedTeamListStyles = {
  ...BaseStyles,
  ...MyTeamStyles,
  ...style,
};
