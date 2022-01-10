import {path} from 'ramda';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  HeaderTypes,
  BoostrScreen,
  HeaderRightComponentType,
} from '../../components/boostr-screen';
import {translate} from '../../i18n';
import {MyTeamList} from './my-team-list';
import {Icon} from '../../components/icon';
import {API_URLS} from '../../services/urls';
import {OpenTeamList} from './open-team-list';
import {MyTeamStyles as styles} from './styles';
import {ArchivedTeamList} from './archived-team-list';
import {STATUS_CODES} from '../../services/status-codes';
import {TeamType} from '../../utility/object-types/team';
import {ICON_TYPES} from '../../components/icon/constants';
import {Text, TextPresetStyles} from '../../components/text';
import {PullToRefresh} from '../../components/pull-to-refresh';
import {getApiCall, postApiCall} from '../../services/api-services';
import {defaultAlert, getPrimaryColor, SCREEN_ROUTES} from '../../utility';

/**
 * An Interface for possible props for My Teams Screen component
 */
interface IMyTeamsScreenProps {
  /**
   * Navigation prop used to set the navigation stuff in the
   * component like, go back, move to other screen, etc.
   */
  navigation: any;
}

/**
 * component is used to show my teams screen
 */
export const MyTeamsScreen = (props: IMyTeamsScreenProps) => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const [myTeamList, setMyTeamList] = useState<Array<TeamType>>([]);
  const [openList, setOpenList] = useState([]);
  const [archivedTeamList, setArchivedTeamList] = useState([]);

  /**
   * function is used to dismiss the dismiss to refresh loader
   */
  const dismissRefresh = () => {
    setRefreshing(true);
    getMyTeamList();
  };

  /**
   * function is used  load the initial data
   */
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getMyTeamList();
    });
    return unsubscribe;
  }, [props.navigation]);

  /**
   * function is used to load the our team list
   */
  const getMyTeamList = async () => {
    try {
      let apiResponse = await dispatch(
        getApiCall(
          API_URLS.GET_MY_TEAM_LIST,
          props.navigation,
          getMyTeamList,
          true,
        ),
      );
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        let data: Array<TeamType> = path(['data'], apiResponse);
        setMyTeamList(data);
        getDefaultSuggestions();
        setRefreshing(false);
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };

  /**
   * function is used to get open list of team
   */
  const getDefaultSuggestions = async () => {
    let parameters = {
      searchkey: '',
    };
    try {
      let apiResponse = await dispatch(
        postApiCall(API_URLS.GET_OPEN_TEAM_LIST, parameters),
      );
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        let data: Array<object> = path(['data'], apiResponse);
        setOpenList(data);
        getAchievedTeamList();
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };

  /**
   * function is used to get the archieved team list
   */
  const getAchievedTeamList = async () => {
    try {
      let apiResponse = await dispatch(
        getApiCall(
          API_URLS.GET_ARCHIVED_TEAM_LIST,
          props.navigation,
          getAchievedTeamList,
          true,
        ),
      );
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        let data: Array<object> = path(['data'], apiResponse);
        setArchivedTeamList(data);
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };

  const notificationView = () => {
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate(SCREEN_ROUTES.INVITED_TEAM_LIST)
        }
        style={[styles.notificationViewStyle, styles.sliderMiddleSpaceStyle]}>
        <View style={styles.notificationBellViewStyle}>
          <Icon
            icon={ICON_TYPES.BELL}
            style={{...styles.bellIconStyle, tintColor: getPrimaryColor()}}
          />
        </View>
        <View style={styles.notificationBellTextStyle}>
          <View>
            <Text
              preset={TextPresetStyles.SUB_HEADLINE}
              style={[styles.secondaryLabelTextStyle, styles.blackTextStyle]}
              tx={'modules.Dashboard.youHaveInvited'}
            />
            <Text
              preset={TextPresetStyles.CAPTION_1}
              style={[styles.secondaryLabelTextStyle, styles.grayTextStyle]}
              tx={'modules.Dashboard.atlanticCrossing'}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  /**
   * function to move manage invites teams
   */
  const onManageInvitesClick = () => {
    props.navigation.navigate(SCREEN_ROUTES.INVITED_TEAM_LIST);
  };

  return (
    <BoostrScreen
      headerType={HeaderTypes.NORMAL_MENU}
      navigation={props.navigation}
      headerRightComponentType={HeaderRightComponentType.ICON_TEXT}
      rightComponentIcon={ICON_TYPES.ADD}
      rightComponentText={translate('modules.teams.createTeam')}
      onRightComponentClick={() =>
        props.navigation.navigate(SCREEN_ROUTES.CREATE_TEAM_SCREEN)
      }
      title={translate('modules.teams.myTeams')}>
      <PullToRefresh onRefresh={dismissRefresh} refreshing={refreshing}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          enableResetScrollToCoords={false}
          contentContainerStyle={[
            styles.defaultKeyboardAwareStyle,
            styles.keyBoardScrollViewStyle,
          ]}>
          <MyTeamList navigation={props.navigation} myTeamList={myTeamList} />
          <OpenTeamList navigation={props.navigation} openList={openList} />
          <ArchivedTeamList
            navigation={props.navigation}
            archivedList={archivedTeamList}
            getAchievedTeamList={() => getAchievedTeamList()}
          />

          <TouchableOpacity
            onPress={() => onManageInvitesClick()}
            style={styles.manageInvitesContainerStyle}>
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
        </KeyboardAwareScrollView>
      </PullToRefresh>
    </BoostrScreen>
  );
};
