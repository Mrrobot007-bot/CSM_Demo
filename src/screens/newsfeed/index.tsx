import {path} from 'ramda';
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/core';
import {View, FlatList, TouchableOpacity} from 'react-native';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';

import {
  images,
  showMessage,
  defaultAlert,
  getDateAndTimeElapsed,
  getPrimaryColor,
  socket,
} from '../../utility';
import {translate} from '../../i18n';
import {Icon} from '../../components/icon';
import {API_URLS} from '../../services/urls';
import {Button} from '../../components/button';
import {ButtonPreset} from '../../components/button';
import {store} from '../../redux/store/configureStore';
import {UserType} from '../../utility/object-types/user';
import {NewsFeedScreenStyles as styles} from './styles';
import {postApiCall} from '../../services/api-services';
import {STATUS_CODES} from '../../services/status-codes';
import {ICON_TYPES} from '../../components/icon/constants';
import {Text, TextPresetStyles} from '../../components/text';
import {PullToRefresh} from '../../components/pull-to-refresh';
import {NewsFeedsType} from '../../utility/object-types/challenge';
import {FastImageModified} from '../../components/fast-image-modified';
import {BoostrScreen, HeaderTypes} from '../../components/boostr-screen';
import {PaginationLoaderComponent} from '../my-challenges-screen/components/challenges';
import {BoostrCommentComponent} from '../my-challenges-screen/components/boostr-component-comment';

/**
 * An Interface for possible props for the news feeds component
 */
interface ISettingScreenProps {
  /**
   * Navigation prop used to set the navigation stuff in the
   * component like, go back, move to other screen, etc.
   */
  navigation: any;
}

/**
 * function to show news feeds
 * @param props
 * @returns
 */
export const NewsfeedScreen = (props: ISettingScreenProps) => {
  const user: UserType = useSelector(
    (state: RootStateOrAny) => state.userReducer,
  ).user;
  const [refreshing, setRefreshing] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [newsFeedList, setNewsFeedList] = useState<any>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [shouldStopLoading, setShouldStopLoading] = useState(false);
  const [socketBoostrData, setSocketBoostrData] = useState(null);
  const isLoading = store.getState().apiReducer.loading;
  const dispatch = useDispatch();

  /**
   * function to load the initial data
   */
  useEffect(() => {
    getNewsFeeds();
    setIsDataLoading(false);
  }, []);

  /**
   * function to dismiss refresh
   */
  const dismissRefresh = () => {
    setRefreshing(true);
    getNewsFeeds();
  };

  /**
   * function to load initial data
   */
  React.useEffect(() => {
    if (socketBoostrData !== null) {
      if (path(['action'], socketBoostrData) === 'like') {
        let updatedLikeData = newsFeedList.map((item: any) => {
          return {
            ...item,
            likeCount:
              path(['data', '_id'], socketBoostrData) === path(['_id'], item)
                ? item.likeCount + 1
                : item.likeCount,
          };
        });

        setNewsFeedList(updatedLikeData);
      } else if (path(['action'], socketBoostrData) === 'comment') {
        let updatedCommentData = newsFeedList.map((item: any) => {
          return {
            ...item,
            commentCount:
              path(['data', '_id'], socketBoostrData) === path(['_id'], item)
                ? item.commentCount + 1
                : item.commentCount,
          };
        });
        setNewsFeedList(updatedCommentData);
      } else {
        setNewsFeedList([socketBoostrData, ...newsFeedList]);
      }
    }

    setSocketBoostrData(null);
  }, [socketBoostrData]);

  /**
   * function to load the socket data
   */
  const socketData = () => {
    socket().emit('newsFeed', {
      orgId: user.organisationId[0]._id,
    });

    socket().on(`newsFeed_${user.organisationId[0]._id}`, function (data) {
      if (path(['action'], data) === 'add') {
        const addedSingleData = path(['data'], data);
        setSocketBoostrData(addedSingleData);
      } else if (
        path(['action'], data) === 'like' ||
        path(['action'], data) === 'comment'
      ) {
        setSocketBoostrData(data);
      }
    });
  };

  /**
   * function to load the  newsfeeds
   * @returns
   */
  const getNewsFeeds = async () => {
    if (shouldStopLoading) {
      return;
    }

    let parameters = {
      pageNo: pageNumber,
      limit: 10,
    };

    if (pageNumber > 1) {
      setIsDataLoading(true);
    }
    try {
      let apiResponse = await dispatch(
        postApiCall(API_URLS.NEWS_FEEDS_LIST, parameters, pageNumber <= 1),
      );
      setIsDataLoading(false);
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        let data: Array<NewsFeedsType> = path(['data'], apiResponse);

        data = data.filter(item => {
          const isItemFound = newsFeedList.find(
            (oldItem: any) => path(['_id'], item) === path(['_id'], oldItem),
          );
          return isItemFound ? null : item;
        });

        if (data && data.length) {
          setPageNumber(pageNumber + 1);
          let updateData = [...newsFeedList, ...data];
          setNewsFeedList(updateData);

          if (pageNumber === 1) {
            socketData();
          }
        } else {
          setShouldStopLoading(true);
        }
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
    setRefreshing(false);
  };

  const onCommentPress = () => {
    setShowComment(!showComment);
  };

  const notificationView = () => {
    return (
      <TouchableOpacity
        style={[styles.notificationViewStyle, styles.sliderMiddleSpaceStyle]}>
        <View style={styles.notificationBellViewStyle}>
          <Icon
            icon={ICON_TYPES.BELL}
            style={{...styles.bellIconStyle, tintColor: getPrimaryColor()}}
          />
        </View>
        <View style={styles.notificationBellTextStyle}>
          <View>
            <Text
              preset={TextPresetStyles.SUB_HEADLINE}
              style={[styles.secondaryLabelTextStyle, styles.blackTextStyle]}
              tx={'modules.Dashboard.youHaveInvited'}
            />
            <Text
              preset={TextPresetStyles.CAPTION_1}
              style={[styles.secondaryLabelTextStyle, styles.grayTextStyle]}
              tx={'modules.Dashboard.atlanticCrossing'}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  /**
   * function is used like the function
   * @param boostrId
   */
  const onLikePress = async (boostrId: string) => {
    const parameters = {boostr_id: boostrId};
    try {
      const apiResponse = await dispatch(
        postApiCall(API_URLS.LIKE_BOOSTR, parameters, false),
      );
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
      } else if (
        path(['statusCode'], apiResponse) === STATUS_CODES.BAD_REQUEST
      ) {
        showMessage(`Error! : ${path(['message'], apiResponse)}`);
      } else {
        showMessage(`Error! : ${path(['message'], apiResponse)}`);
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };

  /**
   *  function to show the toggle
   * @param boostrId
   */
  const showCommentToggleClick = (boostrId: string) => {
    const boostrs = newsFeedList.map((item: any) => {
      return {
        ...item,
        isChatWindowOpen:
          item._id === boostrId
            ? path(['isChatWindowOpen'], item)
              ? false
              : true
            : path(['isChatWindowOpen'], item),
      };
    });

    setNewsFeedList(boostrs);
  };

  const renderBoostrList = (item: NewsFeedsType) => {
    return (
      <View style={styles.listItemContainerStyle}>
        <View style={styles.part1ContainerStyle}>
          <FastImageModified
            url={item.creator_profilePic}
            style={styles.userImageStyle}
            defaultImage={images.user}
          />
          <View>
            <Text
              preset={TextPresetStyles.CAPTION_2}
              style={styles.dateTextStyle}
              text={getDateAndTimeElapsed(new Date(item.createdAt).getTime())}
            />
          </View>
        </View>
        <Text preset={TextPresetStyles.DESCRIPTION} text={item.comment} />
        {item.attachment && item.attachment !== '' ? (
          <FastImageModified
            url={item.attachment}
            style={styles.boostrImageStyle}
            defaultImage={images.defaultImage}
          />
        ) : null}
        <View style={styles.bottomButtonContainerStyle}>
          <View style={styles.challengeNameView}>
            <Text
              preset={TextPresetStyles.CAPTION_3}
              style={styles.challengeTextStyle}
              text={item.challengeName}
            />
          </View>
          <View style={styles.flexRow}>
            <TouchableOpacity
              style={styles.bottomButtonItemStyle}
              onPress={() => onLikePress(item._id)}>
              <Icon
                icon={ICON_TYPES.THUMB_UP}
                style={{
                  ...styles.buttonIconStyle,
                  tintColor: getPrimaryColor(),
                }}
              />
              <Text
                preset={TextPresetStyles.CAPTION_3}
                style={[styles.buttonTextStyle, {color: getPrimaryColor()}]}
                text={`${path(['likeCount'], item) || 0}` || '0'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomButtonItemStyle}
              onPress={() => showCommentToggleClick(item._id)}>
              <Icon
                icon={ICON_TYPES.MESSAGE}
                style={{
                  ...styles.buttonIconStyle,
                  tintColor: getPrimaryColor(),
                }}
              />
              <Text
                preset={TextPresetStyles.CAPTION_3}
                style={[styles.buttonTextStyle, {color: getPrimaryColor()}]}
                text={`${path(['commentCount'], item) || 0}` || '0'}
              />
            </TouchableOpacity>
          </View>
        </View>

        {path(['isChatWindowOpen'], item) && (
          <BoostrCommentComponent
            id={item._id}
            totalComments={path(['commentCount'], item)}
          />
        )}
      </View>
    );
  };

  return (
    <BoostrScreen
      title={translate('modules.newsfeed.title')}
      navigation={props.navigation}
      headerType={useIsFocused() ? HeaderTypes.NORMAL_BACK : HeaderTypes.NONE}>
      <PullToRefresh
        onRefresh={dismissRefresh}
        refreshing={refreshing}
        style={{flex: 1}}>
        <View style={styles.mainContainerStyle}>
          {newsFeedList && newsFeedList.length ? (
            <FlatList
              data={newsFeedList}
              renderItem={({item}) => renderBoostrList(item)}
              extraData={[newsFeedList]}
              onEndReached={getNewsFeeds}
              onEndReachedThreshold={0.8}
              ListFooterComponent={() => (
                <PaginationLoaderComponent
                  isDataLoading={isDataLoading}
                  challengesData={newsFeedList}
                />
              )}
            />
          ) : isLoading || isDataLoading ? null : (
            <View>
              <Text
                preset={TextPresetStyles.FOOT_NOTE}
                style={styles.noDataTextStyle}
                tx={'modules.newsfeed.noData'}
              />
              <Button
                onPress={getNewsFeeds}
                preset={ButtonPreset.EXTRA_SMALL}
                text={translate('common.retry')}
              />
            </View>
          )}
        </View>
      </PullToRefresh>
    </BoostrScreen>
  );
};
