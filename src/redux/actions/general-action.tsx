import * as types from '../constants/index';

/**
 * Redux action for adding activities to store
 */
export function addActivities(payload: any) {
  return {type: types.ACTIVITIES, payload};
}


