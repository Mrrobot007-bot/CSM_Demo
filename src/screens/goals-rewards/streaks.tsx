import React from 'react';
import {View} from 'react-native';

import {GoalsRewardsStyles as styles} from './styles';
import {ButtonPreset, Button} from '../../components/button';
import {Text, TextPresetStyles} from '../../components/text';
import {RewardProgressBar} from '../../components/reward-progress-bar';

/**
 * An Interface for possible props for the Streaks Component
 */
interface streaksProps {
  /**
   * A prop used to set selected index of tab on mai page
   */
  setIndex: () => void;

  /**
   * Prop used to provide the navigation stuff
   */
  navigation: any;

  /**
   * Prop used to provide the Dates data
   */
  Dates: any;

  /**
   * Prop used to provide end data
   */
  endDate: any;

  /**
   * Prop used to provide rewards data
   */
  rewardData: any;

  /**
   * Prop used to provide the total progress done
   */
  progressStatus: number;
}

/**
 * Streaks - A tab component of goals and rewards screen
 */
export const Streaks = (props: streaksProps) => {
  let timePeriod = null;
  try {
    timePeriod = `${props.Dates[0].date} - ${props.endDate[3].date}`;
  } catch (e) {}

  return (
    <View style={styles.full}>
      {props.rewardData.length != 0 ? (
        <View style={styles.steaksContainerStyle}>
          <Text
            preset={TextPresetStyles.DESCRIPTION}
            style={[styles.descriptionTextStyle, styles.blackTextStyle]}
            tx={'modules.goalsRewards.toUnlockDescription'}
          />

          <RewardProgressBar
            progressDates={props.Dates}
            timePeriod={timePeriod}
            rewardData={props.rewardData}
            progressStatus={props.progressStatus}
          />

          <Text
            preset={TextPresetStyles.SUB_HEADLINE}
            style={[styles.descriptionTextStyle, styles.blackTextStyle]}
            tx={'modules.goalsRewards.congratulations'}
          />

          <Text
            preset={TextPresetStyles.DESCRIPTION}
            style={[styles.descriptionTextStyle, styles.blackTextStyle]}
            tx={'modules.goalsRewards.unClaimedRewards'}
          />

          <Button
            tx={'modules.goalsRewards.claimYourReward'}
            onPress={() => props.setIndex()}
            preset={ButtonPreset.LARGE}
            style={styles.descriptionTextStyle}
          />
        </View>
      ) : (
        <View>
          <View style={styles.noDataContainerStyle}>
            <Text
              style={styles.centerTextStyle}
              tx={'modules.myActivity.noActivityData'}
            />
          </View>
        </View>
      )}
    </View>
  );
};
