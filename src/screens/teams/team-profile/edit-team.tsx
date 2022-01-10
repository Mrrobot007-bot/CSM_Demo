import {path} from 'ramda';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import React, {useEffect, useState} from 'react';
import ToggleSwitch from 'toggle-switch-react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

import {
  isValidName,
  showMessage,
  defaultAlert,
  getPrimaryColor,
  isValidDescription,
  INFO_CONTENT_ID_TYPES,
} from '../../../utility';
import {color} from '../../../theme';
import {translate} from '../../../i18n';
import {
  putApiCall,
  getApiCall,
  postApiCall,
} from '../../../services/api-services';
import {
  FormTextInput,
  TextInputPreset,
  TextInputReturnKeyType,
} from '../../../components/form-text-input';
import {Icon} from '../../../components/icon';
import {API_URLS} from '../../../services/urls';
import {Button} from '../../../components/button';
import {InfoComponent} from '../../../components/info';
import {ButtonPreset} from '../../../components/button';
import {STATUS_CODES} from '../../../services/status-codes';
import {ProgressBar} from '../../../components/progress-bar';
import {ICON_TYPES} from '../../../components/icon/constants';
import {Text, TextPresetStyles} from '../../../components/text';
import {CreateTeamStyles as styles} from '../create-team-styles';
import {teamProfileData} from '../../../utility/object-types/user';
import {BoostrScreen, HeaderTypes} from '../../../components/boostr-screen';
import {UserConfirmationDialog} from '../../../components/user-confirmation-dialog';
import {UploadImage} from '../../my-challenges-screen/create-new-challenges/upload-image';

/**
 * An Interface for possible props for Current month component
 */
interface ICreateTeamScreenProps {
  /**
   * Navigation prop used to set the navigation stuff in the
   * component like, go back, move to other screen, etc.
   */
  navigation: any;
}

/**
 *  EditTeamScreen - A screen used to edit team
 */
export const EditTeamScreen = (props: ICreateTeamScreenProps) => {
  const dispatch = useDispatch();
  const [teamName, setTeamName] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [teamAbout, setTeamAbout] = useState(null);
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [closedChallengeToggle, setClosedChallengeToggle] = useState(false);
  const teamId: string = path(['route', 'params', 'teamId'], props) || null;

  /**
   *  function to get the team
   */
  useEffect(() => {
    getTeamProfile();
  }, []);

  /**
   * function to edit the team property
   */
  const EditTeam = async () => {
    const parameters = {
      name: teamName,
      about: teamAbout,
      closed: closedChallengeToggle,
      image: imageUrl,
    };
    const URL = `${API_URLS.EDIT_TEAM_PROFILE}?id=${teamId}`;
    try {
      const apiResponse = await dispatch(
        postApiCall(URL, parameters, false, props.navigation, EditTeam),
      );

      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        showMessage(translate('modules.teams.profileUpdated'));
        props.navigation.pop(1);
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };

  /**
   * function to get the profile details
   */

  const getTeamProfile = async () => {
    const URL = `${API_URLS.TEAM_PROFILE}?id=${teamId}`;
    try {
      const apiResponse = await dispatch(
        getApiCall(URL, props.navigation, getTeamProfile, true),
      );
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        console.log('teamProfile api response==>', apiResponse);
        let data: teamProfileData = path(['data'], apiResponse);

        setTeamAbout(data.about);
        setImageUrl(data.image);
        setTeamName(data.name);
        setClosedChallengeToggle(data.closed);
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };

  /**
   * function to archive the team
   */
  const archivedTeam = async () => {
    setShowLeaveDialog(false);
    let parameters = {
      id: teamId,
      is_archived: true,
    };
    try {
      const apiResponse = await dispatch(
        putApiCall(
          API_URLS.REMOVE_ARCHIVED,
          parameters,
          props.navigation,
          archivedTeam,
        ),
      );
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        props.navigation.pop(2);
        showMessage(translate('modules.teams.teamArchived'));
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };

  const isSaveDisabled =
    !isValidName(teamName, true) ||
    !isValidDescription(teamAbout, true) ||
    imageUrl === null;
  return (
    <BoostrScreen
      headerType={HeaderTypes.NORMAL_BACK}
      navigation={props.navigation}
      title={translate('modules.teams.editTeam')}>
      <ScrollView style={styles.mainContainerStyle}>
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
          value={teamName}
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
          value={teamAbout}
        />

        <View style={styles.activityTextContainer}>
          <Text
            preset={TextPresetStyles.FOOT_NOTE_BOLD}
            style={styles.textInputPlaceHolderStyle}
            tx={'modules.teams.closedTeam'}
          />
          <InfoComponent
            style={{...styles.tildeIconStyle, tintColor: getPrimaryColor()}}
            infoContentId={INFO_CONTENT_ID_TYPES.EDIT_TEAM_CLOSED_TEAM}
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
            onPress={() => EditTeam()}
            preset={ButtonPreset.MEDIUM}
            style={styles.submitButtonStyle}
          />
        </View>
        <View style={[styles.lineVew, {backgroundColor: getPrimaryColor()}]} />
        <View style={styles.archiveTextContainer}>
          <TouchableOpacity
            onPress={() => setShowLeaveDialog(true)}
            style={styles.archiveIconTextContainer}>
            <Icon
              icon={ICON_TYPES.ARCHIVE_ICON}
              style={{...styles.archiveIcon, tintColor: getPrimaryColor()}}
            />
            <Text
              preset={TextPresetStyles.FOOT_NOTE_BOLD}
              style={[styles.archiveTextStyle, {color: getPrimaryColor()}]}
              tx={'modules.teams.archiveTeam'}
            />
          </TouchableOpacity>
          <InfoComponent
            style={{...styles.tildeIconStyle, tintColor: getPrimaryColor()}}
            infoContentId={INFO_CONTENT_ID_TYPES.ARCHIVE_TEAM_TOOLTIP}
          />
        </View>
      </ScrollView>
      <UserConfirmationDialog
        icon={ICON_TYPES.ARCHIVE_ICON}
        title={translate('modules.teams.archiveTeamHeader')}
        description={translate('modules.teams.archivedTeamDescription')}
        isVisible={showLeaveDialog}
        okButtonText={translate('common.archive')}
        onOkClick={() => archivedTeam()}
        onHideDialog={() => {
          setShowLeaveDialog(false);
        }}
      />
      {showProgressBar && <ProgressBar />}
    </BoostrScreen>
  );
};
