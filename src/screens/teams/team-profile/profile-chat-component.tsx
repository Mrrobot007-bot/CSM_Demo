import {path} from 'ramda';
import {FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/core';

import {
  images,
  SCREEN_ROUTES,
  getPrimaryColor,
  getDateAndTimeElapsed,
} from '../../../utility';
import {translate} from '../../../i18n';
import {Icon} from '../../../components/icon';
import {Button} from '../../../components/button';
import {ICON_TYPES} from '../../../components/icon/constants';
import {SectionTitle} from '../../../components/section-title';
import {Text, TextPresetStyles} from '../../../components/text';
import {ButtonPreset, ButtonType} from '../../../components/button';
import {TeamChatType} from '../../../utility/object-types/challenge';
import {FastImageModified} from '../../../components/fast-image-modified';
import {profileChatComponentStyles as styles} from './profile-chat-component-style';

/**
 * An Interface for possible props for team chat component
 */
interface ITeamChatComponentProps {
  /**
   * props used to get teamID
   */
  teamId: string;
  /**
   * props used to get whether it is your team
   */
  isMyTeam: boolean;
  /**
   * props used to get chat data
   */
  teamChatData: Array<any>;
}
/**
 *   TeamChatComponent -  A chat component for team profile 
 */
export const TeamChatComponent: React.FC<ITeamChatComponentProps> = (
  props: ITeamChatComponentProps,
) => {
  const navigation = useNavigation();
  const [teamChatData, setTeamChatData] = useState(props.teamChatData);

  /**
   * function is used to get initial data
   */
  useEffect(() => {
    setTeamChatData(props.teamChatData);
  }, [props.teamChatData]);

  const renderBoostrList = (item: TeamChatType) => {
    return (
      <View style={styles.listItemContainerStyle}>
        <View style={styles.part1ContainerStyle}>
          <FastImageModified
            url={item.creator_profilePic}
            style={styles.userImageStyle}
            defaultImage={images.user}
          />

          <View>
            <Text
              preset={TextPresetStyles.SUB_HEADLINE}
              text={`${path(['creator_userFirstName'], item) || ''} ${
                path(['creator_userLastName'], item) || ''
              }`}
            />
            <Text
              preset={TextPresetStyles.CAPTION_2}
              style={styles.dateTextStyle}
              text={getDateAndTimeElapsed(
                new Date(item.createdDateTime).getTime(),
              )}
            />
          </View>
        </View>
        <Text preset={TextPresetStyles.DESCRIPTION} text={item.message} />

        {item.image && (
          <FastImageModified
            url={item.image}
            style={styles.boostrImageStyle}
            defaultImage={images.defaultImage}
          />
        )}

        <View style={styles.bottomButtonContainerStyle}>
          <View style={styles.bottomButtonItemStyle}>
            <Icon
              icon={ICON_TYPES.THUMB_UP}
              style={{...styles.buttonIconStyle, tintColor: getPrimaryColor()}}
            />
            <Text
              preset={TextPresetStyles.CAPTION_3}
              style={[styles.buttonTextStyle, {color: getPrimaryColor()}]}
              text={`${item.likeCount}` || '0'}
            />
          </View>

          <View style={styles.bottomButtonItemStyle}>
            <Icon
              icon={ICON_TYPES.MESSAGE}
              style={{...styles.buttonIconStyle, tintColor: getPrimaryColor()}}
            />
            <Text
              preset={TextPresetStyles.CAPTION_3}
              style={[styles.buttonTextStyle, {color: getPrimaryColor()}]}
              text={`${item.commentCount}` || '0'}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.boostrHeaderStyle}>
        <SectionTitle
          tx={'modules.teams.teamChat'}
          shouldShowViewMore={props.isMyTeam}
          onViewMoreClick={() =>
            navigation.navigate(SCREEN_ROUTES.SEND_BOOSTR_MAIN_SCREEN, {
              id: path(['teamId'], props),
              screenName: translate('modules.teams.teamChat'),
              isTeamChat: true,
            })
          }
        />
      </View>

      <View style={styles.sendBoosterComponentStyle}>
        <Text tx={'modules.teams.sendChatDescription'} style={styles.full} />

        <Button
          disabled={!props.isMyTeam}
          onPress={() =>
            navigation.navigate(SCREEN_ROUTES.SEND_CHAT_SCREEN, {
              teamId: props.teamId,
            })
          }
          preset={ButtonPreset.EXTRA_SMALL}
          type={ButtonType.SECONDARY}
          text={translate('common.send')}
          style={styles.sendButtonStyle}
        />
      </View>

      <FlatList
        data={teamChatData}
        renderItem={({item}) => renderBoostrList(item)}
        extraData={[teamChatData]}
      />
    </View>
  );
};
