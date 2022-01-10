import React from 'react';
import {path} from 'ramda';
import {RootStateOrAny, useSelector} from 'react-redux';
import {View, TouchableOpacity, FlatList} from 'react-native';

import {
  images,
  kmToMiles,
  SCREEN_ROUTES,
  getPrimaryColor,
  roundTo2Decimal,
  isSelectedUnitKM,
} from '../../../utility';
import {color} from '../../../theme';
import {translate} from '../../../i18n';
import {Icon} from '../../../components/icon';
import {UserType} from '../../../utility/object-types/user';
import {ICON_TYPES} from '../../../components/icon/constants';
import {Text, TextPresetStyles} from '../../../components/text';
import {UserLeaderBoardStyles as styles} from './user-leader-board-styles';
import {FastImageModified} from '../../../components/fast-image-modified';
import {TeamUserBoardItemType} from '../../../utility/object-types/challenge';

/**
 * An Interface for possible props for I tableHeaderProps component
 */
interface ITableHeaderProps {
  /**
   * Navigation prop used to set the navigation stuff in the
   * component like, go back, move to other screen, etc.
   */
  navigation: any;

  /**
   * team ID is used to  get team profile
   */
  teamId: string;
  /**
   * my team is used know whether your team owner or not
   */
  myTeam: boolean;

  /**
   * data is for used for table
   */
  data: any;

  /**
   * date for current table
   */
  date: string;

  /**
   * boolean type whether is walking selected
   */
  isWalkingSelected: boolean;

  /**
   * boolean type whether is waling selected
   */
  isCyclingSelected: boolean;

  /**
   * On cycling is function used to get cycling activity data
   */
  onCyclingClick: () => void;

  /**
   * On walking is function used to get walking activity data
   */
  onWalkingClick: () => void;
}

export const TableHeader = (props: ITableHeaderProps) => {
  const user: UserType = useSelector(
    (state: RootStateOrAny) => state.userReducer,
  ).user;

  const renderTable = (
    item: TeamUserBoardItemType,
    index: number,
    isFastestMode: boolean = false,
  ) => {
    const isAdmin = path(['userId'], item) === user._id;
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate(SCREEN_ROUTES.PROFILE_SCREEN, {
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
            style={isAdmin && {color: color.palette.white}}
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
            style={isAdmin && {color: color.palette.white}}
          />
        </View>
        <View style={styles.userLeaderBoardPart4containerStyle}>
          <Text
            preset={
              index < 3
                ? TextPresetStyles.CAPTION_6
                : TextPresetStyles.CAPTION_7
            }
            style={isAdmin && {color: color.palette.white}}
            text={
              isSelectedUnitKM()
                ? `${roundTo2Decimal(item.distance)} ${translate('common.km')}`
                : `${kmToMiles(item.distance)} ${translate('common.mile')}`
            }
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View style={styles.dateContainer}>
        <Text preset={TextPresetStyles.FOOT_NOTE} text={props.date} />
        <View style={styles.flexRow}>
          <TouchableOpacity
            style={[
              styles.activityView,
              props.isWalkingSelected
                ? {borderColor: getPrimaryColor()}
                : {borderColor: color.palette.grey6},
            ]}
            onPress={props.onWalkingClick}>
            <Icon
              icon={ICON_TYPES.WALKING_BLUE}
              style={
                props.isWalkingSelected
                  ? {
                      ...styles.tildeIconView,
                      tintColor: getPrimaryColor(),
                    }
                  : {
                      ...styles.tildeIconView,
                      tintColor: color.palette.grey5,
                    }
              }
            />
            <Icon
              icon={ICON_TYPES.WHEEL_CHAIR}
              style={
                props.isWalkingSelected
                  ? {
                      ...styles.tildeIconView,
                      tintColor: getPrimaryColor(),
                    }
                  : {
                      ...styles.tildeIconView,
                      tintColor: color.palette.grey5,
                    }
              }
            />
            <Icon
              icon={ICON_TYPES.RUNNING}
              style={
                props.isWalkingSelected
                  ? {
                      ...styles.tildeIconView,
                      tintColor: getPrimaryColor(),
                    }
                  : {
                      ...styles.tildeIconView,
                      tintColor: color.palette.grey5,
                    }
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={props.onCyclingClick}
            style={[
              styles.activityView,
              styles.marginStyle,
              props.isCyclingSelected
                ? {borderColor: getPrimaryColor()}
                : {borderColor: color.palette.grey6},
            ]}>
            <Icon
              icon={ICON_TYPES.CYCLING}
              style={
                props.isCyclingSelected
                  ? {
                      ...styles.tildeIconView,
                      tintColor: getPrimaryColor(),
                    }
                  : {
                      ...styles.tildeIconView,
                      tintColor: color.palette.grey5,
                    }
              }
            />
          </TouchableOpacity>
        </View>
      </View>

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
            {
              width: '34.5%',
            },
          ]}>
          <Text
            preset={TextPresetStyles.MINI_FONT}
            style={styles.headerLabelStyle}
            tx={'modules.myChallenges.total'}
          />
        </View>
      </View>
      <View>
        <FlatList
          scrollEnabled={false}
          data={props.data}
          renderItem={({item, index}) => renderTable(item, index, true)}
        />
      </View>
    </View>
  );
};
