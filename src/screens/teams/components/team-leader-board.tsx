import {path} from 'ramda';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';

import {
  images,
  kmToMiles,
  SCREEN_ROUTES,
  roundTo2Decimal,
  getPrimaryColor,
  isSelectedUnitKM,
  socket,
} from '../../../utility';
import {color} from '../../../theme';
import {translate} from '../../../i18n';
import {
  HeaderTypes,
  BoostrScreen,
  HeaderRightComponentType,
} from '../../../components/boostr-screen';
import {API_URLS} from '../../../services/urls';
import {hpx, wpx} from '../../../utility/responsive';
import {postApiCall} from '../../../services/api-services';
import {UserType} from '../../../utility/object-types/user';
import {STATUS_CODES} from '../../../services/status-codes';
import {Text, TextPresetStyles} from '../../../components/text';
import {FastImageModified} from '../../../components/fast-image-modified';
import {TeamUserBoardItemType} from '../../../utility/object-types/challenge';
import {UserLeaderBoardStyles as styles} from '../team-profile/user-leader-board-styles';
import {PaginationLoaderComponent} from '../../my-challenges-screen/components/challenges';

/**
 * An Interface for possible props for the Common leaderBoard component
 */
interface CommonLeaderBoardProps {
  /**
   * Navigation prop used to set the navigation stuff in the
   * component like, go back, move to other screen, etc.
   */
  navigation: any;
  /**
   * team ID props used to get get profile data
   */
  teamId: string;

  /**
   * page is used to get date component
   */

  page: number;
}

/**
 * Function is used to common leader board of the
 */
export const CommonLeaderBoard = (props: CommonLeaderBoardProps) => {
  const teamId: string = path(['route', 'params', 'teamId'], props) || null;
  const pageType: number = path(['route', 'params', 'page'], props);
  const dispatch = useDispatch();
  const startDate =
    pageType == 0
      ? `${moment().startOf('week').format('DD MMM, yyyy')}`
      : pageType == 1
      ? `${moment().startOf('month').format('DD MMM, yyyy')}`
      : `${moment().startOf('year').format('DD MMM, yyyy')}`;
  const endDate =
    pageType == 0
      ? `${moment().endOf('week').format('DD MMM, yyyy')}`
      : pageType == 1
      ? `${moment().endOf('month').format('DD MMM, yyyy')}`
      : `${moment().endOf('year').format('DD MMM, yyyy')}`;
  const [leaderBoard, setLeaderBoard] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [socketBoostrData, setSocketBoostrData] = useState(null);
  const [shouldStopLoading, setShouldStopLoading] = useState(false);
  const user: UserType = useSelector(
    (state: RootStateOrAny) => state.userReducer,
  ).user;

  /**
   * Function is used to get initial data on page load
   */
  useEffect(() => {
    leaderBoardData();
    leaderBoardSocketData();
  }, []);

  /**
   * Function is used to get leaderboard data
   */
  const leaderBoardData = async () => {
    if (shouldStopLoading) return;
    if (pageNumber > 1) setIsDataLoading(true);

    let params = {
      team_id: teamId,
      startDate: startDate,
      endDate: endDate,
      pageNo: pageNumber,
      limit: 100,
      activityIds: [],
    };

    const apiResponse = await dispatch(
      postApiCall(API_URLS.GET_TEAM_LEADER_BOARD, params),
    );
    setIsDataLoading(false);
    if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
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
            _id: path(['_id'], item),
            activityData: activities.map((activity: any) => {
              return {
                ...activity,
              };
            }),
          };
        });
      } catch (e) {}

      data = data.filter((item: any) => {
        const isItemFound = leaderBoard.find(
          (oldItem: any) => path(['_id'], oldItem) === path(['_id'], item),
        );
        return isItemFound ? null : item;
      });

      if (data && data.length) {
        setPageNumber(pageNumber + 1);
        const updatedData = [...leaderBoard, ...data];
        setLeaderBoard(updatedData);
      } else {
        setShouldStopLoading(true);
      }
    }
  };

  React.useEffect(() => {
    if (socketBoostrData !== null) {
      if (
        path(['action'], socketBoostrData) === 'leaveTeam' ||
        path(['action'], socketBoostrData) === 'userRemoved'
      ) {
        const updatedData = leaderBoard.filter(
          item => path(['userId'], item) !== path(['data'], socketBoostrData),
        );
        setLeaderBoard(updatedData);
      } else if (
        path(['action'], socketBoostrData) === 'newUserInvitationAccepted' ||
        path(['action'], socketBoostrData) === 'joinedTeam'
      ) {
        // todo add leaderboard item
      } else if (path(['action'], socketBoostrData) === 'onCreateActivity') {
        // todo update leaderboard item
      }
    }
    setSocketBoostrData(null);
  }, [socketBoostrData]);

  const leaderBoardSocketData = () => {
    socket().emit('teamLeaderBoard', {
      teamId: teamId,
    });

    socket().on(`teamLeaderBoard_${teamId}`, function (data) {
      if (
        path(['action'], data) === 'leaveTeam' ||
        path(['action'], data) === 'userRemoved' ||
        path(['action'], data) === 'newUserInvitationAccepted' ||
        path(['action'], data) === 'joinedTeam' ||
        path(['action'], data) === 'onCreateActivity'
      ) {
        setSocketBoostrData(data);
      }
    });
  };

  const renderTable = (
    item: TeamUserBoardItemType,
    index: number,
    isFastestMode: boolean = false,
  ) => {
    const isAdmin = path(['userId'], item) === user._id;
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
              isSelectedUnitKM()
                ? `${roundTo2Decimal(item.distance)} ${translate('common.km')}`
                : `${kmToMiles(item.distance)} ${translate('common.mile')}`
            }
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <BoostrScreen
      navigation={props.navigation}
      headerRightComponentType={HeaderRightComponentType.ICON_TEXT}
      headerType={HeaderTypes.NORMAL_CROSS}
      title={translate('common.leaderboard')}>
      <View
        style={{
          flex: 1,
          marginTop: hpx(24),
          width: wpx(343),
          alignSelf: 'center',
        }}>
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
              {
                width: '34.5%',
              },
            ]}>
            <Text
              preset={TextPresetStyles.MINI_FONT}
              style={styles.headerLabelStyle}
              tx={'modules.myChallenges.total'}
            />
          </View>
        </View>
        <View>
          <FlatList
            data={leaderBoard}
            renderItem={({item, index}) => renderTable(item, index, true)}
            onEndReached={() => {
              leaderBoardData();
            }}
            ListFooterComponent={() => (
              <PaginationLoaderComponent
                isDataLoading={isDataLoading}
                challengesData={leaderBoard}
              />
            )}
          />
        </View>
      </View>
    </BoostrScreen>
  );
};
