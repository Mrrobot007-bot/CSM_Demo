import React from 'react';
import {View} from 'react-native';
import {FlatList} from 'react-native';

import {
  getPrimaryColor,
  INFO_CONTENT_ID_TYPES,
  CREATE_CHALLENGES_TYPE,
} from '../../../utility';
import {translate} from '../../../i18n';
import {InfoComponent} from '../../../components/info';
import {RelayChallengesStyles as styles} from './styles';
import {SectionTitle} from '../../../components/section-title';
import {Text, TextPresetStyles} from '../../../components/text';

const RELAY = [
  {
    text: translate('modules.myChallenges.createRelayDescription1'),
  },
  {
    text: translate('modules.myChallenges.createRelayDescription2'),
  },
  {
    text: translate('modules.myChallenges.createRelayDescription3'),
  },
];

const TIME_TRIAL = [
  {
    text: translate('modules.myChallenges.createTimeTrailDescription1'),
  },
  {
    text: translate('modules.myChallenges.createTimeTrailDescription2'),
  },
  {
    text: translate('modules.myChallenges.createTimeTrailDescription3'),
  },
  {
    text: translate('modules.myChallenges.createTimeTrailDescription4'),
  },
];

const HAPPY_FEET = [
  {
    text: translate('modules.myChallenges.createHappyFeetDescription1'),
  },
  {
    text: translate('modules.myChallenges.createHappyFeetDescription2'),
  },
];
const MEET_UP = [
  {
    text: translate('modules.myChallenges.createMeetUpDescription1'),
  },
  {
    text: translate('modules.myChallenges.createMeetUpDescription2'),
  },
  {
    text: translate('modules.myChallenges.createMeetUpDescription3'),
  },
];
const FAR_OUT = [
  {
    text: translate('modules.myChallenges.createFarOutDescription1'),
  },
  {
    text: translate('modules.myChallenges.createFarOutDescription2'),
  },
  {
    text: translate('modules.myChallenges.createFarOutDescription3'),
  },
];

/**
 * Description - A component used to provide description
 * text as per selected challenge type
 */
export const Description = (challengeType: any) => {
  const renderDescription = ({item}: any) => {
    return (
      <View style={styles.descriptionInnerView}>
        <View style={[styles.dotStyle, {backgroundColor: getPrimaryColor()}]} />

        <Text
          preset={TextPresetStyles.FOOT_NOTE}
          style={styles.descriptionTextView}
          text={item.text}
        />
      </View>
    );
  };

  const renderSection = (challenge: any) => {
    switch (challenge.challengeType) {
      case CREATE_CHALLENGES_TYPE.RELAY:
        return (
          <View>
            <View style={styles.titleContainer}>
              <SectionTitle tx={'modules.myChallenges.relayChallenge'} />

              <InfoComponent
                style={{...styles.tildeIconStyle, tintColor: getPrimaryColor()}}
                infoContentId={
                  INFO_CONTENT_ID_TYPES.CREATE_RELAY_CHALLENGE_INFO
                }
              />
            </View>
            <View
              style={[
                styles.descriptionViewContainer,
                {backgroundColor: getPrimaryColor(0.05)},
              ]}>
              <FlatList data={RELAY} renderItem={renderDescription} />
            </View>
          </View>
        );

      case CREATE_CHALLENGES_TYPE.TIME_TRIAL:
        return (
          <View>
            <View style={styles.titleContainer}>
              <SectionTitle tx={'modules.myChallenges.timeTrial'} />
              <InfoComponent
                style={{...styles.tildeIconStyle, tintColor: getPrimaryColor()}}
                infoContentId={
                  INFO_CONTENT_ID_TYPES.CREATE_TIME_TRIAL_CHALLENGE_INFO
                }
              />
            </View>
            <View
              style={[
                styles.descriptionViewContainer,
                {backgroundColor: getPrimaryColor(0.05)},
              ]}>
              <FlatList data={TIME_TRIAL} renderItem={renderDescription} />
            </View>
          </View>
        );
      case CREATE_CHALLENGES_TYPE.HAPPY_FEET:
        return (
          <View>
            <View style={styles.titleContainer}>
              <SectionTitle tx={'modules.myChallenges.happyFeet'} />
              <InfoComponent
                style={{...styles.tildeIconStyle, tintColor: getPrimaryColor()}}
                infoContentId={
                  INFO_CONTENT_ID_TYPES.CREATE_HAPPY_FEET_CHALLENGE_INFO
                }
              />
            </View>
            <View
              style={[
                styles.descriptionViewContainer,
                {backgroundColor: getPrimaryColor(0.05)},
              ]}>
              <FlatList data={HAPPY_FEET} renderItem={renderDescription} />
            </View>
          </View>
        );
      case CREATE_CHALLENGES_TYPE.MEET_UP:
        return (
          <View>
            <View style={styles.titleContainer}>
              <SectionTitle tx={'modules.myChallenges.meetUp'} />
              <InfoComponent
                style={{...styles.tildeIconStyle, tintColor: getPrimaryColor()}}
                infoContentId={
                  INFO_CONTENT_ID_TYPES.CREATE_MEET_UP_CHALLENGE_INFO
                }
              />
            </View>
            <View
              style={[
                styles.descriptionViewContainer,
                {backgroundColor: getPrimaryColor(0.05)},
              ]}>
              <FlatList data={MEET_UP} renderItem={renderDescription} />
            </View>
          </View>
        );
      case CREATE_CHALLENGES_TYPE.FAR_OUT:
        return (
          <View>
            <View style={styles.titleContainer}>
              <SectionTitle tx={'modules.myChallenges.farOut'} />
              <InfoComponent
                style={{...styles.tildeIconStyle, tintColor: getPrimaryColor()}}
                infoContentId={
                  INFO_CONTENT_ID_TYPES.CREATE_FAR_OUT_CHALLENGE_INFO
                }
              />
            </View>
            <View
              style={[
                styles.descriptionViewContainer,
                {backgroundColor: getPrimaryColor(0.05)},
              ]}>
              <FlatList data={FAR_OUT} renderItem={renderDescription} />
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return <View style={styles.full}>{renderSection(challengeType)}</View>;
};
