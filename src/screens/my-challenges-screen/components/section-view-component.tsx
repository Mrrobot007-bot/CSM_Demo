import React from 'react';
import {View} from 'react-native';

import {color} from '../../../theme';
import {Icon} from '../../../components/icon';
import {
  ChallengeType,
  ChallengeScreenTypes,
} from '../../../utility/object-types/challenge';
import {getPrimaryColor, images} from '../../../utility';
import {ICON_TYPES} from '../../../components/icon/constants';
import {ChallengesStyles as styles} from './challenges-styles';
import {Text, TextPresetStyles} from '../../../components/text';
import {FastImageModified} from '../../../components/fast-image-modified';

/**
 * An Interface for possible props for the SectionView Component
 */
interface IChallengesProps {
  /**
   * Prop used to get the challenges item
   */
  challenge: ChallengeType;

  /**
   * Prop used to provide callback to update challenge data
   */
  updateChallengeData: (challengeId: string) => void;
}

/**
 * SectionViewComponent - component used to render the section view which
 * have challenge image, name and a option to open/close the challenge
 * details in challenge component
 */
export const SectionViewComponent: React.FC<IChallengesProps> = (
  props: IChallengesProps,
) => {
  return (
    <View>
      <View style={styles.sliderImageBackgroundStyle}>
        <FastImageModified
          url={
            props.challenge.screenType === ChallengeScreenTypes.UPCOMING
              ? null
              : props.challenge.image
          }
          style={
            props.challenge.screenType === ChallengeScreenTypes.UPCOMING
              ? styles.sliderImageStyle
              : {
                  ...styles.sliderUpcomingImageStyle,
                  backgroundColor: getPrimaryColor(),
                }
          }
          defaultImage={
            props.challenge.screenType === ChallengeScreenTypes.UPCOMING
              ? null
              : images.blueBackground
          }
        />
        <View style={styles.sliderInnerViewStyle}>
          <Text
            preset={TextPresetStyles.FOOT_NOTE_BOLD}
            style={[
              styles.secondaryLabelTextStyle,
              {
                color: props.challenge.isFocused
                  ? getPrimaryColor()
                  : color.palette.black,
              },
            ]}
            text={props.challenge.challengeName}
          />
          <Icon
            onIconClick={() => props.updateChallengeData(props.challenge._id)}
            icon={
              props.challenge.isFocused
                ? ICON_TYPES.UP_ARROW
                : ICON_TYPES.DOWN_ARROW
            }
            style={styles.arrowIconStyle}
          />
        </View>
      </View>
    </View>
  );
};
