import React from 'react';
import {View} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';

import {
  DEVICE_HEIGHT,
  getPrimaryColor,
  INFO_CONTENT_ID_TYPES,
  CREATE_CHALLENGES_TYPE,
} from '../../../utility';
import {
  FormTextInput,
  TextInputPreset,
} from '../../../components/form-text-input';
import {color, spacingPresets} from '../../../theme';
import {InfoComponent} from '../../../components/info';
import {RelayChallengesStyles as styles} from './styles';
import {Text, TextPresetStyles} from '../../../components/text';

/**
 * An Interface for possible props for the FundRise component
 */
interface IFundRiseProps {
  /**
   * Used to determine the selected challenge type
   */
  challengeType: CREATE_CHALLENGES_TYPE;

  /**
   * used to set selected toggle value
   */
  charityChallengeToggle: boolean;

  /**
   * used to set selected toggle url
   */
  fundRaiseUrl: string;

  /**
   * used to provide the callback for setting toggle value
   */
  setCharityChallengeToggle: (item: boolean) => void;

  /**
   * used to provide the callback for setting url value
   */
  setFundRaiseUrl: (item: string) => void;
}

/**
 * FundRise - A Component used to render fund raise component while create/edit challenge
 */
export const FundRise: React.FC<IFundRiseProps> = (props: IFundRiseProps) => {
  const shouldShowData =
    props.challengeType === CREATE_CHALLENGES_TYPE.RELAY ||
    props.challengeType === CREATE_CHALLENGES_TYPE.HAPPY_FEET ||
    props.challengeType === CREATE_CHALLENGES_TYPE.FAR_OUT;
  return shouldShowData ? (
    <View style={{marginBottom: spacingPresets.small}}>
      <View style={styles.activityTextContainer}>
        <Text
          preset={TextPresetStyles.FOOT_NOTE_BOLD}
          style={styles.textInputPlaceHolderStyle}
          tx={'modules.myChallenges.charityChallenge'}
        />
        <InfoComponent
          style={{...styles.tildeIconStyle, tintColor: getPrimaryColor()}}
          infoContentId={INFO_CONTENT_ID_TYPES.CREATE_CHALLENGE_FUNDRAISING}
        />
      </View>
      <View style={styles.activityTextContainer}>
        <Text
          preset={TextPresetStyles.DESCRIPTION}
          style={{color: color.palette.black}}
          tx={'modules.myChallenges.fundraiseViaJustGiving'}
        />
        <ToggleSwitch
          isOn={props.charityChallengeToggle}
          onColor={getPrimaryColor()}
          offColor={color.palette.grey6}
          onToggle={() =>
            props.setCharityChallengeToggle(!props.charityChallengeToggle)
          }
        />
      </View>

      {props.charityChallengeToggle && (
        <FormTextInput
          onChangeText={props.setFundRaiseUrl}
          value={props.fundRaiseUrl}
          checkValidation
          topPlaceholderTx={'common.justGivingUrl'}
          topPlaceholderTextColor={color.textInputPlaceHolderText}
          preset={TextInputPreset.NAME}
          customInputStyle={styles.activityPickerDropdownStyle}
          style={{marginTop: DEVICE_HEIGHT * 0.024}}
        />
      )}
    </View>
  ) : null;
};
