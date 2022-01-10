import {path} from 'ramda';
import React, {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/core';
import {ListRenderItemInfo, View} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';

import {
  images,
  showMessage,
  defaultAlert,
  SCREEN_ROUTES,
  getPrimaryColor,
  MANAGE_INVITES_TYPES,
} from '../../../utility';
import {color} from '../../../theme';
import {translate} from '../../../i18n';
import {
  putApiCall,
  postApiCall,
  deleteApiCall,
} from '../../../services/api-services';
import {
  HeaderTypes,
  BoostrScreen,
  HeaderRightComponentType,
} from '../../../components/boostr-screen';
import {Icon} from '../../../components/icon';
import {API_URLS} from '../../../services/urls';
import {wpx} from '../../../utility/responsive';
import {ManageInvitesStyles as styles} from './styles';
import {STATUS_CODES} from '../../../services/status-codes';
import {ICON_TYPES} from '../../../components/icon/constants';
import {Text, TextPresetStyles} from '../../../components/text';
import {FastImageModified} from '../../../components/fast-image-modified';
import {DefaultDropDownPicker} from '../../../components/drop-down-picker';
import {ManageInvitesListType} from '../../../utility/object-types/challenge';

/**
 * An Interface for possible props for the manage Team component
 */
interface IManageTeamInvitesProps {
  /**
   * team ID props used to get get profile data
   */
  teamId: string;
  /**
   * Navigation prop used to set the navigation stuff in the
   * component like, go back, move to other screen, etc.
   */
  navigation: any;

  /**
   * Prop used to provide the stuff data which send on screen
   */
  route: any;

  /**
   * is used to get whether it is team challenge or not
   */
  isTeamChallenge?: boolean;
}

/**
 * Manage Types defined here
 */
const ManageTypes = [
  {
    label: translate('modules.myChallenges.all'),
    value: MANAGE_INVITES_TYPES.ALL,
  },
  {
    label: translate('modules.myChallenges.accepted'),
    value: MANAGE_INVITES_TYPES.ACCEPTED,
  },
  {
    label: translate('modules.myChallenges.waiting'),
    value: MANAGE_INVITES_TYPES.WAITING,
  },
  {
    label: translate('modules.myChallenges.declined'),
    value: MANAGE_INVITES_TYPES.DECLINED,
  },
  {
    label: translate('modules.myChallenges.joined'),
    value: MANAGE_INVITES_TYPES.JOINED,
  },
];

/**
 * ManageTeamInvitesScreen - screen is used manage team invites
 */
export const ManageTeamInvitesScreen: React.FC<IManageTeamInvitesProps> = (
  props: IManageTeamInvitesProps,
) => {
  const userReducer = useSelector((state: RootStateOrAny) => state.userReducer);
  const dispatch = useDispatch();
  const [manageData, setManageData] = useState([]);
  const [teamId] = useState(props.route.params.teamId);
  const [isPickerOpened, setIsPickerOpened] = useState(false);
  const [selectedType, setSelectedType] = useState(MANAGE_INVITES_TYPES.ALL);

  /**
   * used to load initial data of manage invites
   */
  useEffect(() => {
    getManageInviteList(selectedType);
  }, []);

  /**
   * function is used to handle drop down
   */
  const onSelectValue = (text: any) => {
    setSelectedType(text);
    const aa = ManageTypes.find(item => item.value === text);
    if (text !== null && text !== '' && aa) {
      getManageInviteList(text);
    }
  };

  /**
   * function is used mange invites
   */
  const getManageInviteList = async (selectedItem: string) => {
    const status =
      selectedItem.toLowerCase() === ManageTypes[0].value.toLowerCase()
        ? null
        : selectedItem;
    let parameters = {
      user_team_id: teamId,
      status: status,
    };
    try {
      const apiResponse = await dispatch(
        postApiCall(API_URLS.MANAGE_USER_TEAM_LIST, parameters),
      );
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        let data: Array<ManageInvitesListType> =
          path(['data'], apiResponse) || [];
        console.log('manageInvitesResponse==>', JSON.stringify(data));

        data = data.filter(
          item =>
            path(['user_id'], item) !== path(['user', '_id'], userReducer),
        );
        setManageData(data);
      } else {
        setManageData([]);
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };

  /**
   * function is used to remove member of Invites list
   */
  const removeInvites = async (item: ListRenderItemInfo<any>) => {
    let parameters = {
      user_id: item.item.user_id,
      user_team_id: teamId,
    };

    try {
      const apiResponse = await dispatch(
        deleteApiCall(API_URLS.DELETE_USER_FROM_TEAM, parameters),
      );
      console.log('manageInvitesRemove===>', parameters);
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        getManageInviteList(selectedType);
        showMessage(translate('modules.teams.removedSuccessfully'));
      } else {
        showMessage(translate('modules.errorMessages.somethingWentWrong'));
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };

  /**
   * function  is used to resent invites
   */
  const resentInvite = async (item: any) => {
    try {
      const URL = `${API_URLS.RESENT_TEAM_INVITE}?id=${item.item._id}`;
      const apiResponse = await dispatch(postApiCall(URL));
      console.log('resentInvitesRemove===>', URL);
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        getManageInviteList(selectedType);
        console.log('resentInviteRemove===>', apiResponse);
        showMessage(translate('modules.teams.inviteResentAgain'));
        getManageInviteList(selectedType);
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };

  /**
   *  function is used make or remove  from co-caption
   * @param item
   * @param type
   */

  const makeCoCaption = async (item: any, type: string) => {
    try {
      let parameters = {
        id: item.item._id,
        designation: type,
      };
      const apiResponse = await dispatch(
        putApiCall(API_URLS.CHANGE_DESIGNATION, parameters),
      );
      console.log('manageInvitesRemove===>', URL);
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        getManageInviteList(selectedType);
        console.log('manageInvitesRemove===>', apiResponse);
        showMessage(translate('modules.teams.madeCoCaptain'));
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };

  const renderItem = ({item}: any) => {
    return (
      <View style={styles.detailsViewContainer}>
        <View style={styles.detailsImageNameContainer}>
          <FastImageModified
            url={item.user_profile_pic}
            style={styles.profileImageStyle}
            defaultImage={images.user}
          />
          <View style={styles.textContainerStyle}>
            <Text
              preset={TextPresetStyles.SUB_HEADLINE}
              text={`${item.user_firstName} ${item.user_lastName}`}
            />
          </View>
        </View>

        <View style={styles.statusContainerStyle}>
          <Icon
            icon={
              item.status === MANAGE_INVITES_TYPES.DETAILS
                ? ICON_TYPES.PERSON_ICON
                : item.status === MANAGE_INVITES_TYPES.ACCEPTED
                ? ICON_TYPES.GREEN_TICK
                : item.status === MANAGE_INVITES_TYPES.WAITING
                ? ICON_TYPES.YELLOW_WATCH
                : item.status === MANAGE_INVITES_TYPES.DECLINED
                ? ICON_TYPES.RED_CROSS
                : item.status === MANAGE_INVITES_TYPES.JOINED
                ? ICON_TYPES.JOINED
                : null
            }
            style={styles.statusIconStyle}
          />
          <Text
            preset={TextPresetStyles.SUB_HEADLINE}
            style={styles.statusTextStyle}
            text={
              item.status === MANAGE_INVITES_TYPES.DETAILS
                ? null
                : item.status === MANAGE_INVITES_TYPES.ACCEPTED
                ? 'Accepted'
                : item.status === MANAGE_INVITES_TYPES.WAITING
                ? 'Waiting'
                : item.status === MANAGE_INVITES_TYPES.DECLINED
                ? 'Declined'
                : item.status === MANAGE_INVITES_TYPES.JOINED
                ? 'Joined'
                : null
            }
          />
        </View>
      </View>
    );
  };

  return (
    <BoostrScreen
      navigation={props.navigation}
      headerRightComponentType={HeaderRightComponentType.ICON_TEXT}
      rightComponentIcon={ICON_TYPES.ADD}
      rightComponentText={translate('modules.myChallenges.sendInvites')}
      onRightComponentClick={() =>
        props.navigation.navigate(SCREEN_ROUTES.SEND_TEAM_INVITE, {
          teamId: teamId,
        })
      }
      headerType={useIsFocused() ? HeaderTypes.NORMAL_BACK : HeaderTypes.NONE}
      title={translate('modules.myChallenges.manageInvites')}>
      <View
        style={[
          styles.mainContainerStyle,
          {backgroundColor: getPrimaryColor()},
        ]}>
        <DefaultDropDownPicker
          value={selectedType}
          isOpenPicker={isPickerOpened}
          setIsOpenPicker={item => setIsPickerOpened(item)}
          dropDownItems={ManageTypes}
          topPlaceholderTx={'modules.myChallenges.filter'}
          topPlaceholderTextColor={color.textInputPlaceHolderText}
          onSetValue={text => onSelectValue(text)}
          dropDownStyle={styles.dropDownContainerStyle}
        />

        <Text
          preset={TextPresetStyles.SUB_HEADLINE}
          style={styles.peopleCountTextStyle}
          text={`${
            manageData.length +
            (selectedType === MANAGE_INVITES_TYPES.ALL ? 1 : 0)
          } People`}
        />
        {(selectedType === null ||
          selectedType.toLowerCase() ===
            ManageTypes[0].value.toLowerCase()) && (
          <View style={styles.adminDetailsViewContainer}>
            <View style={styles.detailsImageNameContainer}>
              <FastImageModified
                url={path(['user', 'profilePic'], userReducer)}
                style={styles.profileImageStyle}
                defaultImage={images.user}
              />
              <View style={styles.textContainerStyle}>
                <Text
                  preset={TextPresetStyles.SUB_HEADLINE}
                  text={`${path(['user', 'firstName'], userReducer)} ${path(
                    ['user', 'lastName'],
                    userReducer,
                  )}`}
                />
              </View>
            </View>
            <Icon
              icon={ICON_TYPES.PERSON_ICON}
              style={styles.statusIconStyle}
            />
          </View>
        )}
        <SwipeListView
          data={manageData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          renderHiddenItem={(data, rowMap) => {
            console.log('Co_CaptionData===>', data);
            return (
              <View style={styles.hideDetailsViewContainer}>
                <View style={styles.hideDetailsInnerView}>
                  <View>
                    {data.item.status === MANAGE_INVITES_TYPES.DECLINED ? (
                      <TouchableOpacity
                        style={[
                          styles.removeButtonStyle,
                          {backgroundColor: getPrimaryColor()},
                        ]}
                        onPress={() => resentInvite(data)}>
                        <Icon
                          icon={ICON_TYPES.ENVELOPE_ICON}
                          style={styles.deleteIconStyle}
                        />
                        <Text
                          preset={TextPresetStyles.MINI_FONT}
                          style={styles.removeTextStyle}
                          tx={'common.resend'}
                        />
                      </TouchableOpacity>
                    ) : data.item.status === MANAGE_INVITES_TYPES.ACCEPTED &&
                      data.item.designation === 'member' ? (
                      <TouchableOpacity
                        style={[
                          styles.removeButtonStyle,
                          {backgroundColor: getPrimaryColor()},
                        ]}
                        onPress={() => makeCoCaption(data, 'co-captain')}>
                        <Icon
                          icon={ICON_TYPES.TICK_PERSON}
                          style={styles.deleteIconStyle}
                        />
                        <Text
                          preset={TextPresetStyles.MINI_FONT}
                          style={styles.removeTextStyle}
                          tx={'modules.teams.coCaptain'}
                        />
                      </TouchableOpacity>
                    ) : data.item.status === MANAGE_INVITES_TYPES.ACCEPTED &&
                      data.item.designation === 'co-captain' ? (
                      <TouchableOpacity
                        style={[
                          styles.removeButtonStyle,
                          {backgroundColor: getPrimaryColor()},
                        ]}
                        onPress={() => makeCoCaption(data, 'member')}>
                        <Icon
                          icon={ICON_TYPES.TICK_PERSON}
                          style={styles.deleteIconStyle}
                        />
                        <Text
                          preset={TextPresetStyles.MINI_FONT}
                          style={styles.removeTextStyle}
                          tx={'modules.teams.coCaptain'}
                        />
                      </TouchableOpacity>
                    ) : null}
                  </View>

                  <TouchableOpacity
                    style={styles.removeButtonStyle}
                    onPress={() => removeInvites(data)}>
                    <Icon
                      icon={ICON_TYPES.DELETE}
                      style={styles.deleteIconStyle}
                    />
                    <Text
                      preset={TextPresetStyles.MINI_FONT}
                      style={styles.removeTextStyle}
                      tx={'modules.myChallenges.remove'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
          rightOpenValue={wpx(-65)}
          leftOpenValue={wpx(65)}
        />
      </View>
    </BoostrScreen>
  );
};
