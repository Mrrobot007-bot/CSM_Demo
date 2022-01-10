import {StyleSheet, ViewStyle, TextStyle, ImageStyle} from 'react-native';

import {spacingPresets} from '../../../theme';
import {BaseStyles} from '../../../utility/base-styles';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../../utility';

const style = StyleSheet.create<{
  lineStyle: ViewStyle;
  linkIconStyle: ImageStyle;
  topContainerStyle: ViewStyle;
  headlineTextStyle: TextStyle;
  mainContainerStyle: ViewStyle;
  fundRaiseImageStyle: ImageStyle;
  targetContainerStyle: ViewStyle;
  shareViewComponentStyle: ViewStyle;
  totalRaisedContainerStyle: ViewStyle;
}>({
  lineStyle: {
    width: 1,
    height: '100%',
  },
  linkIconStyle: {
    width: DEVICE_WIDTH * 0.064,
    height: DEVICE_WIDTH * 0.064,
  },
  topContainerStyle: {
    marginTop: DEVICE_HEIGHT * 0.024,
  },
  headlineTextStyle: {
    marginHorizontal: spacingPresets.tiny,
  },
  mainContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fundRaiseImageStyle: {
    width: '100%',
    borderRadius: 10,
    marginTop: DEVICE_HEIGHT * 0.012,
    marginBottom: DEVICE_HEIGHT * 0.012,
    height: DEVICE_WIDTH * 0.786 * 0.637,
  },
  targetContainerStyle: {
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: DEVICE_HEIGHT * 0.024,
    marginBottom: DEVICE_HEIGHT * 0.036,
    paddingVertical: DEVICE_HEIGHT * 0.018,
    paddingHorizontal: DEVICE_WIDTH * 0.0426,
  },
  shareViewComponentStyle: {
    marginTop: 0,
  },
  totalRaisedContainerStyle: {
    flex: 1,
    marginLeft: DEVICE_WIDTH * 0.0426,
  },
});
export const FundRaiseComponentStyles = {...BaseStyles, ...style};
