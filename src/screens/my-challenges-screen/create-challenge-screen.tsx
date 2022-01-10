import React from 'react';
import {View, ImageBackground, Image} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

import {
  images,
  defaultAlert,
  DEVICE_WIDTH,
  SCREEN_ROUTES,
  getPrimaryColor,
  CREATE_CHALLENGES_TYPE,
} from '../../utility';
import {translate} from '../../i18n';
import {Button} from '../../components/button';
import {MyChallengesScreenStyles as styles} from './styles';
import {Text, TextPresetStyles} from '../../components/text';
import {BoostrScreen, HeaderTypes} from '../../components/boostr-screen';

/**
 * A List of challenges supported by Boostr app with its description
 */
const slides = [
  {
    key: 'i1',
    intro: translate('modules.myChallenges.relayChallengeIntro'),
    backgroundImage: images.relayChallengeBackground,
    icon: images.relayChallengeIcon,
    title: translate('modules.myChallenges.relayChallenge'),
    challengeType: CREATE_CHALLENGES_TYPE.RELAY,
    subTextList: [
      translate('modules.myChallenges.relayChallengeSubText1'),
      translate('modules.myChallenges.relayChallengeSubText2'),
    ],
  },
  {
    key: 'i2',
    intro: translate('modules.myChallenges.timeTrialIntro'),
    backgroundImage: images.timeTrialChallengeBackground,
    icon: images.timeTrialChallengeIcon,
    title: translate('modules.myChallenges.timeTrial'),
    challengeType: CREATE_CHALLENGES_TYPE.TIME_TRIAL,
    subTextList: [
      translate('modules.myChallenges.timeTrialSubText1'),
      translate('modules.myChallenges.timeTrialSubText2'),
    ],
  },
  {
    key: 'i3',
    intro: translate('modules.myChallenges.happyFeetIntro'),
    backgroundImage: images.happyFeetChallengeBackground,
    icon: images.happyFeetChallengeIcon,
    title: translate('modules.myChallenges.happyFeet'),
    challengeType: CREATE_CHALLENGES_TYPE.HAPPY_FEET,
    subTextList: [
      translate('modules.myChallenges.happyFeetSubText1'),
      translate('modules.myChallenges.happyFeetSubText2'),
    ],
  },
  {
    key: 'i4',
    intro: translate('modules.myChallenges.meetUpIntro'),
    backgroundImage: images.meetUpChallengeBackground,
    icon: images.meetUpChallengeIcon,
    title: translate('modules.myChallenges.meetUp'),
    challengeType: CREATE_CHALLENGES_TYPE.MEET_UP,
    subTextList: [
      translate('modules.myChallenges.meetUpSubText1'),
      translate('modules.myChallenges.meetUpSubText2'),
    ],
  },
  {
    key: 'i5',
    intro: translate('modules.myChallenges.farOutIntro'),
    backgroundImage: images.farOutChallengeBackground,
    icon: images.farOutChallengeIcon,
    title: translate('modules.myChallenges.farOut'),
    challengeType: CREATE_CHALLENGES_TYPE.FAR_OUT,
    subTextList: [
      translate('modules.myChallenges.farOutSubText1'),
      translate('modules.myChallenges.farOutSubText2'),
    ],
  },
];

/**
 * An Interface for possible props for the CreateChallenges Screen
 */
interface ICreateChallengesScreenProps {
  /**
   * Navigation prop used to set the navigation stuff in the
   * component like, go back, move to other screen, etc.
   */
  navigation: any;
}

/**
 * CreateChallengesScreen - A Screen used to provide a list of supported challenges and
 * user can select any one of them and can create that type of challenge
 */
export const CreateChallengesScreen = (props: ICreateChallengesScreenProps) => {
  const renderItem = ({item}: any) => {
    return (
      <ImageBackground style={[styles.full]} source={item.backgroundImage}>
        <View style={styles.createChallengesMainContainerStyle}>
          <Text preset={TextPresetStyles.DESCRIPTION}>{item.intro}</Text>
          <View
            style={[
              styles.createChallengeIconContainerStyle,
              {backgroundColor: getPrimaryColor()},
            ]}>
            <Image
              source={item.icon}
              style={[
                styles.createChallengeIconStyle,
                item.key === slides[1].key
                  ? {marginLeft: DEVICE_WIDTH * 0.278 * -0.11}
                  : null,
              ]}
            />
          </View>

          <Text
            preset={TextPresetStyles.TITLE_HUGE}
            text={item.title}
            style={[
              styles.createChallengeTitleStyle,
              {color: getPrimaryColor()},
            ]}
          />

          {item.subTextList.map((subText: string) => {
            return (
              <View style={styles.createChallengeSubTextListStyle}>
                <View style={styles.createChallengeSubTextDotStyle} />
                <Text preset={TextPresetStyles.FOOT_NOTE} text={subText} />
              </View>
            );
          })}
          <Button
            tx={'modules.myChallenges.createChallenge'}
            onPress={() =>
              item.challengeType === CREATE_CHALLENGES_TYPE.MEET_UP
                ? defaultAlert(
                    'Error',
                    'This Feature not available due to Map api key not available',
                  )
                : props.navigation.navigate(
                    SCREEN_ROUTES.RELAY_CHALLENGES_SCREEN,
                    {
                      challengeType: item.challengeType,
                    },
                  )
            }
            style={styles.createChallengeButtonStyle}
          />
        </View>
      </ImageBackground>
    );
  };
  return (
    <BoostrScreen
      headerType={HeaderTypes.NORMAL_BACK}
      navigation={props.navigation}
      title={translate('modules.myChallenges.createNew')}>
      <AppIntroSlider
        data={slides}
        renderItem={renderItem}
        showNextButton={false}
        showDoneButton={false}
        dotStyle={{
          ...styles.createChallengeSliderDotStyle,
          backgroundColor: getPrimaryColor(0.3),
        }}
        activeDotStyle={{
          ...styles.createChallengeActiveSliderDotStyle,
          backgroundColor: getPrimaryColor(),
        }}
      />
    </BoostrScreen>
  );
};
