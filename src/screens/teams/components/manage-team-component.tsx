import React from 'react';
import {View, TouchableOpacity} from 'react-native';

import {Icon} from '../../../components/icon';
import {getPrimaryColor} from '../../../utility';
import {TeamComponentStyles as styles} from './styles';
import {ICON_TYPES} from '../../../components/icon/constants';
import {Text, TextPresetStyles} from '../../../components/text';

/**
 * An Interface for possible props for the ManageTeamComponent component
 */
interface IChallengesProps {
  /**
   * A required prop used to on editClick  view
   */
  onEditClick?: () => void;

  /**
   * A required prop used to on manageEdit view
   */
  onManageClick?: () => void;
}

/**
 * Function is used to show manageTeam view
 */
export const ManageTeamComponent: React.FC<IChallengesProps> = (
  props: IChallengesProps,
) => {
  return (
    <View style={styles.manageInviteContainerStyle}>
      <TouchableOpacity
        onPress={props.onEditClick}
        style={styles.manageInvitePart1ContainerStyle}>
        <Icon
          icon={ICON_TYPES.EDIT}
          style={{
            ...styles.manageInviteIconStyle,
            tintColor: getPrimaryColor(),
          }}
        />
        <Text
          preset={TextPresetStyles.FOOT_NOTE_BOLD}
          style={{color: getPrimaryColor()}}
          tx={'modules.teams.editTeam'}
        />
      </TouchableOpacity>

      <View
        style={[
          styles.manageInviteLineStyle,
          {backgroundColor: getPrimaryColor()},
        ]}
      />

      <TouchableOpacity
         onPress={props.onManageClick}
        style={styles.manageInvitePart2ContainerStyle}>
        <Icon
          icon={ICON_TYPES.PEOPLE}
          style={{
            ...styles.manageInviteIconStyle,
            tintColor: getPrimaryColor(),
          }}
        />
        <Text
          preset={TextPresetStyles.FOOT_NOTE_BOLD}
          style={{color: getPrimaryColor()}}
          tx={'modules.myChallenges.manageInvites'}
        />
      </TouchableOpacity>
    </View>
  );
};
