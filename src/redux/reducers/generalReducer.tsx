import * as types from '../constants/index';

const initialState = {
  infoDialog: { shouldShow: false, infoDialogId: '' },
  activities: [],

};

/**
 * Redux reducer for activities type
 */
export default (state = initialState, action: any) => {
  switch (action.type) {
    case types.ACTIVITIES:
      return { ...state, activities: action.payload };
    default:
      return state;
  }
};
