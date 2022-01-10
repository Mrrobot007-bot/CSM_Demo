import {StyleSheet, ImageStyle, ViewStyle, TextStyle} from 'react-native';

import {color} from '../../theme';
import {BaseStyles} from '../../utility/base-styles';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utility/constants';

const style = StyleSheet.create<{
  finishDialogTitleStyle: TextStyle;
  finishDialogButtonStyle: ViewStyle;
  finishDialogLogoIconStyle: ImageStyle;
  finishDialogShareTextStyle: TextStyle;
  finishDialogContainerStyle: ViewStyle;
  finishDialogShareIconStyle: ImageStyle;
  finishDialogCancelButtonStyle: ViewStyle;
  finishDialogMainContainerStyle: ViewStyle;
  finishDialogLogoContainerStyle: ViewStyle;
  finishDialogPart1ContainerStyle: ViewStyle;
  finishDialogShareContainerStyle: ViewStyle;
  finishDialogSingleButtonContainerStyle: ViewStyle;
}>({
  finishDialogTitleStyle: {
    textAlign: 'center',
    marginBottom: DEVICE_HEIGHT * 0.012,
  },
  finishDialogButtonStyle: {
    marginVertical: 0,
    width: DEVICE_WIDTH * 0.915 * 0.5 - DEVICE_WIDTH * 0.0426,
  },
  finishDialogLogoIconStyle: {
    width: DEVICE_WIDTH * 0.085,
    height: DEVICE_WIDTH * 0.085,
    tintColor: color.palette.lightYellow,
  },
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
  finishDialogShareTextStyle: {
    fontWeight: 'bold',
  },
  finishDialogContainerStyle: {
    borderTopWidth: 1,
    flexDirection: 'row',
    marginTop: DEVICE_HEIGHT * 0.048,
    paddingVertical: DEVICE_HEIGHT * 0.024,
    paddingHorizontal: DEVICE_WIDTH * 0.0426,
  },
  finishDialogShareIconStyle: {
    width: DEVICE_WIDTH * 0.064,
    height: DEVICE_WIDTH * 0.064,
    marginRight: DEVICE_WIDTH * 0.021,
  },
  finishDialogCancelButtonStyle: {
    backgroundColor: 'transparent',
  },
  finishDialogShareContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: DEVICE_HEIGHT * 0.036,
    marginBottom: DEVICE_HEIGHT * 0.048,
  },
  finishDialogSingleButtonContainerStyle: {
    borderTopWidth: 1,
    marginTop: DEVICE_HEIGHT * 0.048,
    paddingVertical: DEVICE_HEIGHT * 0.024,
    paddingHorizontal: DEVICE_WIDTH * 0.0426,
  },
});

export const UserConfirmationDialogStyles = {...BaseStyles, ...style};
