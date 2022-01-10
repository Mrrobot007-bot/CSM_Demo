import {
  View,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {path} from 'ramda';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {connect, RootStateOrAny, useDispatch, useSelector} from 'react-redux';

import {
  images,
  showMessage,
  defaultAlert,
  SCREEN_ROUTES,
  getPrimaryColor,
  getDateAndTimeElapsed,
  socket,
} from '../../../utility';
import {translate} from '../../../i18n';
import {
  HeaderTypes,
  BoostrScreen,
  HeaderRightComponentType,
} from '../../../components/boostr-screen';
import {Icon} from '../../../components/icon';
import {API_URLS} from '../../../services/urls';
import {Button} from '../../../components/button';
import {PaginationLoaderComponent} from './challenges';
import {ButtonPreset} from '../../../components/button';
import {store} from '../../../redux/store/configureStore';
import {STATUS_CODES} from '../../../services/status-codes';
import {ICON_TYPES} from '../../../components/icon/constants';
import {Text, TextPresetStyles} from '../../../components/text';
import {BoostrCommentComponent} from './boostr-component-comment';
import {BoostrType} from '../../../utility/object-types/challenge';
import {getApiCall, postApiCall} from '../../../services/api-services';
import {BoostrComponentStyles as styles} from './boostr-component-styles';
import {FastImageModified} from '../../../components/fast-image-modified';

/**
 * An Interface for possible props for the Boostr Component
 */
interface IBoostrMainComponentProps {}

/**
 * BoostrMain - A Component used to render the boostr section in challenges
 */
const BoostrMain: React.FC<IBoostrMainComponentProps> = (
  props: IBoostrMainComponentProps,
) => {
  const isTeamChat: boolean =
    path(['route', 'params', 'isTeamChat'], props) || false;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isStopLoad, setIsStopLoad] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [socketBoostrData, setSocketBoostrData] = useState(null);
  const [boostrData, setBoostrData] = useState<Array<BoostrType>>([]);
  const userReducer = useSelector((state: RootStateOrAny) => state.userReducer);

  /**
   * show/hide the comment section
   */
  const showCommentToggleClick = (boostrId: string) => {
    const boostrs = boostrData.map(item => {
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

    setBoostrData(boostrs);
  };

  React.useEffect(() => {
    getBoostrData();
    getChallengeChatDataBySocket();
  }, []);

  /**
   * handling socket action
   */
  React.useEffect(() => {
    if (socketBoostrData !== null) {
      if (path(['action'], socketBoostrData) === 'like') {
        let updatedLikeData = boostrData.map(item => {
          return {
            ...item,
            totalLikes:
              path(['data', '_id'], socketBoostrData) === path(['_id'], item)
                ? item.totalLikes + 1
                : item.totalLikes,
          };
        });

        setBoostrData(updatedLikeData);
      } else if (path(['action'], socketBoostrData) === 'comment') {
        let updatedLikeData = boostrData.map(item => {
          return {
            ...item,
            totalComments:
              path(['data', '_id'], socketBoostrData) === path(['_id'], item)
                ? item.totalComments + 1
                : item.totalComments,
          };
        });
        setBoostrData(updatedLikeData);
      } else {
        setBoostrData([socketBoostrData, ...boostrData]);
      }
    }

    setSocketBoostrData(null);
  }, [socketBoostrData]);

  /**
   * Getting the boostr list from server
   */
  const getBoostrData = async () => {
    if (isStopLoad) {
      return;
    }
    const id = path(['route', 'params', 'id'], props);

    if (isTeamChat) {
      try {
        setIsDataLoading(currentPageNumber > 1);
        const apiResponse = await dispatch(
          getApiCall(
            `${
              API_URLS.CHAT_TEAM_LIST
            }?team_id=${id}&pageNo=${currentPageNumber}&limit=${10}`,
            null,
            null,
            false,
            false,
            false,
            currentPageNumber > 1,
          ),
        );
        setIsDataLoading(false);
        if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
          const data: Array<any> = path(['data'], apiResponse) || [];
          let updatedData: Array<BoostrType> = data.map((boostr: any) => {
            return {
              userId: path(['creator_userId'], boostr) || null,
              userName: `${path(['creator_userFirstName'], boostr) || ''} ${
                path(['creator_userLastName'], boostr) || ''
              }`,
              _id: path(['_id'], boostr) || null,
              userImageUrl: path(['creator_profilePic'], boostr) || null,
              message: path(['message'], boostr) || null,
              boostrImageUrl: path(['image'], boostr) || null,
              totalComments: path(['commentCount'], boostr) || 0,
              totalLikes: path(['likeCount'], boostr) || 0,
              createdDateTime: path(['createdDateTime'], boostr) || 0,
            };
          });

          updatedData = updatedData.filter(item => {
            const isItemFound = boostrData.find(
              oldItem => path(['_id'], item) === path(['_id'], oldItem),
            );

            return isItemFound ? null : item;
          });

          if (updatedData && updatedData.length) {
            setCurrentPageNumber(currentPageNumber + 1);
            updatedData = [...boostrData, ...updatedData];
            setBoostrData(updatedData);
          } else {
            setIsStopLoad(true);
          }
        }
      } catch (e) {
        defaultAlert(translate('modules.errorMessages.error'), e.message);
      }
    } else {
      const parameters = {
        pageNo: currentPageNumber,
        limit: 10,
        challenge_id: id,
      };

      setIsDataLoading(currentPageNumber > 1);

      const apiResponse = await dispatch(
        postApiCall(
          API_URLS.CHALLENGE_BOOSTR_LIST,
          parameters,
          currentPageNumber <= 1,
        ),
      );

      setIsDataLoading(false);

      try {
        if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
          const data: Array<any> = path(['data'], apiResponse) || [];
          let updatedData: Array<BoostrType> = data.map(boostr => {
            return {
              userId: path(['creator_userId'], boostr) || null,
              userName: `${path(['creator_userFirstName'], boostr) || ''} ${
                path(['creator_userLastName'], boostr) || ''
              }`,
              _id: path(['_id'], boostr) || null,
              userImageUrl: path(['creator_profilePic'], boostr) || null,
              message: path(['comment'], boostr) || null,
              boostrImageUrl: path(['attachment'], boostr) || null,
              totalComments: path(['commentCount'], boostr) || 0,
              totalLikes: path(['likeCount'], boostr) || 0,
              createdDateTime: path(['createdAt'], boostr) || 0,
            };
          });
          updatedData = updatedData.filter(item => {
            const isItemFound = boostrData.find(
              oldItem => path(['_id'], item) === path(['_id'], oldItem),
            );

            return isItemFound ? null : item;
          });

          if (updatedData && updatedData.length) {
            setCurrentPageNumber(currentPageNumber + 1);
            updatedData = [...boostrData, ...updatedData];
            setBoostrData(updatedData);
          } else {
            setIsStopLoad(true);
          }
        } else {
          defaultAlert(
            translate('modules.errorMessages.error'),
            path(['message'], apiResponse),
          );
        }
      } catch (e) {
        defaultAlert(translate('modules.errorMessages.error'), e.message);
      }
    }
  };

  /**
   * Getting the boostr data from socket if any update
   */
  const getChallengeChatDataBySocket = () => {
    const id = path(['route', 'params', 'id'], props);
    if (isTeamChat) {
      socket().on(
        'TeamChatFeed_' +
          path(['user', 'organisationId', 0, '_id'], userReducer),
        function (data) {
          if (path(['action'], data) === 'add') {
            const addedData = path(['data'], data);
            const addedSingleData: BoostrType = {
              userId: path(['creator_userId'], addedData) || null,
              userName: `${path(['creator_userFirstName'], addedData) || ''} ${
                path(['creator_userLastName'], addedData) || ''
              }`,
              _id: path(['_id'], addedData) || null,
              userImageUrl: path(['creator_profilePic'], addedData) || null,
              message: path(['message'], addedData) || null,
              boostrImageUrl: path(['image'], addedData) || null,
              totalComments: path(['commentCount'], addedData) || 0,
              totalLikes: path(['likeCount'], addedData) || 0,
              createdDateTime: path(['createdAt'], addedData) || 0,
            };

            setSocketBoostrData(addedSingleData);
          } else if (
            path(['action'], data) === 'like' ||
            path(['action'], data) === 'comment'
          ) {
            setSocketBoostrData(data);
          }
        },
      );
    } else {
      socket().emit('challengeBoostr', {
        challengeId: id,
      });

      socket().on('challengeBoostr_' + id, function (data) {
        if (path(['action'], data) === 'add') {
          const addedData = path(['data'], data);
          const addedSingleData: BoostrType = {
            userId: path(['creator_userId'], addedData) || null,
            userName: `${path(['creator_userFirstName'], addedData) || ''} ${
              path(['creator_userLastName'], addedData) || ''
            }`,
            _id: path(['_id'], addedData) || null,
            userImageUrl: path(['creator_profilePic'], addedData) || null,
            message: path(['comment'], addedData) || null,
            boostrImageUrl: path(['attachment'], addedData) || null,
            totalComments: path(['commentCount'], addedData) || 0,
            totalLikes: path(['likeCount'], addedData) || 0,
            createdDateTime: path(['createdAt'], addedData) || 0,
          };

          setSocketBoostrData(addedSingleData);
        } else if (
          path(['action'], data) === 'like' ||
          path(['action'], data) === 'comment'
        ) {
          setSocketBoostrData(data);
        }
      });
    }
  };

  /**
   * Action on like press on boostr
   *
   */
  const onLikePress = async (id: string) => {
    const parameters = isTeamChat ? {chat_id: id} : {boostr_id: id};
    const apiResponse = await dispatch(
      postApiCall(
        isTeamChat ? API_URLS.LIKE_CHAT : API_URLS.LIKE_BOOSTR,
        parameters,
        false,
      ),
    );
    if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
    } else if (path(['statusCode'], apiResponse) === STATUS_CODES.BAD_REQUEST) {
      showMessage(
        `${translate('modules.errorMessages.error')}! : ${path(
          ['message'],
          apiResponse,
        )}`,
      );
    } else {
      showMessage(
        `${translate('modules.errorMessages.error')}! : ${path(
          ['message'],
          apiResponse,
        )}`,
      );
    }
  };

  /**
   * Getting pagination data when reached end of screen
   */
  const onEndReached = () => {
    getBoostrData();
  };

  /**
   * Boostr list item
   */
  const renderBoostrList = (item: BoostrType) => {
    return path(['extraItem'], item) ? (
      <View style={styles.extraComponentStyle} />
    ) : (
      <View style={[styles.listItemContainerStyle, styles.shadowStyle]}>
        <View style={styles.part1ContainerStyle}>
          <FastImageModified
            url={item.userImageUrl}
            style={styles.userImageStyle}
            defaultImage={images.user}
          />

          <View>
            <Text preset={TextPresetStyles.SUB_HEADLINE} text={item.userName} />
            <Text
              preset={TextPresetStyles.CAPTION_2}
              style={styles.dateTextStyle}
              text={getDateAndTimeElapsed(
                new Date(item.createdDateTime).getTime(),
              )}
            />
          </View>
        </View>
        <Text preset={TextPresetStyles.DESCRIPTION} text={item.message} />

        {item.boostrImageUrl && (
          <FastImageModified
            url={item.boostrImageUrl}
            style={styles.boostrImageStyle}
            defaultImage={images.defaultImage}
          />
        )}

        <View style={styles.bottomButtonContainerStyle}>
          <TouchableOpacity
            style={styles.bottomButtonItemStyle}
            onPress={() => onLikePress(item._id)}>
            <Icon
              icon={ICON_TYPES.THUMB_UP}
              style={{...styles.buttonIconStyle, tintColor: getPrimaryColor()}}
            />
            <Text
              preset={TextPresetStyles.CAPTION_3}
              style={styles.buttonTextStyle}
              text={`${path(['totalLikes'], item) || 0}` || '0'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bottomButtonItemStyle}
            onPress={() => showCommentToggleClick(item._id)}>
            <Icon
              icon={ICON_TYPES.MESSAGE}
              style={{...styles.buttonIconStyle, tintColor: getPrimaryColor()}}
            />
            <Text
              preset={TextPresetStyles.CAPTION_3}
              style={styles.buttonTextStyle}
              text={`${path(['totalComments'], item) || 0}` || '0'}
            />
          </TouchableOpacity>
        </View>

        {path(['isChatWindowOpen'], item) && (
          <BoostrCommentComponent
            id={item._id}
            totalComments={item.totalComments}
            isTeamChat={isTeamChat}
          />
        )}
      </View>
    );
  };

  const isLoading = store.getState().apiReducer.loading;
  return (
    <BoostrScreen
      navigation={navigation}
      headerRightComponentType={HeaderRightComponentType.ICON_TEXT}
      rightComponentIcon={ICON_TYPES.ADD}
      rightComponentText={translate('common.post')}
      onRightComponentClick={() =>
        isTeamChat
          ? navigation.navigate(SCREEN_ROUTES.SEND_CHAT_SCREEN, {
              teamId: path(['route', 'params', 'id'], props),
            })
          : navigation.navigate(SCREEN_ROUTES.SEND_BOOSTR, {
              challengeId: path(['route', 'params', 'id'], props),
            })
      }
      headerType={HeaderTypes.NORMAL_BACK}
      title={path(['route', 'params', 'screenName'], props)}>
      {boostrData && boostrData.length ? (
        <KeyboardAvoidingView behavior={'position'}>
          <FlatList
            data={boostrData}
            renderItem={({item}) => renderBoostrList(item)}
            onEndReachedThreshold={0.8}
            onEndReached={onEndReached}
            style={styles.boostrDataListStyle}
            ListFooterComponent={() => (
              <PaginationLoaderComponent
                isDataLoading={isDataLoading}
                challengesData={['1']}
              />
            )}
          />
        </KeyboardAvoidingView>
      ) : isLoading || isDataLoading ? null : (
        <View>
          <Text
            preset={TextPresetStyles.FOOT_NOTE}
            style={styles.noDataTextStyle}
            tx={'common.noBoostrData'}
          />

          <Button
            onPress={() => {
              isTeamChat
                ? navigation.navigate(SCREEN_ROUTES.SEND_CHAT_SCREEN, {
                    teamId: path(['route', 'params', 'id'], props),
                  })
                : navigation.navigate(SCREEN_ROUTES.SEND_BOOSTR, {
                    challengeId: path(['route', 'params', 'id'], props),
                  });
            }}
            preset={ButtonPreset.EXTRA_SMALL}
            text={translate('common.post')}
          />
        </View>
      )}
    </BoostrScreen>
  );
};

function mapStateToProps(state: any) {
  return {
    user: state.userReducer.user,
  };
}

export const BoostrMainComponent = connect(mapStateToProps, {})(BoostrMain);
