import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {color} from '../../../theme';
import {hpx, wpx} from '../../../utility/responsive';
import {BaseStyles} from '../../../utility/base-styles';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../../utility';

const style = StyleSheet.create<{
  statusTextStyle: TextStyle;
  removeTextStyle: TextStyle;
  statusIconStyle: ImageStyle;
  deleteIconStyle: ImageStyle;
  removeButtonStyle: ViewStyle;
  mainContainerStyle: ViewStyle;
  profileImageStyle: ImageStyle;
  textContainerStyle: ViewStyle;
  hideDetailsInnerView: ViewStyle;
  peopleCountTextStyle: ViewStyle;
  detailsViewContainer: ViewStyle;
  statusContainerStyle: ViewStyle;
  dropDownContainerStyle: ViewStyle;
  hideDetailsViewContainer: ViewStyle;
  adminDetailsViewContainer: ViewStyle;
  detailsImageNameContainer: ViewStyle;
}>({
  mainContainerStyle: {
    flex: 1,
    paddingHorizontal: DEVICE_WIDTH * 0.042,
    backgroundColor: color.palette.lightYellow,
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
    marginTop: DEVICE_HEIGHT * 0.006,
    backgroundColor: color.palette.white,
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
    alignSelf: 'center',
    color: color.palette.lightYellow,
  },
  hideDetailsViewContainer: {
    borderRadius: 15,
    width: DEVICE_WIDTH * 0.91,
    marginTop: DEVICE_HEIGHT * 0.006,
    backgroundColor: color.palette.white,
  },
  hideDetailsInnerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  removeButtonStyle: {
    borderRadius: 15,
    alignItems: 'center',
    marginVertical: hpx(4),
    justifyContent: 'center',
    marginHorizontal: wpx(4),
    width: DEVICE_WIDTH * 0.12,
    height: DEVICE_WIDTH * 0.12,
    backgroundColor: color.palette.black,
  },
});

export const ManageInvitesStyles = {...BaseStyles, ...style};
