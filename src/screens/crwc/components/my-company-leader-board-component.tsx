import React from 'react';
import {path} from 'ramda';
import {TouchableOpacity, View} from 'react-native';
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
import {FastImageModified} from '../../../components/fast-image-modified';
import {CompanyLeaderBoardItemType} from '../../../utility/object-types/cwrc';

interface IMyCompanyProps {
  crwcData: any;
}

export const MyCompanyLeaderBoardComponent: React.FC<IMyCompanyProps> = (
  props: IMyCompanyProps,
) => {
  const navigation = useNavigation();
  const user: UserType = useSelector(
    (state: RootStateOrAny) => state.userReducer,
  ).user;

  //Leader board render item
  const renderTable = (item: CompanyLeaderBoardItemType, index: number) => {
    return (
      <View>
        <View
          style={[
            styles.tableMainView,
            {
              backgroundColor:
                user._id == item._id
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
                style={styles.companyTableImageIconStyle}
                url={item.profilePic}
                defaultImageStyle={{left: null}}
                defaultImage={images.user}
              />
            </View>
            <View style={styles.teamLeaderBoardPart3containerStyle}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(SCREEN_ROUTES.PROFILE_SCREEN, {
                    userId: path(['_id'], item),
                  })
                }>
                <Text
                  preset={TextPresetStyles.FOOT_NOTE_ULTRA_BOLD}
                  text={`${item.firstName} ${item.lastName}`}
                  style={styles.blackText}
                />
              </TouchableOpacity>
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
          shouldShowViewMore
          tx={'modules.myChallenges.leaderBoard'}
          shouldShowTildeView
          TildeType={INFO_CONTENT_ID_TYPES.CRWC_MY_ORGANIZATION_LEADER_BOARD}
          onViewMoreClick={() =>
            navigation.navigate(SCREEN_ROUTES.CRWC_LEADERBOARD, {
              type: false,
            })
          }
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
              tx={'modules.crwc.total'}
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
