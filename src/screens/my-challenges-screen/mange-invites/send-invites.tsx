import {path} from 'ramda';
import {View} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {useDispatch} from 'react-redux';
import {Button} from '../../../components/button';
import {ScrollView} from 'react-native-gesture-handler';

import {translate} from '../../../i18n';
import {Icon} from '../../../components/icon';
import {API_URLS} from '../../../services/urls';
import {postApiCall} from '../../../services/api-services';
import {STATUS_CODES} from '../../../services/status-codes';
import {ICON_TYPES} from '../../../components/icon/constants';
import {SendInvitesStyles as styles} from './send-invites-styles';
import {UserInviteList} from '../create-new-challenges/user-invite-list';
import {TeamInviteList} from '../create-new-challenges/team-invite-list';
import {defaultAlert, getPrimaryColor, showMessage} from '../../../utility';

/**
 * An Interface for possible props for the SendInvites modal
 */
interface ISendInvitesProps {
  /**
   * A prop used to provide the challenge id,
   * which used to make invite call to server
   */
  challengeId: string;

  /**
   * A prop used to provide the callback for getting
   * manage invite list again after invitation sent
   */
  getManageInviteList?: () => void;

  /**
   * A prop used to determine, if its a team challenge
   * invite or user challenge invite
   */
  isTeamChallenge: boolean;

  /**
   * A prop used to provide the callback to hide/show the modal
   */
  setShouldShowModal?: (item: boolean) => void;

  /**
   * A prop used to determine the visibility of send invite modal
   */
  shouldShowModal: boolean;
}

/**
 * SendInvites - A modal used to send invites to
 * ˝team / user as per challenge requirements
 */

export const SendInvites: React.FC<ISendInvitesProps> = (
  props: ISendInvitesProps,
) => {
  const [inviteListId, setInviteListId] = useState([]);
  const dispatch = useDispatch();

  const onSendInvitesClick = async () => {
    const parameters = inviteListId.map(item => {
      return {
        user_id: item,
        challenge_id: props.challengeId,
      };
    });

    try {
      const apiResponse = await dispatch(
        postApiCall(API_URLS.INVITE_USER, parameters),
      );

      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        showMessage(translate('common.inviteSent'));
        props.setShouldShowModal(false);
        props.getManageInviteList();
      } else if (
        path(['statusCode'], apiResponse) === STATUS_CODES.BAD_REQUEST
      ) {
        showMessage(
          `${translate('modules.errorMessages.error')}! : ${path(
            ['message'],
            apiResponse,
          )}`,
        );
      } else {
        showMessage(
          `${translate('modules.errorMessages.error')}! : ${path(
            ['message'],
            apiResponse,
          )}`,
        );
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };
  return (
    <Modal
      isVisible={props.shouldShowModal}
      onBackdropPress={() => props.setShouldShowModal(false)}
      onModalHide={() => props.setShouldShowModal(false)}>
      <View style={styles.mainContainerStyle}>
        <Icon
          icon={ICON_TYPES.CROSS}
          style={{...styles.closeButtonStyle, tintColor: getPrimaryColor()}}
          onIconClick={() => props.setShouldShowModal(false)}
        />
        <ScrollView style={styles.scrollViewStyle}>
          {props.isTeamChallenge ? (
            <TeamInviteList
              setInviteListId={setInviteListId}
              isUpdateMode={false}
            />
          ) : (
            <UserInviteList
              setInviteListId={setInviteListId}
              isUpdateMode={false}
            />
          )}
        </ScrollView>

        <View style={{}}>
          <Button
            tx={'common.sendInvite'}
            onPress={onSendInvitesClick}
            disabled={inviteListId === null || inviteListId.length <= 0}
          />
        </View>
      </View>
    </Modal>
  );
};
