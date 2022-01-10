import React from 'react';
import {View, Image, ImageBackground} from 'react-native';

import {Button} from '../../components/button';
import {ButtonType} from '../../components/button';
import {getPrimaryColor, images} from '../../utility';
import {OnboardingScreenStyles as styles} from './styles';
import {Text, TextPresetStyles} from '../../components/text';

/**
 * An Interface for possible props for the onboarding component
 */
interface IOnBoardingScreen5ScreenProps {
  /**
   * props is used to click on lets go button
   */
  onLetsGoClick(): void;
}

/**
 * OnboardingScreen5 - Screen is used onboarding slider 5
 */
const OnboardingScreen5 = (props: IOnBoardingScreen5ScreenProps) => {
  return (
    <ImageBackground
      style={[styles.full, {backgroundColor: getPrimaryColor()}]}
      source={images.blueBackground}>
      <Image
        style={[styles.onboarding5ScreenshotStyle]}
        source={images.onboarding5Screenshot}
      />

      <Text
        preset={TextPresetStyles.SMALL_TITLE_BOLD}
        style={[styles.secondaryLabelTextStyle, styles.onboarding4TitleStyle]}
        tx={'modules.auth.onboarding5LetsGet'}
      />

      <View style={styles.onboarding4DescriptionTextMainView}>
        <Text
          preset={TextPresetStyles.DESCRIPTION}
          style={[
            styles.secondaryLabelTextStyle,
            styles.onboarding5DescriptionStyle,
          ]}
          tx={'modules.auth.onboarding5DescriptionText'}
        />
      </View>

      <Button
        tx={'modules.auth.letsGo'}
        onPress={props.onLetsGoClick}
        type={ButtonType.SECONDARY}
        style={styles.letsGoButtonStyleButtonStyle}
      />
    </ImageBackground>
  );
};

export {OnboardingScreen5};
