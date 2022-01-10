import React, {FC, ReactElement} from 'react';
import {TouchableOpacity, ViewStyle, TextStyle} from 'react-native';

import {Text} from '../text';
import {BadgeStyles as styles} from './styles';
import {AppTextStyles} from '../text/text-presets';
import {I18NKeyName} from '../../i18n/translation-keys';

/**
 * An Enum for multiple types of badge
 */
export enum BadgePreset {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  EXTRA_LARGE = 'extraLarge',
}

/**
 * An Interface for possible props for the Badge component
 */
interface BadgeProps {
  /**
   * An optional style override text style.
   */
  customTextStyle?: TextStyle | object;

  /**
   * To enable / disable the badge.
   */
  disabled?: boolean;

  /**
   * To define action on button press.
   */
  onPress: () => void;

  /**
   * To choose badge prest from available different preset, i.e (Extra large, large, medium, small)
   */
  preset?: BadgePreset;

  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle | object;

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string;

  /**
   * Text which is looked up via i18n.
   */
  tx?: I18NKeyName;
}

/**
 * Badge - A component which can be used for badge count,
 * like for notification count on bell icon
 */
const Badge: FC<BadgeProps> = (props: BadgeProps): ReactElement => {
  const getBadgeContainerStyles = () => {
    let badgePresetStyle;
    let badgeTextStyle;

    switch (props.preset) {
      case BadgePreset.EXTRA_LARGE:
        badgePresetStyle = styles.badgeExtraLarge;
        badgeTextStyle = AppTextStyles.badge1;
        break;

      case BadgePreset.LARGE:
        badgePresetStyle = styles.badgeLarge;
        badgeTextStyle = AppTextStyles.badge1;
        break;

      case BadgePreset.MEDIUM:
        badgePresetStyle = styles.badgeMedium;
        badgeTextStyle = AppTextStyles.badge2;
        break;

      case BadgePreset.SMALL:
        badgePresetStyle = styles.badgeSmall;
        badgeTextStyle = AppTextStyles.badge2;
        break;

      default:
        badgePresetStyle = styles.badgeLarge;
        badgeTextStyle = AppTextStyles.badge1;
        break;
    }

    return {badgePresetStyle, badgeTextStyle};
  };

  const {badgePresetStyle, badgeTextStyle} = getBadgeContainerStyles();

  const badgeContainerStyle = [
    styles.badgeContainer,
    badgePresetStyle,
    props.style,
    props.disabled && styles.badgeDisabled,
  ];

  const textStyle = [
    badgeTextStyle,
    props.customTextStyle,
    props.disabled && styles.badgeTextDisabled,
  ];

  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={props.onPress}
      style={[badgeContainerStyle]}>
      <Text style={textStyle} tx={props.tx} text={props.text} />
    </TouchableOpacity>
  );
};

export {Badge};
