import {StyleSheet, ViewStyle} from 'react-native';

import {spacingPresets} from '../../theme';
import {DEVICE_HEIGHT} from '../../utility/constants';

const style = StyleSheet.create<{
  iosStyle: ViewStyle;
  androidStyle: ViewStyle;
}>({
  androidStyle: {
    zIndex: 100,
    marginTop: -16,
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    height: DEVICE_HEIGHT * 0.0344 + spacingPresets.mediumPlus,
  },

  iosStyle: {
    zIndex: 100,
    marginTop: -16,
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
  },
});

export const TabStyles = {style};
