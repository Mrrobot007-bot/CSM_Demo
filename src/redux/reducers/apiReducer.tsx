import * as types from '../constants/index';

const initialState = {
  loading: false,
};

/**
 * Redux reducer for loading type
 */
export default (state = initialState, action: any) => {
  switch (action.type) {
    case types.LOADING:
      return {...state, loading: action.isLoading};
    default:
      return state;
  }
};
