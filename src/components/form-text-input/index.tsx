import moment from 'moment';
import React, {LegacyRef, useState} from 'react';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {
  View,
  ViewStyle,
  TextInput,
  RegisteredStyle,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  ReturnKeyTypeOptions,
  TextInputFocusEventData,
  TextInputSubmitEditingEventData,
} from 'react-native';

import {
  isValidName,
  isValidDate,
  isValidEmail,
  isValidPhone,
  isValidPassword,
} from '../../utility';
import {Text} from '../text';
import {Icon} from '../icon';
import {color} from '../../theme';
import {translate} from '../../i18n';
import {ICON_TYPES} from '../icon/constants';
import {hpx} from '../../utility/responsive';
import {AppTextStyles} from '../text/text-presets';
import {TextPresetStyles} from '../text/constants';
import {FormTextInputStyle as styles} from './styles';
import {I18NKeyName} from '../../i18n/translation-keys';

/**
 * An enum for defining multiple types of Input used in boostr application
 */
export enum TextInputPreset {
  CALENDAR = 'calendar',
  DECIMAL = 'decimal',
  DEFAULT = 'default',
  DESCRIPTION = 'description',
  EMAIL = 'email',
  NAME = 'name',
  NUMBER = 'number',
  PASSWORD = 'password',
  PHONE = 'phone',
  SEARCH = 'search',
  TIME = 'time',
  BIO = 'bio',
}

/**
 * An enum for defining multiple types of keyboard types used in boostr application
 */
export enum TextInputKeyboardTypes {
  EMAIL_ADDRESS = 'email-address',
  NUMERIC = 'numeric',
  PHONE_PAD = 'phone-pad',
  DECIMAL_PAD = 'decimal-pad',
  DEFAULT = 'default',
}

/**
 * An enum for defining multiple types of text capitalize
 * settings as per input type
 */
export enum TextAutoCapitalizeTypes {
  SENTENCES = 'sentences',
  WORDS = 'words',
  NONE = 'none',
}

/**
 * An enum for defining multiple types of Return type of key for input box
 */
export enum TextInputReturnKeyType {
  NEXT = 'next',
  DONE = 'done',
  SEARCH = 'search',
}

/**
 * An Interface for possible props for FormTextInput component
 */
interface FormTextInputProps {
  /**
   * If true, focuses the input. The default value is false
   */
  autoFocus?: boolean;

  /**
   * An Optional prop used to determine blur action on submit
   */
  blurOnSubmit?: boolean;

  /**
   * Check the validation for entered input
   */
  checkValidation?: boolean;

  /**
   * Style to customize the input
   */
  customInputStyle?: ViewStyle | RegisteredStyle<any>;

  /**
   * An Optional prop used to determine input box is disabled or not
   */
  disabled?: boolean;

  /**
   * Disable the keyboard
   */
  disableKeyboardInput?: boolean;

  /**
   * If false, text is not editable. The default value is true.
   */
  editable?: boolean;

  /**
   * Inside Placeholder Text which is looked up via i18n.
   */
  inlinePlaceholderTx?: I18NKeyName;

  /**
   * An error message which should have a value if any error occurred .
   */
  inputError?: string;

  /**
   * An Optional prop used to determine input box click is disabled or not
   */
  isClickDisabled?: boolean;

  /**
   * Put a asterisk with label if its marked required
   */
  isRequired?: boolean;

  /**
   * A prop used to define minimum date of calender
   */
  minimumDate?: Date;

  /**
   * A prop used to define maximum date of calender
   */
  maximumDate?: Date;

  /**
   * It ref to the next input field
   */
  nextRef?: LegacyRef<TextInput>;

  /**
   * It ref to the next input field
   */

  newRef?: LegacyRef<TextInput>;

  /**
   * Callback that is called when the text input's text changes.
   * Changed text is passed as a single string argument to the callback handler.
   */
  onChangeText(text: string): void;

  /**
   * Callback that is called when the text input is focused. T
   * his is called with { nativeEvent: { target } }.
   */
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;

  /**
   * Callback that is called when the text input's submit button is pressed with the argument
   * {nativeEvent: {text, eventCount, target}}.
   */
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;

  /**
   * A custom type of Text input, can choose as per requirement
   */
  preset?: TextInputPreset;

  /**
   * Determines how the return key should look. like done, go, next, search, send
   */
  returnKeyType?: ReturnKeyTypeOptions;

  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle | RegisteredStyle<any>;

  /**
   * Top Placeholder Text color, providing the ability to override if required
   */
  topPlaceholderTextColor?: string;

  /**
   * Top Placeholder Text which is looked up via i18n.
   */
  topPlaceholderTx?: I18NKeyName;

  /**
   * An Optional prop used to render a right component if required
   */
  topRightComponent?: any;

  /**
   * A prop used to show any icon on top right corner of input
   */
  topRightIcon?: ICON_TYPES;

  /**
   * A prop used to define action on top right corner icon
   */
  topRightIconClick?: () => void;

  /**
   * Text value, which will show by default
   */
  value?: string;
}

const defaultProps: FormTextInputProps = {
  editable: true,
  preset: TextInputPreset.DEFAULT,
  onChangeText: () => {},
};

/**
 *
 * A custom app specific TextInput component, which have all the customization required for textInput,
 * There are various type of text input available, for reference have a look on TextInputPrest
 */
const FormTextInput: React.FC<FormTextInputProps> = (
  props: FormTextInputProps,
) => {
  /**
   *
   * A list of states using in the component
   */
  const [isFocused, setIsFocused] = useState(false);
  const [currentText, setCurrentText] = useState(props.value);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  React.useEffect(() => {
    if (
      props.preset === TextInputPreset.CALENDAR &&
      props.value &&
      props.value !== ''
    ) {
      setCurrentText(
        moment(new Date(props.value)).format('DD/MM/YYYY').toString(),
      );
    } else {
      setCurrentText(props.value);
    }
  }, [props.value]);

  /**
   *
   * Set focus on the textInput when required, and passing callback to parent
   * component which is using this, if required
   */
  const onFocus = () => {
    setIsFocused(true);
    props.onFocus;
  };

  /**
   *
   * Remove focus from Text input if click outside the textbox
   */
  const onBlur = () => {
    setIsFocused(false);

    if (currentText) {
      if (props.checkValidation) {
        switch (props.preset) {
          case TextInputPreset.EMAIL:
            setErrorMessage(
              isValidEmail(currentText, isRequired)
                ? null
                : translate('modules.errorMessages.invalidEmail'),
            );
            break;

          case TextInputPreset.PASSWORD:
            setErrorMessage(
              isValidPassword(currentText, isRequired)
                ? null
                : translate('modules.errorMessages.invalidPassword'),
            );
            break;

          case TextInputPreset.NAME:
            setErrorMessage(
              isValidName(currentText, isRequired)
                ? null
                : translate('modules.errorMessages.invalidName'),
            );
            break;

          case TextInputPreset.PHONE:
            setErrorMessage(
              isValidPhone(currentText, isRequired)
                ? null
                : translate('modules.errorMessages.invalidPhone'),
            );
            break;

          case TextInputPreset.CALENDAR:
            setErrorMessage(
              isValidDate(currentText, isRequired)
                ? null
                : translate('Invalid Date'),
            );
            break;

          default:
            setErrorMessage(null);
            break;
        }
      } else {
        setErrorMessage(null);
      }
    } else {
      setErrorMessage(null);
    }
  };

  /**
   *
   * Updating the state while change in text, and passing callback to parent
   * component which is using this, if required
   */
  const onChangeText = (text: string) => {
    setShowDatePicker(false);
    setShowTimePicker(false);
    setCurrentText(text);
    props.onChangeText(text);
  };

  /**
   *
   * Remove Text when click on cross button inside text input
   */
  const onClearText = () => {
    onChangeText('');
    setErrorMessage(null);
  };

  /**
   *
   * Change the password type from secure entry to non secure entry and vise versa
   */
  const onChangePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  /**
   *
   * Opening the timer dialog to select the time on timer icon click
   */
  const onOpenTimer = () => {
    setShowTimePicker(true);
  };

  /**
   *
   * Opening the calender dialog to select the date on calender icon click
   */
  const onOpenCalender = () => {
    setShowDatePicker(true);
  };

  /**
   *
   * Generating the left side icon of textInput, its not required for all types of custom input,
   * but required in like Search type textInput
   */
  const renderLeftIcon = (editable: boolean) => {
    const iconColor = editable
      ? currentText
        ? color.textInputText
        : color.textInputPlaceHolderText
      : color.textInputDisabledText;
    const iconStyle = {...styles.leftIconStyle, tintColor: iconColor};
    switch (props.preset) {
      case TextInputPreset.SEARCH:
        return <Icon icon={ICON_TYPES.SEARCH} style={iconStyle} />;

      default:
        return null;
    }
  };

  /**
   *
   * Generating the right side icon of textInput, by default its a cross icon and on click of that icon
   * textInput will clear, along with that we have some other icons also there for specific type of textInput,
   * like: Calender, Time, Password, etc
   */
  const renderRightIcon = () => {
    const iconStyle = styles.rightIconStyle;
    if (props.isClickDisabled) {
      return null;
    }
    switch (props.preset) {
      case TextInputPreset.CALENDAR:
        return (
          <View>
            <Icon
              icon={ICON_TYPES.CALENDAR}
              onIconClick={onOpenCalender}
              style={iconStyle}
            />

            <DateTimePicker
              isVisible={showDatePicker}
              minimumDate={props.minimumDate}
              maximumDate={props.maximumDate}
              display={'spinner'}
              onConfirm={date =>
                onChangeText(
                  moment(new Date(date)).format('DD/MM/YYYY').toString(),
                )
              }
              onCancel={() => setShowDatePicker(false)}
            />
          </View>
        );

      case TextInputPreset.TIME:
        return (
          <View>
            <Icon
              icon={ICON_TYPES.ACCESS_TIME}
              onIconClick={onOpenTimer}
              style={iconStyle}
            />

            <DateTimePicker
              isVisible={showTimePicker}
              mode={'time'}
              onConfirm={date =>
                onChangeText(
                  moment(new Date(date)).format('hh:mm a').toString(),
                )
              }
              onCancel={() => setShowTimePicker(false)}
            />
          </View>
        );

      case TextInputPreset.PASSWORD:
        return (
          <Icon
            icon={
              secureTextEntry
                ? ICON_TYPES.VISIBILITY_OFF
                : ICON_TYPES.VISIBILITY_ON
            }
            onIconClick={onChangePasswordVisibility}
            style={iconStyle}
          />
        );

      case TextInputPreset.DESCRIPTION:
        return null;

      case TextInputPreset.BIO:
        return null;

      default:
        if (currentText) {
          return (
            <Icon
              icon={ICON_TYPES.CLOSE}
              onIconClick={onClearText}
              style={iconStyle}
            />
          );
        }
        return null;
    }
  };

  /**
   *
   * This method is used to get the keyboard type, from the preset type passed from parent class
   */
  const getKeyboardInputType = () => {
    let keyboardType: KeyboardTypeOptions = TextInputKeyboardTypes.DEFAULT;
    switch (props.preset) {
      case TextInputPreset.EMAIL:
        keyboardType = TextInputKeyboardTypes.EMAIL_ADDRESS;
        break;

      case TextInputPreset.NUMBER:
        keyboardType = TextInputKeyboardTypes.NUMERIC;
        break;

      case TextInputPreset.PHONE:
        keyboardType = TextInputKeyboardTypes.PHONE_PAD;
        break;

      case TextInputPreset.DECIMAL:
        keyboardType = TextInputKeyboardTypes.DECIMAL_PAD;
        break;
    }

    return keyboardType;
  };

  /**
   *
   * This method is used to get the max char length, from the preset type passed from parent class
   */
  const getMaxLength = () => {
    let maxLength: number = 500;
    switch (props.preset) {
      case TextInputPreset.PHONE:
        maxLength = 10;
        break;
      case TextInputPreset.BIO:
        maxLength = 120;
        break;

      case TextInputPreset.NAME:
        maxLength = 50;
        break;
    }

    return maxLength;
  };

  // grab the props
  const {
    autoFocus,
    blurOnSubmit,
    customInputStyle,
    disabled,
    disableKeyboardInput,
    editable,
    inputError,
    inlinePlaceholderTx,
    isRequired,
    onSubmitEditing,
    nextRef,
    newRef,
    preset,
    returnKeyType,
    style,
    topPlaceholderTextColor,
    topPlaceholderTx,
    topRightComponent,
    topRightIcon,
    topRightIconClick,
  } = props;

  const inputStyle =
    preset === TextInputPreset.DESCRIPTION
      ? styles.descriptionInputStyle
      : preset === TextInputPreset.BIO
      ? styles.descriptionInputStyle
      : preset === TextInputPreset.SEARCH
      ? styles.searchInputStyle
      : styles.inputStyle;
  return (
    <View style={[styles.wrapperStyle, style]}>
      <View style={styles.labelContainerStyle}>
        {topPlaceholderTx ? (
          <Text
            preset={TextPresetStyles.TEXT_LABEL}
            text={`${translate(topPlaceholderTx)}${isRequired ? '*' : ''}`}
            style={{color: topPlaceholderTextColor}}
          />
        ) : null}
        {topRightComponent ||
          (topRightIcon && (
            <Icon
              icon={topRightIcon}
              onIconClick={topRightIconClick}
              style={styles.infoIconStyle}
            />
          ))}
      </View>
      <View
        style={[
          styles.inputContainerStyle,
          customInputStyle,
          disabled && {backgroundColor: color.palette.grey14},
          preset === TextInputPreset.DESCRIPTION && {
            height: 120,
          },
          preset === TextInputPreset.BIO && {
            height: 120,
          },
        ]}>
        <View
          style={[styles.rowStyle, inputStyle, styles.leftIconContainerStyle]}>
          {renderLeftIcon(editable)}
          <TextInput
            accessible={true}
            editable={editable}
            multiline={
              preset === TextInputPreset.DESCRIPTION ||
              preset === TextInputPreset.BIO
            }
            style={[
              editable || disableKeyboardInput
                ? AppTextStyles.textInput
                : AppTextStyles.textInputDisabled,
              {
                height: hpx(40),
              },
              preset === TextInputPreset.DESCRIPTION && {
                height: 120,
                textAlignVertical: 'top',
              },
              preset === TextInputPreset.BIO && {
                height: 120,
                textAlignVertical: 'top',
              },
            ]}
            value={currentText}
            blurOnSubmit={blurOnSubmit}
            onChangeText={text => onChangeText(text)}
            keyboardType={getKeyboardInputType()}
            placeholder={
              inlinePlaceholderTx ? translate(inlinePlaceholderTx) : ''
            }
            placeholderTextColor={
              editable
                ? color.textInputPlaceHolderText
                : color.textInputDisabledText
            }
            onBlur={onBlur}
            onFocus={onFocus}
            returnKeyType={returnKeyType}
            onSubmitEditing={
              nextRef ? () => nextRef?.current?.focus() : onSubmitEditing
            }
            autoCapitalize={
              preset === TextInputPreset.DESCRIPTION
                ? TextAutoCapitalizeTypes.SENTENCES
                : preset === TextInputPreset.NAME
                ? TextAutoCapitalizeTypes.WORDS
                : TextAutoCapitalizeTypes.NONE
            }
            secureTextEntry={
              preset === TextInputPreset.PASSWORD && secureTextEntry
            }
            autoCorrect={preset === TextInputPreset.DESCRIPTION}
            autoFocus={autoFocus}
            ref={newRef}
            maxLength={getMaxLength()}
          />
        </View>
        {!disabled && renderRightIcon()}
      </View>

      {(inputError || errorMessage) && !isFocused ? (
        <Text preset={TextPresetStyles.TEXT_ERROR}>
          {inputError || errorMessage}
        </Text>
      ) : null}
    </View>
  );
};

FormTextInput.defaultProps = defaultProps;
export {FormTextInput};
