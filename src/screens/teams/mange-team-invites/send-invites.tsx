import {path} from 'ramda';
import {View} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';

import {translate} from '../../../i18n';
import {API_URLS} from '../../../services/urls';
import {Button} from '../../../components/button';
import {defaultAlert, showMessage} from '../../../utility';
import {postApiCall} from '../../../services/api-services';
import {STATUS_CODES} from '../../../services/status-codes';
import {Text, TextPresetStyles} from '../../../components/text';
import {SendInvitesStyles as styles} from './send-invites-styles';
import {BoostrScreen, HeaderTypes} from '../../../components/boostr-screen';
import {UserInviteList} from '../../my-challenges-screen/create-new-challenges/user-invite-list';
/**
 * An Interface for possible props for the Send Team invites component
 */
interface ISendInvitesProps {
  /**
   * Navigation prop used to set the navigation stuff in the
   * component like, go back, move to other screen, etc.
   */
  navigation: any;  

  /**
   * Prop used to provide the stuff data which send on screen
   */
  route: any;
}

/**
 *  SendTeamInvites - screen for send team invites to teams owners
 */
export const SendTeamInvites: React.FC<ISendInvitesProps> = (
  props: ISendInvitesProps,
) => {
  const [inviteListId, setInviteListId] = useState([]);
  const dispatch = useDispatch();
  const [teamId] = useState(props.route.params.teamId);

  /**
   * function is used to send invites to people
   */
  const onSendInvitesClick = async () => {
    const parameters = inviteListId.map(item => {
      return {
        user_id: item,
        user_team_id: teamId,
      };
    });
    try {
      const apiResponse = await dispatch(
        postApiCall(API_URLS.TEAM_USER_INVITE, parameters),
      );
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        showMessage(translate('common.inviteSent'));
        props.navigation.pop(3);
      } else if (
        path(['statusCode'], apiResponse) === STATUS_CODES.BAD_REQUEST
      ) {
        showMessage(`Error! : ${path(['message'], apiResponse)}`);
      } else {
        showMessage(`Error! : ${path(['message'], apiResponse)}`);
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };
  return (
    <BoostrScreen
      navigation={props.navigation}
      headerType={HeaderTypes.NORMAL_BACK}
      title={translate('modules.myChallenges.sendInvites')}>
      <View style={styles.mainContainerStyle}>
        <Text
          preset={TextPresetStyles.SUB_HEADLINE_REGULAR}
          style={styles.headingTextStyle}
          tx={'modules.teams.comeJoinTeamBoostr'}
        />
        <ScrollView style={styles.scrollViewStyle}>
          <UserInviteList
            setInviteListId={setInviteListId}
            isUpdateMode={false}
          />
          <Button
            tx={'common.sendInvite'}
            onPress={onSendInvitesClick}
            disabled={inviteListId === null || inviteListId.length <= 0}
          />
        </ScrollView>
      </View>
    </BoostrScreen>
  );
};
