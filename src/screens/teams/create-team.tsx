import {path} from 'ramda';
import {View} from 'react-native';
import React, {useState} from 'react';
import ToggleSwitch from 'toggle-switch-react-native';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';

import {
  isValidName,
  showMessage,
  defaultAlert,
  getPrimaryColor,
  isValidDescription,
  INFO_CONTENT_ID_TYPES,
} from '../../utility';
import {color} from '../../theme';
import {translate} from '../../i18n';
import {
  FormTextInput,
  TextInputPreset,
  TextInputReturnKeyType,
} from '../../components/form-text-input';
import {API_URLS} from '../../services/urls';
import {Button} from '../../components/button';
import {ButtonPreset} from '../../components/button';
import {InfoComponent} from '../../components/info';
import {postApiCall} from '../../services/api-services';
import {ProgressBar} from '../../components/progress-bar';
import {STATUS_CODES} from '../../services/status-codes';
import {Text, TextPresetStyles} from '../../components/text';
import {CreateTeamStyles as styles} from './create-team-styles';
import {BoostrScreen, HeaderTypes} from '../../components/boostr-screen';
import {UploadImage} from '../my-challenges-screen/create-new-challenges/upload-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {UserInviteList} from '../my-challenges-screen/create-new-challenges/user-invite-list';

/**
 * An Interface for possible props for create Team screen component
 */ 

interface ICreateTeamScreenProps {
  /**
   * Navigation prop used to set the navigation stuff in the
   * component like, go back, move to other screen, etc.
   */
  navigation: any;
}

/**
 * Component is used to create the team
 */
export const CreateTeamScreen = (props: ICreateTeamScreenProps) => {
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState(null);
  const [teamName, setTeamName] = useState(null);
  const [teamAbout, setTeamAbout] = useState(null);
  const [inviteListId, setInviteListId] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [closedChallengeToggle, setClosedChallengeToggle] = useState(false);
  const apiReducer = useSelector((state: RootStateOrAny) => state.apiReducer);

  /**
   * function is used to create the team
   */
  const createTeam = async () => {
    setButtonDisabled(true);
    const parameters = {
      name: teamName,
      about: teamAbout,
      closed: closedChallengeToggle,
      image: imageUrl,
      invitedUsersId: inviteListId,
    };
    try {
      const apiResponse = await dispatch(
        postApiCall(
          API_URLS.CREATE_TEAM,
          parameters,
          false,
          props.navigation,
          createTeam,
        ),
      );
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        showMessage(translate('modules.teams.createTeamSuccess'));
        props.navigation.pop(1);
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
    setButtonDisabled(false);
  };

  const isSaveDisabled =
    !isValidName(teamName, true) ||
    !isValidDescription(teamAbout, true) ||
    imageUrl === null ||
    buttonDisabled;
  return (
    <BoostrScreen
      headerType={HeaderTypes.NORMAL_BACK}
      navigation={props.navigation}
      title={translate('modules.teams.createTeam')}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.mainContainerStyle]}>
        <View style={{flex: 1}}>
          <UploadImage
            imageUrl={imageUrl}
            setImageUrl={url => setImageUrl(url)}
            setShowProgressBar={setShowProgressBar}
            headerText={`${translate('modules.teams.uploadTeamImage')}*`}
          />

          <FormTextInput
            onChangeText={setTeamName}
            topPlaceholderTx={'modules.teams.teamName'}
            topPlaceholderTextColor={color.palette.grey9}
            preset={TextInputPreset.NAME}
            returnKeyType={TextInputReturnKeyType.DONE}
            isRequired
            checkValidation
            blurOnSubmit={true}
          />

          <FormTextInput
            onChangeText={setTeamAbout}
            topPlaceholderTx={'modules.teams.teamAbout'}
            topPlaceholderTextColor={color.palette.grey9}
            preset={TextInputPreset.DESCRIPTION}
            returnKeyType={TextInputReturnKeyType.DONE}
            isRequired
            checkValidation
            blurOnSubmit={true}
          />
          <Text
            text={translate('common.minimumTenCharacters')}
            preset={TextPresetStyles.FOOT_NOTE_BOLD}
            style={styles.minMumStyle}
          />
          <UserInviteList
            setInviteListId={setInviteListId}
            isUpdateMode={false}
          />

          <View style={styles.activityTextContainerClosedTeam}>
            <Text
              preset={TextPresetStyles.FOOT_NOTE_BOLD}
              style={styles.textInputPlaceHolderStyle}
              tx={'modules.teams.closedTeam'}
            />
            <InfoComponent
              style={{...styles.tildeIconStyle, tintColor: getPrimaryColor()}}
              infoContentId={INFO_CONTENT_ID_TYPES.CREATE_TEAM_CLOSED_TEAM}
            />
          </View>
          <View style={styles.activityTextContainer}>
            <Text
              preset={TextPresetStyles.SUB_HEADLINE_REGULAR}
              tx={
                closedChallengeToggle
                  ? 'modules.auth.yes'
                  : 'modules.myChallenges.no'
              }
            />
            <ToggleSwitch
              isOn={closedChallengeToggle}
              onColor={getPrimaryColor()}
              offColor={color.palette.grey6}
              onToggle={() => setClosedChallengeToggle(!closedChallengeToggle)}
            />
          </View>

          <View style={styles.buttonContainerStyle}>
            <Button
              tx={'common.cancel'}
              onPress={() => props.navigation.goBack(null)}
              preset={ButtonPreset.MEDIUM}
              style={styles.cancelButtonStyle}
              customTextStyle={{color: getPrimaryColor()}}
            />

            <Button
              tx={'common.save'}
              disabled={isSaveDisabled}
              onPress={() => createTeam()}
              preset={ButtonPreset.MEDIUM}
              style={styles.submitButtonStyle}
            />
          </View>
          <View style={styles.boostrDummy} />
        </View>
      </KeyboardAwareScrollView>
      {showProgressBar && <ProgressBar />}
      {apiReducer.loading && <ProgressBar />}
    </BoostrScreen>
  );
};
