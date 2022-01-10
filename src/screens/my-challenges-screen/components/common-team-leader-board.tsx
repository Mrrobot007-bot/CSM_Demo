import {path} from 'ramda';
import {useDispatch} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';

import {
  images,
  socket,
  kmToMiles,
  SCREEN_ROUTES,
  getPrimaryColor,
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
import {Icon} from '../../../components/icon';
import {API_URLS} from '../../../services/urls';
import {wpx} from '../../../utility/responsive';
import {
  ChallengeType,
  TypeOfChallenges,
  ChallengeScreenTypes,
  TeamLeaderBoardItemType,
  UserLeaderBoardItemType,
} from '../../../utility/object-types/challenge';
import {PaginationLoaderComponent} from './challenges';
import {postApiCall} from '../../../services/api-services';
import {STATUS_CODES} from '../../../services/status-codes';
import {ICON_TYPES} from '../../../components/icon/constants';
import {Text, TextPresetStyles} from '../../../components/text';
import {PercentageBar} from '../../../components/percentage-bar';
import {FastImageModified} from '../../../components/fast-image-modified';
import {TeamLeaderBoardStyles as styles} from './team-leader-board-styles';

/**
 * An Interface for possible props for the Common Team LeaderBoard Component
 */
interface IHowItWorksScreenProps {
  /**
   * Prop used to get the challenges item
   */
  challenge: ChallengeType;

  /**
   * Navigation prop used to set the navigation stuff in the
   * component like, go back, move to other screen, etc.
   */
  navigation: any;
}

/**
 * CommonTeamLeaderBoard - component used to show the leader board screen for challenges
 */
export const CommonTeamLeaderBoard = (props: IHowItWorksScreenProps) => {
  const challenge: ChallengeType =
    path(['route', 'params', 'challenge'], props) || null;
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [teamLeaderBoard, setTeamLeaderBoard] = useState([]);
  const [socketBoostrData, setSocketBoostrData] = useState(null);
  const [shouldStopLoading, setShouldStopLoading] = useState(false);

  useEffect(() => {
    teamLeaderBoardApi();
  }, []);

  /**
   * Getting leaderboard data
   */
  const teamLeaderBoardApi = async () => {
    if (shouldStopLoading) {
      return;
    }

    if (pageNumber > 1) {
      setIsDataLoading(true);
    }
    const parameters = {
      challengeId: challenge._id,
      pageNo: 1,
      limit: 10,
    };
    setIsDataLoading(false);
    const apiResponse = await dispatch(
      postApiCall(API_URLS.GET_CHALLENGE_TEAM_LEADERBOARD, parameters),
    );
    if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
      console.log('api response team data==>', apiResponse);
      let teamLeaderData: Array<any> = path(['data'], apiResponse) || [];
      teamLeaderData = teamLeaderData.map((leaderBoardItem, index) => {
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
            associatedChallengeId: path(['_id'], teamLeaderData),
            totalDistanceInKm: path(['totalDistance'], teamItem) || 0,
            isSpeedIncreased: false,
            isFocused: true,
            personalBest: path(['personalBest'], teamItem) || 0,
          };
        });
        return {
          teamImageUrl: path(['teamImage'], leaderBoardItem) || null,
          teamName: path(['teamName'], leaderBoardItem) || null,
          teamId: path(['team_id'], leaderBoardItem) || null,
          teamPosition: index + 1,
          associatedChallengeId: path(['_id'], teamLeaderData),
          teamAverageInKm: path(['teamAverageDistance'], leaderBoardItem) || 0,
          isTeamSpeedIncreased: false,
          leaderBoardUsers: teamUsers,
        };
      });
      teamLeaderData = teamLeaderData.filter(item => {
        const isItemFound = teamLeaderBoard.find(
          (oldItem: any) => path(['_id'], oldItem) === path(['_id'], item),
        );
        return isItemFound ? null : item;
      });
      if (teamLeaderData && teamLeaderData.length) {
        if (pageNumber === 1) {
          leaderBoardSocketData();
        }
        setPageNumber(pageNumber + 1);
        const updatedLeaderBoard = [...teamLeaderBoard, ...teamLeaderData];
        setTeamLeaderBoard(updatedLeaderBoard);
      } else {
        setShouldStopLoading(true);
      }
    }
  };

  /**
   * updating data when socket data update
   */
  React.useEffect(() => {
    if (socketBoostrData !== null) {
      if (path(['action'], socketBoostrData) === 'newUserAdded') {
        let newItemPosition: number =
          path(
            ['data', 0, 'data', 0, 'currentUserPosition'],
            socketBoostrData,
          ) === 0
            ? 0
            : teamLeaderBoard.length;

        newItemPosition =
          newItemPosition > teamLeaderBoard.length
            ? teamLeaderBoard.length
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
          ...teamLeaderBoard.slice(0, newItemPosition),
          newItem,
          ...teamLeaderBoard.slice(newItemPosition),
        ];

        setTeamLeaderBoard(updatedData);
      } else if (
        path(['action'], socketBoostrData) === 'userLeaved' ||
        path(['action'], socketBoostrData) === 'userRemoved'
      ) {
        const updatedData = teamLeaderBoard.filter(
          item =>
            path(['userId'], item) !==
            path(['data', 'userId'], socketBoostrData),
        );
        setTeamLeaderBoard(updatedData);
      } else if (path(['action'], socketBoostrData) === 'onCreateActivity') {
        let newItemPosition: number =
          path(['data', 'data', 'currentUserPosition'], socketBoostrData) === 0
            ? 0
            : teamLeaderBoard.length;

        newItemPosition =
          newItemPosition > teamLeaderBoard.length
            ? teamLeaderBoard.length
            : newItemPosition;

        const userId = path(['data', 'data', 'currUserId'], socketBoostrData);
        const totalDistanceCovered =
          path(['data', 'data', 'currUserTotalDistance'], socketBoostrData) ||
          0;

        let toBeUpdateItem = teamLeaderBoard.find(
          item => path(['userId'], item) === userId,
        );

        if (toBeUpdateItem) {
          toBeUpdateItem = {
            ...toBeUpdateItem,
            totalDistanceInKm: totalDistanceCovered,
            userPosition: newItemPosition,
          };

          let updatedData = teamLeaderBoard.map(item => {
            if (path(['userId'], item) === userId) {
              return toBeUpdateItem;
            } else {
              return item;
            }
          });

          updatedData.sort(
            (a, b) => (a.totalDistanceInKm < b.totalDistanceInKm && 1) || -1,
          );
          setTeamLeaderBoard(updatedData);
        }
      }
    }

    setSocketBoostrData(null);
  }, [socketBoostrData]);

  /**
   * Subscribing fro socket data of leader board
   */
  const leaderBoardSocketData = () => {
    socket().emit('challengeLeaderBoard', {
      challengeId: challenge._id,
    });
    socket().on(`challengeLeaderBoard_${challenge._id}`, function (data) {
      console.log('mkmkmk_134678', JSON.stringify(data));
      if (
        path(['action'], data) === 'onCreateActivity' ||
        path(['action'], data) === 'newUserAdded' ||
        path(['action'], data) === 'userLeaved' ||
        path(['action'], data) === 'userRemoved'
      ) {
        // setSocketBoostrData(data);
      }
    });
  };

  /**
   * open/collapse the team section
   */
  const updateTeamLeaderBoardOpenClose = (teamId: string) => {
    setTeamLeaderBoard(
      teamLeaderBoard.map(item => {
        return {
          ...item,
          isFocused: teamId === item.teamId ? !item.isFocused : item.isFocused,
        };
      }),
    );
  };

  /**
   * List item component
   */
  const renderTable = (item: TeamLeaderBoardItemType, index: number) => {
    let teamAverageBoostTime = 0;
    let teamAverageKm = 0;
    let completionPercentage = 0;
    try {
      item.leaderBoardUsers.forEach((userItem: UserLeaderBoardItemType) => {
        teamAverageBoostTime =
          teamAverageBoostTime +
          (path(['challenge', 'screenType'], props) ===
          ChallengeScreenTypes.UPCOMING
            ? 0
            : userItem.personalBest);
      });
      teamAverageBoostTime =
        teamAverageBoostTime / item.leaderBoardUsers.length;
    } catch (e) {}

    try {
      item.leaderBoardUsers.forEach((userItem: UserLeaderBoardItemType) => {
        teamAverageKm =
          teamAverageKm +
          (path(['challenge', 'screenType'], props) ===
          ChallengeScreenTypes.UPCOMING
            ? 0
            : userItem.totalDistanceInKm);
      });
      teamAverageKm = teamAverageKm / item.leaderBoardUsers.length;
    } catch (e) {}

    try {
      item.leaderBoardUsers.forEach((userItem: UserLeaderBoardItemType) => {
        completionPercentage =
          completionPercentage +
          (path(['challenge', 'screenType'], props) ===
          ChallengeScreenTypes.UPCOMING
            ? 0
            : userItem.totalDistanceInKm);
      });
      completionPercentage = isSelectedUnitKM()
        ? (teamAverageKm * 100) / item.teamAverageInKm
        : kmToMiles(teamAverageKm * 100) / kmToMiles(item.teamAverageInKm);
    } catch (e) {}

    let completionItemPercentage = Math.floor(completionPercentage);
    completionItemPercentage =
      completionItemPercentage > 100 ? 100 : completionItemPercentage;
    return (
      <View>
        <View
          style={[
            styles.tableMainView,
            {width: wpx(342), backgroundColor: getPrimaryColor(0.15)},
          ]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.teamLeaderBoardPart1containerStyle}>
              <View style={styles.teamNumberContainerStyle}>
                <Text
                  preset={TextPresetStyles.CAPTION_3}
                  text={`${item.teamPosition}`}
                  style={{
                    color: color.palette.white,
                  }}
                />
              </View>
            </View>
            <View style={styles.teamLeaderBoardPart2containerStyle}>
              <FastImageModified
                style={styles.tableImageIconStyle}
                url={item.teamImageUrl}
                defaultImage={images.user}
              />
            </View>
            <View style={styles.teamLeaderBoardPart3containerStyle}>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate(SCREEN_ROUTES.TEAM_PROFILE, {
                    teamId: path(['teamId'], item),
                  })
                }>
                <Text
                  preset={TextPresetStyles.FOOT_NOTE_ULTRA_BOLD}
                  text={item.teamName}
                  style={{color: getPrimaryColor()}}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.teamLeaderBoardPart4containerStyle}>
              <Text
                preset={TextPresetStyles.CAPTION_6}
                style={{color: getPrimaryColor()}}
                text={
                  challenge.challengeType === TypeOfChallenges.TIME_TRIAL
                    ? parseMillisecondsIntoReadableTime(teamAverageBoostTime)
                    : isSelectedUnitKM()
                    ? `${Math.round(teamAverageKm * 100) / 100} ${translate(
                        'common.km',
                      )}`
                    : `${kmToMiles(
                        Math.round(teamAverageKm * 100) / 100,
                      )} ${translate('common.mile')}`
                }
              />
            </View>

            <TouchableOpacity
              style={styles.teamLeaderBoardPart5containerStyle}
              onPress={() => updateTeamLeaderBoardOpenClose(item.teamId)}>
              <Icon
                icon={
                  item.isFocused ? ICON_TYPES.UP_ARROW : ICON_TYPES.DOWN_ARROW
                }
                style={
                  item.isFocused
                    ? {...styles.arrowIconStyle, tintColor: getPrimaryColor()}
                    : styles.arrowIconInactiveStyle
                }
              />
            </TouchableOpacity>
          </View>
          {challenge.challengeType === TypeOfChallenges.RELAY && (
            <PercentageBar
              style={styles.teamPercentageBar}
              activePercentage={`${completionItemPercentage}%`}
              disabledColor={color.palette.grey8}
              activeBarBackgroundColor={getPrimaryColor()}
            />
          )}
        </View>
        {item.isFocused &&
          item.leaderBoardUsers.map((userItem: UserLeaderBoardItemType) => {
            return (
              <View
                style={[
                  styles.userTableMainView,
                  {width: wpx(343), backgroundColor: getPrimaryColor(0.05)},
                ]}>
                <View style={styles.teamLeaderBoardPart1containerStyle}>
                  <Text
                    preset={
                      index < 3
                        ? TextPresetStyles.CAPTION_3
                        : TextPresetStyles.CAPTION_2
                    }
                    text={`${userItem.userPosition}`}
                  />
                </View>
                <View style={styles.teamLeaderBoardPart2containerStyle}>
                  <FastImageModified
                    style={styles.tableImageIconStyle}
                    url={userItem.userImageUrl}
                    defaultImage={images.user}
                  />
                </View>
                <View style={styles.teamLeaderBoardPart3containerStyle}>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate(SCREEN_ROUTES.PROFILE_SCREEN, {
                        userId: path(['userId'], userItem),
                      })
                    }>
                    <Text
                      preset={
                        index < 3
                          ? TextPresetStyles.CAPTION_3
                          : TextPresetStyles.CAPTION_2
                      }
                      text={userItem.userName}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.teamLeaderBoardPart4containerStyle}>
                  <Text
                    preset={
                      index < 3
                        ? TextPresetStyles.CAPTION_6
                        : TextPresetStyles.CAPTION_7
                    }
                    text={
                      challenge.challengeType === TypeOfChallenges.TIME_TRIAL
                        ? parseMillisecondsIntoReadableTime(
                            userItem.personalBest,
                          )
                        : isSelectedUnitKM()
                        ? `${userItem.totalDistanceInKm} ${translate(
                            'common.km',
                          )}`
                        : `${kmToMiles(userItem.totalDistanceInKm)} ${translate(
                            'common.mile',
                          )}`
                    }
                  />
                </View>

                <View style={styles.teamLeaderBoardPart5containerStyle}></View>
              </View>
            );
          })}
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
        {teamLeaderBoard && teamLeaderBoard.length ? (
          <View style={styles.leaderBoardHeadingContainer}>
            <View style={styles.teamLeaderBoardPart1containerStyle}>
              <Text
                preset={TextPresetStyles.MINI_FONT}
                style={styles.headerLabelStyle}
                text={'#'}
              />
            </View>
            <View style={styles.teamLeaderBoardPart2containerStyle}>
              <Text
                preset={TextPresetStyles.MINI_FONT}
                style={styles.headerLabelStyle}
                tx={'modules.myChallenges.image'}
              />
            </View>
            <View style={styles.teamLeaderBoardPart3containerStyle}>
              <Text
                preset={TextPresetStyles.MINI_FONT}
                style={styles.headerLabelStyle}
                tx={'modules.myChallenges.name'}
              />
            </View>
            <View style={styles.teamLeaderBoardPart4containerStyle}>
              <Text
                preset={TextPresetStyles.MINI_FONT}
                style={styles.headerLabelStyle}
                tx={'modules.myChallenges.teamAverage'}
              />
            </View>
          </View>
        ) : null}

        <FlatList
          data={teamLeaderBoard}
          renderItem={({item, index}) => renderTable(item, index)}
          onEndReached={() => {
            teamLeaderBoardApi();
          }}
          ListFooterComponent={() => (
            <PaginationLoaderComponent
              isDataLoading={isDataLoading}
              challengesData={teamLeaderBoard}
            />
          )}
        />
      </View>
    </BoostrScreen>
  );
};
