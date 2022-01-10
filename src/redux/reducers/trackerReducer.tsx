import * as types from '../constants/index';

const initialState = {trackerVisible: false};

/**
 * Redux reducer for tracker dialog shown status
 */
export default (state = initialState, action: any) => {
  switch (action.type) {
    case types.SHOW_TRACKER_DIALOG:
      return {...state, trackerVisible: action.payload.isVisible};
    default:
      return state;
  }
};
