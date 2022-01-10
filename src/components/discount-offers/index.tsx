import React, {FC, ReactElement} from 'react';
import {View, ImageBackground} from 'react-native';
import {translate} from '../../i18n';
import moment from 'moment';
import {Button} from '../button';
import {ButtonPreset} from '../button';
import {Text, TextPresetStyles} from '../text';
import {DiscountOffersStyles as styles} from './styles';
import {getPrimaryColor} from '../../utility';

/**
 * An Interface for possible props for THE Discount Offers component
 */
interface discountOffersProps {
  /**
   * The BackgroundImage of the Discount View
   */
  backgroundImage?: string;

  /**
   * The Discount details  of the Discount View
   */
  discountText?: string;

  /**
   * The Expire date details  of the Discount View
   */
  expireDate?: string;

  /**
   * The Heading  of the Discount View
   */
  headingText?: string;

  /**
   * function for clicking View Detail button
   */
  onClickViewDetails: () => void;
}

/**
 * DiscountOffers , component used to render default discount
 * offers used in Rewards tab
 */
export const DiscountOffers: FC<discountOffersProps> = (
  props: discountOffersProps,
): ReactElement => {
  return (
    <View>
      <ImageBackground
        style={styles.mainContainerStyle}
        source={{uri: props.backgroundImage}}></ImageBackground>
      <View
        style={[
          styles.headingContainerStyle,
          {backgroundColor: getPrimaryColor(0.6)},
        ]}>
        <View style={styles.headingMainContainerStyles}>
          <View style={styles.dashLineStyle} />
          <Text
            preset={TextPresetStyles.TITLE}
            style={styles.headingTextStyle}
            text={props.headingText}
          />
        </View>

        <Text
          preset={TextPresetStyles.FOOT_NOTE_BOLD}
          style={styles.discountTextStyle}
          numberOfLines={2}
          text={props.discountText}
        />
      </View>
      <View
        style={[styles.imageBottomView, {backgroundColor: getPrimaryColor()}]}>
        <Text
          preset={TextPresetStyles.MINI_FONT}
          style={styles.lightestYellowTextColor}
          text={`${translate('modules.goalsRewards.offerCode')} ${moment(
            new Date(props.expireDate),
          )
            .format('DD MMM, YYYY')
            .toString()}`}
        />
        <Button
          onPress={() => props.onClickViewDetails()}
          preset={ButtonPreset.EXTRA_SMALL}
          tx={'modules.goalsRewards.viewDetails'}
          style={styles.buttonStyle}
        />
      </View>
    </View>
  );
};
