import {View} from 'react-native';
import React, {FC, ReactElement, useState} from 'react';

import {Icon} from '../icon';
import {getPrimaryColor} from '../../utility';
import {Text, TextPresetStyles} from '../text';
import {RewardProgressBarStyles as styles} from './styles';

/**
 * An Interface for possible props for the RewardProgressBar component
 */
interface rewardProgressBarProps {
  /**
   *  progress date of the rewards
   */
  progressDates?: any;

  /**
   *  progress status of the rewards between 0 to 4
   */
  progressStatus?: number;

  /**
   *  reward data prop
   */
  rewardData: any;

  /**
   *  timePeriod of the rewards
   */
  timePeriod?: string;
}

/**
 *  Used to show the rewards progress in the progress bar
 */
export const RewardProgressBar: FC<rewardProgressBarProps> = (
  props: rewardProgressBarProps,
): ReactElement => {
  const [rewardData] = useState<Array<any>>(props.rewardData);

  return (
    rewardData && (
      <View
        style={[
          styles.streakSliderViewStyle,
          {backgroundColor: getPrimaryColor(0.05)},
        ]}>
        <Text
          preset={TextPresetStyles.FOOT_NOTE_BOLD}
          style={[styles.dateViewStyle, styles.blackTextStyle]}
          text={props.timePeriod}
        />
        <View style={styles.sliderCompleteViewStyle}>
          <View style={styles.mainContainerStyle}>
            <View style={styles.iconContainerStyle}>
              {rewardData.map(rewardData => {
                return (
                  <Icon
                    icon={rewardData.image}
                    style={{...styles.iconStyle, tintColor: getPrimaryColor()}}
                  />
                );
              })}
            </View>

            <View style={styles.progressBarStyle}>
              {rewardData.map(rewardData => {
                return (
                  <View style={[styles.dotViewStyle, styles.grayDotColor]} />
                );
              })}
            </View>
            <View
              style={[
                styles.activeProgressBarStyle,
                {
                  width: rewardData[props.progressStatus].percentage,
                  backgroundColor: getPrimaryColor(),
                },
              ]}
            />

            {props.progressStatus == 1 ? (
              <View
                style={[
                  styles.activeDotProgressBarStyle,
                  {width: rewardData[props.progressStatus].percentage},
                ]}>
                <View style={[styles.dotViewStyle]} />
                <View style={[styles.dotViewStyle, styles.whiteDotColor]} />
              </View>
            ) : props.progressStatus == 2 ? (
              <View
                style={[
                  styles.activeDotProgressBarStyle,
                  {width: rewardData[props.progressStatus].percentage},
                ]}>
                <View style={[styles.dotViewStyle]} />
                <View style={[styles.dotViewStyle, styles.whiteDotColor]} />
                <View style={[styles.dotViewStyle, styles.whiteDotColor]} />
              </View>
            ) : props.progressStatus == 3 ? (
              <View
                style={[
                  styles.activeDotProgressBarStyle,
                  {width: rewardData[props.progressStatus].percentage},
                ]}>
                <View style={[styles.dotViewStyle]} />
                <View style={[styles.dotViewStyle, styles.whiteDotColor]} />
                <View style={[styles.dotViewStyle, styles.whiteDotColor]} />
                <View style={[styles.dotViewStyle, styles.whiteDotColor]} />
              </View>
            ) : props.progressStatus == 4 ? (
              <View
                style={[
                  styles.activeDotProgressBarStyle,
                  {width: rewardData[props.progressStatus].percentage},
                ]}>
                <View style={[styles.dotViewStyle]} />
                <View style={[styles.dotViewStyle, styles.whiteDotColor]} />
                <View style={[styles.dotViewStyle, styles.whiteDotColor]} />
                <View style={[styles.dotViewStyle, styles.whiteDotColor]} />
                <View style={[styles.dotViewStyle, styles.whiteDotColor]} />
              </View>
            ) : null}

            <View style={styles.textContainerStyle}>
              {props.progressDates.map((progressDates: any) => {
                return (
                  <Text
                    preset={TextPresetStyles.MINI_FONT_REGULAR}
                    text={progressDates.date}
                  />
                );
              })}
            </View>
          </View>
        </View>
      </View>
    )
  );
};
