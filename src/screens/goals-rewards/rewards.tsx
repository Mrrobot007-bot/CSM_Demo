import React from 'react';
import Carousel from 'react-native-banner-carousel';
import {View, FlatList, ImageBackground, TouchableOpacity} from 'react-native';

import {color} from '../../theme';
import {translate} from '../../i18n';
import {InfoComponent} from '../../components/info';
import {GoalsRewardsStyles as styles} from './styles';
import {SCREEN_ROUTES} from '../../utility/constants';
import LinearGradient from 'react-native-linear-gradient';
import {SectionTitle} from '../../components/section-title';
import {Text, TextPresetStyles} from '../../components/text';
import {DiscountOffers} from '../../components/discount-offers';
import {getPrimaryColor, INFO_CONTENT_ID_TYPES} from '../../utility';

// Used to show  rewardsTab in the goals and rewards section
export const Rewards = (props: {
  navigation: any;
  futureRewards: any;
  claimedRewards: any;
}) => {
  const navigation = props.navigation;
  const futureRewards = props.futureRewards;
  const claimedRewards = props.claimedRewards;

  return (
    <View style={styles.full}>
      <View style={styles.mainTitleContainerStyle}>
        <SectionTitle tx={'modules.goalsRewards.claimRewards'} />

        <InfoComponent
          style={{...styles.tildeIconView, tintColor: getPrimaryColor()}}
          infoContentId={INFO_CONTENT_ID_TYPES.GOALS_REWARDS_HOW_IT_WORKS}
        />
      </View>
      <View style={styles.carouselContainerStyle}>
        {claimedRewards && claimedRewards.length ? (
          <Carousel
            pageIndicatorContainerStyle={styles.pageIndicatorContainerStyle}
            autoplay={false}
            loop={false}
            index={0}
            activePageIndicatorStyle={{backgroundColor: getPrimaryColor()}}
            pageIndicatorStyle={{backgroundColor: getPrimaryColor(0.2)}}>
            {claimedRewards.map(
              (claimedRewards: {
                image: string;
                headline: string;
                subhead: string;
                expiryDate: string;
              }) => (
                <View>
                  <DiscountOffers
                    onClickViewDetails={() => {
                      navigation.navigate(SCREEN_ROUTES.CLAIM_REWARDS, {
                        data: claimedRewards,
                      });
                    }}
                    backgroundImage={claimedRewards.image}
                    headingText={claimedRewards.headline}
                    discountText={claimedRewards.subhead}
                    expireDate={claimedRewards.expiryDate}
                  />
                </View>
              ),
            )}
          </Carousel>
        ) : (
          <Text
            preset={TextPresetStyles.SUB_HEADLINE}
            style={[styles.blackTextStyle, styles.rewardsCountStyle]}
            text={
              `${claimedRewards.length}` +
              ` ${translate('modules.goalsRewards.rewards')}`
            }
          />
        )}
      </View>
      <View style={styles.unclaimedRewardsContainerStyle}>
        <SectionTitle tx={'modules.goalsRewards.unclaimedRewards'} />
      </View>
      <View style={styles.futureRewardsMainContainer}>
        <Text
          preset={TextPresetStyles.SUB_HEADLINE}
          style={[
            styles.blackTextStyle,
            styles.blackTextStyle,
            styles.rewardsCountStyle,
          ]}
          text={
            `${futureRewards.length}` +
            ` ${translate('modules.goalsRewards.rewardsRoClaim')}`
          }
        />

        <FlatList
          data={futureRewards}
          numColumns={2}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(SCREEN_ROUTES.FUTURE_REWARDS, {
                    data: item,
                  })
                }>
                <ImageBackground
                  style={styles.futureRewardsImageContainer}
                  source={{uri: item.image}}>
                  <LinearGradient
                    colors={[color.palette.black_30, color.palette.black_90]}
                    style={styles.rewardsOverlay}
                  />
                  <Text
                    preset={TextPresetStyles.SUB_HEADLINE}
                    style={styles.futureRewardsTextContainer}
                    text={item.headline}
                  />
                </ImageBackground>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};
