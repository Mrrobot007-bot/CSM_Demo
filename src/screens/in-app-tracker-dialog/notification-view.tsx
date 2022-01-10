import React from 'react';
import {useState} from 'react';
import HealthKit, {
  HKQuantityTypeIdentifier,
} from '@kingstinct/react-native-healthkit';
import {View} from 'react-native-animatable';
import Fitness from '@ovalmoney/react-native-fitness';

import {translate} from '../../i18n';
import {Button} from '../../components/button';
import {InAppTrackerStyles as styles} from './styles';
import {Text, TextPresetStyles} from '../../components/text';
import {DefaultDialog} from '../../components/default-dialog';
import DefaultPreference from 'react-native-default-preference';
import {ButtonPreset, ButtonType} from '../../components/button';
import {DefaultPreferenceKeys, getPrimaryColor, isAndroid} from '../../utility';

/**
 * An Interface for possible props for the NotificationView component
 */
interface INotificationViewProps {
  /**
   * A prop used to set the health data permission info
   */
  setIsHealthDataPermissionAccepted: (isAccepted: boolean) => void;
}
export const NotificationView = (props: INotificationViewProps) => {
  const [showDialog, setShowDialog] = useState(false);
  /**
   * android functions for permissions of fitness read and distance form watch
   */
  const androidPermissions = [
    {
      kind: Fitness.PermissionKinds.Distances,
      access: Fitness.PermissionAccesses.Read,
    },
  ];

  const onAllowPermissionClick = async () => {
    setShowDialog(true);
  };

  /**
   * function for ios permission for tracking
   */
  const callIosPermissions = async () => {
    const response = await HealthKit.requestAuthorization([
      HKQuantityTypeIdentifier.distanceCycling,
      HKQuantityTypeIdentifier.distanceWalkingRunning,
    ]);
    props.setIsHealthDataPermissionAccepted(response);
    DefaultPreference.set(
      DefaultPreferenceKeys.HEALTH_KIT_PERMISSION,
      `${response}`,
    );
  };

  const callAndroidPermissions = async () => {
    Fitness.requestPermissions(androidPermissions)
      .then(authorized => {
        props.setIsHealthDataPermissionAccepted(authorized);
      })
      .catch(error => {
        props.setIsHealthDataPermissionAccepted(false);
      });
  };

  /**
   * function to allow the permission for tracking
   */
  const onAllowClick = () => {
    if (isAndroid) {
      callAndroidPermissions();
    } else {
      callIosPermissions();
    }
  };

  return (
    <View>
      <View
        style={[
          styles.enableBoostrContainerStyle,
          {backgroundColor: getPrimaryColor(0.05)},
        ]}>
        <Text
          preset={TextPresetStyles.DESCRIPTION}
          style={styles.full}
          tx={
            isAndroid
              ? 'modules.inAppTracking.enableBoostDescriptionAndroid'
              : 'modules.inAppTracking.enableBoostDescriptionIos'
          }
        />
        <Button
          onPress={onAllowPermissionClick}
          preset={ButtonPreset.EXTRA_SMALL}
          type={ButtonType.SECONDARY}
          tx={'common.allow'}
          style={styles.allowButtonStyle}
        />
      </View>
      <DefaultDialog
        isVisible={showDialog}
        hideDialog={() => setShowDialog(false)}
        header={
          isAndroid
            ? translate('modules.inAppTracking.accessBoostrHeaderAndroid')
            : translate('modules.inAppTracking.accessBosstrHeaderIos')
        }
        description={
          isAndroid
            ? translate('modules.inAppTracking.androidAccessBoostrDescription')
            : translate(
                'modules.inAppTracking.modules.inAppTracking.iosAccessBoostrDescription',
              )
        }
        button1Text={translate('common.dontAllow')}
        button2Text={translate('common.ok')}
        onButton1Click={() => setShowDialog(false)}
        onButton2Click={onAllowClick}
        button2TextStyle={styles.dialogTextStyle}
        button1TextStyle={styles.dialogTextStyle}
        twoButtons
      />
    </View>
  );
};
