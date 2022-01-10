import React from 'react';
import {View} from 'react-native';
import {Stopwatch} from 'react-native-stopwatch-timer';

import {
  kmToMiles,
  getPrimaryColor,
  isSelectedUnitKM,
  parseMillisecondsIntoReadableDayTime,
} from '../../utility';
import {
  Text,
  TextPresetStyles,
  TextFontWeightTypes,
} from '../../components/text';
import {color} from '../../theme';
import {translate} from '../../i18n';
import {SCREEN_MODES} from './constants';
import {InAppTrackerStyles as styles} from './styles';

/**
 * props used in tracking view
 */

interface ITrackingViewProps {
  /**
   * props used is check whether isDistance Tracker Enabled
   */
  isDistanceTrackerEnabled: boolean;

  /**
   * props used is check whether is StopwatchStart
   */
  isStopwatchStart: boolean;

  /**
   * props used is check whether is  resetStopwatch
   */
  resetStopwatch: boolean;

  /**
   * props used is selectedScreenMode types
   */
  selectedScreenMode: SCREEN_MODES;

  /**
   * props used is to set Total TimeElapsed
   */
  setTotalTimeElapsed: (time: number) => void;

  /**
   * props used is to set Total Time Elapsed
   */
  totalTimeElapsed: number;

  /**
   * props used for total DistanceCovered
   */
  totalDistanceCovered: number;
}

const options = {
  container: {
    // width: 100,
  },
  text: {
    fontFamily: 'CircularXX-BlackItalic',
    fontSize: 22,
    lineHeight: 26,
    color: color.palette.black,
    fontWeight: TextFontWeightTypes.ULTRA_BOLD,
  },
};

export const TrackingView = (props: ITrackingViewProps) => {
  const {
    resetStopwatch,
    totalTimeElapsed,
    isStopwatchStart,
    selectedScreenMode,
    totalDistanceCovered,
    isDistanceTrackerEnabled,

    setTotalTimeElapsed,
  } = props;
  const calculateAveragePerMin = () => {
    const milli = isSelectedUnitKM()
      ? totalTimeElapsed / totalDistanceCovered
      : totalTimeElapsed / kmToMiles(totalDistanceCovered);
    const {hours, minutes, seconds} =
      parseMillisecondsIntoReadableDayTime(milli);
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    selectedScreenMode !== SCREEN_MODES.INITIAL_MODE && (
      <View
        style={[
          styles.timeDistanceContainerStyle,
          {backgroundColor: getPrimaryColor(0.05)},
        ]}>
        <View
          style={[
            styles.timeDistanceItemContainerStyle,
            !isDistanceTrackerEnabled && {justifyContent: 'center'},
          ]}>
          <View style={!isDistanceTrackerEnabled && {alignItems: 'center'}}>
            <Text
              preset={TextPresetStyles.MINI_FONT}
              tx={'common.time'}
              style={styles.timeDistanceItemValueTextStyle}
            />
            <Stopwatch
              laps
              start={isStopwatchStart}
              reset={resetStopwatch}
              options={options}
              getMsecs={(time: number) => {
                if (time - totalTimeElapsed >= 1000) setTotalTimeElapsed(time);
              }}
            />
          </View>
          {isDistanceTrackerEnabled && (
            <View
              style={[
                styles.separatorLineStyle,
                {backgroundColor: getPrimaryColor(0.1)},
              ]}
            />
          )}
        </View>
        {isDistanceTrackerEnabled && (
          <View style={styles.timeDistanceItemContainerStyle}>
            <View>
              <Text
                numberOfLines={2}
                preset={TextPresetStyles.MINI_FONT}
                tx={'common.distance'}
                style={styles.timeDistanceItemValueTextStyle}
              />
              <Text
                preset={TextPresetStyles.SMALL_TITLE_BOLD}
                text={
                  isSelectedUnitKM()
                    ? `${
                        Math.round(totalDistanceCovered * 1000) / 1000
                      } ${translate('common.km')}`
                    : `${kmToMiles(
                        Math.round(totalDistanceCovered * 1000) / 1000,
                      )} ${translate('common.mile')}`
                }
              />
            </View>
            <View style={styles.separatorLineStyle} />
          </View>
        )}

        {isDistanceTrackerEnabled && (
          <View style={styles.full}>
            <Text
              preset={TextPresetStyles.MINI_FONT}
              text={`${translate('modules.inAppTracking.averageSpeed')} ${
                isSelectedUnitKM()
                  ? translate('modules.inAppTracking.minutesPerKm')
                  : translate('modules.inAppTracking.minutesPerMile')
              }`}
              style={styles.timeDistanceItemValueTextStyle}
            />
            <Text
              preset={TextPresetStyles.SMALL_TITLE_BOLD}
              text={`${calculateAveragePerMin()}`}
            />
          </View>
        )}
      </View>
    )
  );
};
