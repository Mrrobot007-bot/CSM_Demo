import {path} from 'ramda';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {TabView, TabBar} from 'react-native-tab-view';
import {View, useWindowDimensions} from 'react-native';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';

import {
  defaultAlert,
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  getPrimaryColor,
  dispatchToStore,
  INFO_CONTENT_ID_TYPES,
} from '../../utility';

import {Streaks} from './streaks';
import {Rewards} from './rewards';
import {translate} from '../../i18n';
import {color} from '../../theme/color';
import {
  userGoals,
  futureRewards,
  claimedRewards,
  GoalsAndRewardsType,
} from '../../utility/object-types/user';
import {API_URLS} from '../../services/urls';
import {GoalsRewardsStyles as styles} from './styles';
import {getApiCall} from '../../services/api-services';
import {store} from '../../redux/store/configureStore';
import {addUser} from '../../redux/actions/user-actions';
import {STATUS_CODES} from '../../services/status-codes';
import {ProgressBar} from '../../components/progress-bar';
import {ICON_TYPES} from '../../components/icon/constants';
import {YourActivity} from '../../components/your-activity';
import {Text, TextPresetStyles} from '../../components/text';
import {PullToRefresh} from '../../components/pull-to-refresh';
import {BoostrScreen, HeaderTypes} from '../../components/boostr-screen';

interface GoalsRewardsScreenProps {
  navigation: any;
}

// used to show the  goals and rewards tab

export const GoalsRewards = (props: GoalsRewardsScreenProps) => {
  const dispatch = useDispatch();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [dates, setDates] = useState([]);
  const [endDates, setEndDates] = useState([]);
  const [rewardData, setRewardData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [futureRewards, setFutureRewards] = useState([]);
  const [progressStatus, setProgressStatus] = useState(0);
  const [claimedRewards, setClaimedRewards] = useState([]);
  const [userCurrentGoals, setCurrentUserGaols] = useState(null);
  const [routes] = React.useState([
    {key: 'streaks', title: translate('modules.goalsRewards.streaks')},
    {key: 'rewards', title: translate('modules.goalsRewards.rewards')},
  ]);
  const apiReducer = useSelector((state: RootStateOrAny) => state.apiReducer);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getGaols();
    });
    return unsubscribe;
  }, [props.navigation]);

  const getGaols = async () => {
    try {
      let apiResponse = await dispatch(getApiCall(API_URLS.USER_GOALS));
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        let rewardD: Array<Object> = [];
        let newArray: Array<Object> = [];
        let endDateArray: Array<Object> = [];
        let startDateArray: Array<Object> = [];

        const goalsAndRewards: GoalsAndRewardsType = path(
          ['data'],
          apiResponse,
        );
        let Goals: Array<userGoals> =
          path(['activities'], goalsAndRewards) || [];

        console.log('Gaols==>', Goals);
        if (Goals.length != 0) {
          let objReward = {
            image: ICON_TYPES.FLAG,
            percentage: '0%',
          };
          rewardD.push(objReward);
          Goals.map((e: userGoals) => {
            const currentDate = new Date();
            const weekStart = new Date(e.startDate);
            const weekStartDate = moment(new Date(e.startDate)).format(
              'DD MMM',
            );
            const weekEndDate = moment(new Date(e.endDate)).format('DD MMM');

            const weekEnd = new Date(e.endDate);
            const weekStartTime = weekStart.getTime();
            const currentTime = new Date().getTime();

            const completionPercentage =
              ((currentTime - weekStartTime) * 100) / (1000 * 60 * 60 * 24 * 7);
            let TimeP = 0;

            var currentWeek = false;
            const progress = e.weeklySteps < e.totalSteps;
            let weekElapsed = false;

            if (completionPercentage >= 100) {
              TimeP = 100;
            } else {
              TimeP = completionPercentage;
            }

            var stepsPercentage = 0;
            if (e.totalSteps == 0) {
              stepsPercentage = 0;
            } else if (e.totalSteps >= e.weeklySteps) {
              stepsPercentage = 100;
            } else if (e.totalSteps <= e.weeklySteps) {
              stepsPercentage = Math.round(
                (e.totalSteps * 100) / e.weeklySteps,
              );
            }

            if (currentDate >= weekEnd) {
              weekElapsed = true;
            }

            if (currentDate >= weekStart) {
              if (currentDate <= weekEnd) {
                if (e.index > 4) {
                  setProgressStatus(4);
                } else {
                  setProgressStatus(e.index);
                }

                currentWeek = true;
              }
            }
            if (e.index == 0) {
              let objReward = {
                image: progress
                  ? ICON_TYPES.REWARD_MEDAL_FILLED
                  : ICON_TYPES.REWARD_MEDAL,
                percentage: '30%',
              };
              rewardD.push(objReward);
            } else if (e.index == 1) {
              let objReward = {
                image: progress
                  ? ICON_TYPES.REWARD_MEDAL_FILLED
                  : ICON_TYPES.REWARD_MEDAL,
                percentage: '53%',
              };
              rewardD.push(objReward);
            } else if (e.index == 2) {
              let objReward = {
                image: progress
                  ? ICON_TYPES.REWARD_MEDAL_FILLED
                  : ICON_TYPES.REWARD_MEDAL,
                percentage: '77%',
              };
              rewardD.push(objReward);
            } else if (e.index == 3) {
              let objReward = {
                image: progress ? ICON_TYPES.STAR_FILLED : ICON_TYPES.STAR,
                percentage: '100%',
              };
              rewardD.push(objReward);
            }

            let obj = {
              endDate: e.endDate,
              indexValue: e.index,
              startDate: e.startDate,
              isCurrentWeek: currentWeek,
              isWeekElapsed: weekElapsed,
              timeProgress: Math.round(TimeP),
              isWeeklyTaskCompleted: progress,
              totalSteps: Math.round(e.totalSteps),
              weeklySteps: Math.round(e.weeklySteps),
              stepsProgress: Math.round(stepsPercentage),
            };
            let obj1 = {
              date: weekStartDate,
            };
            startDateArray.push(obj1);
            let obj2 = {
              date: weekEndDate,
            };
            endDateArray.push(obj2);
            newArray.push(obj);

            if (currentWeek == true) {
              setCurrentUserGaols(obj);
            }
          });

          let obj1 = {
            date: 'Rewards',
          };
          startDateArray.push(obj1);
          setEndDates(endDateArray);
          setDates(startDateArray);
          setRewardData(rewardD);
        }
        let claimRewards: Array<claimedRewards> =
          path(['data', 'reward', 'claimedRewards'], apiResponse) || [];
        console.log('claimRewards==>', claimRewards);
        setClaimedRewards(claimRewards);
        let futureR: Array<futureRewards> =
          path(['data', 'reward', 'futureRewards'], apiResponse) || [];
        setFutureRewards(futureR);
        setRefreshing(false);
        dispatchToStore(
          addUser({
            ...store.getState().userReducer.user,
            goalsAndRewards: goalsAndRewards,
          }),
        );
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };

  const setIndexNumber = (e: React.SetStateAction<number>) => {
    if (index != e) {
      setIndex(e);
    }
  };
  const renderScene = ({route, jumpTo}: any) => {
    switch (route.key) {
      case 'streaks':
        return (
          <Streaks
            navigation={props.navigation}
            setIndex={() => jumpTo('rewards')}
            Dates={dates}
            endDate={endDates}
            rewardData={rewardData}
            progressStatus={progressStatus}
          />
        );
      case 'rewards':
        return (
          <Rewards
            navigation={props.navigation}
            futureRewards={futureRewards}
            claimedRewards={claimedRewards}
          />
        );

      default:
        return null;
    }
  };

  const dismissRefresh = () => {
    setRefreshing(true);
    getGaols();
  };

  return (
    <BoostrScreen
      navigation={props.navigation}
      headerType={HeaderTypes.NORMAL_MENU}
      title={translate('modules.goalsRewards.title')}>
      <PullToRefresh onRefresh={dismissRefresh} refreshing={refreshing}>
        <YourActivity
          currentSteps={JSON.stringify(userCurrentGoals?.totalSteps)}
          weeklySteps={JSON.stringify(userCurrentGoals?.weeklySteps)}
          stepsBarColor={getPrimaryColor()}
          stepsPercentage={`${userCurrentGoals?.stepsProgress}${'%'}`}
          timeBarColor={color.palette.black}
          timePercentage={`${userCurrentGoals?.timeProgress}${'%'}`}
          infoContentId={INFO_CONTENT_ID_TYPES.GOALS_REWARDS_YOUR_GOAL}
        />

        <View
          style={{
            width: DEVICE_WIDTH,
            height: index === 0 ? DEVICE_HEIGHT * 0.65 : DEVICE_HEIGHT * 1.1,
            backgroundColor: color.palette.lightYellow_50,
          }}>
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={e => {
              setIndexNumber(e), console.log('e==>', e);
            }}
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
        <View style={styles.boostrDummy} />
      </PullToRefresh>
      {/* {apiReducer.loading && <ProgressBar />} */}
    </BoostrScreen>
  );
};
