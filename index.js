/**
 * @format
 */

import { AppRegistry, Platform, useEffect } from 'react-native';
import App from './src/app/App';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';
import { localNotificationService } from './src/services/notification-services'
import PushNotification from 'react-native-push-notification';

AppRegistry.registerComponent(appName, () => App);
