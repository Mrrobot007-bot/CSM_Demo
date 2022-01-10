import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

import { RootNavigator } from '../navigation/navigators/root-navigator';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { persister, store } from '../redux/store/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import DefaultPreference from 'react-native-default-preference';
import { DefaultPreferenceKeys, dispatchToStore, showMessage } from '../utility';
import PushNotification from 'react-native-push-notification';
import { fcmService } from '../services/fcm-service';
import { localNotificationService } from '../services/notification-services'
import { LOADING } from '../redux/constants';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

/**
 * The Main Component for the Boostr Application
 */
const App = () => {


  /**
   * Hiding splash screen after 3 seconds
   */
  useEffect(() => {
    dispatchToStore({type: LOADING, isLoading: false});
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  });

  // const _checkPermission = async () => {
  //   const enabled = await messaging().hasPermission();
  //   if (enabled) {
  //     messaging()
  //       .getToken()
  //       .then(token => {
  //         DefaultPreference.set(DefaultPreferenceKeys.DEVICE_TOKEN, token);
  //         console.log("FCM==>", token)
  //       })
  //       .catch(e => { });
  //   } else _getPermission();
  // };

  // const _getPermission = async () => {
  //   messaging()
  //     .requestPermission()
  //     .then(() => {
  //       _checkPermission();
  //     })
  //     .catch(error => { });
  // };

  /**
   * Checking the device token permission on each launch
   */
  useEffect(() => {
    // _checkPermission();
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification)
    PushNotification.removeAllDeliveredNotifications();
    PushNotification.setApplicationIconBadgeNumber(0);

    return () => {
      fcmService.unRegister;
      localNotificationService.unregister();
    }

  }, []);

  const onNotification = (notify: any) => {
    console.log(notify, 'onNotification=====>');
  }

  const onRegister = (token: any) => {
    console.log('token=====>', token);
    DefaultPreference.set(DefaultPreferenceKeys.DEVICE_TOKEN, token);
  }

  const onOpenNotification = (notify: any) => {
    console.log(notify, 'onOpenNotification=====>');
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
