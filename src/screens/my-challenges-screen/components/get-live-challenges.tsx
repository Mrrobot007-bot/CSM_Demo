import {path} from 'ramda';
import io from 'socket.io-client';
import _ from 'lodash';

import {addUser} from '../../../redux/actions/user-actions';
import {store} from '../../../redux/store/configureStore';
import {dispatchToStore, getUnique} from '../../../utility';
import {
  ChallengeScreenTypes,
  ChallengeType,
  TypeOfChallenges,
} from '../../../utility/object-types/challenge';
import {getApiCall, postApiCall} from '../../../services/api-services';
import {STATUS_CODES} from '../../../services/status-codes';
import {API_URLS, BASE_URL} from '../../../services/urls';
import {UserType} from '../../../utility/object-types/user';

const socket = io(BASE_URL, {
  reconnectionDelay: 1000,
  reconnection: true,
  reconnectionAttempts: Infinity,
});

export const getUpdatedData = (
  challengesData: Array<any>,
  screenType: ChallengeScreenTypes,
) => {
  let updatedData = challengesData.map(item => {
    let boostrs: Array<any> = path(['boostrs'], item) || [];
    boostrs = boostrs.map(boostr => {
      // const comments: Array<any> = path(['boostrCommentData'], boostr) || [];
      // const likes: Array<any> = path(['boostrLikeData'], boostr) || [];
      return {
        userId: path(['user_id'], boostr) || '',
        userName: `${path(['user_firstName'], boostr)} ${path(
          ['user_lastName'],
          boostr,
        )}`,
        createdDateTime: path(['createdAt'], boostr) || null,
        message: path(['comment'], boostr) || null,
        boostrImageUrl: path(['attachment'], boostr) || null,
        _id: path(['_id'], boostr) || null,
        userImageUrl: path(['user_profile_pic'], boostr) || null,
        totalComments: path(['totalComments'], boostr) || 0,
        totalLikes: path(['totalLikes'], boostr) || 0,
      };
    });

    let includedActivities: Array<any> = path(['activityData'], item) || [];
    includedActivities = includedActivities.map(activity => {
      return {
        icon: path(['icon'], activity) || null,
        name: path(['name'], activity) || null,
        _id: path(['_id'], activity) || null,
      };
    });
    let userLeaderBoard: Array<any> = path(['usersLeaderBoard'], item) || [];

    userLeaderBoard = userLeaderBoard.map((leaderBoardItem, index) => {
      return {
        userImageUrl: path(['user_profile_pic'], leaderBoardItem) || null,
        userName: `${path(['user_first_name'], leaderBoardItem)} ${path(
          ['user_last_name'],
          leaderBoardItem,
        )}`,
        userId: path(['user_id'], leaderBoardItem) || null,
        userPosition: index + 1,
        associatedChallengeId: path(['_id'], item),
        totalDistanceInKm: path(['totalDistance'], leaderBoardItem) || 0,
        isSpeedIncreased: false,
        personalBest: path(['personalBest'], leaderBoardItem) || 0,
        distanceIncreasedInKm: path(['farthestDistance'], leaderBoardItem) || 0,
        speedIncreased: path(['increaseOrDecreaseTime'], leaderBoardItem) || 0,
        secondPerKM: path(['secondPerKM'], leaderBoardItem) || 0,
      };
    });

    let teamLeaderBoard: Array<any> = path(['leaderBoardData'], item) || [];

    if (path(['name'], item) === 'To the moon Manoj Team Test')
      console.log('mkmkmk_1111111', item);

    teamLeaderBoard = teamLeaderBoard.map((leaderBoardItem, index) => {
      let teamUsers: Array<any> = path(['teamUsers'], leaderBoardItem) || [];

      teamUsers = teamUsers.map((teamItem, indexKey) => {
        return {
          userImageUrl: path(['userProfilePic'], teamItem) || null,
          userName: `${path(['userFirstName'], teamItem)} ${path(
            ['userLastName'],
            teamItem,
          )}`,
          userId: path(['user_id'], teamItem) || null,
          userPosition: indexKey + 1,
          associatedChallengeId: path(['_id'], item),
          totalDistanceInKm: path(['totalDistance'], teamItem) || 0,
          isSpeedIncreased: false,
          personalBest: path(['personalBest'], teamItem) || 0,
        };
      });
      return {
        teamImageUrl: path(['teamImage'], leaderBoardItem) || null,
        teamName: path(['teamName'], leaderBoardItem) || null,
        teamId: path(['team_id'], leaderBoardItem) || null,
        teamPosition: index + 1,
        associatedChallengeId: path(['_id'], item),
        teamAverageInKm: path(['teamAverageDistance'], leaderBoardItem) || 0,
        isTeamSpeedIncreased: false,
        leaderBoardUsers: teamUsers,
      };
    });

    const fundRaise =
      path(['fundraise_url'], item) && path(['fundraise_url'], item) !== ''
        ? {
            url: path(['fundraise_url'], item) || null,
            imageUrl: path(['fundraiseImageUrl'], item) || null,
            targetInPounds: path(['fundraiseTargetInPounds'], item) || 0,
            totalRaisedInPounds:
              path(['fundraiseTotalRaisedInPounds'], item) || 0,
            raisedFundsFor: path(['fundraiseRaisedFundsFor'], item) || null,
          }
        : null;
    const isTeamChallenge = path(['team_challenge'], item) || false;
    return {
      _id: path(['_id'], item) || null,
      invitedByUserId: isTeamChallenge
        ? path(['creatorId'], item) || null
        : path(['user_id'], item) || null,
      image: path(['image', 0], item) || null,
      challengeName: path(['name'], item) || '',
      invitedBy: isTeamChallenge
        ? `${
            path(['creatorFirstName'], item) || path(['user_firstName'], item)
          } ${path(['creatorLastName'], item) || path(['user_lastName'], item)}`
        : `${path(['user_firstName'], item)} ${path(['user_lastName'], item)}`,
      invitedByImageUrl: isTeamChallenge
        ? path(['creatorProfilePic'], item) ||
          path(['user_profile_pic'], item) ||
          null
        : path(['user_profile_pic'], item) || null,
      includedActivities: includedActivities,
      startDate: path(['start_date'], item) || null,
      endDate: path(['end_date'], item) || null,
      isTeamChallenge: path(['team_challenge'], item) || false,
      usersLeaderBoard: userLeaderBoard,
      challengeType: path(['type'], item) || TypeOfChallenges.RELAY,
      description: path(['message'], item),
      boostrs: boostrs,
      teamLeaderBoard: teamLeaderBoard,
      totalDistanceInKm: path(['distance'], item) || 0,
      timeDaily: path(['time'], item) || 0,
      location: {
        latitude: path(['location', 0], item),
        longitude: path(['location', 1], item),
      },
      personalBest: path(['personalBest'], item) || 0,
      completedDistanceInKm: path(['totalCompletedDistance'], item) || 0,
      screenType: screenType,
      closed: path(['closed'], item) || false,
      address: path(['address'], item) || '',
      invitedId: path(['invitedId'], item) || '',
      fundRaise: fundRaise,
    };
  });

  updatedData = updatedData.filter(
    item =>
      path(['challengeName'], item) && path(['challengeName'], item) != '',
  );

  return updatedData;
};

export const getLiveChallengesList = async (
  dispatch: any,
  fetchDataForceFully: boolean = false,
) => {
  const storeLiveChallenges: Array<ChallengeType> =
    path(['userReducer', 'user', 'liveChallenges'], store.getState()) || [];

  if (
    !storeLiveChallenges ||
    storeLiveChallenges.length <= 0 ||
    fetchDataForceFully
  ) {
    //getting user live data
    const apiResponse = await dispatch(
      postApiCall(
        API_URLS.CHALLENGE_LIST,
        {
          pageNo: 1,
          limit: 1000,
        },
        null,
        false,
        false,
        !fetchDataForceFully,
      ),
    );

    if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
      const userLiveChallengesData: Array<any> = getUpdatedData(
        path(['data'], apiResponse) || [],
        ChallengeScreenTypes.LIVE,
      );

      // getting team live data
      const apiResponseTeamLive = await dispatch(
        getApiCall(
          API_URLS.LIVE_TEAM_CHALLENGE_LIST,
          null,
          null,
          false,
          false,
          !fetchDataForceFully,
        ),
      );

      const teamLiveChallengesData: Array<any> = getUpdatedData(
        path(['data'], apiResponseTeamLive) || [],
        ChallengeScreenTypes.LIVE,
      );

      let liveChallengesData = mergeUserAndTeamChallenge(
        userLiveChallengesData,
        teamLiveChallengesData,
      );

      //getting user upcoming data
      const apiResponseUpcoming = await dispatch(
        postApiCall(
          API_URLS.UPCOMING_CHALLENGE_LIST,
          {
            pageNo: 1,
            limit: 1000,
          },
          null,
          false,
          false,
          !fetchDataForceFully,
        ),
      );

      if (
        path(['statusCode'], apiResponseUpcoming) === STATUS_CODES.STATUS_OK
      ) {
        const userUpcomingChallengesData: Array<any> = getUpdatedData(
          path(['data'], apiResponseUpcoming) || [],
          ChallengeScreenTypes.UPCOMING,
        );

        // getting team upcoming data
        const apiResponseTeamUpcoming = await dispatch(
          getApiCall(
            API_URLS.UPCOMING_TEAM_CHALLENGE_LIST,
            null,
            null,
            false,
            false,
            !fetchDataForceFully,
          ),
        );

        const teamUpcomingChallengesData: Array<any> = getUpdatedData(
          path(['data'], apiResponseTeamUpcoming) || [],
          ChallengeScreenTypes.UPCOMING,
        );

        const upcomingChallengesData = mergeUserAndTeamChallenge(
          userUpcomingChallengesData,
          teamUpcomingChallengesData,
        );

        dispatchToStore(
          addUser({
            ...store.getState().userReducer.user,
            liveChallenges: sortChallengesData(liveChallengesData),
            upcomingChallenges: sortChallengesData(upcomingChallengesData),
          }),
        );
      }
    }
  }
};

const mergeUserAndTeamChallenge = (
  userChallenges: Array<ChallengeType>,
  teamChallenges: Array<ChallengeType>,
) => {
  return [...userChallenges, ...teamChallenges];
};

const sortChallengesData = (challengesData: Array<ChallengeType>) => {
  challengesData.sort((a, b) => (a._id > b._id ? 1 : -1));
  return getUnique(challengesData, '_id');
};

export const configureSingleChallengeSocket = async (
  challenge: ChallengeType,
  challengeScreenTypes: ChallengeScreenTypes,
) => {
  socket.emit('challengedata', {
    challengeId: challenge._id,
  });

  await socket.on(`challengedata_${challenge._id}`, async function (data) {
    const challengeData = path(['data'], data) || null;
    if (challengeData && path(['_id'], challengeData) != undefined) {
      const challengesData = [];
      challengesData.push(challengeData);
      const updatedData: Array<any> = getUpdatedData(
        challengesData,
        challengeScreenTypes,
      );
      pushDataOnStore(challengeScreenTypes, updatedData, challenge._id);
    }
  });
};

const pushDataOnStore = (
  challengeScreenTypes: ChallengeScreenTypes,
  updatedData: Array<ChallengeType>,
  challengeId: string,
) => {
  const storeData: Array<ChallengeType> =
    challengeScreenTypes === ChallengeScreenTypes.LIVE
      ? path(['userReducer', 'user', 'liveChallenges'], store.getState()) || []
      : path(['userReducer', 'user', 'upcomingChallenges'], store.getState()) ||
        [];

  const currentStoredChallenge: any = storeData.find(
    item => item._id === challengeId,
  );

  const currentUpdatedChallenge: any = updatedData.find(
    item => item._id === challengeId,
  );

  if (!_.isEqual(currentStoredChallenge, currentUpdatedChallenge)) {
    const userData: UserType = store.getState().userReducer.user;
    const updatedLiveData: Array<any> = path(['liveChallenges'], userData)
      ? userData.liveChallenges.map(item => {
          if (item._id === challengeId) {
            return currentUpdatedChallenge;
          } else {
            return item;
          }
        })
      : currentUpdatedChallenge && currentUpdatedChallenge.length
      ? [...currentUpdatedChallenge]
      : [];

    const updatedUpcomingData: Array<any> = path(
      ['upcomingChallenges'],
      userData,
    )
      ? userData.upcomingChallenges.map(item => {
          if (item._id === challengeId) {
            return currentUpdatedChallenge;
          } else {
            return item;
          }
        })
      : currentUpdatedChallenge && currentUpdatedChallenge.length
      ? [...currentUpdatedChallenge]
      : [];

    if (challengeScreenTypes === ChallengeScreenTypes.LIVE) {
      dispatchToStore(
        addUser({
          ...userData,
          liveChallenges: updatedLiveData,
        }),
      );
    } else {
      dispatchToStore(
        addUser({
          ...userData,
          upcomingChallenges: updatedUpcomingData,
        }),
      );
    }
  }
};
