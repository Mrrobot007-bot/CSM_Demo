import React from 'react';
import {View, Image, ImageBackground} from 'react-native';

import {getPrimaryColor, images} from '../../utility';
import {OnboardingScreenStyles as styles} from './styles';
import {Text, TextPresetStyles} from '../../components/text';
import {translate} from '../../i18n';

/**
 * constant is used for description text
 */
const DescriptionTxList = [
  'modules.auth.onboarding3DescriptionText1',
  'modules.auth.onboarding3DescriptionText2',
  'modules.auth.onboarding3DescriptionText3',
  'modules.auth.onboarding3DescriptionText4',
  'modules.auth.onboarding3DescriptionText5',
];

/**
 * OnboardingScreen3 - Screen is used show onboarding slider  3
 */
const OnboardingScreen3: React.FC = ({}) => {
  return (
    <ImageBackground
      style={[styles.full, {backgroundColor: getPrimaryColor()}]}
      source={images.blueBackground}>
      <Image
        style={styles.onboarding3IconStyle}
        source={images.onboarding3Logo}
      />

      <Text
        preset={TextPresetStyles.SUB_HEADLINE2}
        style={[
          styles.secondaryLabelTextStyle,
          styles.onboarding3InnerViewStyle,
        ]}
        tx={'modules.auth.youAreInControl'}
      />
      <View style={styles.onboarding3DescriptionTextMainViewStyle}>
        {DescriptionTxList.map((item, index) => {
          return (
            <View
              style={styles.onboarding3DescriptionTextMiddleViewStyle}
              key={index}>
              <View style={styles.dotViewStyle} />
              <Text
                preset={TextPresetStyles.DESCRIPTION}
                style={[
                  styles.secondaryLabelTextStyle,
                  styles.onboarding3descriptionTextStyle,
                ]}
                text={translate(`${item}`)}
              />
            </View>
          );
        })}
      </View>
    </ImageBackground>
  );
};

export {OnboardingScreen3};
