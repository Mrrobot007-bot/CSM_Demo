import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {RegisteredStyle, View, ViewStyle} from 'react-native';

import {Icon} from '../icon';
import {color} from '../../theme';
import {translate} from '../../i18n';
import {ICON_TYPES} from '../icon/constants';
import {Text, TextPresetStyles} from '../text';
import {DropDownStyles as styles} from './styles';
import {I18NKeyName} from '../../i18n/translation-keys';

/**
 * An Interface for possible props for the Default dropdown component
 */
interface IDropDownPickerProps {
  /**
   * An optional prop used to determine that dropdown is disabled or not
   */
  disabled?: boolean;

  /**
   * Dropdown list items
   */
  dropDownItems?: any;

  /**
   * An Optional prop used to customize the dropdown wherever required
   */
  dropDownStyle?: ViewStyle | RegisteredStyle<any>;

  /**
   * Inside Placeholder Text which is looked up via i18n.
   */
  inlinePlaceholderTx?: I18NKeyName;

  /**
   * Used to open and close the dropdown.
   */

  isOpenPicker?: boolean;

  /**
   * Put a asterisk with label if its marked required
   */
  isRequired?: boolean;

  /**
   * Callback that is called when the dropdown selected value changed.
   * Changed text is passed as a single string argument to the callback handler.
   */
  onSetValue(text: string): void;

  /**
   * Callback that is called when the dropdown open and close.
   */

  setIsOpenPicker?(value: boolean): void;

  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle | RegisteredStyle<any>;

  /**
   * Default placeholder
   */
  placeholder?: string;

  /**
   * Top Placeholder Text .
   */
  topPlaceholderText?: string;

  /**
   * Top Placeholder Text color, providing the ability to override if required
   */
  topPlaceholderTextColor?: string;

  /**
   * Top Placeholder Text which is looked up via i18n.
   */
  topPlaceholderTx?: I18NKeyName;

  /**
   * An optional prop used to define right side component if required
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

const defaultProps: IDropDownPickerProps = {
  onSetValue: () => {},
  placeholder: '',
};

/**
 * DefaultDropDownPicker - A Customized dropdown component used in boostr app
 */
const DefaultDropDownPicker: React.FC<IDropDownPickerProps> = (
  props: IDropDownPickerProps,
) => {
  // grab the props
  const {
    topPlaceholderTx,
    topPlaceholderText,
    style,
    topPlaceholderTextColor,
    isRequired,
    value,
    dropDownItems,
    onSetValue,
    placeholder,
    setIsOpenPicker,
    isOpenPicker,
    dropDownStyle,
    topRightIcon,
    topRightIconClick,
    topRightComponent,
    disabled,
  } = props;

  React.useEffect(() => {
    try {
      if (value) {
        onSetValue(value);
      }
    } catch (e) {}
  }, [value]);

  const calculatedHeight =
    dropDownItems.length < 5 ? 50 * dropDownItems.length + 60 : 50 * 6;
  return (
    <View
      style={[
        styles.wrapperStyle,
        {
          zIndex: isOpenPicker ? 1000 : 500,
          height: isOpenPicker ? calculatedHeight : null,
        },
        style,
      ]}>
      <View style={styles.labelContainerStyle}>
        <Text
          preset={TextPresetStyles.TEXT_LABEL}
          text={
            topPlaceholderText ||
            `${translate(topPlaceholderTx)}${isRequired ? '*' : ''}`
          }
          style={{color: topPlaceholderTextColor}}
        />
        {topRightComponent ||
          (topRightIcon && (
            <Icon
              icon={topRightIcon}
              onIconClick={topRightIconClick}
              style={styles.infoIconStyle}
            />
          ))}
      </View>

      <DropDownPicker
        open={isOpenPicker}
        value={value}
        dropDownDirection={'BOTTOM'}
        items={dropDownItems}
        placeholder={placeholder || translate('common.select')}
        placeholderStyle={{
          color: color.textInputPlaceHolderText,
        }}
        onClose={() => setIsOpenPicker(false)}
        setOpen={setIsOpenPicker}
        setValue={onSetValue}
        disableBorderRadius={true}
        disabled={disabled}
        containerStyle={styles.dropDownContainerStyle}
        style={dropDownStyle || styles.dropDownStyle}
        ArrowUpIconComponent={() => (
          <Icon icon={ICON_TYPES.DROP_UP} style={styles.arrowIconStyle} />
        )}
        ArrowDownIconComponent={() => (
          <Icon icon={ICON_TYPES.DROP_DOWN} style={styles.arrowIconStyle} />
        )}
      />
    </View>
  );
};

DefaultDropDownPicker.defaultProps = defaultProps;
export {DefaultDropDownPicker};
