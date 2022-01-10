import {View} from 'react-native';
import Modal from 'react-native-modal';
import React, {ReactElement} from 'react';

import {translate} from '../../i18n';
import {Icon} from '../../components/icon';
import {Button} from '../../components/button';
import {ButtonPreset} from '../../components/button';
import {IconTypes} from '../../components/icon/constants';
import {Text, TextPresetStyles} from '../../components/text';
import {UserConfirmationDialogStyles as styles} from './styles';
import {getPrimaryColor} from '../../utility';

interface IUserConfirmationDialogProps {
  /**
   *
   * A prop used to provide the description text
   */
  description: string;

  /**
   *
   * A prop used to provide the cancel button text
   */
  cancelButtonText?: string;

  /**
   *
   * A prop used to provide any extra description need to show
   */
  extraDescription?: ReactElement;

  /**
   *
   * A prop used to provide the dialog icon
   */
  icon: IconTypes;

  /**
   *
   * A prop used to tell this component to show or hide
   */
  isVisible: boolean;

  /**
   *
   * A prop used to provide the title text
   */
  title: string;

  /**
   *
   * A prop used to provide the ok button text
   */
  okButtonText?: string;

  /**
   *
   * A prop used to tell parent component that dialog closed request raised
   */
  onHideDialog?: () => void;

  /**
   *
   * A prop used to tell parent component that ok clicked
   */
  onOkClick?: () => void;

  isSingleButton?: boolean;
}

/**
 *
 * Component used to show the final confirmation dialog at the time of record submission
 */
export const UserConfirmationDialog = (props: IUserConfirmationDialogProps) => {
  return (
    <Modal
      isVisible={props.isVisible}
      onBackdropPress={props.onHideDialog}
      onModalHide={props.onHideDialog}>
      <View style={styles.finishDialogMainContainerStyle}>
        <View style={styles.finishDialogPart1ContainerStyle}>
          <View
            style={[
              styles.finishDialogLogoContainerStyle,
              {backgroundColor: getPrimaryColor()},
            ]}>
            <Icon icon={props.icon} style={styles.finishDialogLogoIconStyle} />
          </View>

          <Text
            preset={TextPresetStyles.TITLE}
            style={styles.finishDialogTitleStyle}
            text={props.title}
          />

          <Text
            preset={TextPresetStyles.FOOT_NOTE}
            style={styles.centerTextStyle}
            text={props.description}
          />

          {props.extraDescription}
        </View>

        <View
          style={
            !props.isSingleButton
              ? [
                  styles.finishDialogContainerStyle,
                  {borderTopColor: getPrimaryColor(0.3)},
                ]
              : [
                  styles.finishDialogSingleButtonContainerStyle,
                  {borderTopColor: getPrimaryColor(0.3)},
                ]
          }>
          {!props.isSingleButton ? (
            <Button
              onPress={props.onHideDialog}
              preset={ButtonPreset.MEDIUM}
              text={props.cancelButtonText || translate('common.cancel')}
              customTextStyle={{color: getPrimaryColor()}}
              style={[
                styles.finishDialogButtonStyle,
                styles.finishDialogCancelButtonStyle,
              ]}
            />
          ) : null}
          <Button
            onPress={props.onOkClick}
            preset={ButtonPreset.MEDIUM}
            text={props.okButtonText || translate('common.ok')}
            style={styles.finishDialogButtonStyle}
          />
        </View>
      </View>
    </Modal>
  );
};
