import {path} from 'ramda';
import React, {useState} from 'react';
import {useIsFocused} from '@react-navigation/core';
import {TabView, TabBar} from 'react-native-tab-view';
import {View, useWindowDimensions} from 'react-native';
import {connect, RootStateOrAny, useDispatch, useSelector} from 'react-redux';

import {
  DEVICE_WIDTH,
  DEVICE_HEIGHT,
  SCREEN_ROUTES,
  getPrimaryColor,
  getLiveChallenges,
} from '../../utility';
import {color} from '../../theme';
import {translate} from '../../i18n';
import {
  HeaderTypes,
  BoostrScreen,
  HeaderRightComponentType,
} from '../../components/boostr-screen';
import {API_URLS} from '../../services/urls';
import {InvitesScreen} from './invites-screen';
import {postApiCall} from '../../services/api-services';
import {STATUS_CODES} from '../../services/status-codes';
import {ICON_TYPES} from '../../components/icon/constants';
import {MyChallengesScreenStyles as styles} from './styles';
import {Text, TextPresetStyles} from '../../components/text';
import {LiveChallengesScreen} from './live-challenges-screen';
import {OpenChallengesScreen} from './open-challenges-screen';
import {getCompletedInviteList, getInviteList} from './utils';
import {PullToRefresh} from '../../components/pull-to-refresh';
import {getUpdatedData} from './components/get-live-challenges';
import {CompletedChallengesScreen} from './completed-challenges-screen';
import {ChallengeScreenTypes} from '../../utility/object-types/challenge';

/**
 * An Interface for possible props for the MyChallenges Screen
 */
interface IMyChallengesScreenProps {
  /**
   * Prop used to provide the navigation stuff
   */
  navigation: any;
}

/**
 * MyChallenges - A screen, used to show challenges details in multiple tabs
 */
const MyChallenges = (props: IMyChallengesScreenProps) => {
  const userReducer = useSelector((state: RootStateOrAny) => state.userReducer);

  const [liveChallenges, setLiveChallenges] = useState(
    path(['user', 'liveChallenges'], props) || [],
  );
  const [upcomingChallenges, setUpcomingChallenges] = useState(
    path(['user', 'upcomingChallenges'], props) || [],
  );

  const [invitesChallengesData, setInviteChallengesData] = useState([]);
  const [isLiveDataLoading, setIsLiveDataLoading] = useState(true);
  const [isInvitesDataLoading, setIsInvitesDataLoading] = useState(true);
  const [shouldStopLoadingInvitesData, setShouldStopLoadingInvitesData] =
    useState(false);
  const [isCompletesDataLoading, setIsCompletesDataLoading] = useState(true);
  const [shouldStopLoadingCompleteData, setShouldStopLoadingCompleteData] =
    useState(false);
  const [challengesData, setChallengesData] = useState([]);
  const [openPageNumber, setOpenPageNumber] = useState(1);
  const [completedPageNumber, setCompletedPageNumber] = useState(1);

  const dispatch = useDispatch();
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const [routes] = React.useState([
    {key: 'live', title: translate('common.live')},
    {key: 'invites', title: translate('common.invites')},
    {key: 'open', title: translate('common.open')},
    {key: 'complete', title: translate('common.complete')},
  ]);

  const renderScene = ({route}: any) => {
    switch (route.key) {
      case 'live':
        return (
          <LiveChallengesScreen
            liveChallenges={liveChallenges}
            upcomingChallenges={upcomingChallenges}
            isDataLoading={isLiveDataLoading}
          />
        );
      case 'invites':
        return (
          <InvitesScreen
            invitesChallengesData={invitesChallengesData}
            setInviteChallengesData={setInviteChallengesData}
            getInviteList={() =>
              getInviteList(
                invitesChallengesData,
                dispatch,
                setInviteChallengesData,
                setIsInvitesDataLoading,
                setOpenPageNumber,
                openPageNumber,
                shouldStopLoadingInvitesData,
                setShouldStopLoadingInvitesData,
              )
            }
            isDataLoading={isInvitesDataLoading}
          />
        );

      case 'open':
        return <OpenChallengesScreen challengesData={challengesData} />;
      case 'complete':
        return (
          <CompletedChallengesScreen
            onListEndReached={() => {
              getCompletedInviteList(
                dispatch,
                setIsCompletesDataLoading,
                completedPageNumber,
                setCompletedPageNumber,
                false,
                shouldStopLoadingCompleteData,
                setShouldStopLoadingCompleteData,
              );
            }}
            isDataLoading={isCompletesDataLoading}
            onRetryClick={(shouldOverrideCache: boolean) =>
              getCompletedInviteList(
                dispatch,
                setIsCompletesDataLoading,
                1,
                setCompletedPageNumber,
                false,
                shouldStopLoadingCompleteData,
                setShouldStopLoadingCompleteData,
              )
            }
          />
        );
      default:
        return null;
    }
  };

  React.useEffect(() => {
    setLiveChallenges(path(['user', 'liveChallenges'], props));
    setUpcomingChallenges(path(['user', 'upcomingChallenges'], props));
  }, [
    path(['user', 'liveChallenges'], props),
    path(['user', 'upcomingChallenges'], props),
  ]);

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getTabsData(index);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props.navigation]);

  React.useEffect(() => {
    getTabsData(index, true);
  }, []);

  const dismissRefresh = async () => {
    setRefreshing(true);
    switch (index) {
      case 0:
        setIsLiveDataLoading(true);
        await getLiveChallenges(userReducer, true);
        setIsLiveDataLoading(false);
        setRefreshing(false);
        break;

      case 1:
        setShouldStopLoadingInvitesData(false);
        await getInviteList(
          invitesChallengesData,
          dispatch,
          setInviteChallengesData,
          setIsInvitesDataLoading,
          setOpenPageNumber,
          1,
          false,
          setShouldStopLoadingInvitesData,
        );
        setRefreshing(false);
        break;

      case 2:
        await openChallengeList();
        setRefreshing(false);
        break;

      case 3:
        await getCompletedInviteList(
          dispatch,
          setIsCompletesDataLoading,
          1,
          setCompletedPageNumber,
          false,
          shouldStopLoadingCompleteData,
          setShouldStopLoadingCompleteData,
        );
        setRefreshing(false);
        break;
    }
  };

  const onTabIndexChange = (index: number) => {
    setIndex(index);
    getTabsData(index);
  };

  const openChallengeList = async () => {
    let parameters = {
      pageNo: 1,
      name: '',
      activityId: [''],
      limit: 10,
    };

    const apiResponse = await dispatch(
      postApiCall(API_URLS.OPEN_CHALLENGE, parameters),
    );
    if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
      let userApiData: any = path(['data'], apiResponse) || [];
      const openChallengesData = getUpdatedData(
        userApiData,
        ChallengeScreenTypes.OPEN,
      );
      setChallengesData(openChallengesData);
    }
  };

  const getTabsData = async (index: number, forceData: boolean = false) => {
    // setTimeout(async () => {
    switch (index) {
      case 0:
        setIsLiveDataLoading(true);
        getLiveChallenges(userReducer, forceData);
        setIsLiveDataLoading(false);
        break;
      case 1:
        setShouldStopLoadingInvitesData(false);
        getInviteList(
          invitesChallengesData,
          dispatch,
          setInviteChallengesData,
          setIsInvitesDataLoading,
          setOpenPageNumber,
          1,
          false,
          setShouldStopLoadingInvitesData,
        );
        break;
      case 2:
        break;
      case 3:
        getCompletedInviteList(
          dispatch,
          setIsCompletesDataLoading,
          1,
          setCompletedPageNumber,
          true,
          shouldStopLoadingCompleteData,
          setShouldStopLoadingCompleteData,
        );
        break;
    }
    // }, 100);
  };

  return (
    <BoostrScreen
      navigation={props.navigation}
      headerRightComponentType={HeaderRightComponentType.ICON_TEXT}
      rightComponentIcon={ICON_TYPES.ADD}
      rightComponentText={translate('common.new')}
      onRightComponentClick={() =>
        props.navigation.navigate(SCREEN_ROUTES.CREATE_CHALLENGES_SCREEN)
      }
      headerType={useIsFocused() ? HeaderTypes.NORMAL_MENU : HeaderTypes.NONE}
      title={translate('modules.myChallenges.title')}>
      <PullToRefresh onRefresh={dismissRefresh} refreshing={refreshing}>
        <View
          style={{
            width: DEVICE_WIDTH,
            height: DEVICE_HEIGHT * 0.85,
            backgroundColor: color.palette.lightYellow_50,
          }}>
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={onTabIndexChange}
            initialLayout={{width: layout.width}}
            swipeEnabled={false}
            renderTabBar={(props: any) => (
              <TabBar
                {...props}
                indicatorStyle={[
                  styles.indicatorStyle,
                  {backgroundColor: getPrimaryColor()},
                ]}
                pressColor={'transparent'}
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
      </PullToRefresh>
    </BoostrScreen>
  );
};

function mapStateToProps(state: any) {
  return {
    user: state.userReducer.user,
  };
}

export const MyChallengesScreen = connect(mapStateToProps, {})(MyChallenges);
