import {path} from 'ramda';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import React, {useState} from 'react';
import {View} from 'react-native-animatable';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';

import {translate} from '../../../i18n';
import {Icon} from '../../../components/icon';
import {API_URLS} from '../../../services/urls';
import {color, spacingPresets} from '../../../theme';
import {STATUS_CODES} from '../../../services/status-codes';
import {ICON_TYPES} from '../../../components/icon/constants';
import {getApiCall, postApiCall} from '../../../services/api-services';
import {BoostrCommentType} from '../../../utility/object-types/challenge';
import {FastImageModified} from '../../../components/fast-image-modified';
import {getTimeElapsed, images, showMessage, socket} from '../../../utility';
import {AppTextStyles, Text, TextPresetStyles} from '../../../components/text';
import {BoostrCommentComponentStyles as styles} from './boostr-component-comment-styles';

/**
 * An Interface for possible props for the Boostr Comment Component
 */
interface IBoostrCommentComponentProps {
  /**
   * Prop used to provide the id for boostr or team chat
   */
  id: string;

  /**
   * Prop used to determine its a team chat or user chat
   */
  isTeamChat?: boolean;

  /**
   * Prop used to provide the count of total comments
   */
  totalComments: number;
}

/**
 * BoostrCommentComponent - Used as a platform to render the chat list and a way to add a new chat
 */
export const BoostrCommentComponent: React.FC<IBoostrCommentComponentProps> = (
  props: IBoostrCommentComponentProps,
) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [boostrComments, setBoostrComments] = useState<
    Array<BoostrCommentType>
  >([]);
  const [updatedComment, setUpdatedComment] = useState(null);
  const [textInputHeight, setTextInputHeight] = useState(40);
  const [totalComments, setTotalComments] = useState(props.totalComments);
  const userReducer = useSelector((state: RootStateOrAny) => state.userReducer);

  React.useEffect(() => {
    if (props.isTeamChat) {
      getTeamComments();
      getTeamCommentsBySocket();
    } else {
      getComments();
      getCommentsBySocket();
    }
  }, []);

  React.useEffect(() => {
    setTotalComments(props.totalComments);
  }, [props.totalComments]);

  /**
   * Adding a new comment if any new entry
   */
  React.useEffect(() => {
    if (updatedComment !== null) {
      const isCommentAlreadyThere = boostrComments.find(
        item => path(['_id'], item) === path(['_id'], updatedComment),
      );
      if (!isCommentAlreadyThere) {
        let items = [updatedComment, ...boostrComments];
        items = items.filter(item => {
          const message: string = path(['message'], item) || null;
          if (message !== null && message.trim() !== '') {
            return item;
          } else {
            return null;
          }
        });
        setBoostrComments(items);
      }
      setUpdatedComment(null);
    }
  }, [updatedComment]);

  /**
   * Getting user comment data by socket
   */
  const getCommentsBySocket = () => {
    socket().emit('boostrComment', {
      boostrId: props.id,
    });

    socket().on('boostrComment_' + props.id, function (data) {
      let newComment = path(['data'], data);
      newComment = newComment
        ? {
            userId: path(['user_id'], newComment) || null,
            userName: path(['userFirstName'], newComment) || null,
            _id: path(['_id'], newComment) || null,
            userImageUrl: path(['userProfilePic'], newComment) || null,
            message: path(['comment'], newComment) || null,
            addedDateTime: path(['createdAt'], newComment) || null,
          }
        : null;
      setUpdatedComment(newComment);
    });
  };

  /**
   * Getting team chat comment data by socket
   */
  const getTeamCommentsBySocket = () => {
    socket().on('chatComment_' + props.id, function (data) {
      let newComment = path(['data'], data);
      newComment = newComment
        ? {
            userId: path(['user_id'], newComment) || null,
            userName: path(['userFirstName'], newComment) || null,
            _id: path(['_id'], newComment) || null,
            userImageUrl: path(['userProfilePic'], newComment) || null,
            message: path(['comment'], newComment) || null,
            addedDateTime: path(['createdAt'], newComment) || null,
          }
        : null;
      setUpdatedComment(newComment);
    });
  };

  /**
   * Getting user comments list by api
   */
  const getComments = async () => {
    setIsLoading(true);
    const parameters = {
      pageNo: pageNumber,
      limit: 10,
      boostrId: props.id,
    };
    const apiResponse = await dispatch(
      postApiCall(API_URLS.CHALLENGE_BOOSTR_COMMENT_LIST, parameters),
    );
    setIsLoading(false);
    try {
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        const data: Array<any> = path(['data'], apiResponse) || [];
        ``;
        let updatedData: Array<BoostrCommentType> = data.map(boostr => {
          return {
            userId: path(['user_id'], boostr) || null,
            userName: path(['userFirstName'], boostr) || null,
            _id: path(['_id'], boostr) || null,
            userImageUrl: path(['userProfilePic'], boostr) || null,
            message: path(['comment'], boostr) || null,
            addedDateTime: path(['createdAt'], boostr) || null,
          };
        });

        updatedData = updatedData.filter(item => {
          const message: string = path(['message'], item) || null;
          if (message !== null && message.trim() !== '') {
            return item;
          } else {
            return null;
          }
        });

        updatedData = updatedData.filter(item => {
          const isItemFound = boostrComments.find(
            oldItem => path(['_id'], item) === path(['_id'], oldItem),
          );
          return isItemFound ? null : item;
        });

        if (updatedData && updatedData.length) {
          setPageNumber(pageNumber + 1);
          setBoostrComments([...boostrComments, ...updatedData]);
        }
      } else {
        showMessage(path(['message'], apiResponse));
      }
    } catch (e) {
      showMessage(e.message);
    }
  };

  /**
   * Getting team comments list by api
   */
  const getTeamComments = async () => {
    setIsLoading(true);
    const apiResponse = await dispatch(
      getApiCall(
        `${API_URLS.COMMENT_CHAT_LIST}?chat_id=${
          props.id
        }&pageNo=${pageNumber}&limit=${10}`,
      ),
    );
    setIsLoading(false);
    try {
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        const data: Array<any> = path(['data'], apiResponse) || [];
        let updatedData: Array<BoostrCommentType> = data.map(boostr => {
          return {
            userId: path(['user_id'], boostr) || null,
            userName: path(['userFirstName'], boostr) || null,
            _id: path(['_id'], boostr) || null,
            userImageUrl: path(['userProfilePic'], boostr) || null,
            message: path(['comment'], boostr) || null,
            addedDateTime: path(['createdAt'], boostr) || null,
          };
        });
        updatedData = updatedData.filter(item => {
          const message: string = path(['message'], item) || null;
          if (message !== null && message.trim() !== '') {
            return item;
          } else {
            return null;
          }
        });

        updatedData = updatedData.filter(item => {
          const isItemFound = boostrComments.find(
            oldItem => path(['_id'], item) === path(['_id'], oldItem),
          );
          return isItemFound ? null : item;
        });

        if (updatedData && updatedData.length) {
          setPageNumber(pageNumber + 1);
          setBoostrComments([...boostrComments, ...updatedData]);
        }
      } else {
        showMessage(path(['message'], apiResponse));
      }
    } catch (e) {
      showMessage(e.message);
    }
  };

  /**
   * Action on send click on comment
   */
  const onSendCommentClick = async (text: string) => {
    setComment(null);
    const parameters = props.isTeamChat
      ? {chat_id: props.id, comment: comment}
      : {boostr_id: props.id, comment: comment};
    const apiResponse = await dispatch(
      postApiCall(
        props.isTeamChat ? API_URLS.COMMENT_CHAT : API_URLS.COMMENT_BOOSTR,
        parameters,
        false,
      ),
    );
    if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
    } else if (path(['statusCode'], apiResponse) === STATUS_CODES.BAD_REQUEST) {
      setComment(text);
      showMessage(`Error! : ${path(['message'], apiResponse)}`);
    } else {
      setComment(text);
      showMessage(`Error! : ${path(['message'], apiResponse)}`);
    }
  };

  /**
   * Comment list item
   */
  const renderBoostrComment = (item: BoostrCommentType) => {
    return (
      <View>
        <View style={styles.itemMainContainerStyle}>
          <FastImageModified
            url={item.userImageUrl}
            style={styles.userImageStyle}
            defaultImage={images.user}
          />

          <View>
            <View style={styles.userNameContainerStyle}>
              <Text preset={TextPresetStyles.FOOT_NOTE_BOLD}>
                {item.userName}
              </Text>

              <Text
                preset={TextPresetStyles.CAPTION_2}
                style={{
                  color: color.palette.grey9,
                  marginLeft: spacingPresets.tiny,
                }}>
                {getTimeElapsed(new Date(item.addedDateTime).getTime())}
              </Text>
            </View>
            <Text preset={TextPresetStyles.FOOT_NOTE}>{item.message}</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View>
      <View style={styles.firstRowContainerStyle}>
        <FastImageModified
          url={path(['user', 'profilePic'], userReducer)}
          style={styles.userImageStyle}
          defaultImage={images.user}
        />

        <View style={styles.userCommentBoxContainerStyle}>
          <TextInput
            multiline
            value={comment}
            maxLength={100}
            onChangeText={setComment}
            onContentSizeChange={event => {
              setTextInputHeight(event.nativeEvent.contentSize.height);
            }}
            placeholder={translate('common.writeAComment')}
            style={[
              AppTextStyles.footNote,
              styles.writeACommentTextStyle,
              {
                height: Math.max(42, textInputHeight),
                paddingTop: 14,
                marginLeft: 10,
              },
            ]}
            placeholderTextColor={color.palette.grey5}
          />
        </View>
        {comment && comment.trim() !== '' ? (
          <Icon
            icon={ICON_TYPES.SEND}
            style={styles.sendIconStyle}
            onIconClick={() => onSendCommentClick(comment)}
          />
        ) : null}
      </View>

      {!isLoading && totalComments > boostrComments.length && (
        <TouchableOpacity
          onPress={props.isTeamChat ? getTeamComments : getComments}
          style={styles.loadMoreContainerStyle}>
          <Text
            preset={TextPresetStyles.CAPTION_2}
            style={styles.loadMoreTextStyle}
            tx={'common.loadMore'}
          />
          <Icon icon={ICON_TYPES.SYNC} style={styles.loadMoreIconStyle} />
        </TouchableOpacity>
      )}
      <FlatList
        data={boostrComments}
        renderItem={({item}) => renderBoostrComment(item)}
        extraData={[boostrComments]}
      />
    </View>
  );
};
