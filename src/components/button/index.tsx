import React, {FC, ReactElement} from 'react';
import {TouchableOpacity, ViewStyle, TextStyle} from 'react-native';
import {ButtonComponentStyles as styles} from './styles';
import {I18NKeyName} from '../../i18n/translation-keys';
import {Text} from '../text';
import {AppTextStyles} from '../text/text-presets';
import {Icon} from '../icon';
import {ICON_TYPES} from '../icon/constants';
import { getPrimaryColor } from '../../utility';

/**
 * An enum for defining multiple types of Button as per size in the app
 */
export enum ButtonPreset {
  SMALL = 'small',
  EXTRA_SMALL = 'extraSmall',
  MEDIUM = 'medium',
  LARGE = 'large',
  EXTRA_LARGE = 'extraLarge',
}

/**
 * An enum for defining multiple types of Button as per color in the app
 */
export enum ButtonType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

/**
 * An Interface for possible props for thE Button component
 */
interface ButtonProps {
  /**
   * An optional style override text style.
   */
  customTextStyle?: TextStyle | object;
  /**
   * To enable / disable the button.
   */
  disabled?: boolean;

  /**
   * An optional button icon with button text,
   */
  icon?: ICON_TYPES;

  /**
   * To define action on button press.
   */
  onPress: () => void;

  /**
   * To choose button prest from available different preset, i.e (Extra large, large, medium, small)
   */
  preset?: ButtonPreset;

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

  /**
   * To choose button type from available different types, i.e (Primary, Secondary)
   */
  type?: ButtonType;
}

/**
 * A Component used to provide different types of button used on the application
 */
// const Button: FC<ButtonProps> = (props: ButtonProps): ReactElement => {
  const Button = (props: ButtonProps) => {
  const getButtonContainerStyles = () => {
    let buttonPresetStyle;
    let buttonTextStyle;

    switch (props.preset) {
      case ButtonPreset.EXTRA_LARGE:
        buttonPresetStyle = styles.buttonExtraLarge;
        buttonTextStyle = AppTextStyles.button1;
        break;

      case ButtonPreset.LARGE:
        buttonPresetStyle = styles.buttonLarge;
        buttonTextStyle = AppTextStyles.button1;
        break;

      case ButtonPreset.MEDIUM:
        buttonPresetStyle = styles.buttonMedium;
        buttonTextStyle = AppTextStyles.button2;
        break;

      case ButtonPreset.SMALL:
        buttonPresetStyle = styles.buttonSmall;
        buttonTextStyle = AppTextStyles.button2;
        break;

      case ButtonPreset.EXTRA_SMALL:
        buttonPresetStyle = styles.buttonExtraSmall;
        buttonTextStyle = AppTextStyles.button2;
        break;

      default:
        buttonPresetStyle = styles.buttonLarge;
        buttonTextStyle = AppTextStyles.button1;
        break;
    }

    return {buttonPresetStyle, buttonTextStyle};
  };

  const {buttonPresetStyle, buttonTextStyle} = getButtonContainerStyles();

  const buttonContainerStyle = [
    styles.buttonContainer,
    buttonPresetStyle,
    props.type === ButtonType.SECONDARY
      ? styles.buttonSecondary
      : {backgroundColor: getPrimaryColor()},
    props.disabled && styles.buttonDisabled,
    props.style,
  ];

  const buttonIconStyle = props.disabled
    ? styles.iconStyleDisabled
    : styles.iconStyle;

  const textStyle = [
    buttonTextStyle,
    props.disabled && styles.buttonTextDisabled,
    props.customTextStyle,
  ];

  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={props.onPress}
      style={buttonContainerStyle}>
      <Icon icon={props.icon} style={buttonIconStyle} />
      <Text style={textStyle} tx={props.tx} text={props.text} />
    </TouchableOpacity>
  );
};

export {Button};
