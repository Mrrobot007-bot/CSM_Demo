import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {FlatList} from 'react-native-gesture-handler';
import {RootStateOrAny, useSelector} from 'react-redux';

import {
  images,
  kmToMiles,
  SCREEN_ROUTES,
  getPrimaryColor,
  isSelectedUnitKM,
  INFO_CONTENT_ID_TYPES,
} from '../../../utility';
import {color} from '../../../theme';
import {translate} from '../../../i18n';
import {UserType} from '../../../utility/object-types/user';
import {SectionTitle} from '../../../components/section-title';
import {Text, TextPresetStyles} from '../../../components/text';
import {TeamLeaderBoardStyles as styles} from './leader-board-styles';
import {CrwcLeaderBoardTypes} from '../../../utility/object-types/cwrc';
import {FastImageModified} from '../../../components/fast-image-modified';

/**
 * An Interface for possible props for the CrwcLeaderBoard component
 */
interface ICRWCProps {
  /**
   * A required prop used to provide data of CRWC from parent component
   */
  crwcData: any;
}

/**
 * A Component used to render crwc leaderboard inside tab view
 */
export const CrwcLeaderBoardComponent: React.FC<ICRWCProps> = (
  props: ICRWCProps,
) => {
  const navigation = useNavigation();
  const user: UserType = useSelector(
    (state: RootStateOrAny) => state.userReducer,
  ).user;

  //Leader board render item
  const renderTable = (item: CrwcLeaderBoardTypes, index: number) => {
    return (
      <View>
        <View
          style={[
            styles.tableMainView,
            {
              backgroundColor:
                user.organisationId[0]._id == item._id
                  ? color.palette.green
                  : getPrimaryColor(0.15),
            },
          ]}>
          <View style={styles.dataContainerStyle}>
            <View style={styles.teamLeaderBoardPart1containerStyle}>
              <View style={styles.teamNumberContainerStyle}>
                <Text
                  preset={TextPresetStyles.CAPTION_3}
                  text={`${index + 1}`}
                  style={styles.blackText}
                />
              </View>
            </View>
            <View style={styles.teamLeaderBoardPart2containerStyle}>
              <FastImageModified
                style={styles.tableImageIconStyle}
                url={item.appLogo}
                defaultImage={images.user}
              />
            </View>
            <View style={styles.teamLeaderBoardPart3containerStyle}>
              <View>
                <Text
                  preset={
                    index < 3
                      ? TextPresetStyles.FOOT_NOTE_BOLD_STATIC
                      : TextPresetStyles.FOOT_NOTE
                  }
                  text={item.name}
                  style={styles.blackText}
                />
              </View>
            </View>
            <View style={styles.teamLeaderBoardPart4containerStyle}>
              <Text
                preset={TextPresetStyles.CAPTION_6}
                style={{color: color.palette.black}}
                text={
                  isSelectedUnitKM()
                    ? `${
                        item.totalDistance != null ? item.totalDistance : 0
                      } ${translate('common.km')}`
                    : `${
                        item.totalDistance != null
                          ? kmToMiles(item.totalDistance)
                          : 0
                      } ${translate('common.miles')}`
                }
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.leaderBoardContainer}>
      <View style={styles.sectionStyle}>
        <SectionTitle
          isCrwc
          shouldShowViewMore
          shouldShowTildeView
          tx={'modules.myChallenges.leaderBoard'}
          onViewMoreClick={() =>
            navigation.navigate(SCREEN_ROUTES.CRWC_LEADERBOARD, {type: true})
          }
          TildeType={INFO_CONTENT_ID_TYPES.CRWC_ORGANIZATION_LIST_LEADER_BOARD}
        />
      </View>
      {props.crwcData && props.crwcData.length ? (
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
              tx={'modules.crwc.average'}
            />
          </View>
        </View>
      ) : null}
      <FlatList
        data={props.crwcData}
        renderItem={({item, index}) => renderTable(item, index)}
      />
    </View>
  );
};
