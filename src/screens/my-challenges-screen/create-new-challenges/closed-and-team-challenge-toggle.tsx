import React from 'react';
import {View} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';

import {color} from '../../../theme';
import {InfoComponent} from '../../../components/info';
import {RelayChallengesStyles as styles} from './styles';
import {Text, TextPresetStyles} from '../../../components/text';
import {getPrimaryColor, INFO_CONTENT_ID_TYPES} from '../../../utility';

/**
 * An Interface for possible props for the ClosedAndTeamChallengeToggle component
 */
interface IClosedAndTeamChallengeToggleProps {
  /**
   * Prop used to tell, if challenge closed or not
   */
  closedChallengeToggle: boolean;

  /**
   * Prop used to tell, if its a edit mode or create challenge mode
   */
  isUpdateMode: boolean;

  /**
   * Prop used to provide the callback on change closed challenge toggle
   */
  setClosedChallengeToggle: (item: boolean) => void;

  /**
   * Prop used to provide the callback on change team challenge toggle
   */
  setTeamChallengeToggle: (item: boolean) => void;

  /**
   * Prop used to tell, if challenge is a team challenge or not
   */
  teamChallengeToggle: boolean;
}

/**
 * ClosedAndTeamChallengeToggle - A component used to provide toggle switches
 * for choosing closed challenge or team challenge
 */
export const ClosedAndTeamChallengeToggle: React.FC<IClosedAndTeamChallengeToggleProps> =
  (props: IClosedAndTeamChallengeToggleProps) => {
    return (
      <View>
        <View style={styles.activityTextContainer}>
          <Text
            preset={TextPresetStyles.SUB_HEADLINE}
            style={{color: color.textInputPlaceHolderText}}
            tx={
              props.closedChallengeToggle
                ? 'modules.auth.yes'
                : 'modules.myChallenges.no'
            }
          />
          <ToggleSwitch
            isOn={props.closedChallengeToggle}
            onColor={getPrimaryColor()}
            offColor={color.palette.grey6}
            onToggle={() =>
              props.setClosedChallengeToggle(!props.closedChallengeToggle)
            }
          />
        </View>
        {props.isUpdateMode ? null : (
          <View style={styles.activityTextContainer}>
            <Text
              preset={TextPresetStyles.FOOT_NOTE_BOLD}
              style={styles.textInputPlaceHolderStyle}
              tx={'modules.myChallenges.teamChallenge'}
            />

            <InfoComponent
              style={styles.tildeIconStyle}
              infoContentId={
                INFO_CONTENT_ID_TYPES.CREATE_CHALLENGE_TEAM_CHALLENGE
              }
            />
          </View>
        )}
        {props.isUpdateMode ? null : (
          <View style={styles.activityTextContainer}>
            <Text
              preset={TextPresetStyles.SUB_HEADLINE}
              style={{color: color.textInputPlaceHolderText}}
              tx={
                props.teamChallengeToggle
                  ? 'modules.auth.yes'
                  : 'modules.myChallenges.no'
              }
            />
            <ToggleSwitch
              isOn={props.teamChallengeToggle}
              onColor={getPrimaryColor()}
              offColor={color.palette.grey6}
              onToggle={() =>
                props.setTeamChallengeToggle(!props.teamChallengeToggle)
              }
            />
          </View>
        )}
      </View>
    );
  };
