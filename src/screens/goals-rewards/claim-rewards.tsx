import {path} from 'ramda';
import moment from 'moment';
import React, {useState} from 'react';
import {View, Image, ScrollView} from 'react-native';

import {translate} from '../../i18n';
import {
  HeaderTypes,
  BoostrScreen,
  HeaderRightComponentType,
} from '../../components/boostr-screen';
import {Button} from '../../components/button';
import {GoalsRewardsStyles as styles} from './styles';
import {Text, TextPresetStyles} from '../../components/text';
import {getPrimaryColor, images, SCREEN_ROUTES} from '../../utility';
import {ShareViewComponent} from '../my-challenges-screen/components/share-view-component';

/**
 * An Interface for possible props for the ClaimRewards Screen
 */
interface IClaimRewardsScreenProps {
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
 * Used to show how can we claim the rewards at goals and reward tab
 */
export const ClaimRewards = (props: IClaimRewardsScreenProps) => {
  const [ClaimedData] = useState(props.route.params.data);

  const onVisitClick = async () => {
    props.navigation.navigate(SCREEN_ROUTES.WEB_VIEW, {
      link: path(['access_link'], ClaimedData),
      name: translate('modules.goalsRewards.clRewards'),
    });
  };

  return (
    <BoostrScreen
      navigation={props.navigation}
      headerRightComponentType={HeaderRightComponentType.ICON_TEXT}
      headerType={HeaderTypes.NORMAL_CROSS}
      title={ClaimedData.headline}>
      <ScrollView style={styles.subContainerView}>
        <ShareViewComponent shareViewStyle={{backgroundColor: 'transparent'}}>
          <Image
            source={images.discountOffers}
            style={styles.claimRewardsImageStyle}
          />

          <Text
            preset={TextPresetStyles.HEADLINE_DARK}
            style={[styles.blackTextStyle, styles.claimRewardsDiscountView]}
            text={ClaimedData.subhead}
          />
          <Text
            preset={TextPresetStyles.DESCRIPTION}
            style={[styles.blackTextStyle, styles.claimRewardsDiscountView]}
            text={ClaimedData.info_text}
          />
          <View
            style={[
              styles.couponViewStyle,
              {backgroundColor: getPrimaryColor(0.05)},
            ]}>
            <Text
              preset={TextPresetStyles.DESCRIPTION}
              style={styles.blackTextStyle}
              tx={'modules.goalsRewards.code'}
            />
            <Text
              preset={TextPresetStyles.SUB_HEADLINE2}
              style={styles.blackTextStyle}
              text={ClaimedData.couponCode}
            />
          </View>
          <Text
            preset={TextPresetStyles.DESCRIPTION}
            style={[styles.blackTextStyle, styles.claimRewardsDiscountView]}
            text={
              `${translate('modules.goalsRewards.offerCode')}` +
              `${moment(new Date(ClaimedData.expiryDate))
                .format('DD/MM/YYYY')
                .toString()}`
            }
          />
          <Button onPress={onVisitClick} tx={'modules.goalsRewards.visit'} />

          <Text
            preset={TextPresetStyles.MINI_FONT}
            style={[
              styles.blackTextStyle,
              {textAlign: 'center', fontStyle: 'italic'},
            ]}
            tx={'modules.goalsRewards.boostrRewards'}
            text={ClaimedData.disclaimer}
          />
          <View style={styles.bottomMarginView} />
        </ShareViewComponent>
      </ScrollView>
    </BoostrScreen>
  );
};
