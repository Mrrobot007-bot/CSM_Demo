import * as types from '../constants/index';

export function onNotificationReceive(notification: any) {
    return { type: types.ON_NOTIFICATION_RECEIVE, notification };
}