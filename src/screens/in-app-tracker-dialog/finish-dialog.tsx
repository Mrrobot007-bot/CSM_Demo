import React from 'react';
import Modal from 'react-native-modal';
import {TouchableOpacity, View} from 'react-native';

import {Icon} from '../../components/icon';
import {getPrimaryColor} from '../../utility';
import {Button} from '../../components/button';
import {ButtonPreset} from '../../components/button';
import {InAppTrackerStyles as styles} from './styles';
import {ICON_TYPES} from '../../components/icon/constants';
import {Text, TextPresetStyles} from '../../components/text';

/**
 * An Interface for possible props for the InAppTrackerFinishDialog component
 */
interface InAppTrackerFinishDialogProps {
  /**
   * A prop used to tell parent component that dialog closed request raised
   */
  onHideDialog?: () => void;

  /**
   * A prop used to tell parent component that restart time clicked
   */
  onRestartTimerClick?: () => void;

  /**
   * A prop used to tell this component to show or hide
   */
  isVisible: boolean;
}

/**
 * Component used to show the final confirmation dialog at the time of record submission
 */
export const InAppTrackerFinishDialog = (
  props: InAppTrackerFinishDialogProps,
) => {
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
            <Icon
              icon={ICON_TYPES.CHECK_CIRCLE}
              style={styles.finishDialogLogoIconStyle}
            />
          </View>

          <Text
            preset={TextPresetStyles.TITLE}
            style={styles.finishDialogTitleStyle}
            tx={'modules.inAppTracking.yourDataSaved'}
          />

          <Text
            preset={TextPresetStyles.FOOT_NOTE}
            style={styles.centerTextStyle}
            tx={'modules.inAppTracking.yourDataSavedDescription'}
          />

          <TouchableOpacity style={styles.finishDialogShareContainerStyle}>
            <Icon
              icon={ICON_TYPES.SHARE}
              style={{
                ...styles.finishDialogShareIconStyle,
                tintColor: getPrimaryColor(),
              }}
            />
            <Text
              preset={TextPresetStyles.CAPTION_1}
              tx={'common.share'}
              style={[
                styles.finishDialogShareTextStyle,
                {color: getPrimaryColor()},
              ]}
            />
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.finishDialogContainerStyle,
            {borderTopColor: getPrimaryColor(0.3)},
          ]}>
          <Button
            onPress={props.onHideDialog}
            preset={ButtonPreset.MEDIUM}
            tx={'common.cancel'}
            customTextStyle={[{color: getPrimaryColor()}]}
            style={[
              styles.finishDialogButtonStyle,
              styles.finishDialogCancelButtonStyle,
            ]}
          />
          <Button
            onPress={props.onRestartTimerClick}
            preset={ButtonPreset.MEDIUM}
            tx={'common.restart'}
            style={styles.finishDialogButtonStyle}
          />
        </View>
      </View>
    </Modal>
  );
};
