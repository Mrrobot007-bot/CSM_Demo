import React from 'react';
import {path} from 'ramda';
import {FlatList, View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {translate} from '../../i18n';
import {Icon} from '../../components/icon';
import {MyTeamStyles as styles} from './styles';
import {ICON_TYPES} from '../../components/icon/constants';
import {Text, TextPresetStyles} from '../../components/text';
import {getPrimaryColor, images, SCREEN_ROUTES} from '../../utility';
import {FastImageModified} from '../../components/fast-image-modified';

/**
 *  Component is used to show myTeamList
 */
export const MyTeamList = (props: {navigation: any; myTeamList: any}) => {
  const myTeamList = props.myTeamList;
  const navigation = useNavigation();
  /**
   * My team list item type
   */
  const myTeamRenderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={styles.teamMemberMainView}
        onPress={() => {
          navigation.navigate(SCREEN_ROUTES.TEAM_PROFILE, {
            teamId: path(['_id'], item),
          });
        }}>
        <View style={styles.teamImageTextContainer}>
          <FastImageModified
            url={item.image}
            defaultImage={images.defaultImage_2}
            style={styles.teamImageStyle}
          />

          <View style={styles.teamTextContainer}>
            <View style={styles.flexRow}>
              <Text preset={TextPresetStyles.FOOT_NOTE_BOLD} text={item.name} />
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
              style={styles.teamStatusTextStyle}
              text={
                item.closed
                  ? translate('modules.profile.closed')
                  : translate('modules.profile.open')
              }
            />
          </View>
        </View>

        <View style={styles.rightArrowContainerView}>
          <Icon icon={ICON_TYPES.ARROW_RIGHT} style={styles.rightArrowStyle} />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.mainContainerStyle}>
      <FlatList
        scrollEnabled={false}
        data={myTeamList}
        renderItem={myTeamRenderItem}
      />
    </View>
  );
};
