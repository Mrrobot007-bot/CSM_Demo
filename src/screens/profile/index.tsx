import {path} from 'ramda';
import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/core';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import {
  images,
  defaultAlert,
  SCREEN_ROUTES,
  getPrimaryColor,
} from '../../utility';
import {color} from '../../theme';
import {translate} from '../../i18n';
import {
  HeaderTypes,
  BoostrScreen,
  HeaderRightComponentType,
} from '../../components/boostr-screen';
import {
  UserType,
  streaksType,
  myTeamDataType,
} from '../../utility/object-types/user';
import {Icon} from '../../components/icon';
import {API_URLS} from '../../services/urls';
import {ProfileScreenStyle as styles} from './styles';
import {getApiCall} from '../../services/api-services';
import {STATUS_CODES} from '../../services/status-codes';
import {SectionTitle} from '../../components/section-title';
import {ICON_TYPES} from '../../components/icon/constants';
import {Text, TextPresetStyles} from '../../components/text';
import {FastImageModified} from '../../components/fast-image-modified';

/**
 * An Interface for possible props for the profile screen component
 */
interface IProfileScreenProps {
  /**
   * Navigation prop used to set the navigation stuff in the
   * component like, go back, move to other screen, etc.
   */
  navigation: any;
  /**
   * props to get user if for the profile
   */
  userId: string;

  /**
   * props to get route data
   */
  route: string;
}

/**
 * ProfileScreen - A screen to Show the profile details of the selected user
 */
export const ProfileScreen = (props: IProfileScreenProps) => {
  const userId: string = path(['route', 'params', 'userId'], props) || null;
  const user: UserType = useSelector(
    (state: RootStateOrAny) => state.userReducer,
  ).user;
  const [userProfile, setUserProfile] = useState([]);
  const [profile, setProfile] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [streaks, setStreaks] = useState([]);
  const [currentActivity, setCurrentActivity] = useState([]);
  const [myTeam, setMyTeam] = useState([]);
  const dispatch = useDispatch();
  const [userMessage, setUserMessage] = useState('');
  const apiReducer = useSelector((state: RootStateOrAny) => state.apiReducer);

  /**'
   * function to load the team profile
   */
  useEffect(() => {
    getProfile();
  }, []);

  /**
   * function to get profile details
   */
  const getProfile = async () => {
    const url = `${API_URLS.GET_PROFILE}?orgId=${user.organisationId[0]._id}&userId=${userId}`;
    try {
      let apiResponse = await dispatch(
        getApiCall(url, props.navigation, getProfile, true),
      );
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        console.log('apiResponseProfile===>', JSON.stringify(apiResponse));
        let profile: Array<Object> = path(['data'], apiResponse || []);
        setProfile(profile);
        if (profile.length != 0) {
          let data: Array<UserType> = path(
            ['data', 'userProfile'],
            apiResponse || [],
          );
          let currentActivity: Array<string> = path(
            ['data', 'currentActivity'],
            apiResponse || [],
          );
          let streaks: Array<streaksType> = path(
            ['data', 'Streaks'],
            apiResponse || [],
          );
          let teamMembership: Array<myTeamDataType> = path(
            ['data', 'myTeams'],
            apiResponse || [],
          );
          setMyTeam(teamMembership);
          setCurrentActivity(currentActivity);
          setUserProfile(data);
          setBio(path(['bio'], data));
          setFirstName(path(['firstName'], data));
          setLastName(path(['lastName'], data));
          setStreaks(streaks);
        } else {
          setUserMessage(path(['message'], apiResponse));
        }
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };

  /**
   * function to show rewards
   * @param n
   * @returns
   */
  const rewardsView = (n: number) => {
    return [...Array(n)].map((elementInArray, index) => (
      <Icon
        icon={ICON_TYPES.REWARD_MEDAL_FILLED}
        style={styles.rewardContainer}
      />
    ));
  };

  /**
   *
   * @returns  streaks view in the profile
   */
  const streaksView = () => {
    const floatingPart = streaks?.length % 10;
    const integerPart = Math.floor(streaks?.length / 10) * 10;
    return (
      <View style={styles.flexRow}>
        {integerPart == 0 ? null : (
          <View style={styles.rewardsNumberViewContainer}>
            <Icon
              icon={ICON_TYPES.REWARD_MEDAL_FILLED}
              style={styles.rewardIconStyle}
            />
            <View style={styles.rewardsNumberView}>
              <Text
                preset={TextPresetStyles.MINI_COUNT}
                style={styles.yellowText}
                text={`${integerPart}`}
              />
            </View>
          </View>
        )}
        {rewardsView(floatingPart)}
      </View>
    );
  };

  const currentActivitiesList = currentActivity.filter(item => item.name);

  return (
    <BoostrScreen
      navigation={props.navigation}
      headerRightComponentType={HeaderRightComponentType.ICON_TEXT}
      headerType={useIsFocused() ? HeaderTypes.LONG_BACK : HeaderTypes.NONE}
      customTitleViewStyle={styles.profileImageContainerStyle}
      headerBottomImage={
        profile.length != 0 ? (
          <FastImageModified
            url={path(['profilePic'], userProfile)}
            style={styles.profileImage}
            defaultImage={images.user}
          />
        ) : null
      }
      title={translate('modules.profile.title')}>
      {!apiReducer.loading &&
        (profile.length != 0 ? (
          <ScrollView style={styles.mainContainerStyle}>
            <View style={styles.userNameTextStyle}>
              <Text
                preset={TextPresetStyles.TITLE_BOLD}
                text={`${firstName} ${lastName}`}
              />
            </View>

            <View style={styles.bioTextStyle}>
              <Text preset={TextPresetStyles.SUB_HEADLINE_REGULAR} text={bio} />
            </View>

            <SectionTitle tx={'modules.profile.currentActivities'} />

            {currentActivitiesList.length <= 0 ? (
              <View style={styles.noCurrentActivates}>
                <Text
                  preset={TextPresetStyles.FOOT_NOTE_BOLD}
                  tx={'modules.profile.noCurrentActivity'}
                />
              </View>
            ) : (
              <View style={styles.currentActivates}>
                {currentActivitiesList.map((item, index) => {
                  return (
                    <View style={styles.activityView}>
                      <Text
                        preset={TextPresetStyles.FOOT_NOTE_BOLD}
                        style={{color: color.palette.lightYellow}}
                        text={item.name}
                      />
                    </View>
                  );
                })}
              </View>
            )}
            <SectionTitle tx={'modules.profile.streaks'} />
            <View style={styles.steaksMainView}>
              <View style={styles.steaksMainTextView}>
                {streaks?.length != 0 ? (
                  <Text
                    preset={TextPresetStyles.FOOT_NOTE_BOLD}
                    text={`${streaks?.length} ${translate(
                      'modules.profile.weekStreak',
                    )}`}
                  />
                ) : (
                  <Text
                    preset={TextPresetStyles.FOOT_NOTE_BOLD}
                    tx={'modules.profile.noStreak'}
                  />
                )}
              </View>
              <View style={styles.noSteaksMainTextView}>
                {streaks?.length != 0 ? (
                  <View style={styles.flexRow}>{streaksView()}</View>
                ) : (
                  <Text
                    preset={TextPresetStyles.TITLE_CIRCULAR_BOLD}
                    style={{color: getPrimaryColor()}}
                    tx={'modules.profile.workingOnIt'}
                  />
                )}
              </View>
            </View>
            <SectionTitle tx={'modules.profile.teamMembership'} />

            {myTeam.length == 0 ? (
              <View style={styles.noTeamView}>
                <Text
                  preset={TextPresetStyles.FOOT_NOTE_BOLD}
                  tx={'modules.profile.currentActivities'}
                />
              </View>
            ) : (
              <View style={styles.alignCenter}>
                <FlatList
                  data={myTeam}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item}) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          props.navigation.navigate(
                            SCREEN_ROUTES.TEAM_PROFILE,
                            {teamId: item._id},
                          );
                        }}
                        style={styles.teamMemberMainView}>
                        <View style={styles.teamImageTextContainer}>
                          <FastImageModified
                            url={item.image}
                            style={styles.teamImageStyle}
                            defaultImage={images.defaultImage_2}
                          />
                          <View style={styles.teamTextContainer}>
                            <View style={styles.flexRow}>
                              <Text
                                preset={TextPresetStyles.FOOT_NOTE_BOLD}
                                text={item.name}
                              />
                              {path(['isDefault'], item) ? (
                                <Icon
                                  icon={ICON_TYPES.MY_CREATE_TEAM}
                                  style={{
                                    ...styles.myCreatedTeamImageStyle,
                                    tintColor: getPrimaryColor(),
                                  }}
                                />
                              ) : null}
                            </View>

                            <Text
                              preset={TextPresetStyles.CAPTION_2}
                              style={{color: color.textInputPlaceHolderText}}
                              text={
                                item.close
                                  ? translate('modules.profile.closed')
                                  : translate('modules.profile.open')
                              }
                            />
                          </View>
                        </View>

                        <View style={styles.rightArrowContainerView}>
                          <Icon
                            icon={ICON_TYPES.ARROW_RIGHT}
                            style={styles.rightArrowStyle}
                          />
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            )}
            <View style={styles.boostrDummy} />
          </ScrollView>
        ) : (
          <View style={styles.userMessageView}>
            <Text
              preset={TextPresetStyles.TITLE_CIRCULAR_BOLD}
              style={{color: getPrimaryColor()}}
              text={userMessage}
            />
          </View>
        ))}
    </BoostrScreen>
  );
};
