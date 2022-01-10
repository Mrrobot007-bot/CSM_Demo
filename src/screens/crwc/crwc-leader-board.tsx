import {path} from 'ramda';
import React, {useEffect, useState} from 'react';
import {Text, TextPresetStyles} from '../../components/text';
import {View, TouchableOpacity, FlatList} from 'react-native';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';

import {
  images,
  socket,
  kmToMiles,
  SCREEN_ROUTES,
  isSelectedUnitKM,
  getPrimaryColor,
} from '../../utility';
import {color} from '../../theme';
import {translate} from '../../i18n';
import {
  HeaderTypes,
  BoostrScreen,
  HeaderRightComponentType,
} from '../../components/boostr-screen';
import {API_URLS} from '../../services/urls';
import {store} from '../../redux/store/configureStore';
import {postApiCall} from '../../services/api-services';
import {STATUS_CODES} from '../../services/status-codes';
import {UserType} from '../../utility/object-types/user';
import {Button, ButtonPreset} from '../../components/button';
import {FastImageModified} from '../../components/fast-image-modified';
import {TeamLeaderBoardStyles as styles} from './components/leader-board-styles';
import {PaginationLoaderComponent} from '../my-challenges-screen/components/challenges';

/**
 * An Interface for possible props for the CrwLeaderBoard component
 */
interface ICrwLeaderBoardProps {
  /**
   * Navigation prop used to set the navigation stuff in the
   * component like, go back, move to other screen, etc.
   */
  navigation: any;
}

/**
 * CrwLeaderBoard - A screen where a full list of leaderboard pf crwc is there with pagination
 */
export const CrwLeaderBoard = (props: ICrwLeaderBoardProps) => {
  const dispatch = useDispatch();
  const user: UserType = useSelector(
    (state: RootStateOrAny) => state.userReducer,
  ).user;

  const [pageNumber, setPageNumber] = useState(1);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [leaderBoardDataCRWC, setLeaderBoardCRWC] = useState([]);
  const [shouldStopLoading, setShouldStopLoading] = useState(false);
  const type: string = path(['route', 'params', 'type'], props) || null;

  useEffect(() => {
    getLeaderBoard(type !== null);
    leaderBoardSocketData();
  }, []);

  /**
   * Getting leaderboard data from server
   */
  const getLeaderBoard = async (isCrwcLeaderBoard: boolean = false) => {
    if (shouldStopLoading) return;
    if (pageNumber > 1) setIsDataLoading(true);
    const parameters = {
      pageNo: pageNumber,
      limit: 100,
    };
    const apiResponse = await dispatch(
      postApiCall(
        isCrwcLeaderBoard
          ? API_URLS.GET_CRWC_LEADERBOARD
          : API_URLS.GET_MY_COMPANY_LEADERBOARD,
        parameters,
        pageNumber <= 1,
      ),
    );
    setIsDataLoading(false);
    if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
      let leaderBoard: any = path(['data', 'list'], apiResponse || []);
      leaderBoard = leaderBoard.filter((item: any) => {
        const isItemFound = leaderBoardDataCRWC.find(
          (oldItem: any) => path(['_id'], oldItem) === path(['_id'], item),
        );
        return isItemFound ? null : item;
      });
      if (leaderBoard && leaderBoard.length) {
        setPageNumber(pageNumber + 1);
        const updatedLeaderBoard = [...leaderBoardDataCRWC, ...leaderBoard];
        setLeaderBoardCRWC(updatedLeaderBoard);
      } else {
        setShouldStopLoading(true);
      }
    }
  };

  /**
   * Getting leaderboard data from socket
   */
  const leaderBoardSocketData = () => {
    socket().emit('crwc');
    socket().on(`crwc_`, function (data) {});
  };

  /**
   * CRWC Leader board render item
   */
  const renderTable = (
    item: any,
    index: number,
    isCrwcItem: boolean = false,
  ) => {
    return (
      <View>
        <View
          style={[
            styles.tableMainView,
            {
              backgroundColor: isCrwcItem
                ? user.organisationId[0]._id == item._id
                  ? color.palette.green
                  : getPrimaryColor(0.15)
                : user._id == item._id
                ? color.palette.green
                : getPrimaryColor(0.15),
            },
          ]}>
          <View style={styles.leaderBoardItemContainerStyle}>
            <View style={styles.teamLeaderBoardPart1containerStyle}>
              <View style={styles.teamNumberContainerStyle}>
                <Text
                  preset={TextPresetStyles.CAPTION_3}
                  text={`${index + 1}`}
                  style={{
                    color: color.palette.black,
                  }}
                />
              </View>
            </View>
            <View style={styles.teamLeaderBoardPart2containerStyle}>
              <FastImageModified
                style={
                  isCrwcItem
                    ? styles.tableImageIconStyle
                    : styles.companyTableImageIconStyle
                }
                url={isCrwcItem ? item.appLogo : item.profilePic}
                defaultImageStyle={{left: isCrwcItem ? 0 : null}}
                defaultImage={images.user}
              />
            </View>
            <View style={styles.teamLeaderBoardPart3containerStyle}>
              {isCrwcItem ? (
                <View>
                  <Text
                    preset={
                      index < 3
                        ? TextPresetStyles.FOOT_NOTE_BOLD_STATIC
                        : TextPresetStyles.FOOT_NOTE
                    }
                    text={item.name}
                    style={{color: color.palette.black}}
                  />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate(SCREEN_ROUTES.PROFILE_SCREEN, {
                      userId: path(['_id'], item),
                    })
                  }>
                  <Text
                    preset={TextPresetStyles.FOOT_NOTE_ULTRA_BOLD}
                    text={`${item.firstName} ${item.lastName}`}
                    style={{color: color.palette.black}}
                  />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.teamLeaderBoardPart4containerStyle}>
              <Text
                preset={TextPresetStyles.CAPTION_6}
                style={{color: color.palette.black}}
                text={
                  isCrwcItem
                    ? `${
                        item.totalDistance != null ? item.totalDistance : 0
                      } ${translate('common.km')}`
                    : isSelectedUnitKM()
                    ? `${
                        item.totalDistance != null ? item.totalDistance : 0
                      } ${translate('common.km')}`
                    : `${
                        item.totalDistance != null
                          ? kmToMiles(item.totalDistance)
                          : 0
                      } ${translate('common.miles')}`
                }
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  const isLoading = store.getState().apiReducer.loading;
  return (
    <BoostrScreen
      navigation={props.navigation}
      headerRightComponentType={HeaderRightComponentType.ICON_TEXT}
      headerType={HeaderTypes.NORMAL_CROSS}
      title={translate('common.leaderboard')}>
      {leaderBoardDataCRWC && leaderBoardDataCRWC.length ? (
        <View style={styles.leaderBoardMainContainerStyle}>
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
                tx={type ? 'modules.crwc.average' : 'modules.Dashboard.total'}
              />
            </View>
          </View>

          <FlatList
            data={leaderBoardDataCRWC}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) =>
              renderTable(item, index, type !== null)
            }
            keyExtractor={item => item._id}
            onEndReached={() => {
              getLeaderBoard(type !== null);
            }}
            ListFooterComponent={() => (
              <PaginationLoaderComponent
                isDataLoading={isDataLoading}
                challengesData={leaderBoardDataCRWC}
              />
            )}
          />
        </View>
      ) : isLoading || isDataLoading ? null : (
        <View>
          <Text
            preset={TextPresetStyles.FOOT_NOTE}
            style={styles.noDataTextStyle}
            tx={'modules.crwc.noLeaderBoardData'}
          />

          <Button
            onPress={() => getLeaderBoard(type !== null)}
            preset={ButtonPreset.EXTRA_SMALL}
            text={translate('common.retry')}
          />
        </View>
      )}
    </BoostrScreen>
  );
};
