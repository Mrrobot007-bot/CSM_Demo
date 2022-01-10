import {
  View,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {path} from 'ramda';
import moment from 'moment';
import React, {useState} from 'react';
import {useIsFocused} from '@react-navigation/core';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';

import {
  images,
  showMessage,
  DEVICE_WIDTH,
  SCREEN_ROUTES,
  defaultAlert,
  getPrimaryColor,
  INFO_CONTENT_ID_TYPES,
} from '../../../utility';
import {
  putApiCall,
  getApiCall,
  postApiCall,
} from '../../../services/api-services';
import {translate} from '../../../i18n';
import {
  HeaderTypes,
  BoostrScreen,
  HeaderRightComponentType,
} from '../../../components/boostr-screen';
import {Icon} from '../../../components/icon';
import {YearToDateScreen} from './current-year';
import {API_URLS} from '../../../services/urls';
import {hpx} from '../../../utility/responsive';
import {CurrentWeekScreen} from './current-week';
import {CurrentMonthScreen} from './current-month';
import {color, spacingPresets} from '../../../theme';
import {TeamChatComponent} from './profile-chat-component';
import {TeamProfileScreenStyle as styles} from './styles';
import {STATUS_CODES} from '../../../services/status-codes';
import {ICON_TYPES} from '../../../components/icon/constants';
import {SectionTitle} from '../../../components/section-title';
import {Text, TextPresetStyles} from '../../../components/text';
import {ManageTeamComponent} from '../components/manage-team-component';
import {FastImageModified} from '../../../components/fast-image-modified';
import {ActivitiesType} from '../../../utility/object-types/auth-response';
import {teamProfileData, UserType} from '../../../utility/object-types/user';
import {UserConfirmationDialog} from '../../../components/user-confirmation-dialog';

interface IMyTeamsScreenProps { 
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

export const TeamProfile = (props: IMyTeamsScreenProps) => {
  const user: UserType = useSelector(
    (state: RootStateOrAny) => state.userReducer,
  ).user;
  const teamId: string = path(['route', 'params', 'teamId'], props) || null;

  const dispatch = useDispatch();
  const layout = useWindowDimensions();
  const [about, setAbout] = useState('');
  const [myTeam, setMyTeam] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [index, setIndex] = React.useState(0);
  const [teamName, setTeamName] = useState('');
  const [walkType, setWalkType] = useState([]);
  const [cycleType, setCycleType] = useState([]);
  const [profileImage, setProfileImage] = useState('');
  const [teamChatData, setTeamChatData] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [isClosedTeam, setIsClosedTeam] = useState(true);
  const [currentWeekData, setCurrentWeekData] = useState([]);
  const [currentYearData, setCurrentYearData] = useState([]);
  const [currentMonthData, setCurrentMonthData] = useState([]);
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const [showJoinedDialog, setShowJoinedDialog] = useState(false);
  const [activityTypeYear, setActivityTypeYear] = useState('walk');
  const [activityTypeWeek, setActivityTypeWeek] = useState('walk');
  const [activityTypeMonth, setActivityTypeMonth] = useState('walk');
  const [routes] = React.useState([
    {key: 'week', title: translate('modules.teams.currentWeek')},
    {key: 'month', title: translate('modules.teams.currentMonth')},
    {key: 'year', title: translate('modules.teams.yeartoDate')},
  ]);

  const onLeaveTeam = async () => {
    setShowLeaveDialog(false);
    const parameters = {
      user_team_id: teamId,
    };
    const apiResponse = await dispatch(
      putApiCall(API_URLS.LEAVE_TEAM, parameters),
    );
    try {
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        props.navigation.pop(1);
        showMessage(translate('modules.teams.teamLeaved'));
      } else {
        defaultAlert(
          translate('modules.errorMessages.error'),
          path(['message'], apiResponse),
        );
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };

  const setActivityType = (type: string, period: string) => {
    if (period === 'week') {
      setActivityTypeWeek(type);
      userLeaderBoardDataWeek();
    } else if (period === 'month') {
      setActivityTypeMonth(type);
      userLeaderBoardDataMonth();
    } else if (period === 'year') {
      setActivityTypeYear(type);
      userLeaderBoardDataYear();
    }
  };

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getActivities();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props.navigation]);

  const renderScene = SceneMap({
    week: () => (
      <CurrentWeekScreen
        teamId={teamId}
        navigation={props.navigation}
        myTeam={myTeam}
        data={currentWeekData}
        activityType={activityTypeWeek}
        onCyclingClick={() => setActivityType('cycle', 'week')}
        onWalkingClick={() => setActivityType('walk', 'week')}
      />
    ),
    month: () => (
      <CurrentMonthScreen
        teamId={teamId}
        navigation={props.navigation}
        myTeam={myTeam}
        data={currentMonthData}
        activityType={activityTypeMonth}
        onCyclingClick={() => setActivityType('cycle', 'month')}
        onWalkingClick={() => setActivityType('walk', 'month')}
      />
    ),
    year: () => (
      <YearToDateScreen
        teamId={teamId}
        navigation={props.navigation}
        myTeam={myTeam}
        data={currentYearData}
        activityType={activityTypeYear}
        onCyclingClick={() => setActivityType('cycle', 'year')}
        onWalkingClick={() => setActivityType('walk', 'year')}
      />
    ),
  });

  const getTeamProfile = async () => {
    const URL = `${API_URLS.TEAM_PROFILE}?id=${teamId}`;
    console.log('url==>', URL);
    let apiResponse = await dispatch(
      getApiCall(URL, props.navigation, getTeamProfile, true),
    );

    if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
      let data: teamProfileData = path(['data'], apiResponse);

      setIsAdmin(
        path(['designation'], data) &&
          (path(['designation'], data) === 'captain' ||
            path(['designation'], data) === 'co-captain'),
      );
      setMyTeam(path(['userExist'], data) || false);
      setIsClosedTeam(data.closed);
      setAbout(data.about);
      setProfileImage(data.image);
      setTeamName(data.name);
      userLeaderBoardDataWeek();
      setTeamChatData(path(['chat'], apiResponse) || []);
    }
  };

  const joinTeam = async () => {
    const parameters = {};
    console.log('parameters===>', JSON.stringify(parameters));
    const URL = `${API_URLS.JOIN_TEAM}?id=${teamId}`;
    const apiResponse = await dispatch(postApiCall(URL, parameters));

    if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
      setShowJoinedDialog(true);
      // console.log('Joined Team==>', apiResponse);
      // showMessage(translate('modules.teams.profileUpdated'));
      // props.navigation.pop(1);
    } else {
      showMessage(translate('modules.errorMessages.somethingWentWrong'));
    }
  };

  const userLeaderBoardDataWeek = async () => {
    let params = {
      team_id: teamId,
      startDate: `${moment().startOf('week').format('DD MMM, yyyy')}`,
      endDate: `${moment().endOf('week').format('DD MMM, yyyy')}`,
      pageNo: 1,
      limit: 10,
      activityIds: activityTypeYear === 'walk' ? cycleType : walkType,
    };

    const apiResponse = await dispatch(
      postApiCall(API_URLS.GET_TEAM_LEADER_BOARD, params),
    );
    console.log('params1', params, apiResponse);
    if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
      console.log('teamWeekData==>', apiResponse);
      let data: Array<object> = path(['data'], apiResponse);

      try {
        data = data.map(item => {
          const activities: Array<any> = path(['activityData'], item) || [];
          return {
            userName: `${path(['userFirstName'], item)} ${path(
              ['userLastName'],
              item,
            )}`,
            steps: path(['totalSteps'], item) || 0,
            distance: path(['totalDistance'], item) || 0,
            userImageUrl: path(['userProfilePic'], item) || '',
            userId: path(['user_id'], item),
            activityData: activities.map((activity: any) => {
              return {
                ...activity,
              };
            }),
          };
        });
      } catch (e) {}
      console.log('api data===>', data);
      setCurrentWeekData(data);
      userLeaderBoardDataMonth();
    }
  };

  const userLeaderBoardDataMonth = async () => {
    let params = {
      team_id: teamId,
      startDate: `${moment().startOf('month').format('DD MMM, yyyy')}`,
      endDate: `${moment().endOf('month').format('DD MMM, yyyy')}`,
      pageNo: 1,
      limit: 10,
      activityIds: activityTypeYear === 'walk' ? cycleType : walkType,
    };

    const apiResponse = await dispatch(
      postApiCall(API_URLS.GET_TEAM_LEADER_BOARD, params),
    );
    console.log('params1', params, apiResponse);
    if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
      console.log('teamWeekData==>', apiResponse);
      let data: Array<object> = path(['data'], apiResponse);

      try {
        data = data.map(item => {
          const activities: Array<any> = path(['activityData'], item) || [];
          return {
            userName: `${path(['userFirstName'], item)} ${path(
              ['userLastName'],
              item,
            )}`,
            steps: path(['totalSteps'], item) || 0,
            distance: path(['totalDistance'], item) || 0,
            userImageUrl: path(['userProfilePic'], item) || '',
            userId: path(['user_id'], item),
            activityData: activities.map((activity: any) => {
              return {
                ...activity,
              };
            }),
          };
        });
      } catch (e) {}
      console.log('api data===>', data);
      setCurrentMonthData(data);
      userLeaderBoardDataYear();
      setDataFetched(true);
    }
  };

  const userLeaderBoardDataYear = async () => {
    let params = {
      team_id: teamId,
      startDate: `${moment().startOf('year').format('DD MMM, yyyy')}`,
      endDate: `${moment().endOf('year').format('DD MMM, yyyy')}`,
      pageNo: 1,
      limit: 10,
      activityIds: activityTypeYear === 'walk' ? cycleType : walkType,
    };

    const apiResponse = await dispatch(
      postApiCall(API_URLS.GET_TEAM_LEADER_BOARD, params),
    );
    console.log('params1', params, apiResponse);
    if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
      console.log('teamWeekData==>', apiResponse);
      let data: Array<object> = path(['data'], apiResponse);

      try {
        data = data.map(item => {
          const activities: Array<any> = path(['activityData'], item) || [];
          return {
            userName: `${path(['userFirstName'], item)} ${path(
              ['userLastName'],
              item,
            )}`,
            steps: path(['totalSteps'], item) || 0,
            distance: path(['totalDistance'], item) || 0,
            userImageUrl: path(['userProfilePic'], item) || '',
            userId: path(['user_id'], item),
            activityData: activities.map((activity: any) => {
              return {
                ...activity,
              };
            }),
          };
        });
      } catch (e) {}
      console.log('api data===>', data);
      setCurrentYearData(data);
    }
  };

  const getActivities = async () => {
    const apiResponse = await dispatch(
      getApiCall(
        `${API_URLS.ACTIVITIES}?type=challenge`,
        props.navigation,
        getActivities,
      ),
    );
    if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
      console.log('api get response data=>', apiResponse);
      let activities: Array<ActivitiesType> = path(['data'], apiResponse) || [];
      activities.map((e: ActivitiesType) => {
        if (e.name === 'Running+Wheel+Walking') {
          var array = e._id.split(',');
          setWalkType(array);
        } else if (e.name === 'Cycle') {
          var array = e._id.split(',');
          setCycleType(array);
        }
      });

      getTeamProfile();
    }
  };

  const TabViewHeight =
    currentYearData && currentYearData.length
      ? hpx(130) + currentYearData.length * hpx(40)
      : 0;

  return (
    <BoostrScreen
      navigation={props.navigation}
      headerRightComponentType={HeaderRightComponentType.ICON_TEXT}
      headerType={useIsFocused() ? HeaderTypes.LONG_BACK : HeaderTypes.NONE}
      customTitleViewStyle={{bottom: -DEVICE_WIDTH * 0.1}}
      rightComponentIcon={isClosedTeam && !myTeam ? null : ICON_TYPES.ADD}
      rightComponentText={
        myTeam
          ? translate('modules.myChallenges.sendInvites')
          : isClosedTeam
          ? null
          : translate('modules.teams.joinTeam')
      }
      onRightComponentClick={() => {
        myTeam
          ? props.navigation.navigate(SCREEN_ROUTES.SEND_TEAM_INVITE, {
              teamId: teamId,
            })
          : isClosedTeam
          ? null
          : joinTeam();
      }}
      headerBottomImage={
        <FastImageModified
          url={profileImage}
          defaultImage={images.defaultImage_2}
          style={styles.teamImageStyle}
        />
      }
      title={translate('modules.teams.teamProfile')}>
      {dataFetched ? (
        <ScrollView style={styles.mainContainerScrollViewStyle}>
          <View style={styles.userNameTextStyle}>
            <Text preset={TextPresetStyles.TITLE_BOLD} text={teamName} />
          </View>

          <Text
            preset={TextPresetStyles.DESCRIPTION_SMALL}
            style={{color: color.palette.grey9, textAlign: 'center'}}
            text={
              isClosedTeam
                ? translate('modules.profile.closed')
                : translate('modules.profile.open')
            }
          />

          <View style={styles.bioTextStyle}>
            <Text preset={TextPresetStyles.SUB_HEADLINE_REGULAR} text={about} />
          </View>
          {currentYearData && currentYearData.length ? (
            <SectionTitle
              shouldShowTildeView
              tx={'modules.teams.leaderboard'}
              shouldShowViewMore
              TildeType={INFO_CONTENT_ID_TYPES.TEAM_PROFILE_LEADER_BOARD}
              onViewMoreClick={() =>
                props.navigation.navigate(SCREEN_ROUTES.COMMON_LEADERBOARD, {
                  teamId: teamId,
                  page: index,
                })
              }
            />
          ) : null}

          <View style={{flex: 1, marginTop: hpx(16), height: TabViewHeight}}>
            <TabView
              navigationState={{index, routes}}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{width: layout.width}}
              renderTabBar={(props: any) => (
                <TabBar
                  {...props}
                  pressColor={'transparent'}
                  indicatorStyle={{
                    ...styles.indicatorStyle,
                    backgroundColor: getPrimaryColor(),
                  }}
                  style={[
                    styles.tabViewStyle,
                    {borderBottomColor: getPrimaryColor(0.3)},
                  ]}
                  renderLabel={({route, focused}) => (
                    <View
                      style={
                        focused
                          ? [
                              styles.labelContainerFocusedStyle,
                              {backgroundColor: getPrimaryColor()},
                            ]
                          : styles.labelContainerStyle
                      }>
                      <Text
                        preset={TextPresetStyles.FOOT_NOTE_BOLD}
                        style={{
                          color: focused
                            ? color.textSecondary
                            : getPrimaryColor(),
                        }}>
                        {route.title}
                      </Text>
                    </View>
                  )}
                />
              )}
            />
          </View>

          <View style={{marginTop: spacingPresets.large}}>
            <TeamChatComponent
              teamId={teamId}
              teamChatData={teamChatData}
              isMyTeam={myTeam}
            />
          </View>

          {isAdmin ? (
            <View>
              {myTeam ? (
                <View style={styles.manageView}>
                  <ManageTeamComponent
                    onEditClick={() =>
                      props.navigation.navigate(SCREEN_ROUTES.EDIT_TEAM, {
                        teamId: teamId,
                      })
                    }
                    onManageClick={() =>
                      props.navigation.navigate(
                        SCREEN_ROUTES.MANAGE_TEAM_INVITES,
                        {
                          teamId: teamId,
                        },
                      )
                    }
                  />
                  <View
                    style={[
                      styles.lineVew,
                      {marginTop: hpx(0), backgroundColor: getPrimaryColor()},
                    ]}
                  />
                </View>
              ) : null}
            </View>
          ) : null}

          {myTeam ? (
            <TouchableOpacity
              onPress={() => {
                setShowLeaveDialog(true);
              }}
              style={styles.leaveChallengeContainerStyle}>
              <Icon
                icon={ICON_TYPES.EXIT}
                style={{...styles.exitIconStyle, tintColor: getPrimaryColor()}}
              />
              <Text
                preset={TextPresetStyles.SUB_HEADLINE}
                tx={'modules.teams.leaveTeam'}
                style={{color: getPrimaryColor()}}
              />
            </TouchableOpacity>
          ) : null}

          <UserConfirmationDialog
            icon={ICON_TYPES.EXIT}
            title={translate('modules.teams.leaveTeamHeader')}
            description={translate('modules.teams.leaveTeamHeaderDescription')}
            isVisible={showLeaveDialog}
            okButtonText={translate('modules.myChallenges.leave')}
            onOkClick={() => onLeaveTeam()}
            onHideDialog={() => {
              setShowLeaveDialog(false);
            }}
          />

          <UserConfirmationDialog
            isSingleButton
            icon={ICON_TYPES.CHECK_CIRCLE}
            title={`${translate('common.congratulations')} \n${user.firstName}`}
            description={translate('modules.teams.youAreNow')}
            extraDescription={
              <View style={styles.rowStyle}>
                <Text
                  preset={TextPresetStyles.FOOT_NOTE_BOLD}
                  style={{color: getPrimaryColor()}}
                  text={teamName}
                />
                <Text
                  preset={TextPresetStyles.FOOT_NOTE}
                  text={` ${translate('modules.teams.team')}.`}
                />
              </View>
            }
            isVisible={showJoinedDialog}
            okButtonText={translate('common.ok')}
            onOkClick={() => {
              props.navigation.pop(1);
              setShowJoinedDialog(false);
            }}
            onHideDialog={() => {
              setShowJoinedDialog(false);
            }}
          />
          <View style={styles.boostrDummy} />
        </ScrollView>
      ) : null}
    </BoostrScreen>
  );
};
