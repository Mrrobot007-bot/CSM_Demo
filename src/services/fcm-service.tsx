import {Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';

import StorageHandler from '../utility/storage-helper';
import {DefaultPreferenceKeys, updateNotification} from '../utility';

class FCMService {
  register = (
    onRegister: any,
    onNotification: any,
    onOpenNotification: any,
  ) => {
    this.checkPermission(onRegister);
    this.createNotificationListeners(
      onRegister,
      onNotification,
      onOpenNotification,
    );
  };

  registerAppWithFCM = async () => {
    if (Platform.OS === 'ios') {
      await messaging().setAutoInitEnabled(true);
    }
  };

  /**
   * function to check permision
   */
  checkPermission = async (onRegister: any) => {
    try {
      const enabled = await messaging().hasPermission();
      if (enabled) {
        this.getToken(onRegister);
      } else {
        this.requestPermission(onRegister);
      }
    } catch (error) {
      console.log(error, 'error');
    }
  };

  /**
   * function to get or generate fcm token
   */
  getToken = async (onRegister: any) => {
    try {
      const notificationToken = await messaging().getToken();
      console.log(notificationToken, 'notificationToken====>');
      StorageHandler.setItem(
        DefaultPreferenceKeys.DEVICE_TOKEN,
        notificationToken,
      );
      onRegister(notificationToken);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * function for permission request.
   */
  requestPermission = (onRegister: any) => {
    messaging()
      .requestPermission()
      .then(() => {
        this.getToken(onRegister);
      })
      .catch(error => {
        console.log('permission rejected', error);
      });
  };

  /**
   * function to delete fcm token
   */
  deleteToken = async () => {
    try {
      messaging().deleteToken();
    } catch (error) {
      console.log(error, 'fcm token not deleted');
    }
  };

  /**
   * function create notification listener in begining.
   */
  createNotificationListeners = async (
    onRegister: any,
    onNotification: any,
    onOpenNotification: any,
  ) => {
    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(remoteMessage, 'onNotificationOpenedApp =====>');

      //  onOpenNotification(notification);

      if (Platform.OS === 'ios') {
        let notification = null;
        notification = remoteMessage.notification;

        let obj = {
          id: remoteMessage.sentTime,
          channelId: '',
          title: notification.title,
          message: notification.body,
        };

        if (notification.title != null && notification.title != undefined) {
          updateNotification(obj);
        }
      }
    });

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          const notification = remoteMessage.notification;
          onOpenNotification(notification);
        }
      });

    /*
     * Triggered for data only payload in foreground
     * */
    messaging().onMessage(remoteMessage => {
      if (remoteMessage) {
        let notification = null;
        notification = remoteMessage.data;

        if (Platform.OS === 'ios') {
          notification = remoteMessage.notification;

          let obj = {
            id: remoteMessage.sentTime,
            channelId: '',
            title: notification.title,
            message: notification.body,
          };

          if (notification.title != null && notification.title != undefined) {
            updateNotification(obj);
          }
        } else {
          notification = remoteMessage.notification;
        }
        onNotification(notification);
      }
    });

    /*
     * Triggered for data only payload in background
     * */
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      let notification = remoteMessage.notification;

      let obj = {
        id: remoteMessage.sentTime,
        channelId: '',
        title: notification.title,
        message: notification.body,
      };

      if (notification.title != null && notification.title != undefined) {
        updateNotification(obj);
      }
    });

    /**
     * triggered to refresh the fcm token.
     */
    messaging().onTokenRefresh(newFcmToken => {
      onRegister(newFcmToken);
    });
  };

  /**
   * for Unregistered user.
   */
  unRegister = () => {};
}

export const fcmService = new FCMService();
