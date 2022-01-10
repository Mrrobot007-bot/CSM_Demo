import React from 'react';
import {path} from 'ramda';
import {View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {Icon} from '../../../components/icon';
import {
  ChallengeType,
  ChallengeScreenTypes,
} from '../../../utility/object-types/challenge';
import {RootStateOrAny, useSelector} from 'react-redux';
import {ICON_TYPES} from '../../../components/icon/constants';
import {ChallengesStyles as styles} from './challenges-styles';
import {Text, TextPresetStyles} from '../../../components/text';
import {getPrimaryColor, SCREEN_ROUTES} from '../../../utility';

/**
 * An Interface for possible props for the ManageChallenge Component
 */
interface IChallengesProps {
  /**
   * Prop used to get the challenges item
   */
  challenge: ChallengeType;
}

/**
 * ManageChallengeComponent - component used to render the edit challenge and manage invites
 * section in challenge component
 */
export const ManageChallengeComponent: React.FC<IChallengesProps> = (
  props: IChallengesProps,
) => {
  const userReducer = useSelector((state: RootStateOrAny) => state.userReducer);
  const navigation = useNavigation();
  const shouldShowManageOptions =
    path(['challenge', 'invitedByUserId'], props) ===
      path(['user', '_id'], userReducer) &&
    (path(['challenge', 'screenType'], props) ===
      ChallengeScreenTypes.UPCOMING ||
      path(['challenge', 'screenType'], props) === ChallengeScreenTypes.LIVE);

  const onEditChallengeClick = () => {
    navigation.navigate(SCREEN_ROUTES.RELAY_CHALLENGES_SCREEN, {
      challengeType: path(['challenge', 'challengeType'], props),
      isUpdateMode: true,
      challengeData: path(['challenge'], props),
    });
  };

  const onManageInvitesClick = (item: any) => {
    navigation.navigate(SCREEN_ROUTES.MANAGE_INVITES, {
      challengeId: item._id,
      isTeamChallenge: item.isTeamChallenge,
    });
  };
  return shouldShowManageOptions ? (
    <View style={styles.manageInviteContainerStyle}>
      <TouchableOpacity
        onPress={onEditChallengeClick}
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
          tx={'modules.myChallenges.editChallenge'}
        />
      </TouchableOpacity>

      <View
        style={[
          styles.manageInviteLineStyle,
          {backgroundColor: getPrimaryColor()},
        ]}
      />

      <TouchableOpacity
        onPress={() => onManageInvitesClick(props.challenge)}
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
  ) : null;
};
