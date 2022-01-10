import {store} from '../../redux/store/configureStore';
import {ChallengeActivityTypes} from '../../utility/object-types/challenge';

/**
 *
 * Type of screen, which can be switched as per requirement
 */
export enum SCREEN_MODES {
  INITIAL_MODE = 'initialMode',
  AUTO_TRACKING_START_MODE = 'autoTrackStartMode',
  AUTO_TRACKING_RUNNING_MODE = 'autoTrackingRunningMode',
  MANUAL_TRACKING_MODE = 'manualTrackingMode',
}

export const trackerItemList = () => {
  let toBeReturn: any = [];
  const activities = store.getState().generalReducer.activities;
  toBeReturn = activities.map((activity: ChallengeActivityTypes) => {
    return {
      label: activity.name,
      value: activity._id,
      _id: activity._id,
      lowMet: activity.low.met,
      moderateMet: activity.moderate.met,
      highMet: activity.high.met,
    };
  });
  return toBeReturn;
};
