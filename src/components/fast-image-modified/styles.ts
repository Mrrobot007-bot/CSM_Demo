import { ImageStyle, StyleSheet, ViewStyle } from 'react-native';

import { BaseStyles } from '../../utility/base-styles';

const styles = StyleSheet.create<{
  imageStyle: ImageStyle;
  containerStyle: ViewStyle;
}>({
  imageStyle: {
    zIndex: -1,
    position: 'absolute',
    left: 0,
    // right: 0
  },
  containerStyle: {
    alignItems: 'center'
  },
});

export const FastImageModifiedStyles = { ...BaseStyles, ...styles };
