import {StyleSheet, ViewStyle, TextStyle} from 'react-native';

import {color} from '../../theme';
import {BaseStyles} from '../../utility/base-styles';

const styles = StyleSheet.create<{
  barStyle: ViewStyle;
  thinBarStyle: ViewStyle;
  greyBarStyle: ViewStyle;
  normalBarStyle: ViewStyle;
  greyBarThinStyle: ViewStyle;
  textContainerStyle: ViewStyle;
  mainContainerStyle: ViewStyle;
  percentageTextStyles: TextStyle;
  thinTextContainerStyle: ViewStyle;
}>({
  barStyle: {
    top: 16,
    height: 16,
    borderRadius: 10,
    position: 'absolute',
  },
  thinBarStyle: {
    top: 16,
    height: 8,
    borderRadius: 8,
    position: 'absolute',
  },
  greyBarStyle: {
    height: 16,
    width: '100%',
    borderRadius: 10,
    backgroundColor: color.palette.grey6,
  },
  normalBarStyle: {
    top: 0,
  },
  greyBarThinStyle: {
    height: 8,
    borderRadius: 8,
  },
  textContainerStyle: {
    height: 16,
    zIndex: 10,
  },
  mainContainerStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  percentageTextStyles: {
    marginVertical: 0,
    textAlign: 'right',
    marginHorizontal: 5,
    borderStyle: 'solid',
    color: color.palette.white,
  },
  thinTextContainerStyle: {
    height: 16,
  },
});

export const RewardPercentageBarStyles = {...BaseStyles, ...styles};
