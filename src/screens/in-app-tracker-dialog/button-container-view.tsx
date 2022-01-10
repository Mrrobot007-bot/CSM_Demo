import React from 'react';
import {View} from 'react-native-animatable';

import {SCREEN_MODES} from './constants';
import {Button} from '../../components/button';
import {ButtonPreset} from '../../components/button';
import {InAppTrackerStyles as styles} from './styles';
import {ICON_TYPES} from '../../components/icon/constants';

/**
 * props used in ButtonContainer
 */
interface IButtonContainerViewProps {
  /**
   * props used for selected screen  modes
   */
  selectedScreenMode: SCREEN_MODES;

  /**
   * props used for selected tracker type
   */
  selectedTracker: string;

  /**
   * props used for whether isStop Watch Start
   */
  isStopwatchStart: boolean;

  /**
   * props used for count the steps
   */
  stepsCount: number;

  /**
   * props used to whether health Data permission is accepted
   */
  isHealthDataPermissionAccepted: boolean;

  /**
   *  props used to for set StepsCount
   */
  setStepsCount: (steps: number) => void;

  /**
   * props used to for set setStartTime
   */
  setStartTime: (time: number) => void;

  /**
   * props used to set EndTime
   */
  setEndTime: (time: number) => void;

  /**
   * props used to check whether stopWatch started
   */
  setIsStopwatchStart: (isStart: boolean) => void;

  /**
   * props used to set Selected Screen Mode
   */
  setSelectedScreenMode: (screenMode: SCREEN_MODES) => void;

  /**
   * props used to  set ResetStopwatch
   */

  setResetStopwatch: (isReset: boolean) => void;

  /**
   * props used to  set total distance covered
   */

  setTotalDistanceCovered: (distance: number) => void;

  /**
   * props used to check whether whether IsDisabled Time Entry
   */
  setIsDisabledTimeEntry: (isDisabled: boolean) => void;
}

export const ButtonContainerView = (props: IButtonContainerViewProps) => {
  const {
    selectedScreenMode,
    selectedTracker,
    isStopwatchStart,
    setEndTime,
    setStartTime,
    setSelectedScreenMode,
    setIsStopwatchStart,
    setResetStopwatch,
    setIsDisabledTimeEntry,
  } = props;

  /**
   *
   * Method used to get different kinds of buttons as per selected screen modes
   */
  const startPress = () => {
    props.setTotalDistanceCovered(0);
    setStartTime(new Date().getTime());
    setSelectedScreenMode(SCREEN_MODES.AUTO_TRACKING_RUNNING_MODE),
      setIsStopwatchStart(!isStopwatchStart);
    setResetStopwatch(false);
  };

  /**
   *
   * Method used to finish the tracker
   */
  const finishPress = async () => {
    setIsStopwatchStart(false);
    setEndTime(new Date().getTime());
    setSelectedScreenMode(SCREEN_MODES.MANUAL_TRACKING_MODE);
    setIsDisabledTimeEntry(true);
  };

  return (
    <View style={styles.buttonContainerMainStyle}>
      {selectedScreenMode !== SCREEN_MODES.INITIAL_MODE ? (
        <Button
          onPress={() =>
            selectedScreenMode === SCREEN_MODES.AUTO_TRACKING_START_MODE
              ? startPress()
              : finishPress()
          }
          tx={
            selectedScreenMode === SCREEN_MODES.AUTO_TRACKING_START_MODE
              ? 'common.start'
              : 'common.finish'
          }
          icon={ICON_TYPES.TIMER}
          style={styles.buttonStyle}
        />
      ) : (
        <View style={styles.buttonContainerStyle}>
          <Button
            onPress={() =>
              setSelectedScreenMode(SCREEN_MODES.AUTO_TRACKING_START_MODE)
            }
            preset={ButtonPreset.MEDIUM}
            disabled={
              selectedTracker === null || !props.isHealthDataPermissionAccepted
            }
            tx={'modules.inAppTracking.inAppTracker'}
            style={styles.buttonStyle}
          />
          <Button
            onPress={() => {
              setSelectedScreenMode(SCREEN_MODES.MANUAL_TRACKING_MODE);
              setIsDisabledTimeEntry(false);
            }}
            preset={ButtonPreset.MEDIUM}
            tx={'modules.inAppTracking.manualEntry'}
            style={styles.buttonStyle}
          />
        </View>
      )}
    </View>
  );
};
