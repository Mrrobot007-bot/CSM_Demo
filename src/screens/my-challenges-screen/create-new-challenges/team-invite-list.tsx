import {
  View,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {path} from 'ramda';
import {useDispatch} from 'react-redux';
import React, {useCallback, useState} from 'react';

import {color} from '../../../theme';
import {translate} from '../../../i18n';
import {
  FormTextInput,
  TextInputPreset,
} from '../../../components/form-text-input';
import {Icon} from '../../../components/icon';
import {API_URLS} from '../../../services/urls';
import {RelayChallengesStyles as styles} from './styles';
import {store} from '../../../redux/store/configureStore';
import {postApiCall} from '../../../services/api-services';
import {STATUS_CODES} from '../../../services/status-codes';
import {ICON_TYPES} from '../../../components/icon/constants';
import {Text, TextPresetStyles} from '../../../components/text';
import {FastImageModified} from '../../../components/fast-image-modified';
import {InviteListType} from '../../../utility/object-types/auth-response';
import {defaultAlert, getPrimaryColor, images, isIos} from '../../../utility';

/**
 * An Interface for possible props for the TeamInviteList component
 */
interface ITeamInviteListProps {
  /**
   * Prop used to provide info that, this is a edit mode or create mode
   */
  isUpdateMode: boolean;

  /**
   * Prop used to provide the callback to set list of choose teams to invite
   */
  setInviteListId: (item: Array<any>) => void;
}

/**
 * TeamInviteList - A component used to render a view where user
 * can invite teams to join challenge
 */
export const TeamInviteList: React.FC<ITeamInviteListProps> = (
  props: ITeamInviteListProps,
) => {
  const [inviteList, setInviteList] = useState([]);
  const [inviteListSelected, setInviteListSelected] = useState([]);
  const [inviteListId, setInviteListId] = useState([]);
  const [text, setText] = useState('');
  const [up, setUp] = useState(false);

  const onSetInviteListId = (item: any) => {
    setInviteListId(item);
    props.setInviteListId(item);
  };

  const dispatch = useDispatch();
  const getSuggestions = useCallback(async q => {
    setText(q);
    let parameters = {
      searchKey: q,
    };
    try {
      let apiResponse = await dispatch(
        postApiCall(API_URLS.TEAM_INVITES_LIST, parameters),
      );
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        let data: Array<InviteListType> = path(['data'], apiResponse);
        if (inviteListId[0] && inviteListId[0] != undefined) {
          var arr = data.filter(function (item) {
            return inviteListId.indexOf(item._id) === -1;
          });

          const teamData = arr.map(item => {
            return {
              ...item,
              profilePic: path(['image'], item),
              fullName: path(['name'], item),
            };
          });
          setInviteList(teamData);
        } else {
          const teamData = data.map(item => {
            return {
              ...item,
              profilePic: path(['image'], item),
              fullName: path(['name'], item),
            };
          });
          setInviteList(teamData);
        }
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  }, []);

  const onInviteSelect = (item: any) => {
    let newArray: Array<Object> = [];
    let newArrayID: Array<Object> = [];
    newArray = inviteListSelected;
    newArrayID = inviteListId;

    newArrayID.push(item.item._id);
    newArray.push(item);
    setInviteListSelected(newArray);
    onSetInviteListId(newArrayID);
    setInviteList([]);
  };

  const onInviteRemove = (item: any) => {
    let newArray: Array<any> = [];
    let newArrayID: Array<Object> = [];
    newArray = inviteListSelected;
    newArrayID = inviteListId;

    for (var i = newArray.length - 1; i >= 0; i--) {
      if (newArray[i].item._id === item.item.item._id) {
        newArray.splice(i, 1);
        newArrayID.splice(i, 1);
      }
    }
    setInviteListSelected(newArray);
    onSetInviteListId(newArrayID);
    setUp(!up);
  };

  const renderInviteList = (item: any) => {
    return (
      <TouchableOpacity
        onPress={() => onInviteSelect(item)}
        style={[
          styles.inviteListMainView,
          {
            backgroundColor:
              item.index === 0 ? color.palette.grey11 : color.palette.white,
          },
        ]}>
        <FastImageModified
          url={path(['item', 'profilePic'], item)}
          style={styles.inviteUserImageView}
          defaultImage={images.user}
        />
        <View style={styles.inviteUserViewStyle}>
          {path(['item', 'fullName'], item) && (
            <Text
              preset={TextPresetStyles.CAPTION_2}
              text={`${item.item.fullName}`}
            />
          )}
          {path(['item', 'email'], item) && (
            <Text
              preset={TextPresetStyles.CAPTION_2}
              style={styles.inviteUserEmailStyle}
              text={`${'('} ${item.item.email} ${')'} `}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderSelectInviteList = (item: any) => {
    return (
      <View
        style={[
          styles.selectedInviteListViewContainer,
          {backgroundColor: getPrimaryColor(0.05)},
        ]}>
        <View style={styles.selectedInviteView}>
          <FastImageModified
            url={path(['item', 'item', 'profilePic'], item)}
            style={styles.inviteUserImageView}
            defaultImage={images.user}
          />

          <View style={styles.inviteUserViewStyle}>
            {path(['item', 'item', 'fullName'], item) && (
              <Text
                preset={TextPresetStyles.CAPTION_2}
                text={`${item.item.item.fullName}`}
              />
            )}
            {path(['item', 'item', 'email'], item) && (
              <Text
                preset={TextPresetStyles.CAPTION_2}
                style={styles.inviteUserEmailStyle}
                text={`${'('} ${item.item.item.email} ${')'} `}
              />
            )}
          </View>
        </View>
        <Icon
          onIconClick={() => onInviteRemove(item)}
          icon={ICON_TYPES.CLOSE}
          style={{...styles.removeIconStyle, tintColor: getPrimaryColor()}}
        />
      </View>
    );
  };

  const isLoading = store.getState().apiReducer.loading;
  return props.isUpdateMode ? null : (
    <View>
      <KeyboardAvoidingView behavior={isIos ? 'padding' : 'height'}>
        <FormTextInput
          onChangeText={getSuggestions}
          checkValidation
          topPlaceholderTx={'modules.myChallenges.inviteList'}
          inlinePlaceholderTx={'modules.myChallenges.search'}
          topPlaceholderTextColor={color.textInputPlaceHolderText}
          preset={TextInputPreset.SEARCH}
          style={styles.inviteSearchView}
        />
      </KeyboardAvoidingView>
      {text && text !== '' && inviteList.length > 0 ? (
        <View style={styles.inviteListViewContainer}>
          <FlatList data={inviteList} renderItem={renderInviteList} />
        </View>
      ) : isLoading ||
        text === null ||
        text === '' ||
        inviteList.length <= 0 ? null : (
        <View style={styles.inviteListViewContainer}>
          <View
            style={[
              styles.inviteListMainView,
              {
                backgroundColor: color.palette.grey11,
              },
            ]}>
            <View style={styles.noDataViewStyle}>
              <Text
                preset={TextPresetStyles.CAPTION_5}
                tx={'common.noRecord'}
              />
            </View>
          </View>
        </View>
      )}

      <FlatList
        data={inviteListSelected}
        style={styles.selectedInviteListFlatView}
        renderItem={renderSelectInviteList}
      />
    </View>
  );
};
