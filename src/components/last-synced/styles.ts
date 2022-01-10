import {ImageStyle, StyleSheet, ViewStyle} from 'react-native';

import {BaseStyles} from '../../utility/base-styles';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utility/constants';

const styles = StyleSheet.create<{
  iconStyle: ImageStyle;
  lastSyncContainerStyle: ViewStyle;
}>({
  iconStyle: {
    width: DEVICE_WIDTH * 0.053,
    height: DEVICE_WIDTH * 0.053,
    marginRight: DEVICE_WIDTH * 0.01,
  },
  lastSyncContainerStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    height: DEVICE_HEIGHT * 0.048,
    borderRadius: DEVICE_HEIGHT * 0.024,
    marginVertical: DEVICE_HEIGHT * 0.012,
    marginHorizontal: DEVICE_WIDTH * 0.0425,
    paddingHorizontal: DEVICE_WIDTH * 0.032,
  },
});

export const LastSyncStyles = {...BaseStyles, ...styles};
