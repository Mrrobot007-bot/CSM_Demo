import * as types from '../constants/index';
import {UserType} from '../../utility/object-types/user';

/**
 * Redux action for adding a new user to store
 */
export function addUser(payload: UserType) {
  return {type: types.ADD_USER, payload};
}

/**
 * Redux action for updating a user to store
 */
export function updateUser(payload: UserType) {
  return {type: types.USER_UPDATE, payload};
}
