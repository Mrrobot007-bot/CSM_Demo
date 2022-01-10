import {combineReducers} from 'redux';
import apiReducer from './apiReducer';
import userReducer from './userReducer';
import trackerReducer from './trackerReducer';
import generalReducer from './generalReducer';
import notificationReducer from './notificationReducer';

/**
 * Combining all reducers
 */
export default combineReducers({
  userReducer,
  apiReducer,
  trackerReducer,
  generalReducer,
  notificationReducer,
});
