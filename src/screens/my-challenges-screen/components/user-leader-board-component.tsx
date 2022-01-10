import React from 'react';
import {path} from 'ramda';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {RootStateOrAny, useSelector} from 'react-redux';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';

import {
  images,
  kmToMiles,
  SCREEN_ROUTES,
  getPrimaryColor,
  roundTo2Decimal,
  isSelectedUnitKM,
  parseMillisecondsIntoReadableTime,
} from '../../../utility';
import {translate} from '../../../i18n';
import {Icon} from '../../../components/icon';
import {
  ChallengeType,
  TypeOfChallenges,
  ChallengeScreenTypes,
  UserLeaderBoardItemType,
} from '../../../utility/object-types/challenge';
import {ICON_TYPES} from '../../../components/icon/constants';
import {Text, TextPresetStyles} from '../../../components/text';
import {FastImageModified} from '../../../components/fast-image-modified';
import {UserLeaderBoardStyles as styles} from './user-leader-board-styles';

/**
 * An Interface for possible props for the UserLeaderBoard Component
 */
interface IChallengesProps {
  /**
   * Prop used to get the challenges item
   */
  challenge: ChallengeType;

  /**
   * Prop used to decide should show leaderboard or not
   */
  shouldShowLeaderBoard: boolean;
}

/**
 * UserLeaderBoardComponent - A component which used to render user
 * leaderboard in challenge component
 */
export const UserLeaderBoardComponent: React.FC<IChallengesProps> = (
  props: IChallengesProps,
) => {
  const userReducer = useSelector((state: RootStateOrAny) => state.userReducer);

  const navigation = useNavigation();
  /**
   * A table view for all user type challenge
   */
  const renderTable = (
    item: UserLeaderBoardItemType,
    index: number,
    isFastestMode: boolean = false,
  ) => {
    const isAdmin =
      path(['userId'], item) === path(['user', '_id'], userReducer);
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(SCREEN_ROUTES.PROFILE_SCREEN, {
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
            style={isAdmin && styles.whiteTextStyle}
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
            style={isAdmin && styles.whiteTextStyle}
          />
        </View>
        <View style={styles.userLeaderBoardPart4containerStyle}>
          <Text
            preset={
              index < 3
                ? TextPresetStyles.CAPTION_6
                : TextPresetStyles.CAPTION_7
            }
            style={isAdmin && styles.whiteTextStyle}
            text={
              props.challenge.challengeType === TypeOfChallenges.TIME_TRIAL ||
              (props.challenge.challengeType === TypeOfChallenges.MEET_UP &&
                isFastestMode)
                ? parseMillisecondsIntoReadableTime(item.personalBest)
                : isSelectedUnitKM()
                ? `${roundTo2Decimal(item.totalDistanceInKm)} ${translate(
                    'common.km',
                  )}`
                : `${kmToMiles(item.totalDistanceInKm)} ${translate(
                    'common.mile',
                  )}`
            }
          />
        </View>

        {props.challenge.challengeType !== TypeOfChallenges.MEET_UP && (
          <View style={styles.userLeaderBoardPart5containerStyle}></View>
        )}
      </TouchableOpacity>
    );
  };

  /**
   * A table view only mor meet up type challenge, for a section 'Most Improved'
   */
  const renderMostImprovedTable = (
    item: UserLeaderBoardItemType,
    index: number,
    isFastestMode: boolean = false,
  ) => {
    const getIncreasedSpeedType = item.speedIncreased < 0 ? '-' : '+';
    return (
      <View
        style={[
          styles.moreItemsTableMainView,
          {backgroundColor: getPrimaryColor(0.05)},
        ]}>
        <View style={styles.userMostImprovedPart1containerStyle}>
          <Text preset={TextPresetStyles.CAPTION_2} text={`${index + 1}`} />
        </View>
        <View style={styles.userMostImprovedPart2containerStyle}>
          <FastImageModified
            style={styles.tableImageIconStyle}
            url={item.userImageUrl}
            defaultImage={images.user}
          />
        </View>
        <View style={styles.userMostImprovedPart3containerStyle}>
          <Text preset={TextPresetStyles.CAPTION_3} text={item.userName} />
        </View>
        <View style={styles.userMostImprovedPart4containerStyle}>
          <Text
            preset={TextPresetStyles.CAPTION_6}
            text={
              isFastestMode
                ? `${parseMillisecondsIntoReadableTime(
                    item.secondPerKM, // todo convert this second per mile
                  )} (${getIncreasedSpeedType}${
                    item.speedIncreased / 1000 // todo convert this speed per mile
                  } ${translate('common.sec')})`
                : isSelectedUnitKM()
                ? `${item.totalDistanceInKm} ${translate(
                    'common.km',
                  )} (${getIncreasedSpeedType} ${
                    item.distanceIncreasedInKm
                  } ${translate('common.km')})`
                : `${kmToMiles(item.totalDistanceInKm)} ${translate(
                    'common.mile',
                  )} (${getIncreasedSpeedType} ${kmToMiles(
                    item.distanceIncreasedInKm,
                  )} ${translate('common.mile')})`
            }
          />
        </View>
      </View>
    );
  };

  /**
   * A table view to render header of leader  board table
   */
  const getLeaderBoardItem = (isFastestMode: boolean = false) => {
    let completionPercentage = 0;
    let completionKm = 0;

    try {
      props.challenge.usersLeaderBoard.forEach(
        (usersItem: UserLeaderBoardItemType) => {
          completionKm =
            completionKm +
            (path(['challenge', 'screenType'], props) ===
            ChallengeScreenTypes.UPCOMING
              ? 0
              : usersItem.totalDistanceInKm);
        },
      );
      completionPercentage = isSelectedUnitKM()
        ? (completionKm * 100) / props.challenge.totalDistanceInKm
        : (kmToMiles(completionKm) * 100) /
          kmToMiles(props.challenge.totalDistanceInKm);
    } catch (e) {}

    let remainingKm = props.challenge.totalDistanceInKm - completionKm;
    remainingKm = remainingKm < 0 ? 0 : remainingKm;
    let remainingKmPercentage = isSelectedUnitKM()
      ? (remainingKm * 100) / props.challenge.totalDistanceInKm
      : (kmToMiles(remainingKm) * 100) /
        kmToMiles(props.challenge.totalDistanceInKm);
    return (
      <View>
        {!isFastestMode && (
          <View style={styles.userBoardTextContainerStyle}>
            <Text
              preset={TextPresetStyles.TITLE_CIRCULAR}
              tx={'modules.myChallenges.leaderBoard'}
            />

            <TouchableOpacity
              style={styles.rowStyle}
              onPress={() =>
                navigation.navigate(SCREEN_ROUTES.USER_LEADERBOARD, {
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
        )}
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
              props.challenge.challengeType === TypeOfChallenges.MEET_UP && {
                width: '34.5%',
              },
            ]}>
            <Text
              preset={TextPresetStyles.MINI_FONT}
              style={styles.headerLabelStyle}
              tx={
                props.challenge.challengeType === TypeOfChallenges.TIME_TRIAL
                  ? 'modules.myChallenges.personalBest'
                  : props.challenge.challengeType === TypeOfChallenges.MEET_UP
                  ? isFastestMode
                    ? 'modules.myChallenges.fastest'
                    : 'modules.myChallenges.farthest'
                  : 'modules.myChallenges.total'
              }
            />
          </View>
        </View>
        <FlatList
          data={props.challenge.usersLeaderBoard}
          renderItem={({item, index}) =>
            renderTable(item, index, isFastestMode)
          }
        />

        {props.challenge.challengeType === TypeOfChallenges.RELAY &&
          (props.challenge.screenType === ChallengeScreenTypes.LIVE ||
            props.challenge.screenType === ChallengeScreenTypes.UPCOMING) && (
            <View
              style={[
                styles.relayFooterContainerStyle,
                {backgroundColor: getPrimaryColor(0.1)},
              ]}>
              <View style={styles.relayFooterFirstRowContainerStyle}>
                <Text
                  preset={TextPresetStyles.CAPTION_3}
                  tx={'modules.myChallenges.total'}
                />
                <View style={styles.relayFooterTailContainerStyle}>
                  <Text
                    preset={TextPresetStyles.CAPTION_6}
                    text={
                      isSelectedUnitKM()
                        ? `${roundTo2Decimal(completionKm)} ${translate(
                            'common.km',
                          )}`
                        : `${kmToMiles(completionKm)} ${translate(
                            'common.mile',
                          )}`
                    }
                  />
                  <Text
                    preset={TextPresetStyles.CAPTION_6}
                    text={`${Math.round(completionPercentage * 100) / 100}%`}
                  />
                </View>
              </View>
              <View style={styles.relayFooterSecondRowContainerStyle}>
                <Text
                  preset={TextPresetStyles.CAPTION_2}
                  tx={'common.remaining'}
                />
                <View style={styles.relayFooterTailContainerStyle}>
                  <Text
                    preset={TextPresetStyles.CAPTION_6}
                    text={
                      isSelectedUnitKM()
                        ? `${roundTo2Decimal(remainingKm)} ${translate(
                            'common.km',
                          )}`
                        : `${kmToMiles(remainingKm)} ${translate(
                            'common.mile',
                          )}`
                    }
                  />
                  <Text
                    preset={TextPresetStyles.CAPTION_6}
                    text={`${Math.round(remainingKmPercentage * 100) / 100}%`}
                  />
                </View>
              </View>
            </View>
          )}

        {props.challenge.challengeType === TypeOfChallenges.MEET_UP &&
        props.challenge.screenType === ChallengeScreenTypes.LIVE &&
        isFastestMode ? (
          <View style={styles.mostImprovedMainStyle}>
            <Text
              preset={TextPresetStyles.TITLE_CIRCULAR}
              tx={'modules.myChallenges.mostImproved'}
            />

            <View
              style={[
                styles.mostImprovedSectionStyle,
                {backgroundColor: getPrimaryColor(0.05)},
              ]}>
              <Text
                preset={TextPresetStyles.FOOT_NOTE_ULTRA_BOLD}
                tx={'modules.myChallenges.distance'}
              />
              <FlatList
                style={styles.mostImprovedListStyle}
                data={props.challenge.usersLeaderBoard}
                renderItem={({item, index}) =>
                  renderMostImprovedTable(item, index)
                }
              />

              <Text
                preset={TextPresetStyles.FOOT_NOTE_ULTRA_BOLD}
                tx={'modules.myChallenges.timeFastest'}
              />
              <FlatList
                style={styles.mostImprovedListStyle}
                data={props.challenge.usersLeaderBoard}
                renderItem={({item, index}) =>
                  renderMostImprovedTable(item, index, isFastestMode)
                }
              />
            </View>
          </View>
        ) : null}
      </View>
    );
  };

  return (
    props.shouldShowLeaderBoard && (
      <View>
        {getLeaderBoardItem()}
        {props.challenge.challengeType === TypeOfChallenges.MEET_UP && (
          <View style={styles.meetUpFastestLeaderBoardStyle}>
            {getLeaderBoardItem(true)}
          </View>
        )}
      </View>
    )
  );
};

