import {
  View,
  TouchableOpacity,
  ViewStyle,
  RegisteredStyle,
  TextStyle,
} from 'react-native';
import Modal from 'react-native-modal';
import React, {FC, ReactElement} from 'react';

import {Text} from '../text';
import {translate} from '../../i18n';
import {TextPresetStyles} from '../text/constants';
import {DefaultDialogStyles as styles} from './styles';

/**
 * An Interface for possible props for thE Default
 * dialog component used in this app
 */
export interface IMenuDialogProps {
  /**
   * An optional prop used to provide the style to button 1
   */
  button1style?: ViewStyle;

  /**
   * An optional prop used to provide the text to button 1
   */
  button1Text?: string;

  /**
   * An optional prop used to provide the style for button 1 text
   */
  button1TextStyle?: ViewStyle | TextStyle | RegisteredStyle<any>;

  /**
   * An optional prop used to provide the style to button 2
   */
  button2style?: ViewStyle;

  /**
   * An optional prop used to provide the text to button 2
   */
  button2Text?: string;

  /**
   * An optional prop used to provide the style for button 2 text
   */
  button2TextStyle?: ViewStyle | TextStyle | RegisteredStyle<any>;

  /**
   * An optional prop used to provide the dialog description
   * for button 2 text
   */
  description?: string;

  /**
   * An optional prop used to provide the header to dialog
   */
  header?: string;

  /**
   * A required prop used to provide a callback when dialog hides
   */
  hideDialog: () => void;

  /**
   * A required prop used to determine i.e dialog visible or not
   */
  isVisible: boolean;

  /**
   * An optional prop used to provide the callback on button 1 click
   */
  onButton1Click?: () => void;

  /**
   * An optional prop used to provide the callback on button 2 click
   */
  onButton2Click?: () => void;

  /**
   * An optional prop used to decide we have 1 or 2 button in dialog
   */
  singleButton?: boolean;

  /**
   * An optional prop used to decide we have 1 or 2 button in dialog
   */
  twoButtons?: boolean;
}

/**
 * DefaultDialog , component used to render default dialog used in app
 */
export const DefaultDialog: FC<IMenuDialogProps> = (
  props: IMenuDialogProps,
): ReactElement => {
  const onButtonOneClick = () => {
    props.hideDialog();
    props.onButton1Click();
  };

  const onButtonTwoClick = () => {
    props.hideDialog();
    props.onButton2Click();
  };

  const renderButton = (
    text: string,
    onPress: any,
    buttonStyle: any,
    buttonTextStyle: ViewStyle | TextStyle | RegisteredStyle<any>,
  ) => (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text preset={TextPresetStyles.CAPTION_4} style={buttonTextStyle}>
        {text}
      </Text>
    </TouchableOpacity>
  );

  const {
    isVisible,
    hideDialog,
    header,
    description,
    button1Text,
    button2Text,
    twoButtons,
    button1style,
    button2style,
    button1TextStyle,
    button2TextStyle,
    singleButton,
  } = props;
  const {
    singleButtonStyle,
    twoButtonStyle,
    modalContentStyle,
    buttonsBorderStyle,
    buttonsBorderStyleForSingleButton,
  } = styles;

  const BUTTON1_RIGHT_BORDER = 1;

  return (
    <View>
      <Modal
        isVisible={isVisible}
        onBackdropPress={() => hideDialog()}
        onModalHide={() => hideDialog()}>
        <View style={modalContentStyle}>
          {header && (
            <Text
              preset={TextPresetStyles.SUB_HEADLINE1_HEV}
              text={header}
              style={styles.headerTextStyle}
            />
          )}

          <Text
            preset={TextPresetStyles.DESCRIPTION_SMALL}
            text={description}
            style={styles.descriptionTextStyle}
          />

          <View
            style={[
              buttonsBorderStyle,
              !twoButtons && !singleButton && buttonsBorderStyleForSingleButton,
            ]}>
            {renderButton(
              button1Text || translate('common.ok'),
              onButtonOneClick,
              [
                twoButtons
                  ? [twoButtonStyle, {borderLeftWidth: 0}]
                  : singleButtonStyle,
                button1style,
              ],
              button1TextStyle,
            )}
            {twoButtons &&
              renderButton(
                button2Text || translate('common.ok'),
                onButtonTwoClick,
                [
                  twoButtonStyle,
                  {borderLeftWidth: BUTTON1_RIGHT_BORDER},
                  button2style,
                ],
                button2TextStyle,
              )}
          </View>
        </View>
      </Modal>
    </View>
  );
};
