import React from 'react';
import {path} from 'ramda';
import {View} from 'react-native';

import {translate} from '../../../i18n';
import {
  PercentageBar,
  PercentageBarTypes,
} from '../../../components/percentage-bar';
import {Icon} from '../../../components/icon';
import {
  ChallengeType,
  TypeOfChallenges,
  ChallengeScreenTypes,
} from '../../../utility/object-types/challenge';
import {useNavigation} from '@react-navigation/core';
import {ShareViewComponent} from './share-view-component';
import {ICON_TYPES} from '../../../components/icon/constants';
import {Text, TextPresetStyles} from '../../../components/text';
import {getPrimaryColor, images, SCREEN_ROUTES} from '../../../utility';
import {FastImageModified} from '../../../components/fast-image-modified';
import {FundRaiseComponentStyles as styles} from './fund-raise-component-styles';

/**
 * An Interface for possible props for the FundRaise Component
 */
interface IFundRaiseComponentProps {
  /**
   * Prop used to get the challenges item
   */
  challenge: ChallengeType;
}

/**
 * FundRaiseComponent - component used to render the fund raise section of  challenge component
 */
export const FundRaiseComponent: React.FC<IFundRaiseComponentProps> = (
  props: IFundRaiseComponentProps,
) => {
  let raisedPercentage: number = 0;
  const navigation = useNavigation();
  const totalFunds: number =
    path(['challenge', 'fundRaise', 'targetInPounds'], props) || 0;
  const totalRaisedFunds: number =
    path(['challenge', 'fundRaise', 'totalRaisedInPounds'], props) || 0;

  try {
    raisedPercentage =
      totalFunds > 0 ? (totalRaisedFunds * 100) / totalFunds : 0;
  } catch (e) {}

  const openWebView = async (link: string, name: string) => {
    navigation.navigate(SCREEN_ROUTES.WEB_VIEW, {
      link: link,
      name: name,
    });
  };

  const isFundRaise = path(['challenge', 'fundRaise'], props);
  const challengeType = path(['challenge', 'challengeType'], props);
  const challengeScreenType = path(['challenge', 'screenType'], props);

  let activePercentageItem = Math.round(totalRaisedFunds * 100) / 100;
  activePercentageItem =
    activePercentageItem > 100
      ? 100
      : activePercentageItem < 0
      ? 0
      : activePercentageItem;

  return isFundRaise &&
    (challengeType === TypeOfChallenges.RELAY ||
      challengeType === TypeOfChallenges.HAPPY_FEET ||
      challengeType === TypeOfChallenges.FAR_OUT) &&
    (challengeScreenType === ChallengeScreenTypes.LIVE ||
      challengeScreenType === ChallengeScreenTypes.UPCOMING) ? (
    <ShareViewComponent
      label={translate('modules.myChallenges.fundraising')}
      style={styles.shareViewComponentStyle}>
      <View style={styles.topContainerStyle}>
        <View style={styles.mainContainerStyle}>
          <Text
            preset={TextPresetStyles.DESCRIPTION}
            tx={'modules.myChallenges.raisingFundsFor'}
          />
          <Text
            style={styles.headlineTextStyle}
            preset={TextPresetStyles.SUB_HEADLINE}
            text={path(['challenge', 'fundRaise', 'raisedFundsFor'], props)}
          />
          <Icon
            onIconClick={() =>
              openWebView(
                path(['challenge', 'fundRaise', 'url'], props),
                path(['challenge', 'fundRaise', 'raisedFundsFor'], props),
              )
            }
            icon={ICON_TYPES.LINK_ICON}
            style={{...styles.linkIconStyle, tintColor: getPrimaryColor()}}
          />
        </View>

        <FastImageModified
          url={path(['challenge', 'fundRaise', 'imageUrl'], props)}
          defaultImage={images.defaultImage}
          style={styles.fundRaiseImageStyle}
        />

        <PercentageBar
          activePercentage={`${activePercentageItem}%`}
          activeBarBackgroundColor={getPrimaryColor()}
          barType={PercentageBarTypes.THIN}
          isPercentageTextOutside
        />

        <View
          style={[
            styles.targetContainerStyle,
            {backgroundColor: getPrimaryColor(0.05)},
          ]}>
          <View style={styles.full}>
            <Text
              preset={TextPresetStyles.MINI_FONT_REGULAR}
              tx={'modules.myChallenges.fundRaisingTarget'}
            />

            <Text
              preset={TextPresetStyles.SMALL_TITLE_BOLD}
              text={`£${totalFunds}`}
            />
          </View>

          <View
            style={[styles.lineStyle, {backgroundColor: getPrimaryColor(0.1)}]}
          />

          <View style={styles.totalRaisedContainerStyle}>
            <Text
              preset={TextPresetStyles.MINI_FONT_REGULAR}
              tx={'modules.myChallenges.totalRaised'}
            />

            <Text
              preset={TextPresetStyles.SMALL_TITLE_BOLD}
              text={`£${totalRaisedFunds}`}
            />
          </View>
        </View>
      </View>
    </ShareViewComponent>
  ) : null;
};
