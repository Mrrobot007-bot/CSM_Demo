import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {color} from '../../theme';
import {BaseStyles} from '../../utility/base-styles';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utility/constants';

const largeBadgeWidth = DEVICE_WIDTH * 0.915;
const mediumBadgeWidth = DEVICE_WIDTH * 0.445;
const smallBadgeWidth = DEVICE_WIDTH * 0.245;

const extraLargeBadgeHeight = DEVICE_HEIGHT * 0.06;
const largeBadgeHeight = DEVICE_HEIGHT * 0.054;
const mediumBadgeHeight = DEVICE_HEIGHT * 0.045;
const smallBadgeHeight = DEVICE_HEIGHT * 0.045;

const styles = StyleSheet.create<{
  badgeLarge: ViewStyle;
  badgeSmall: ViewStyle;
  badgeMedium: ViewStyle;
  badgeDisabled: ViewStyle;
  badgeContainer: ViewStyle;
  badgeExtraLarge: ViewStyle;
  badgeTextDisabled: TextStyle;
}>({
  badgeLarge: {
    width: largeBadgeWidth,
    height: largeBadgeHeight,
    borderRadius: largeBadgeHeight / 2,
  },

  badgeSmall: {
    width: smallBadgeWidth,
    height: smallBadgeHeight,
    borderRadius: smallBadgeHeight / 2,
    paddingHorizontal: DEVICE_WIDTH * 0.042,
  },

  badgeMedium: {
    width: mediumBadgeWidth,
    height: mediumBadgeHeight,
    borderRadius: mediumBadgeHeight / 2,
  },

  badgeDisabled: {
    backgroundColor: color.badgeBackgroundDisabled,
  },

  badgeContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: DEVICE_HEIGHT * 0.024,
  },

  badgeExtraLarge: {
    width: largeBadgeWidth,
    height: extraLargeBadgeHeight,
    borderRadius: extraLargeBadgeHeight / 2,
  },

  badgeTextDisabled: {
    color: color.buttonTextDisabled,
  },
});

export const BadgeStyles = {...BaseStyles, ...styles};
