import {StyleSheet, ImageStyle, ViewStyle, TextStyle} from 'react-native';

import {color} from '../../theme';
import {BaseStyles} from '../../utility/base-styles';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utility/constants';

const styles = StyleSheet.create<{
  otpBoxStyle: TextStyle;
  titleTextStyle: TextStyle;
  emailInputStyle: TextStyle;
  sendButtonStyle: ViewStyle;
  otpContainerStyle: ViewStyle;
  mainContainerStyle: ViewStyle;
  descriptionTextStyle: TextStyle;
  screenIconImageStyle: ImageStyle;
  secondaryLabelTextStyle: TextStyle;
  resendOtpContainerStyle: ViewStyle;
  resendOtpActiveTextStyle: TextStyle;
  screenIconContainerStyle: ViewStyle;
  resendOtpNotActiveTextStyle: TextStyle;
}>({
  mainContainerStyle: {
    flex: 1,
    alignItems: 'center',
  },
  screenIconContainerStyle: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: DEVICE_WIDTH * 0.277,
    height: DEVICE_WIDTH * 0.277,
    marginTop: DEVICE_HEIGHT * 0.108,
    borderRadius: (DEVICE_WIDTH * 0.277) / 2,
    backgroundColor: color.palette.lightYellow,
  },

  titleTextStyle: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: color.textLight,
    marginTop: DEVICE_HEIGHT * 0.06,
  },

  descriptionTextStyle: {
    textAlign: 'center',
    color: color.textLight,
    marginTop: DEVICE_HEIGHT * 0.024,
    paddingHorizontal: DEVICE_WIDTH * 0.0426,
  },

  screenIconImageStyle: {
    width: DEVICE_WIDTH * 0.13,
    height: DEVICE_WIDTH * 0.13,
  },

  emailInputStyle: {
    marginTop: DEVICE_HEIGHT * 0.036,
  },

  sendButtonStyle: {
    marginVertical: 0,
    marginTop: DEVICE_HEIGHT * 0.12,
    marginBottom: DEVICE_HEIGHT * 0.024,
  },

  secondaryLabelTextStyle: {
    marginVertical: 0,
    color: color.palette.white,
  },
  otpContainerStyle: {
    alignItems: 'center',
    width: DEVICE_WIDTH * 0.8,
    height: DEVICE_HEIGHT * 0.1,
  },

  otpBoxStyle: {
    fontSize: 16,
    fontWeight: '700',
    color: color.palette.black,
    backgroundColor: color.palette.lightYellow,
  },

  resendOtpContainerStyle: {
    alignSelf: 'flex-end',
  },

  resendOtpActiveTextStyle: {
    color: color.palette.lightYellow,
  },

  resendOtpNotActiveTextStyle: {
    color: color.palette.grey5,
  },
});

export const ForgotPasswordScreenStyles = {...BaseStyles, ...styles};
