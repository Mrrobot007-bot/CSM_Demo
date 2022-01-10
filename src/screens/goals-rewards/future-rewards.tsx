import {path} from 'ramda';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {View, ScrollView} from 'react-native';

import {translate} from '../../i18n';
import {
  HeaderTypes,
  BoostrScreen,
  HeaderRightComponentType,
} from '../../components/boostr-screen';
import {API_URLS} from '../../services/urls';
import {Button} from '../../components/button';
import {GoalsRewardsStyles as styles} from './styles';
import {postApiCall} from '../../services/api-services';
import {STATUS_CODES} from '../../services/status-codes';
import {Text, TextPresetStyles} from '../../components/text';
import {defaultAlert, images, showMessage} from '../../utility';
import {FastImageModified} from '../../components/fast-image-modified';
import {ShareViewComponent} from '../my-challenges-screen/components/share-view-component';

/**
 * An Interface for possible props for the FutureRewards Screen
 */
interface IFutureRewardsScreenProps {
  /**
   * Prop used to provide the navigation stuff
   */
  navigation: any;

  /**
   * Prop used to provide the stuff data which send on screen
   */
  route: any;
}

/**
 * Used to show FutureRewards list at goals and reward tab
 */
export const FutureRewards = (props: IFutureRewardsScreenProps) => {
  const dispatch = useDispatch();
  const [futureData] = useState(props.route.params.data);

  const claimRewards = async () => {
    let params = {
      id: futureData._id,
      reward_id: futureData.reward_id,
    };
    try {
      let apiResponse = await dispatch(
        postApiCall(
          API_URLS.CLAIM_REWARD,
          params,
          true,
          props.navigation,
          claimRewards,
        ),
      );
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        showMessage(translate('modules.goalsRewards.claimSuccessful'));
        props.navigation.pop(1);
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };

  return (
    <BoostrScreen
      navigation={props.navigation}
      headerRightComponentType={HeaderRightComponentType.ICON_TEXT}
      headerType={HeaderTypes.NORMAL_CROSS}
      title={futureData.headline}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.subContainerView}>
        <ShareViewComponent shareViewStyle={styles.shareViewStyle}>
          <FastImageModified
            url={futureData.image}
            style={styles.claimRewardsImageStyle}
            defaultImage={images.defaultImage_2}
          />
          <Text
            preset={TextPresetStyles.HEADLINE_DARK}
            style={[styles.blackTextStyle, styles.claimRewardsDiscountView]}
            text={futureData.subhead}
          />
          <Text
            preset={TextPresetStyles.DESCRIPTION}
            style={[styles.blackTextStyle, styles.claimRewardsDiscountView]}
            text={futureData.info_text}
          />

          <View style={styles.futureRewardButtonView}>
            <Button
              onPress={() => claimRewards()}
              tx={'modules.goalsRewards.claimYourReward'}
            />

            <Text
              preset={TextPresetStyles.MINI_FONT}
              style={[
                styles.blackTextStyle,
                {textAlign: 'center', fontStyle: 'italic'},
              ]}
              tx={'modules.goalsRewards.boostrRewards'}
              text={futureData.disclaimer}
            />

            <View style={styles.bottomMarginView} />
          </View>
        </ShareViewComponent>
      </ScrollView>
    </BoostrScreen>
  );
};
