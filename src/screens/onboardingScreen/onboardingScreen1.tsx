import React from 'react';
import {path} from 'ramda';
import {RootStateOrAny, useSelector} from 'react-redux';
import {View, Image, ImageBackground} from 'react-native';

import {getPrimaryColor, images} from '../../utility';
import {OnboardingScreenStyles as styles} from './styles';
import {Text, TextPresetStyles} from '../../components/text';
import {FastImageModified} from '../../components/fast-image-modified';

/**
 * OnboardingScreen1 - Screen is used onboarding slide one
 */
const OnboardingScreen1: React.FC = ({}) => {
  const userReducer = useSelector((state: RootStateOrAny) => state.userReducer);

  return (
    <ImageBackground
      style={[styles.full, {backgroundColor: getPrimaryColor()}]}
      source={images.blueBackground}>
      <View style={styles.onboarding1InnerView}>
        <Text
          preset={TextPresetStyles.SUB_HEADLINE1}
          style={[styles.secondaryLabelTextStyle]}
          tx={'modules.auth.welcomeTo'}
        />
        <Image style={styles.logoImageStyle} source={images.appLogo} />
        <Text
          preset={TextPresetStyles.DESCRIPTION_LARGE}
          style={styles.onboarding1DescriptionTextStyle}
          tx={'modules.auth.welcomeToDescriptionText'}
        />
        <Text
          preset={TextPresetStyles.DESCRIPTION_LARGE}
          style={[
            styles.onboarding1DescriptionTextStyle,
            styles.onboarding1WorkNeverFeltText,
          ]}
          tx={'modules.auth.workNeverFelt'}
        />
      </View>
      <FastImageModified
        style={styles.onBoarding1CompanyLogoStyle}
        url={path(['user', 'organisationId', 0, 'appLogo'], userReducer)}
        defaultImage={null}
      />
    </ImageBackground>
  );
};

export {OnboardingScreen1};
