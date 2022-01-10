import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

import {updateNotification} from '../utility';

class LocalNotificationService {
  configure = (onOpenNotification: any) => {
    PushNotification.configure({
      onRegister: async function (token: any) {
        console.log('TOKEN:', token);
      },

      onNotification: function (notification: any) {
        if (!notification?.data) {
          return;
        }

        notification.userInteraction = true;
        console.log('NOTIFICATION:', notification);
        onOpenNotification(
          Platform.OS === 'ios' ? notification.data.item : notification.data,
        );

        if (Platform.OS === 'ios') {
          notification.finish(PushNotificationIOS.FetchResult.NoData);

          let obj = {
            id: notification.id,
            channelId: notification.channelId,
            title: notification.title,
            message: notification.message,
          };

          if (
            notification.channelId != null &&
            notification.channelId != undefined
          ) {
            updateNotification(obj);
          }
        } else {
          let obj = {
            id: notification.id,
            channelId: notification.channelId,
            title: notification.title,
            message: notification.message,
          };

          if (
            notification.channelId != null &&
            notification.channelId != undefined
          ) {
            updateNotification(obj);
          }

          PushNotification.localNotification({
            channelId: notification.channelId,
            title: notification.title,
            message: notification.message,
            largeIcon: 'ic_launcher', // (optional) default: 'ic_launcher'
            smallIcon: notification.smallIcon, // (optional) default: 'ic_notification' with fallback for 'ic_launcher'
          });
        }
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
  };

  unregister = () => {
    PushNotification.unregister();
  };

  cancelAllLocalNotifications = () => {
    if (Platform.OS === 'ios') {
      PushNotificationIOS.removeAllDeliveredNotifications();
    } else {
      PushNotification.cancelAllLocalNotifications();
    }
  };

  removeDeliveredNotificationById = (notificationId: any) => {
    console.log(notificationId);
    PushNotification.cancelLocalNotifications({id: `${notificationId}`});
  };
}

export const localNotificationService = new LocalNotificationService();
