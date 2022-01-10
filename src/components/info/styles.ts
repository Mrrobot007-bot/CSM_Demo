import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {color, spacingPresets} from '../../theme';
import {BaseStyles} from '../../utility/base-styles';
import {DEVICE_WIDTH, DEVICE_HEIGHT} from '../../utility/constants';

const styles = StyleSheet.create<{
  tildeIconView: ImageStyle;
  errorTextStyle: TextStyle;
  answerTextStyle: TextStyle;
  italicFontStyle: TextStyle;
  crossIconStyle: ImageStyle;
  retryButtonStyle: ViewStyle;
  questionTextStyle: TextStyle;
  modalDataViewStyle: ViewStyle;
  modalContainerStyle: ViewStyle;
  headerContainerStyle: ViewStyle;
}>({
  tildeIconView: {
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.064,
    height: DEVICE_WIDTH * 0.064,
  },
  errorTextStyle: {
    alignSelf: 'center',
    color: color.palette.grey4,
    marginTop: spacingPresets.medium,
  },
  answerTextStyle: {
    color: color.palette.grey4,
    marginTop: spacingPresets.smaller,
  },
  italicFontStyle: {
    fontStyle: 'italic',
    textAlign: 'justify',
  },
  crossIconStyle: {
    width: DEVICE_WIDTH * 0.064,
    height: DEVICE_WIDTH * 0.064
  },
  retryButtonStyle: {
    bottom: 0,
    marginVertical: 0,
    position: 'absolute',
  },
  questionTextStyle: {
    color: color.palette.grey4,
    marginTop: spacingPresets.medium,
  },
  modalDataViewStyle: {
    width: '100%',
    minHeight: 100,
    maxHeight: DEVICE_HEIGHT * 0.7,
  },
  modalContainerStyle: {
    borderRadius: 10,
    alignItems: 'center',
    padding: spacingPresets.medium,
    backgroundColor: color.palette.lightYellow,
  },
  headerContainerStyle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export const InfoComponentStyles = {...BaseStyles, ...styles};
