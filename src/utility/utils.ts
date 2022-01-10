import {path} from 'ramda';
import moment from 'moment';
import io from 'socket.io-client';
import {Alert} from 'react-native';
import S3 from 'aws-sdk/clients/s3';

import {translate} from '../i18n';
import {INTENSITY_TYPES} from './constants';
import StorageHandler from './storage-helper';
import {API_URLS, BASE_URL} from '../services/urls';
import {store} from '../redux/store/configureStore';
import {postApiCall} from '../services/api-services';
import {STATUS_CODES} from '../services/status-codes';
import {addUser} from '../redux/actions/user-actions';
import AsyncStorage from '@react-native-community/async-storage';
import {ACTIVITY_TYPES, DefaultPreferenceKeys, SCREEN_ROUTES} from '.';
import {onNotificationReceive} from '../redux/actions/notification-action';
import {getLiveChallengesList} from '../screens/my-challenges-screen/components/get-live-challenges';

/**
 * A default alert with a header and a message, which used in all over the app
 */
export const defaultAlert = (
  title: string = translate('common.alert'),
  message: string = translate('common.comingSoon'),
  buttonText: string = translate('common.dismiss'),
) => {
  return Alert.alert(title, message, [
    {
      text: buttonText,
      style: 'cancel',
    },
  ]);
};

export const getDaysDiffFrom2dates = (
  date1: string,
  date2: string,
  shouldAddDash: boolean = false,
) => {
  try {
    const timeDiff: number =
      new Date(date1).getTime() - new Date(date2).getTime();
    const days = Math.abs(Math.round(timeDiff / (1000 * 3600 * 24)));

    if (days > 0) {
      return shouldAddDash ? `${days} - days` : `${days} days`;
    } else {
      const hours = Math.round(timeDiff / (1000 * 60 * 60));
      if (hours > 0) {
        return shouldAddDash ? `${hours} - hours` : `${hours} hours`;
      } else {
        const minutes = Math.round(timeDiff / (1000 * 60));
        return shouldAddDash ? `${minutes} - minutes` : `${minutes} minutes`;
      }
    }
  } catch (e) {
    return `0 minute`;
  }
};

/**
 * parsing milliseconds to app formatted time
 */
export const parseMillisecondsIntoReadableTime = (milliseconds: number) => {
  //Get hours from milliseconds
  var hours = milliseconds / (1000 * 60 * 60);
  var absoluteHours = Math.floor(hours);
  var h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

  //Get remainder from hours and convert to minutes
  var minutes = (hours - absoluteHours) * 60;
  var absoluteMinutes = Math.floor(minutes);
  var m = absoluteMinutes > 9 ? absoluteMinutes : '0' + absoluteMinutes;

  //Get remainder from minutes and convert to seconds
  var seconds = (minutes - absoluteMinutes) * 60;
  var absoluteSeconds = Math.floor(seconds);
  var s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;

  return h + ':' + m + ':' + s;
};

/**
 * parsing milliseconds to app formatted Day time
 */
export const parseMillisecondsIntoReadableDayTime = (milliseconds: number) => {
  var days = Math.floor(milliseconds / (24 * 60 * 60 * 1000));
  var daysms = milliseconds % (24 * 60 * 60 * 1000);
  var hours = Math.floor(daysms / (60 * 60 * 1000));
  var hoursms = milliseconds % (60 * 60 * 1000);
  var minutes = Math.floor(hoursms / (60 * 1000));
  var minutesms = milliseconds % (60 * 1000);
  var sec = Math.floor(minutesms / 1000);

  const updatedDays = isNaN(days) ? '00' : days > 9 ? days : `0${days}`;
  const updatedHours = isNaN(hours) ? '00' : hours > 9 ? hours : `0${hours}`;
  const updatedMinutes = isNaN(minutes)
    ? '00'
    : minutes > 9
    ? minutes
    : `0${minutes}`;
  const updatedSeconds = isNaN(sec) ? '00' : sec > 9 ? sec : `0${sec}`;

  return {
    days: updatedDays,
    hours: updatedHours,
    minutes: updatedMinutes,
    seconds: updatedSeconds,
  };
};

/**
 * a method used to finds gaps between two dates
 */
export const getDaysBetweenTwoDates = (startDate: string, endDate: string) => {
  try {
    const date1: any = new Date(startDate);
    const date2: any = new Date(endDate);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  } catch (e) {
    return 0;
  }
};

/**
 * A method used to get elapsed date and time in app formatted way by milliseconds
 */
export const getDateAndTimeElapsed = (milliseconds: number) => {
  let date = moment(new Date(milliseconds)).format('DD MMM, YYYY').toString();
  let timeElapsed = new Date().getTime() - milliseconds;

  var days = Math.floor(timeElapsed / (24 * 60 * 60 * 1000));
  var daysms = timeElapsed % (24 * 60 * 60 * 1000);
  var hours = Math.floor(daysms / (60 * 60 * 1000));
  var hoursms = timeElapsed % (60 * 60 * 1000);
  var minutes = Math.floor(hoursms / (60 * 1000));
  var minutesms = timeElapsed % (60 * 1000);
  var sec = Math.floor(minutesms / 1000);

  let toBeReturn = '';
  if (days >= 1) {
    toBeReturn = `${date} / ${
      days >= 1 && `${days} ${translate('common.days').toLowerCase()}`
    }`;
  } else if (hours >= 1) {
    toBeReturn = `${date} / ${hours >= 1 && `${hours}`} ${translate(
      'common.hours',
    ).toLowerCase()}`;
  } else if (minutes >= 1) {
    toBeReturn = `${date} / ${
      minutes >= 1 && `${minutes} ${translate('common.minutes').toLowerCase()}`
    }`;
  } else {
    toBeReturn = `${date} / ${
      sec >= 1
        ? `${sec} ${translate('common.seconds').toLowerCase()}`
        : `1 ${translate('common.seconds').toLowerCase()}`
    }`;
  }

  return `${toBeReturn} ${translate('common.ago')}`;
};

/**
 * A method used to get elapsed time in app formatted way by milliseconds
 */
export const getTimeElapsed = (milliseconds: number) => {
  let timeElapsed = new Date().getTime() - milliseconds;

  var days = Math.floor(timeElapsed / (24 * 60 * 60 * 1000));
  var daysms = timeElapsed % (24 * 60 * 60 * 1000);
  var hours = Math.floor(daysms / (60 * 60 * 1000));
  var hoursms = timeElapsed % (60 * 60 * 1000);
  var minutes = Math.floor(hoursms / (60 * 1000));
  var minutesms = timeElapsed % (60 * 1000);
  var sec = Math.floor(minutesms / 1000);

  let toBeReturn = '';
  if (days >= 1) {
    toBeReturn = `${
      days >= 1 && `${days} ${translate('common.days').toLowerCase()}`
    }`;
  } else if (hours >= 1) {
    toBeReturn = `${hours >= 1 && `${hours}`} ${translate(
      'common.hours',
    ).toLowerCase()}`;
  } else if (minutes >= 1) {
    toBeReturn = `${
      minutes >= 1 && `${minutes} ${translate('common.minutes').toLowerCase()}`
    }`;
  } else {
    toBeReturn = `${
      sec >= 1
        ? `${sec} ${translate('common.seconds').toLowerCase()}`
        : `1 ${translate('common.seconds').toLowerCase()}`
    }`;
  }

  return `${toBeReturn} ${translate('common.ago')}`;
};

/**
 * A method used to get steps conversion data from kilometers
 */
export const getStepsFromKMDistance = (
  activityType: string,
  intensityType: INTENSITY_TYPES,
  totalTimeConsumedInMilli: number,
  totalDistanceCoveredInKm?: number,
) => {
  // Assumptions
  const assumptionBodyWeight = 78; // Use the average adult weight (though this does not impact outcomes)
  const assumptionStepsPerMile = 2200; // Important assumption as this would otherwise get more complex. 2,200 is an appropriate average as this is the estimate for a person with height c 5'8
  const assumptionTimeInMinutes = 24; // 1 mile at 2.5mph takes
  const assumptionMET = 3.0; // This is normal background speed / Step counter when not doing exercise
  const assumptionKaclPerMinute =
    (assumptionMET * 3.5 * assumptionBodyWeight) / 200;
  const assumptionKaclPerMile =
    assumptionTimeInMinutes * assumptionKaclPerMinute;
  const assumptionKaclPerStep = assumptionKaclPerMile / assumptionStepsPerMile; // This is the energy usage at regular walking pace and is the base unit we work in

  let MET: number = 3;
  try {
    const activities: Array<any> = path(
      ['generalReducer', 'activities'],
      store.getState(),
    );
    const selectedActivity = activities.find(
      (item: any) => item._id === activityType,
    );

    MET = path(['low', 'met'], selectedActivity);
    if (intensityType === INTENSITY_TYPES.HIGH) {
      MET = path(['high', 'met'], selectedActivity);
    } else if (intensityType === INTENSITY_TYPES.MODERATE) {
      MET = path(['moderate', 'met'], selectedActivity);
    }
  } catch (e) {}

  const kaclPerMinute = (MET * 3.5 * assumptionBodyWeight) / 200;
  const walkingStepsPerKm = assumptionStepsPerMile / 1.6093;

  if (
    totalDistanceCoveredInKm &&
    totalDistanceCoveredInKm > 0 &&
    !Number.isNaN(totalDistanceCoveredInKm)
  ) {
    return Math.round(totalDistanceCoveredInKm * walkingStepsPerKm);
  } else {
    return (
      Math.round(kaclPerMinute / assumptionKaclPerStep) *
      (totalTimeConsumedInMilli / 1000 / 60)
    );
  }
};

/**
 * A method used to get kilometers from steps
 */
export const getKMDistanceFromSteps = (totalSteps: number) => {
  // Assumptions
  const assumptionStepsPerMile = 2200; // Important assumption as this would otherwise get more complex. 2,200 is an appropriate average as this is the estimate for a person with height c 5'8

  const stepsPerKM = assumptionStepsPerMile / 1.6093;
  const kmCovered = totalSteps / stepsPerKM;
  return Math.round(kmCovered * 100) / 100;
};

/**
 * Dispatching data to redux store
 */
export const dispatchToStore = (data: any) => {
  store.dispatch(data);
};

/**
 * uploading image to S3
 */
export const uploadThumbnailImageOnS3 = (uri: string) => {
  const s3bucket = new S3({
    accessKeyId: '',
    secretAccessKey: '',
    signatureVersion: 'v4',
  });

  let contentType = 'image/jpeg';
  var RandomNumber = Math.floor(Math.random() * 100) + 1;

  let contentDeposition =
    'inline;filename="' + 'waveyThumbnailImage' + RandomNumber + '"';
  const fPath = uri;
  console.log('uri', uri);

  const fileName = fPath.replace('file://', '');

  return {s3bucket, contentType, contentDeposition, fileName, RandomNumber};
};

/**
 * getting live challenges data
 */
export const getLiveChallenges = async (
  userReducer: any,
  shouldForceUpdate: boolean = false,
) => {
  if (userReducer.user && userReducer.user.sessionId) {
    await getLiveChallengesList(store.dispatch, shouldForceUpdate);
  }
};

/**
 * getting month name from index number
 */
export const getMonthsFromNumber = (month: string) => {
  const data = [
    translate('common.months.jan'),
    translate('common.months.feb'),
    translate('common.months.mar'),
    translate('common.months.apr'),
    translate('common.months.may'),
    translate('common.months.jun'),
    translate('common.months.jul'),
    translate('common.months.aug'),
    translate('common.months.sep'),
    translate('common.months.oct'),
    translate('common.months.nov'),
    translate('common.months.dec'),
  ];

  try {
    const monthValue = parseInt(month);
    return data.find((item, index) => index === monthValue - 1);
  } catch (e) {
    return '';
  }
};

/**
 * get week data from number
 */
export const getWeeksFromNumber = (week: string) => {
  const data = [
    '1st\nWeek',
    '2nd\nWeek',
    '3rd\nWeek',
    '4th\nWeek',
    '5th\nWeek',
  ];
  try {
    const weekValue = parseInt(week);

    return data.find((item, index) => index === weekValue);
  } catch (e) {
    return '';
  }
};

/**
 * get days data from index number
 */
export const getDaysFromNumber = (day: string) => {
  const data = [
    translate('common.daysData.sun'),
    translate('common.daysData.mon'),
    translate('common.daysData.tue'),
    translate('common.daysData.wed'),
    translate('common.daysData.thu'),
    translate('common.daysData.fri'),
    translate('common.daysData.sat'),
  ];
  try {
    const dayValue = parseInt(day);

    return data.find((item, index) => index === dayValue - 1);
  } catch (e) {
    return '';
  }
};

/**
 * get hours data from index number
 */
export const getHoursFromNumber = (time: any) => {
  const data = ['0:00', '6:00', '12:00', '18:00', '24:00'];
  try {
    const dayValue = parseInt(`${time}`);
    return data.find((item, index) => index === dayValue + 1);
  } catch (e) {
    return '';
  }
};

const isWalkingRunningWheelchairType = (selectedTrackerValue: string) => {
  try {
    if (selectedTrackerValue) {
      const activities: Array<any> = path(
        ['generalReducer', 'activities'],
        store.getState(),
      );

      const selectedActivityText = activities
        .find((item: any) => item._id === selectedTrackerValue)
        .name.toLowerCase();

      return (
        selectedActivityText === ACTIVITY_TYPES.WALKING.toLowerCase() ||
        selectedActivityText ===
          ACTIVITY_TYPES.WALKING_WITH_CRUTCHES.toLowerCase() ||
        selectedActivityText === ACTIVITY_TYPES.RUNNING.toLowerCase()
      );
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

const isCyclingType = (selectedTrackerValue: string) => {
  try {
    if (selectedTrackerValue) {
      const activities: Array<any> = path(
        ['generalReducer', 'activities'],
        store.getState(),
      );
      const selectedActivityText = activities
        .find((item: any) => item._id === selectedTrackerValue)
        .name.toLowerCase();
      return (
        selectedActivityText === ACTIVITY_TYPES.CYCLING.toLowerCase() ||
        selectedActivityText ===
          ACTIVITY_TYPES.CYCLING_HAND_CYCLING.toLowerCase()
      );
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

/**
 * getting activities data
 */
export const getActivitiesData = async (
  navigation: any,
  dispatch: any,
  showLoader: boolean = true,
) => {
  const parameters = {
    startDate: moment().startOf('day').format('YYYY/MM/DD'),
    endDate: moment().endOf('day').format('YYYY/MM/DD'),
    year: moment(new Date().getTime()).format('YYYY'),
    data: 'day',
  };
  const apiResponse = await dispatch(
    postApiCall(
      API_URLS.GET_MY_ACTIVITIES,
      parameters,
      showLoader,
      navigation,
      () => getActivitiesData(navigation, dispatch, showLoader),
      true,
    ),
  );

  try {
    if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
      let data: Array<any> = path(['data'], apiResponse) || [];
      try {
        data = data.map(item => {
          const activities: Array<any> = path(['activityData'], item) || [];
          return {
            steps: path(['totalSteps'], item) || 0,
            distance: path(['totalDistance'], item) || 0,
            time: getHoursFromNumber(path(['time'], item)),
            activityData: activities.map((activity: any) => {
              return {
                ...activity,
                isWRWType: isWalkingRunningWheelchairType(
                  path(['activityId'], activity),
                ),
                isCyclingType: isCyclingType(path(['activityId'], activity)),
              };
            }),
          };
        });
      } catch (e) {}

      const newData = [
        {steps: 0, distance: 0, time: getHoursFromNumber(-1), activityData: []},
        ...data,
      ];

      dispatch(
        addUser({
          ...store.getState().userReducer.user,
          dayActivities: newData,
        }),
      );

      getWeekData(navigation, dispatch, showLoader);
    }
  } catch (e) {}
};

/**
 * getting week data
 */
const getWeekData = async (
  navigation: any,
  dispatch: any,
  showLoader: boolean = true,
) => {
  const parameters = {
    startDate: moment().startOf('week').format('YYYY/MM/DD'),
    endDate: moment().endOf('week').format('YYYY/MM/DD'),
    year: moment(new Date().getTime()).format('YYYY'),
    data: 'week',
  };
  const apiResponse = await dispatch(
    postApiCall(
      API_URLS.GET_MY_ACTIVITIES,
      parameters,
      showLoader,
      navigation,
      () => getActivitiesData(navigation, dispatch, showLoader),
      true,
    ),
  );

  let data: Array<any> = path(['data'], apiResponse) || [];
  try {
    data = data.map(item => {
      const activities: Array<any> = path(['activityData'], item) || [];
      return {
        steps: path(['totalSteps'], item) || 0,
        distance: path(['totalDistance'], item) || 0,
        day: getDaysFromNumber(path(['day'], item)),
        activityData: activities.map((activity: any) => {
          return {
            ...activity,
            isWRWType: isWalkingRunningWheelchairType(
              path(['activityId'], activity),
            ),
            isCyclingType: isCyclingType(path(['activityId'], activity)),
          };
        }),
      };
    });
  } catch (e) {}

  dispatch(
    addUser({
      ...store.getState().userReducer.user,
      weekActivities: data,
    }),
  );

  getMonthData(navigation, dispatch, showLoader);
};

/**
 * getting months data
 */
const getMonthData = async (
  navigation: any,
  dispatch: any,
  showLoader: boolean = true,
) => {
  const parameters = {
    startDate: moment().startOf('month').format('YYYY/MM/DD'),
    endDate: moment().endOf('month').format('YYYY/MM/DD'),
    year: moment(new Date().getTime()).format('YYYY'),
    data: 'month',
  };
  const apiResponse = await dispatch(
    postApiCall(
      API_URLS.GET_MY_ACTIVITIES,
      parameters,
      showLoader,
      navigation,
      () => getActivitiesData(navigation, dispatch, showLoader),
      true,
    ),
  );

  let data: Array<any> = path(['data'], apiResponse) || [];
  try {
    data = data.map(item => {
      const activities: Array<any> = path(['activityData'], item) || [];
      return {
        steps: path(['totalSteps'], item) || 0,
        distance: path(['totalDistance'], item) || 0,
        week: getWeeksFromNumber(path(['week'], item)),
        activityData: activities.map((activity: any) => {
          return {
            ...activity,
            isWRWType: isWalkingRunningWheelchairType(
              path(['activityId'], activity),
            ),
            isCyclingType: isCyclingType(path(['activityId'], activity)),
          };
        }),
      };
    });
  } catch (e) {}

  dispatch(
    addUser({
      ...store.getState().userReducer.user,
      monthActivities: data,
    }),
  );

  getYearData(navigation, dispatch, showLoader);
};

/**
 * getting yesr data
 */
const getYearData = async (
  navigation: any,
  dispatch: any,
  showLoader: boolean = true,
) => {
  const parameters = {
    startDate: moment().startOf('year').format('YYYY/MM/DD'),
    endDate: moment().endOf('year').format('YYYY/MM/DD'),
    year: moment(new Date().getTime()).format('YYYY'),
    data: 'year',
  };
  const apiResponse = await dispatch(
    postApiCall(
      API_URLS.GET_MY_ACTIVITIES,
      parameters,
      showLoader,
      navigation,
      () => getActivitiesData(navigation, dispatch, showLoader),
      true,
    ),
  );

  let data: Array<any> = path(['data'], apiResponse) || [];
  try {
    data = data.map(item => {
      const activities: Array<any> = path(['activityData'], item) || [];
      return {
        steps: path(['totalSteps'], item) || 0,
        distance: path(['totalDistance'], item) || 0,
        month: path(['month'], item)
          ? getMonthsFromNumber(path(['month'], item))
          : getMonthsFromNumber(path(['0'], item)),
        activityData: activities.map((activity: any) => {
          return {
            ...activity,
            isWRWType: isWalkingRunningWheelchairType(
              path(['activityId'], activity),
            ),
            isCyclingType: isCyclingType(path(['activityId'], activity)),
          };
        }),
      };
    });
  } catch (e) {}

  dispatch(
    addUser({
      ...store.getState().userReducer.user,
      yearlyActivities: data,
    }),
  );
};

export const isSelectedUnitKM = () => {
  return path(['userReducer', 'user', 'unitOFType'], store.getState()) === 'km';
};

export const kmToMiles = (km: any) => {
  try {
    const kmValue = parseInt(`${km}`);
    return Math.round(kmValue * 0.621371);
  } catch (e) {
    return km;
  }
};

export const roundTo2Decimal = (data: number) => {
  try {
    return Math.round(data * 100) / 100;
  } catch (e) {
    return data;
  }
};

//Update Notification list
export const updateNotification = async (item: any) => {
  try {
    var notiData = await AsyncStorage.getItem(
      DefaultPreferenceKeys.NOTIFICATION_LIST,
    );
    if (notiData) {
      notiData = JSON.parse(notiData);
      notiData.push(item);
      console.log('uioo==>', JSON.stringify(notiData));
      StorageHandler.setItem(
        DefaultPreferenceKeys.NOTIFICATION_LIST,
        JSON.stringify(notiData),
      );
      store.dispatch(onNotificationReceive(true));
    } else {
      console.log('@tt==>', notiData);
      StorageHandler.setItem(DefaultPreferenceKeys.NOTIFICATION_LIST, '[]');
    }
  } catch (error) {
    console.error(error);
  }
};

export const removeNotification = async (id: any) => {
  try {
    var notiData: any = await AsyncStorage.getItem(
      DefaultPreferenceKeys.NOTIFICATION_LIST,
    );
    if (notiData) {
      notiData = JSON.parse(notiData);
      const updatedNotification = notiData.filter(
        (item: any) => item.id !== id,
      );
      StorageHandler.setItem(
        DefaultPreferenceKeys.NOTIFICATION_LIST,
        JSON.stringify(updatedNotification),
      );
      store.dispatch(onNotificationReceive(true));
    }
  } catch (error) {
    console.error(error);
  }
};

//Get Notification Data
export const getNotificationList = async (key: string) => {
  try {
    let notiData = await AsyncStorage.getItem(key);
    if (notiData) {
      return JSON.parse(notiData);
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUnique = (arr: Array<any>, index: string) => {
  const unique = arr
    .map(e => e[index])

    // store the keys of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)

    // eliminate the dead keys & store unique objects
    .filter(e => arr[e])
    .map(e => arr[e]);

  return unique;
};

export const checkFunctionType = (x: any) => {
  if (Object.prototype.toString.call(x) == '[object Function]') {
    return true;
  } else {
    return false;
  }
};

export const hexToRgbA = (hex: string, opacity: number) => {
  let c: any;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    const data = [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',');
    return `'rgba(${data},${opacity})'`;
  }
  throw new Error('Bad Hex');
};

/**
 * getting hex color from name
 */
export const getHexColor = (colour: string) => {
  let colours: any = {
    aliceblue: '#f0f8ff',
    antiquewhite: '#faebd7',
    aqua: '#00ffff',
    aquamarine: '#7fffd4',
    azure: '#f0ffff',
    beige: '#f5f5dc',
    bisque: '#ffe4c4',
    black: '#000000',
    blanchedalmond: '#ffebcd',
    blue: '#0000ff',
    blueviolet: '#8a2be2',
    brown: '#a52a2a',
    burlywood: '#deb887',
    cadetblue: '#5f9ea0',
    chartreuse: '#7fff00',
    chocolate: '#d2691e',
    coral: '#ff7f50',
    cornflowerblue: '#6495ed',
    cornsilk: '#fff8dc',
    crimson: '#dc143c',
    cyan: '#00ffff',
    darkblue: '#00008b',
    darkcyan: '#008b8b',
    darkgoldenrod: '#b8860b',
    darkgray: '#a9a9a9',
    darkgreen: '#006400',
    darkkhaki: '#bdb76b',
    darkmagenta: '#8b008b',
    darkolivegreen: '#556b2f',
    darkorange: '#ff8c00',
    darkorchid: '#9932cc',
    darkred: '#8b0000',
    darksalmon: '#e9967a',
    darkseagreen: '#8fbc8f',
    darkslateblue: '#483d8b',
    darkslategray: '#2f4f4f',
    darkturquoise: '#00ced1',
    darkviolet: '#9400d3',
    deeppink: '#ff1493',
    deepskyblue: '#00bfff',
    dimgray: '#696969',
    dodgerblue: '#1e90ff',
    firebrick: '#b22222',
    floralwhite: '#fffaf0',
    forestgreen: '#228b22',
    fuchsia: '#ff00ff',
    gainsboro: '#dcdcdc',
    ghostwhite: '#f8f8ff',
    gold: '#ffd700',
    goldenrod: '#daa520',
    gray: '#808080',
    green: '#008000',
    greenyellow: '#adff2f',
    honeydew: '#f0fff0',
    hotpink: '#ff69b4',
    'indianred ': '#cd5c5c',
    indigo: '#4b0082',
    ivory: '#fffff0',
    khaki: '#f0e68c',
    lavender: '#e6e6fa',
    lavenderblush: '#fff0f5',
    lawngreen: '#7cfc00',
    lemonchiffon: '#fffacd',
    lightblue: '#add8e6',
    lightcoral: '#f08080',
    lightcyan: '#e0ffff',
    lightgoldenrodyellow: '#fafad2',
    lightgrey: '#d3d3d3',
    lightgreen: '#90ee90',
    lightpink: '#ffb6c1',
    lightsalmon: '#ffa07a',
    lightseagreen: '#20b2aa',
    lightskyblue: '#87cefa',
    lightslategray: '#778899',
    lightsteelblue: '#b0c4de',
    lightyellow: '#ffffe0',
    lime: '#00ff00',
    limegreen: '#32cd32',
    linen: '#faf0e6',
    magenta: '#ff00ff',
    maroon: '#800000',
    mediumaquamarine: '#66cdaa',
    mediumblue: '#0000cd',
    mediumorchid: '#ba55d3',
    mediumpurple: '#9370d8',
    mediumseagreen: '#3cb371',
    mediumslateblue: '#7b68ee',
    mediumspringgreen: '#00fa9a',
    mediumturquoise: '#48d1cc',
    mediumvioletred: '#c71585',
    midnightblue: '#191970',
    mintcream: '#f5fffa',
    mistyrose: '#ffe4e1',
    moccasin: '#ffe4b5',
    navajowhite: '#ffdead',
    navy: '#000080',
    oldlace: '#fdf5e6',
    olive: '#808000',
    olivedrab: '#6b8e23',
    orange: '#ffa500',
    orangered: '#ff4500',
    orchid: '#da70d6',
    palegoldenrod: '#eee8aa',
    palegreen: '#98fb98',
    paleturquoise: '#afeeee',
    palevioletred: '#d87093',
    papayawhip: '#ffefd5',
    peachpuff: '#ffdab9',
    peru: '#cd853f',
    pink: '#ffc0cb',
    plum: '#dda0dd',
    powderblue: '#b0e0e6',
    purple: '#800080',
    rebeccapurple: '#663399',
    red: '#ff0000',
    rosybrown: '#bc8f8f',
    royalblue: '#4169e1',
    saddlebrown: '#8b4513',
    salmon: '#fa8072',
    sandybrown: '#f4a460',
    seagreen: '#2e8b57',
    seashell: '#fff5ee',
    sienna: '#a0522d',
    silver: '#c0c0c0',
    skyblue: '#87ceeb',
    slateblue: '#6a5acd',
    slategray: '#708090',
    snow: '#fffafa',
    springgreen: '#00ff7f',
    steelblue: '#4682b4',
    tan: '#d2b48c',
    teal: '#008080',
    thistle: '#d8bfd8',
    tomato: '#ff6347',
    turquoise: '#40e0d0',
    violet: '#ee82ee',
    wheat: '#f5deb3',
    white: '#ffffff',
    whitesmoke: '#f5f5f5',
    yellow: '#ffff00',
    yellowgreen: '#9acd32',
  };

  if (typeof colours[colour.toLowerCase()] != 'undefined')
    return colours[colour.toLowerCase()];

  return false;
};

/**
 * get primary color hex, as per selected by organisation
 */
export const getPrimaryColor = (opacity: number = 1) => {
  const primaryColor: string =
    path(
      ['userReducer', 'user', 'organisationId', 0, 'theme'],
      store.getState(),
    ) || '#804AFF';

  let toBeReturn = primaryColor;
  if (opacity < 1) {
    try {
      toBeReturn = hexToRgbA(primaryColor, opacity);
    } catch (e) {
      try {
        toBeReturn = hexToRgbA(getHexColor(primaryColor), opacity);
      } catch (ex) {}
    }
  }

  return toBeReturn;
};

/**
 * logging out user
 */
export const logoutUser = (navigation: any) => {
  navigation.navigate(SCREEN_ROUTES.HOME_SCREEN);

  setTimeout(() => {
    StorageHandler.clearAll();
    dispatchToStore(addUser(null));
  }, 30);
};

/**
 * socket connection
 */
export const socket = () => {
  return io(BASE_URL, {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: Infinity,
  });
};
