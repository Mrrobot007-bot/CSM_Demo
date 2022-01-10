import {path} from 'ramda';
import React, {useState} from 'react';

import {Icon} from '../../../components/icon';
import {
  images,
  kmToMiles,
  SCREEN_ROUTES,
  getPrimaryColor,
  isSelectedUnitKM,
  INFO_CONTENT_ID_TYPES,
  parseMillisecondsIntoReadableTime,
} from '../../../utility';
import {color} from '../../../theme';
import {translate} from '../../../i18n';
import {
  ChallengeType,
  TypeOfChallenges,
  ChallengeScreenTypes,
  TeamLeaderBoardItemType,
  UserLeaderBoardItemType,
} from '../../../utility/object-types/challenge';
import {TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {FlatList} from 'react-native-gesture-handler';
import {InfoComponent} from '../../../components/info';
import {ICON_TYPES} from '../../../components/icon/constants';
import {Text, TextPresetStyles} from '../../../components/text';
import {PercentageBar} from '../../../components/percentage-bar';
import {FastImageModified} from '../../../components/fast-image-modified';
import {TeamLeaderBoardStyles as styles} from './team-leader-board-styles';

/**
 * An Interface for possible props for the TeamLeaderBoard Component
 */
interface IChallengesProps {
  /**
   * Prop used to get the challenges item
   */
  challenge: ChallengeType;
}

/**
 * TeamLeaderBoardComponent - A component which used to render team
 * leaderboard in challenge component
 */
export const TeamLeaderBoardComponent: React.FC<IChallengesProps> = (
  props: IChallengesProps,
) => {
  const navigation = useNavigation();
  const [teamLeaderBoard, setTeamLeaderBoard] = useState(
    props.challenge.teamLeaderBoard.map(item => {
      return {
        ...item,
        isFocused: true,
      };
    }),
  );

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

  const renderTable = (item: TeamLeaderBoardItemType, index: number) => {
    let teamAverageKm = 0;
    let teamAverageBoostTime = 0;
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
        ? (teamAverageKm * 100) / props.challenge.totalDistanceInKm
        : kmToMiles(teamAverageKm * 100) /
          kmToMiles(props.challenge.totalDistanceInKm);
    } catch (e) {}

    let completionItemPercentage = Math.floor(completionPercentage);
    completionItemPercentage =
      completionItemPercentage > 100 ? 100 : completionItemPercentage;
    return (
      <View>
        <View
          style={[
            styles.tableMainView,
            {backgroundColor: getPrimaryColor(0.15)},
          ]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.teamLeaderBoardPart1containerStyle}>
              <View style={styles.teamNumberContainerStyle}>
                <Text
                  text={`${item.teamPosition}`}
                  style={{
                    color: color.palette.white,
                  }}
                  preset={TextPresetStyles.CAPTION_3}
                />
              </View>
            </View>
            <View style={styles.teamLeaderBoardPart2containerStyle}>
              <FastImageModified
                url={item.teamImageUrl}
                defaultImage={images.user}
                style={styles.tableImageIconStyle}
              />
            </View>
            <View style={styles.teamLeaderBoardPart3containerStyle}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(SCREEN_ROUTES.TEAM_PROFILE, {
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
                  props.challenge.challengeType === TypeOfChallenges.TIME_TRIAL
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
          {props.challenge.challengeType === TypeOfChallenges.RELAY && (
            <PercentageBar
              style={styles.teamPercentageBar}
              disabledColor={color.palette.grey8}
              activeBarBackgroundColor={getPrimaryColor()}
              activePercentage={`${completionItemPercentage}%`}
            />
          )}
        </View>
        {item.isFocused &&
          item.leaderBoardUsers.map((userItem: UserLeaderBoardItemType) => {
            return (
              <View
                style={[
                  styles.userTableMainView,
                  {backgroundColor: getPrimaryColor(0.05)},
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
                    defaultImage={images.user}
                    url={userItem.userImageUrl}
                    style={styles.tableImageIconStyle}
                  />
                </View>
                <View style={styles.teamLeaderBoardPart3containerStyle}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(SCREEN_ROUTES.PROFILE_SCREEN, {
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
                      props.challenge.challengeType ===
                      TypeOfChallenges.TIME_TRIAL
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
    <View>
      <View style={styles.userBoardTextContainerStyle}>
        <View style={styles.rowStyle}>
          <Text
            preset={TextPresetStyles.TITLE_CIRCULAR}
            tx={'modules.myChallenges.leaderBoard'}
          />
          <InfoComponent
            style={{...styles.tildeView, tintColor: getPrimaryColor()}}
            infoContentId={INFO_CONTENT_ID_TYPES.CHALLENGE_TEAM_LEADER_BOARD}
          />
        </View>
        <TouchableOpacity
          style={styles.rowStyle}
          onPress={() =>
            navigation.navigate(SCREEN_ROUTES.TEAM_LEADERBOARD, {
              challenge: props.challenge,
            })
          }>
          <Icon
            icon={ICON_TYPES.ADD}
            style={{...styles.addIconStyle, tintColor: getPrimaryColor()}}
          />
          <Text
            preset={TextPresetStyles.CAPTION_5}
            tx={'modules.Dashboard.viewMore'}
            style={{
              color: getPrimaryColor(),
            }}
          />
        </TouchableOpacity>
      </View>
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
      />
    </View>
  );
};
