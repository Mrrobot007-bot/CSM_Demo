import {ImageStyle, StyleSheet, ViewStyle} from 'react-native';

import {color, spacingPresets} from '../../../theme';
import {BaseStyles} from '../../../utility/base-styles';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../../utility';

const style = StyleSheet.create<{
  scrollViewStyle: ViewStyle;
  closeButtonStyle: ImageStyle;
  mainContainerStyle: ViewStyle;
  buttonContainerStyle: ViewStyle;
}>({
  mainContainerStyle: {
    top: 0,
    marginLeft: -20,
    borderRadius: 10,
    width: DEVICE_WIDTH,
    minHeight: DEVICE_HEIGHT * 0.7,
    backgroundColor: color.palette.lightYellow,
    padding: spacingPresets.mediumPlus,
  },
  closeButtonStyle: {
    width: 24,
    height: 24,
    alignSelf: 'flex-end',
  },
  scrollViewStyle: {
    flex: 1,
    marginBottom: 100,
  },
  buttonContainerStyle: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: spacingPresets.mediumPlus,
  },
});

export const SendInvitesStyles = {...BaseStyles, ...style};
