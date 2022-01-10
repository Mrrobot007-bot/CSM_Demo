import {path} from 'ramda';
import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';

import {
  images,
  socket,
  kmToMiles,
  SCREEN_ROUTES,
  getPrimaryColor,
  roundTo2Decimal,
  isSelectedUnitKM,
  parseMillisecondsIntoReadableTime,
} from '../../../utility';
import {color} from '../../../theme';
import {translate} from '../../../i18n';
import {
  HeaderTypes,
  BoostrScreen,
  HeaderRightComponentType,
} from '../../../components/boostr-screen';
import {API_URLS} from '../../../services/urls';
import {
  ChallengeType,
  TypeOfChallenges,
  ChallengeScreenTypes,
  UserLeaderBoardItemType,
} from '../../../utility/object-types/challenge';
import {PaginationLoaderComponent} from './challenges';
import {postApiCall} from '../../../services/api-services';
import {STATUS_CODES} from '../../../services/status-codes';
import {Text, TextPresetStyles} from '../../../components/text';
import {FastImageModified} from '../../../components/fast-image-modified';
import {UserLeaderBoardStyles as styles} from './user-leader-board-styles';

/**
 * An Interface for possible props for the UserLeaderBoard Screen
 */
interface IHowItWorksScreenProps {
  /**
   * Navigation prop used to set the navigation stuff in the
   * component like, go back, move to other screen, etc.
   */
  navigation: any;

  /**
   * Prop used to get the challenges item
   */
  challenge: ChallengeType;
}

/**
 * UserLeaderBoard - A screen which used to render user
 * leaderboard in challenge component
 */
export const UserLeaderBoard = (props: IHowItWorksScreenProps) => {
  const challenge: ChallengeType =
    path(['route', 'params', 'challenge'], props) || null;

  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [usersLeaderBoard, setUserLeaderBoard] = useState([]);
  const [socketBoostrData, setSocketBoostrData] = useState(null);
  const [shouldStopLoading, setShouldStopLoading] = useState(false);
  const userReducer = useSelector((state: RootStateOrAny) => state.userReducer);

  useEffect(() => {
    userLeaderBoardApi();
  }, []);

  const userLeaderBoardApi = async () => {
    if (shouldStopLoading) {
      return;
    }

    if (pageNumber > 1) {
      setIsDataLoading(true);
    }
    const parameters = {
      challengeId: challenge._id,
      pageNo: pageNumber,
      limit: 10,
    };
    const apiResponse = await dispatch(
      postApiCall(API_URLS.GET_CHALLENGE_USER_LEADERBOARD, parameters),
    );
    setIsDataLoading(false);
    if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
      let userData: Array<any> = path(['data'], apiResponse) || [];
      userData = userData.map((leaderBoardItem, index) => {
        return {
          userImageUrl: path(['user_profile_pic'], leaderBoardItem) || null,
          userName: `${path(['user_first_name'], leaderBoardItem)} ${path(
            ['user_last_name'],
            leaderBoardItem,
          )}`,
          userId: path(['user_id'], leaderBoardItem) || null,
          userPosition: index + 1,
          associatedChallengeId: path(['_id'], userData),
          totalDistanceInKm: path(['totalDistance'], leaderBoardItem) || 0,
          isSpeedIncreased: false,
          personalBest: path(['personalBest'], leaderBoardItem) || 0,
          distanceIncreasedInKm:
            path(['farthestDistance'], leaderBoardItem) || 0,
          speedIncreased:
            path(['increaseOrDecreaseTime'], leaderBoardItem) || 0,
          secondPerKM: path(['secondPerKM'], leaderBoardItem) || 0,
        };
      });
      userData = userData.filter(item => {
        const isItemFound = usersLeaderBoard.find(
          (oldItem: any) => path(['_id'], oldItem) === path(['_id'], item),
        );
        return isItemFound ? null : item;
      });
      if (userData && userData.length) {
        if (pageNumber === 1) {
          leaderBoardSocketData();
        }
        setPageNumber(pageNumber + 1);
        const updatedLeaderBoard = [...usersLeaderBoard, ...userData];
        setUserLeaderBoard(updatedLeaderBoard);
      } else {
        setShouldStopLoading(true);
      }
    }
  };

  React.useEffect(() => {
    if (socketBoostrData !== null) {
      if (path(['action'], socketBoostrData) === 'newUserAdded') {
        let newItemPosition: number =
          path(
            ['data', 0, 'data', 0, 'currentUserPosition'],
            socketBoostrData,
          ) === 0
            ? 0
            : usersLeaderBoard.length;

        newItemPosition =
          newItemPosition > usersLeaderBoard.length
            ? usersLeaderBoard.length
            : newItemPosition;

        const newItem = {
          userImageUrl:
            path(
              ['data', 0, 'data', 0, 'currUserProfilePic'],
              socketBoostrData,
            ) || null,
          userName: `${path(
            ['data', 0, 'data', 0, 'currUserFirstName'],
            socketBoostrData,
          )} ${path(
            ['data', 0, 'data', 0, 'currUserLastName'],
            socketBoostrData,
          )}`,
          userId:
            path(['data', 0, 'data', 0, 'currUserId'], socketBoostrData) ||
            null,
          userPosition: newItemPosition,
          associatedChallengeId: path(['_id'], challenge),
          totalDistanceInKm:
            path(
              ['data', 0, 'data', 0, 'currUserTotalDistance'],
              socketBoostrData,
            ) || 0,
          isSpeedIncreased: false,
          personalBest: 0, // todo
          distanceIncreasedInKm: 0, // todo
          speedIncreased: 0, // todo
          secondPerKM: 0, // todo
        };

        const updatedData = [
          ...usersLeaderBoard.slice(0, newItemPosition),
          newItem,
          ...usersLeaderBoard.slice(newItemPosition),
        ];

        setUserLeaderBoard(updatedData);
      } else if (
        path(['action'], socketBoostrData) === 'userLeaved' ||
        path(['action'], socketBoostrData) === 'userRemoved'
      ) {
        const updatedData = usersLeaderBoard.filter(
          item =>
            path(['userId'], item) !==
            path(['data', 'userId'], socketBoostrData),
        );
        setUserLeaderBoard(updatedData);
      } else if (path(['action'], socketBoostrData) === 'onCreateActivity') {
        let newItemPosition: number =
          path(['data', 'data', 'currentUserPosition'], socketBoostrData) === 0
            ? 0
            : usersLeaderBoard.length;

        newItemPosition =
          newItemPosition > usersLeaderBoard.length
            ? usersLeaderBoard.length
            : newItemPosition;

        const userId = path(['data', 'data', 'currUserId'], socketBoostrData);
        const totalDistanceCovered =
          path(['data', 'data', 'currUserTotalDistance'], socketBoostrData) ||
          0;

        let toBeUpdateItem = usersLeaderBoard.find(
          item => path(['userId'], item) === userId,
        );

        if (toBeUpdateItem) {
          toBeUpdateItem = {
            ...toBeUpdateItem,
            totalDistanceInKm: totalDistanceCovered,
            userPosition: newItemPosition,
          };

          let updatedData = usersLeaderBoard.map(item => {
            if (path(['userId'], item) === userId) {
              return toBeUpdateItem;
            } else {
              return item;
            }
          });

          updatedData.sort(
            (a, b) => (a.totalDistanceInKm < b.totalDistanceInKm && 1) || -1,
          );
          setUserLeaderBoard(updatedData);
        }
      }
    }

    setSocketBoostrData(null);
  }, [socketBoostrData]);

  const leaderBoardSocketData = () => {
    socket().emit('challengeLeaderBoard', {
      challengeId: challenge._id,
    });
    socket().on(`challengeLeaderBoard_${challenge._id}`, function (data) {
      if (
        path(['action'], data) === 'onCreateActivity' ||
        path(['action'], data) === 'newUserAdded' ||
        path(['action'], data) === 'userLeaved' ||
        path(['action'], data) === 'userRemoved'
      ) {
        setSocketBoostrData(data);
      }
    });
  };

  const renderTable = (
    item: UserLeaderBoardItemType,
    index: number,
    isFastestMode: boolean = false,
  ) => {
    const isAdmin =
      path(['userId'], item) === path(['user', '_id'], userReducer);
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate(SCREEN_ROUTES.PROFILE_SCREEN, {
            userId: item.userId,
          })
        }
        style={[
          styles.tableMainView,
          isAdmin && {backgroundColor: getPrimaryColor()},
          styles.tableContainerStyle,
        ]}>
        <View style={styles.userLeaderBoardPart1containerStyle}>
          <Text
            preset={
              index < 3
                ? TextPresetStyles.CAPTION_3
                : TextPresetStyles.CAPTION_2
            }
            text={`${index + 1}`}
            style={isAdmin && {color: color.palette.white}}
          />
        </View>
        <View style={styles.userLeaderBoardPart2containerStyle}>
          <FastImageModified
            url={item.userImageUrl}
            style={styles.tableImageIconStyle}
            defaultImage={images.user}
          />
        </View>
        <View style={styles.userLeaderBoardPart3containerStyle}>
          <Text
            preset={
              index < 3
                ? TextPresetStyles.CAPTION_3
                : TextPresetStyles.CAPTION_2
            }
            text={item.userName}
            style={isAdmin && {color: color.palette.white}}
          />
        </View>
        <View style={styles.userLeaderBoardPart4containerStyle}>
          <Text
            preset={
              index < 3
                ? TextPresetStyles.CAPTION_6
                : TextPresetStyles.CAPTION_7
            }
            style={isAdmin && {color: color.palette.white}}
            text={
              challenge.challengeType === TypeOfChallenges.TIME_TRIAL ||
              (challenge.challengeType === TypeOfChallenges.MEET_UP &&
                isFastestMode)
                ? parseMillisecondsIntoReadableTime(item.personalBest)
                : isSelectedUnitKM()
                ? `${roundTo2Decimal(item.totalDistanceInKm)} ${translate(
                    'common.km',
                  )}`
                : `${kmToMiles(item.totalDistanceInKm)} ${translate(
                    'common.mile',
                  )}`
            }
          />
        </View>

        {challenge.challengeType !== TypeOfChallenges.MEET_UP && (
          <View style={styles.userLeaderBoardPart5containerStyle}></View>
        )}
      </TouchableOpacity>
    );
  };

  /**
   * A table view only mor meet up type challenge, for a section 'Most Improved'
   */
  const renderMostImprovedTable = (
    item: UserLeaderBoardItemType,
    index: number,
    isFastestMode: boolean = false,
  ) => {
    const getIncreasedSpeedType = item.speedIncreased < 0 ? '-' : '+';
    return (
      <View
        style={[
          styles.moreItemsTableMainView,
          {backgroundColor: getPrimaryColor(0.05)},
        ]}>
        <View style={styles.userMostImprovedPart1containerStyle}>
          <Text preset={TextPresetStyles.CAPTION_2} text={`${index + 1}`} />
        </View>
        <View style={styles.userMostImprovedPart2containerStyle}>
          <FastImageModified
            style={styles.tableImageIconStyle}
            url={item.userImageUrl}
            defaultImage={images.user}
          />
        </View>
        <View style={styles.userMostImprovedPart3containerStyle}>
          <Text preset={TextPresetStyles.CAPTION_3} text={item.userName} />
        </View>
        <View style={styles.userMostImprovedPart4containerStyle}>
          <Text
            preset={TextPresetStyles.CAPTION_6}
            text={
              isFastestMode
                ? `${parseMillisecondsIntoReadableTime(
                    item.secondPerKM, // todo convert this second per mile
                  )} (${getIncreasedSpeedType}${
                    item.speedIncreased / 1000 // todo convert this speed per mile
                  } ${translate('common.sec')})`
                : isSelectedUnitKM()
                ? `${item.totalDistanceInKm} ${translate(
                    'common.km',
                  )} (${getIncreasedSpeedType} ${
                    item.distanceIncreasedInKm
                  } ${translate('common.km')})`
                : `${kmToMiles(item.totalDistanceInKm)} ${translate(
                    'common.mile',
                  )} (${getIncreasedSpeedType} ${kmToMiles(
                    item.distanceIncreasedInKm,
                  )} ${translate('common.mile')})`
            }
          />
        </View>
      </View>
    );
  };

  /**
   * A table view to render header of leader  board table
   */
  const getLeaderBoardItem = (isFastestMode: boolean = false) => {
    let completionKm = 0;

    try {
      usersLeaderBoard.forEach((usersItem: UserLeaderBoardItemType) => {
        completionKm =
          completionKm + challenge.screenType === ChallengeScreenTypes.UPCOMING
            ? 0
            : usersItem.totalDistanceInKm;
      });
    } catch (e) {}

    let remainingKm = challenge.totalDistanceInKm - completionKm;
    remainingKm = remainingKm < 0 ? 0 : remainingKm;
    return (
      <View style={styles.leaderboardItemContainerStyle}>
        <View style={styles.leaderBoardHeadingContainer}>
          <View style={styles.userLeaderBoardPart1containerStyle}>
            <Text
              preset={TextPresetStyles.MINI_FONT}
              style={styles.headerLabelStyle}
              text={'#'}
            />
          </View>
          <View style={styles.userLeaderBoardPart2containerStyle}>
            <Text
              preset={TextPresetStyles.MINI_FONT}
              style={styles.headerLabelStyle}
              tx={'modules.myChallenges.image'}
            />
          </View>
          <View style={styles.userLeaderBoardPart3containerStyle}>
            <Text
              preset={TextPresetStyles.MINI_FONT}
              style={styles.headerLabelStyle}
              tx={'modules.myChallenges.name'}
            />
          </View>
          <View
            style={[
              styles.userLeaderBoardPart4containerStyle,
              challenge.challengeType === TypeOfChallenges.MEET_UP && {
                width: '34.5%',
              },
            ]}>
            <Text
              preset={TextPresetStyles.MINI_FONT}
              style={styles.headerLabelStyle}
              tx={
                challenge.challengeType === TypeOfChallenges.TIME_TRIAL
                  ? 'modules.myChallenges.personalBest'
                  : challenge.challengeType === TypeOfChallenges.MEET_UP
                  ? isFastestMode
                    ? 'modules.myChallenges.fastest'
                    : 'modules.myChallenges.farthest'
                  : 'modules.myChallenges.total'
              }
            />
          </View>
        </View>
        <View style={{}}>
          <FlatList
            data={usersLeaderBoard}
            renderItem={({item, index}) =>
              renderTable(item, index, isFastestMode)
            }
            onEndReached={() => {
              userLeaderBoardApi();
            }}
            ListFooterComponent={() => (
              <PaginationLoaderComponent
                isDataLoading={isDataLoading}
                challengesData={usersLeaderBoard}
              />
            )}
          />
        </View>

        {challenge.challengeType === TypeOfChallenges.MEET_UP &&
        challenge.screenType === ChallengeScreenTypes.LIVE &&
        isFastestMode ? (
          <View style={styles.mostImprovedMainStyle}>
            <Text
              preset={TextPresetStyles.TITLE_CIRCULAR}
              tx={'modules.myChallenges.mostImproved'}
            />

            <View
              style={[
                styles.mostImprovedSectionStyle,
                {backgroundColor: getPrimaryColor(0.05)},
              ]}>
              <Text
                preset={TextPresetStyles.FOOT_NOTE_ULTRA_BOLD}
                tx={'modules.myChallenges.distance'}
              />
              <FlatList
                style={styles.mostImprovedListStyle}
                data={usersLeaderBoard}
                renderItem={({item, index}) =>
                  renderMostImprovedTable(item, index)
                }
                onEndReached={() => {
                  userLeaderBoardApi();
                }}
                ListFooterComponent={() => (
                  <PaginationLoaderComponent
                    isDataLoading={isDataLoading}
                    challengesData={usersLeaderBoard}
                  />
                )}
              />

              <Text
                preset={TextPresetStyles.FOOT_NOTE_ULTRA_BOLD}
                tx={'modules.myChallenges.timeFastest'}
              />
              <FlatList
                style={styles.mostImprovedListStyle}
                data={usersLeaderBoard}
                renderItem={({item, index}) =>
                  renderMostImprovedTable(item, index, isFastestMode)
                }
                onEndReached={() => {
                  userLeaderBoardApi();
                }}
                ListFooterComponent={() => (
                  <PaginationLoaderComponent
                    isDataLoading={isDataLoading}
                    challengesData={usersLeaderBoard}
                  />
                )}
              />
            </View>
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <BoostrScreen
      navigation={props.navigation}
      headerRightComponentType={HeaderRightComponentType.ICON_TEXT}
      headerType={HeaderTypes.NORMAL_CROSS}
      title={translate('common.leaderboard')}>
      <View style={styles.mainContainerStyle}>
        {getLeaderBoardItem()}
        {challenge.challengeType === TypeOfChallenges.MEET_UP && (
          <View style={styles.meetUpFastestLeaderBoardStyle}>
            {getLeaderBoardItem(true)}
          </View>
        )}
      </View>
    </BoostrScreen>
  );
};
