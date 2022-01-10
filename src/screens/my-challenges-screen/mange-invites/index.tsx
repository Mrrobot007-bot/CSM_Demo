import {path} from 'ramda';
import {View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/core';
import {SwipeListView} from 'react-native-swipe-list-view';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {
  images,
  showMessage,
  defaultAlert,
  MANAGE_INVITES_TYPES,
} from '../../../utility';
import {color} from '../../../theme';
import {translate} from '../../../i18n';
import {
  HeaderTypes,
  BoostrScreen,
  HeaderRightComponentType,
} from '../../../components/boostr-screen';
import {SendInvites} from './send-invites';
import {Icon} from '../../../components/icon';
import {wpx} from '../../../utility/responsive';
import {API_URLS} from '../../../services/urls';
import {ManageInvitesStyles as styles} from './styles';
import {STATUS_CODES} from '../../../services/status-codes';
import {ICON_TYPES} from '../../../components/icon/constants';
import {Text, TextPresetStyles} from '../../../components/text';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import {FastImageModified} from '../../../components/fast-image-modified';
import {deleteApiCall, postApiCall} from '../../../services/api-services';
import {DefaultDropDownPicker} from '../../../components/drop-down-picker';
import {ManageInvitesListType} from '../../../utility/object-types/challenge';

/**
 * An Interface for possible props for the ManageInvites Screen
 */
interface IManageInvitesProps {
  /**
   * Prop used to provide the navigation stuff
   */
  navigation: any;

  /**
   * Prop used to provide the stuff data which send on screen
   */
  route: any;
}
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
 * ManageInvitesScreen - A screen used to manage invites for challenges
 */
export const ManageInvitesScreen: React.FC<IManageInvitesProps> = (
  props: IManageInvitesProps,
) => {
  const userReducer = useSelector((state: RootStateOrAny) => state.userReducer);
  const dispatch = useDispatch();
  const [isTeamChallenge] = useState(
    props.route.params.isTeamChallenge || false,
  );
  const [manageData, setManageData] = useState([]);
  const [isPickerOpened, setIsPickerOpened] = useState(false);
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const [challengeId] = useState(props.route.params.challengeId);
  const [selectedType, setSelectedType] = useState(MANAGE_INVITES_TYPES.ALL);

  useEffect(() => {
    getManageInviteList(selectedType);
  }, []);

  const onSelectValue = (text: any) => {
    setSelectedType(text);
    const aa = ManageTypes.find(item => item.value === text);
    if (text !== null && text !== '' && aa) {
      getManageInviteList(text);
    }
  };

  const getManageInviteList = async (selectedItem: string) => {
    const status =
      selectedItem.toLowerCase() === ManageTypes[0].value.toLowerCase()
        ? null
        : selectedItem;

    let parameters = {
      challenge_id: challengeId,
      status: status,
    };

    console.log('manageInvitesRequest==>', parameters);
    try {
      const apiResponse = await dispatch(
        postApiCall(
          isTeamChallenge
            ? API_URLS.MANAGE_TEAM_INVITE
            : API_URLS.MANAGE_INVITE,
          parameters,
        ),
      );
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        let data: Array<ManageInvitesListType> =
          path(['data'], apiResponse) || [];
        console.log('manageInvitesResponse==>', JSON.stringify(data));

        data = data.filter(
          item =>
            path(['user_id'], item) !== path(['user', '_id'], userReducer),
        );

        data = data.map(item => {
          return {
            ...item,
            name: isTeamChallenge
              ? path(['teamName'], item)
              : `${path(['user_firstName'], item)} ${path(
                  ['user_lastName'],
                  item,
                )}`,
            user_profile_pic: isTeamChallenge
              ? path(['teamImage'], item)
              : path(['user_profile_pic'], item),
            user_id: isTeamChallenge
              ? path(['team_id'], item)
              : path(['user_id'], item),
          };
        });
        setManageData(data);
      } else {
        setManageData([]);
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };

  const removeInvites = async (item: Array<ManageInvitesListType>) => {
    let parameters = isTeamChallenge
      ? {
          challenge_id: path(['item', 'challenge_id'], item),
          team_id: path(['item', 'user_id'], item),
        }
      : {
          challenge_id: path(['item', 'challenge_id'], item),
          user_id: path(['item', 'user_id'], item),
        };
    try {
      const apiResponse = await dispatch(
        deleteApiCall(API_URLS.DELETE_INVITE, parameters),
      );
      console.log('manageInvitesRemove===>', parameters);
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        getManageInviteList(selectedType);
        showMessage(translate('modules.myChallenges.removed'));
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
            <Text preset={TextPresetStyles.SUB_HEADLINE} text={item.name} />
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
      onRightComponentClick={() => setShouldShowModal(true)}
      headerType={useIsFocused() ? HeaderTypes.NORMAL_BACK : HeaderTypes.NONE}
      title={translate('modules.myChallenges.manageInvites')}>
      <View style={styles.mainContainerStyle}>
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
            isTeamChallenge
              ? `${manageData.length} ${translate('common.team')}`
              : `${
                  manageData.length +
                  (selectedType === MANAGE_INVITES_TYPES.ALL ? 1 : 0)
                } ${translate('common.people')}`
          }`}
        />
        {!isTeamChallenge &&
          (selectedType === MANAGE_INVITES_TYPES.ALL ||
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
          renderHiddenItem={(data: any) => (
            <View style={styles.hideDetailsViewContainer}>
              <View style={styles.hideDetailsInnerView}>
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
          )}
          rightOpenValue={wpx(-65)}
        />
      </View>

      <SendInvites
        isTeamChallenge={isTeamChallenge}
        setShouldShowModal={setShouldShowModal}
        shouldShowModal={shouldShowModal}
        challengeId={challengeId}
        getManageInviteList={() => getManageInviteList(selectedType)}
      />
    </BoostrScreen>
  );
};
