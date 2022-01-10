import * as types from '../constants/index';

const initialState = {
    notification: false,
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case types.ON_NOTIFICATION_RECEIVE:
            return { ...state, notification: action.notification };
        default:
            return state;
    }
};