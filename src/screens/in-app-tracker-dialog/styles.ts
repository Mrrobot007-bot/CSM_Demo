import {RFValue} from 'react-native-responsive-fontsize';
import {StyleSheet, ImageStyle, ViewStyle, TextStyle} from 'react-native';

import {hpx} from '../../utility/responsive';
import {color, spacingPresets} from '../../theme';
import {BaseStyles} from '../../utility/base-styles';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utility/constants';

const style = StyleSheet.create<{
  buttonStyle: ViewStyle;
  checkBoxStyle: ViewStyle;
  crossIconStyle: ImageStyle;
  countValueStyle: ViewStyle;
  blackTextStyles: ViewStyle;
  allowButtonStyle: ViewStyle;
  topContainerStyle: ViewStyle;
  mainContainerStyle: ViewStyle;
  separatorLineStyle: ViewStyle;
  buttonContainerStyle: ViewStyle;
  activityPickerStyle: ViewStyle;
  headerContainerStyle: ViewStyle;
  checkBoxMainContainer: ViewStyle;
  stepsCountMainContainer: ViewStyle;
  buttonContainerMainStyle: ViewStyle;
  timeDistanceContainerStyle: ViewStyle;
  enableBoostrContainerStyle: ViewStyle;
  activityPickerDropdownStyle: ViewStyle;
  stepsCountMainInnerContainer: ViewStyle;
  timeDistanceItemContainerStyle: ViewStyle;
  timeDistanceItemValueTextStyle: TextStyle;

  //Finish dialog style
  finishDialogTitleStyle: TextStyle;
  finishDialogButtonStyle: ViewStyle;
  finishDialogLogoIconStyle: ImageStyle;
  finishDialogShareTextStyle: TextStyle;
  finishDialogContainerStyle: ViewStyle;
  finishDialogShareIconStyle: ImageStyle;
  finishDialogCancelButtonStyle: ViewStyle;
  finishDialogMainContainerStyle: ViewStyle;
  finishDialogLogoContainerStyle: ViewStyle;
  finishDialogShareContainerStyle: ViewStyle;
  finishDialogPart1ContainerStyle: ViewStyle;

  //default dialog style
  tildeIconStyle: ImageStyle;
  dialogTextStyle: TextStyle;
  dialogCancelTextStyle: TextStyle;
}>({
  topContainerStyle: {
    flex: 1,
    width: DEVICE_WIDTH,
    justifyContent: 'flex-end',
  },
  mainContainerStyle: {
    elevation: 100,
    paddingBottom: 80,
    shadowOpacity: 0.2,
    width: DEVICE_WIDTH,
    shadowColor: 'black',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    backgroundColor: color.palette.white,
    paddingHorizontal: DEVICE_WIDTH * 0.042,
  },

  headerContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: DEVICE_HEIGHT * 0.025,
  },
  crossIconStyle: {
    width: DEVICE_WIDTH * 0.064,
    height: DEVICE_WIDTH * 0.064,
  },

  enableBoostrContainerStyle: {
    borderRadius: 10,
    flexDirection: 'row',
    padding: spacingPresets.medium,
    justifyContent: 'space-between',
    marginTop: DEVICE_HEIGHT * 0.04,
  },

  allowButtonStyle: {
    marginVertical: 0,
    marginLeft: DEVICE_WIDTH * 0.1,
  },
  activityPickerStyle: {
    marginBottom: hpx(8),
    marginTop: DEVICE_HEIGHT * 0.04,
  },

  activityPickerDropdownStyle: {
    borderWidth: 1,
    borderColor: color.palette.grey6,
  },

  timeDistanceContainerStyle: {
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: DEVICE_HEIGHT * 0.04,
    paddingVertical: spacingPresets.medium,
    paddingHorizontal: spacingPresets.smaller,
  },

  timeDistanceItemContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: spacingPresets.smaller,
  },

  timeDistanceItemValueTextStyle: {
    height: RFValue(28),
  },

  separatorLineStyle: {
    width: 1,
    marginVertical: 2,
  },

  buttonContainerMainStyle: {
    marginTop: DEVICE_HEIGHT * 0.035,
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  buttonStyle: {
    marginVertical: 0,
  },
  stepsCountMainContainer: {
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    width: DEVICE_WIDTH * 0.91,
    height: DEVICE_HEIGHT * 0.083,
    justifyContent: 'space-between',
    marginTop: DEVICE_HEIGHT * 0.036,
    paddingHorizontal: DEVICE_WIDTH * 0.042,
  },
  stepsCountMainInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countValueStyle: {
    marginRight: spacingPresets.tiny,
  },
  blackTextStyles: {
    color: color.palette.black,
  },
  checkBoxStyle: {
    width: DEVICE_WIDTH * 0.91,
  },
  checkBoxMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: DEVICE_WIDTH * 0.91,
    marginTop: DEVICE_HEIGHT * 0.035,
  },

  //Finish dialog style
  finishDialogMainContainerStyle: {
    borderRadius: 10,
    backgroundColor: color.palette.lightYellow,
  },

  finishDialogPart1ContainerStyle: {
    alignItems: 'center',
    paddingHorizontal: DEVICE_WIDTH * 0.064,
  },

  finishDialogLogoContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: DEVICE_WIDTH * 0.17,
    height: DEVICE_WIDTH * 0.17,
    borderRadius: DEVICE_WIDTH * 0.17,
    marginVertical: DEVICE_HEIGHT * 0.036,
  },

  finishDialogLogoIconStyle: {
    width: DEVICE_WIDTH * 0.085,
    height: DEVICE_WIDTH * 0.085,
  },

  finishDialogTitleStyle: {
    textAlign: 'center',
    marginBottom: DEVICE_HEIGHT * 0.012,
  },

  finishDialogShareContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: DEVICE_HEIGHT * 0.036,
  },

  finishDialogShareIconStyle: {
    width: DEVICE_WIDTH * 0.064,
    height: DEVICE_WIDTH * 0.064,
    marginRight: DEVICE_WIDTH * 0.021,
  },

  finishDialogShareTextStyle: {
    fontWeight: 'bold',
  },

  finishDialogContainerStyle: {
    borderTopWidth: 1,
    flexDirection: 'row',
    paddingVertical: DEVICE_HEIGHT * 0.024,
    paddingHorizontal: DEVICE_WIDTH * 0.0426,
  },

  finishDialogButtonStyle: {
    marginVertical: 0,
    width: DEVICE_WIDTH * 0.915 * 0.5 - DEVICE_WIDTH * 0.0426,
  },

  finishDialogCancelButtonStyle: {
    backgroundColor: 'transparent',
  },

  //default dialog style
  dialogTextStyle: {
    color: color.palette.lightblue,
    marginVertical: DEVICE_HEIGHT * 0.015,
  },

  tildeIconStyle: {
    width: DEVICE_WIDTH * 0.064,
    height: DEVICE_WIDTH * 0.064,
  },

  dialogCancelTextStyle: {
    color: color.palette.grey5,
    marginVertical: DEVICE_HEIGHT * 0.015,
  },
});

export const InAppTrackerStyles = {...BaseStyles, ...style};
