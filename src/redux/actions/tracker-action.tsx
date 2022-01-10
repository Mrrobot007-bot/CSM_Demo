import * as types from '../constants/index';

/**
 * Redux action for adding tracker shown status to store
 */
export function showTrackerDialog(payload: any) {
  return {type: types.SHOW_TRACKER_DIALOG, payload};
}
