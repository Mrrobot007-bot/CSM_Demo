import React from 'react';
import {View, Image, ImageBackground} from 'react-native';

import {getPrimaryColor, images} from '../../utility';
import {OnboardingScreenStyles as styles} from './styles';
import {Text, TextPresetStyles} from '../../components/text';

/**
 * OnboardingScreen4 - Screen is used onboarding slider 4
 */
const OnboardingScreen4 = () => {
  return (
    <ImageBackground
      style={[styles.full, {backgroundColor: getPrimaryColor()}]}
      source={images.blueBackground}>
      <Image
        style={[styles.onboarding4ScreenshotStyle]}
        source={images.onboarding4Screenshot}
      />

      <Text
        preset={TextPresetStyles.SMALL_TITLE_BOLD}
        style={[styles.secondaryLabelTextStyle, styles.onboarding4TitleStyle]}
        tx={'modules.auth.onboarding4LayOfTheLand'}
      />
      <View style={styles.onboarding4DescriptionTextMainView}>
        <Text
          preset={TextPresetStyles.DESCRIPTION}
          style={[
            styles.secondaryLabelTextStyle,
            styles.onboarding4DescriptionStyle,
          ]}
          tx={'modules.auth.onboarding4DescriptionText'}
        />
      </View>
    </ImageBackground>
  );
};

export {OnboardingScreen4};
