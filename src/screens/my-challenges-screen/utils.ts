import {path} from 'ramda';
import moment from 'moment';

import {
  getUpdatedData,
  configureSingleChallengeSocket,
} from './components/get-live-challenges';
import {API_URLS} from '../../services/urls';
import {
  ChallengeType,
  TypeOfChallenges,
  ChallengeScreenTypes,
} from '../../utility/object-types/challenge';
import {store} from '../../redux/store/configureStore';
import {STATUS_CODES} from '../../services/status-codes';
import {dispatchToStore, getUnique} from '../../utility';
import {addUser} from '../../redux/actions/user-actions';
import {getApiCall, postApiCall} from '../../services/api-services';
import {invitesChallengeType} from '../../utility/object-types/user';

/**
 * Getting invite list of challenges
 */
export const getInviteList = async (
  invitesChallengesData: Array<any>,
  dispatch: any,
  setInviteChallengesData: (item: any) => void,
  setIsInvitesDataLoading: (item: boolean) => void,
  setPageNumber: (pageNumber: number) => void,
  pageNumber: number,
  shouldStopLoadingData: boolean,
  setShouldStopLoadingData: (shouldStop: boolean) => void,
) => {
  if (shouldStopLoadingData) {
    return;
  }
  setIsInvitesDataLoading(true);
  const parameters = {
    pageNo: pageNumber,
    limit: 10,
  };
  try {
    const apiResponse = await dispatch(
      postApiCall(API_URLS.INVITED_USER_CHALLENGE, parameters, pageNumber <= 1),
    );
    if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
      let newArray: Array<Object> = [];
      const userInviteChallengeData: Array<invitesChallengeType> = path(
        ['data'],
        apiResponse,
      );
      userInviteChallengeData.forEach(e => {
        let obj = {
          challengeName: path(['challengeName'], e),
          invitedBy: `${path(['creatorFirstName'], e) || ''} ${
            path(['creatorLastName'], e) || ''
          }`,
          invitedByImageUrl: path(['creatorProfilePic'], e),
          image: path(['challengeImage', 0], e),
          includedActivities: path(['activityData'], e),
          _id: path(['challengeId'], e),
          screenType: ChallengeScreenTypes.INVITES,
          isFocused: false,
          invitedId: path(['_id'], e),
          totalDistanceInKm: path(['distance'], e),
          startDate: moment(new Date(path(['start_date'], e))).format(
            'DD MMM, YYYY',
          ),
          endDate: moment(new Date(path(['end_date'], e))).format(
            'DD MMM, YYYY',
          ),
          description: path(['message'], e),
          challengeType: path(['type'], e) || TypeOfChallenges.RELAY,
          address: path(['address'], e),
          timeDaily: path(['time'], e),
        };

        newArray.push(obj);
      });

      const newData = newArray.filter(item => {
        const isDataFound =
          invitesChallengesData && invitesChallengesData.length
            ? invitesChallengesData.find(oldItem =>
                path(['invitedId'], oldItem === path(['invitedId'], item)),
              )
            : false;
        return isDataFound ? null : item;
      });

      if (newData && newData.length) {
        setPageNumber(pageNumber + 1);

        const mergedData =
          invitesChallengesData && invitesChallengesData.length
            ? getUnique([...invitesChallengesData, ...newData], 'invitedId')
            : getUnique(newData, 'invitedId');

        setInviteChallengesData(mergedData);
      } else {
        setShouldStopLoadingData(true);
      }
      setIsInvitesDataLoading(false);
    } else {
      setIsInvitesDataLoading(false);
    }
  } catch (e) {
    setIsInvitesDataLoading(false);
  }
};

/**
 * Getting list of completed challenges
 */
export const getCompletedInviteList = async (
  dispatch: any,
  setIsCompletesDataLoading?: (item: boolean) => void,
  pageNumber?: number,
  setPageNumber?: (item: number) => void,
  isTabSwitch: boolean = false,
  shouldStopLoadingData?: boolean,
  setShouldStopLoadingData?: (shouldStop: boolean) => void,
) => {
  if (shouldStopLoadingData) {
    return;
  }
  const parameters = {
    pageNo: pageNumber || 1,
    limit: 15,
  };

  const completedChallenges: Array<ChallengeType> =
    path(['userReducer', 'user', 'completedChallenges'], store.getState()) ||
    [];

  if (isTabSwitch && completedChallenges && completedChallenges.length) {
    return;
  }

  setIsCompletesDataLoading(true);
  const apiResponse = await dispatch(
    postApiCall(API_URLS.COMPLETED_CHALLENGE, parameters, pageNumber <= 1),
  );

  if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
    let userApiData: any = path(['data'], apiResponse) || [];
    let userCompletedChallengesData = userApiData.map((item: any) => {
      return {
        challengeName: path(['name'], item) || null,
        image: path(['image', 0], item) || null,
        _id: path(['_id'], item) || null,
        screenType: ChallengeScreenTypes.COMPLETE,
      };
    });

    const newChallenges = userCompletedChallengesData.filter((item: any) => {
      const foundItem = completedChallenges.find(
        oldItem => oldItem._id === item._id,
      );
      if (!foundItem) {
        return item;
      } else {
        return null;
      }
    });

    setIsCompletesDataLoading(false);
    if (newChallenges && newChallenges.length) {
      setPageNumber(pageNumber + 1);
      const allChallenges = [...completedChallenges, ...newChallenges];

      dispatchToStore(
        addUser({
          ...store.getState().userReducer.user,
          completedChallenges: allChallenges,
        }),
      );
    } else {
      setShouldStopLoadingData(true);
    }
  } else {
    setIsCompletesDataLoading(false);
  }
};

/**
 * Getting details of challenge by challenge id
 */
export const getChallengeItemData = async (
  challengesData: Array<ChallengeType>,
  challengeId: string,
  dispatch: any,
  shouldUpdateFocus: boolean = false,
  screenType: ChallengeScreenTypes,
) => {
  const challengeItem = challengesData.find(
    item => path(['_id'], item) === challengeId,
  );

  try {
    let apiResponse = await dispatch(
      getApiCall(
        `${API_URLS.CHALLENGE_DATA_WITH_LEADER_BOARD}?challengeId=${challengeId}`,
        null,
        null,
        false,
        false,
        false,
        true,
      ),
    );

    if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
      let data: any = path(['data'], apiResponse);
      data = [data];
      data = getUpdatedData(data, screenType);

      const updatedChallengesData = challengesData.map(challenge => {
        if (challenge._id === challengeId) {
          return {
            ...challenge,
            isLoader: false,
            ...data[0],
            screenType: screenType,
            isFocused: shouldUpdateFocus
              ? challengeItem._id === challengeId
                ? !challengeItem.isFocused
                : challengeItem.isFocused
              : path(['isFocused'], challenge) || false,
          };
        } else {
          return {
            ...challenge,
          };
        }
      });

      if (screenType === ChallengeScreenTypes.LIVE) {
        dispatchToStore(
          addUser({
            ...store.getState().userReducer.user,
            liveChallenges: updatedChallengesData,
          }),
        );
      } else if (screenType === ChallengeScreenTypes.UPCOMING) {
        dispatchToStore(
          addUser({
            ...store.getState().userReducer.user,
            upcomingChallenges: updatedChallengesData,
          }),
        );
      } else if (screenType === ChallengeScreenTypes.COMPLETE) {
        dispatchToStore(
          addUser({
            ...store.getState().userReducer.user,
            completedChallenges: updatedChallengesData,
          }),
        );
      }
      if (
        screenType === ChallengeScreenTypes.LIVE ||
        screenType === ChallengeScreenTypes.UPCOMING
      ) {
        configureSingleChallengeSocket(data[0], screenType);
      }
    } else {
      const updatedChallengesData = challengesData.map(challenge => {
        if (challenge._id === challengeId) {
          return {
            ...challenge,
            isLoader: false,
            screenType: screenType,
            isFocused: shouldUpdateFocus
              ? challengeItem._id === challengeId
                ? !challengeItem.isFocused
                : challengeItem.isFocused
              : path(['isFocused'], challenge) || false,
            shouldShowRetry: true,
          };
        } else {
          return {
            ...challenge,
          };
        }
      });

      if (screenType === ChallengeScreenTypes.LIVE) {
        dispatchToStore(
          addUser({
            ...store.getState().userReducer.user,
            liveChallenges: updatedChallengesData,
          }),
        );
      } else if (screenType === ChallengeScreenTypes.UPCOMING) {
        dispatchToStore(
          addUser({
            ...store.getState().userReducer.user,
            upcomingChallenges: updatedChallengesData,
          }),
        );
      } else if (screenType === ChallengeScreenTypes.COMPLETE) {
        dispatchToStore(
          addUser({
            ...store.getState().userReducer.user,
            completedChallenges: updatedChallengesData,
          }),
        );
      }
    }
  } catch (e) {
    const updatedChallengesData = challengesData.map(challenge => {
      if (challenge._id === challengeId) {
        return {
          ...challenge,
          isLoader: false,
          screenType: screenType,
          isFocused: shouldUpdateFocus
            ? challengeItem._id === challengeId
              ? !challengeItem.isFocused
              : challengeItem.isFocused
            : path(['isFocused'], challenge) || false,
          shouldShowRetry: true,
        };
      } else {
        return {
          ...challenge,
        };
      }
    });

    if (screenType === ChallengeScreenTypes.LIVE) {
      dispatchToStore(
        addUser({
          ...store.getState().userReducer.user,
          liveChallenges: updatedChallengesData,
        }),
      );
    } else if (screenType === ChallengeScreenTypes.UPCOMING) {
      dispatchToStore(
        addUser({
          ...store.getState().userReducer.user,
          upcomingChallenges: updatedChallengesData,
        }),
      );
    } else if (screenType === ChallengeScreenTypes.COMPLETE) {
      dispatchToStore(
        addUser({
          ...store.getState().userReducer.user,
          completedChallenges: updatedChallengesData,
        }),
      );
    }
  }
};
