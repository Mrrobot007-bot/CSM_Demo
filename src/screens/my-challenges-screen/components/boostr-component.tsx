import {path} from 'ramda';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {FlatList, TouchableOpacity, View} from 'react-native';

import {
  images,
  SCREEN_ROUTES,
  getPrimaryColor,
  getDateAndTimeElapsed,
} from '../../../utility';
import {translate} from '../../../i18n';
import {Icon} from '../../../components/icon';
import {
  BoostrType,
  ChallengeType,
} from '../../../utility/object-types/challenge';
import {Button} from '../../../components/button';
import {ICON_TYPES} from '../../../components/icon/constants';
import {BoostrCommentComponent} from './boostr-component-comment';
import {Text, TextPresetStyles} from '../../../components/text';
import {ButtonPreset, ButtonType} from '../../../components/button';
import {BoostrComponentStyles as styles} from './boostr-component-styles';
import {FastImageModified} from '../../../components/fast-image-modified';

/**
 * An Interface for possible props for the Boostr Component
 */
interface IChallengesProps {
  /**
   * Prop used to provide the challenge data
   */
  challenge: ChallengeType;
}

/**
 * BoostrComponent - Used to show boostr data inside the challenge
 */
export const BoostrComponent: React.FC<IChallengesProps> = (
  props: IChallengesProps,
) => {
  const navigation = useNavigation();
  const [challenge, setChallenge] = useState(props.challenge);

  React.useEffect(() => {
    const updatedChallenge = {
      ...props.challenge,
      boostrs: props.challenge.boostrs.map(item => {
        const currentBoostr = challenge.boostrs.find(
          boostrItem => path(['_id'], boostrItem) === path(['_id'], item),
        );
        return {
          ...item,
          isChatWindowOpen: path(['isChatWindowOpen'], currentBoostr)
            ? true
            : false,
        };
      }),
    };

    setChallenge(updatedChallenge);
  }, [path(['challenge'], props)]);

  const renderBoostrList = (item: BoostrType) => {
    return (
      <View style={styles.listItemContainerStyle}>
        <View style={styles.part1ContainerStyle}>
          <FastImageModified
            url={item.userImageUrl}
            style={styles.userImageStyle}
            defaultImage={images.user}
          />

          <View>
            <Text preset={TextPresetStyles.SUB_HEADLINE} text={item.userName} />
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

        {item.boostrImageUrl && (
          <FastImageModified
            url={item.boostrImageUrl}
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
              style={styles.buttonTextStyle}
              text={`${path(['totalLikes'], item) || 0}` || '0'}
            />
          </View>

          <View style={styles.bottomButtonItemStyle}>
            <Icon
              icon={ICON_TYPES.MESSAGE}
              style={{...styles.buttonIconStyle, tintColor: getPrimaryColor()}}
            />
            <Text
              preset={TextPresetStyles.CAPTION_3}
              style={styles.buttonTextStyle}
              text={`${path(['totalComments'], item) || 0}` || '0'}
            />
          </View>
        </View>

        {path(['isChatWindowOpen'], item) && (
          <BoostrCommentComponent
            id={item._id}
            totalComments={path(['totalComments'], item)}
          />
        )}
      </View>
    );
  };
  return (
    <View>
      <View style={styles.boostrHeaderStyle}>
        <Text
          preset={TextPresetStyles.TITLE_CIRCULAR}
          tx={'modules.myChallenges.sendBoostr'}
        />
        <TouchableOpacity
          style={styles.rowStyle}
          onPress={() =>
            navigation.navigate(SCREEN_ROUTES.SEND_BOOSTR_MAIN_SCREEN, {
              id: path(['_id'], challenge),
              screenName: path(['challengeName'], challenge),
            })
          }>
          <Icon
            icon={ICON_TYPES.ADD}
            style={{...styles.addIconStyle, tintColor: getPrimaryColor()}}
          />
          <Text
            preset={TextPresetStyles.CAPTION_5}
            tx={'modules.Dashboard.viewMore'}
            style={{color: getPrimaryColor()}}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.sendBoosterComponentStyle}>
        <Text
          tx={'modules.myChallenges.sendBoostrDescription'}
          style={styles.full}
        />

        <Button
          onPress={() =>
            navigation.navigate(SCREEN_ROUTES.SEND_BOOSTR, {
              challengeId: challenge._id,
            })
          }
          preset={ButtonPreset.EXTRA_SMALL}
          type={ButtonType.SECONDARY}
          text={translate('common.send')}
          style={styles.sendButtonStyle}
        />
      </View>

      <FlatList
        data={challenge.boostrs}
        renderItem={({item}) => renderBoostrList(item)}
        extraData={[challenge]}
      />
    </View>
  );
};
