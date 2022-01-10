import {path} from 'ramda';
import moment from 'moment';

import {translate} from '../../i18n';
import {API_URLS} from '../../services/urls';
import {
  ChallengeType,
  ChallengeScreenTypes,
} from '../../utility/object-types/challenge';
import {store} from '../../redux/store/configureStore';
import {getApiCall} from '../../services/api-services';
import {addUser} from '../../redux/actions/user-actions';
import {STATUS_CODES} from '../../services/status-codes';
import {userGoals, WellnessType} from '../../utility/object-types/user';
import {defaultAlert, dispatchToStore, roundTo2Decimal} from '../../utility';
import {getUpdatedData} from '../my-challenges-screen/components/get-live-challenges';

/**
 * Getting updated challenges data from store
 */
export const updateChallengeState = (props: any) => {
  const liveChallenges: Array<ChallengeType> =
    path(['user', 'liveChallenges'], props) || [];
  const upcomingChallenges: Array<ChallengeType> =
    path(['user', 'upcomingChallenges'], props) || [];

  let challenges: Array<ChallengeType> = [
    ...liveChallenges,
    ...upcomingChallenges,
  ];

  challenges = challenges.filter((item, index) => index < 2);

  return challenges;
};

/**
 * Getting updated goals Rewards data from store
 */
export const updateRewardsState = (props: any) => {
  const goalsAndRewardsActivities: Array<userGoals> =
    path(['user', 'goalsAndRewards', 'activities'], props) || [];
  let object: any = null;

  goalsAndRewardsActivities.forEach((e: userGoals) => {
    const currentDate = new Date();
    const weekStart = new Date(e.startDate);

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
      stepsPercentage = Math.round((e.totalSteps * 100) / e.weeklySteps);
    }

    if (currentDate >= weekEnd) {
      weekElapsed = true;
    }

    if (currentDate >= weekStart) {
      if (currentDate <= weekEnd) {
        currentWeek = true;
      }
    }

    let obj = {
      totalSteps: Math.round(e.totalSteps),
      weeklySteps: Math.round(e.weeklySteps),
      startDate: e.startDate,
      endDate: e.endDate,
      isCurrentWeek: currentWeek,
      stepsProgress: Math.round(stepsPercentage),
      timeProgress: Math.round(TimeP),
      isWeeklyTaskCompleted: progress,
      isWeekElapsed: weekElapsed,
      indexValue: e.index,
    };

    if (currentWeek == true) {
      object = obj;
    }
  });

  return object;
};

export const getHomeData = async (props: any, dispatch: any) => {
  try {
    const apiResponse = await dispatch(getApiCall(API_URLS.GET_DASHBOARD));
    if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
      let ApiData: any = path(['data'], apiResponse) || null;
      let challenges: Array<any> = path(['challenge'], ApiData) || [];
      let wellness: Array<WellnessType> = path(['wellness'], ApiData) || [];

      let data: any = path(['crwc'], ApiData) || [];
      if (data != null) {
        let endDate: any = moment(data.end_date);
        let startDate: any = moment(data.start_date);
        let todayDate: any = moment();
        var duration = moment.duration(endDate.diff(todayDate));
        var timeLeft: any = duration.asSeconds();
        var total = moment.duration(endDate.diff(startDate));
        var current = moment.duration(todayDate.diff(startDate));
        var cp =
          new Date(endDate).getTime() < new Date().getTime()
            ? 100
            : roundTo2Decimal((current.asSeconds() * 100) / total.asSeconds());
      }

      let upcomingChallenges = [];
      let liveChallenges = [];

      try {
        upcomingChallenges = challenges.filter(
          item =>
            new Date().getTime() <
            new Date(path(['start_date'], item)).getTime(),
        );

        liveChallenges = challenges.filter(
          item =>
            new Date().getTime() >
            new Date(path(['start_date'], item)).getTime(),
        );
      } catch (e) {}

      const storeLiveChallenges: Array<any> =
        path(['userReducer', 'user', 'liveChallenges'], store.getState()) || [];
      let updatedLive = getUpdatedData(
        liveChallenges,
        ChallengeScreenTypes.LIVE,
      );
      updatedLive = updatedLive.filter(item => {
        const isDataFound = storeLiveChallenges.find(
          oldItem => path(['_id'], item) === path(['_id'], oldItem),
        );
        return isDataFound ? null : item;
      });

      const storeUpcomingChallenges: Array<any> =
        path(['userReducer', 'user', 'upcomingChallenges'], store.getState()) ||
        [];
      let updatedUpcoming = getUpdatedData(
        upcomingChallenges,
        ChallengeScreenTypes.LIVE,
      );
      updatedUpcoming = updatedUpcoming.filter(item => {
        const isDataFound = storeUpcomingChallenges.find(
          oldItem => path(['_id'], item) === path(['_id'], oldItem),
        );
        return isDataFound ? null : item;
      });

      const storeWellness: Array<any> =
        path(['userReducer', 'user', 'wellness'], store.getState()) || [];

      wellness = wellness.filter(item => {
        const isDataFound = storeWellness.find(
          oldItem => path(['_id'], item) === path(['_id'], oldItem),
        );
        return isDataFound ? null : item;
      });

      const goalsAndRewardsActivities = path(['Streaks'], ApiData);

      dispatchToStore(
        addUser({
          ...store.getState().userReducer.user,
          goalsAndRewards: {
            ...path(['user', 'goalsAndRewards'], props),
            activities: goalsAndRewardsActivities,
          },
          liveChallenges: [...updatedLive, ...storeLiveChallenges],
          upcomingChallenges: [...updatedUpcoming, ...storeUpcomingChallenges],
          wellness: [...wellness, ...storeWellness],
          crwc: {
            crwcTimeLeft: timeLeft,
            crwcCompletionPercentage: cp,
          },
        }),
      );
    }
  } catch (e) {
    defaultAlert(translate('modules.errorMessages.error'), e.message);
  }
};
