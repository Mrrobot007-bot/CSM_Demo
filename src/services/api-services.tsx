import {LOADING} from '../redux/constants';
import {Dispatch} from 'redux';
import Axios from './api-config';
import {AxiosError, AxiosResponse} from 'axios';
import {path} from 'ramda';
import {STATUS_CODES} from './status-codes';
import {SCREEN_ROUTES, showMessage} from '../utility';
import {addUser} from '../redux/actions/user-actions';
import StorageHandler from '../utility/storage-helper';
import {translate} from '../i18n';
import {store} from '../redux/store/configureStore';
import {API_URLS} from './urls';

export const deleteApiCall =
  (
    url: string,
    formdata: object = {},
    navigation: any = null,
    reTryCallback: any = null,
  ) =>
  (dispatch: Dispatch) =>
    new Promise((resolve, reject) => {
      console.log('url==>', url, formdata);
      dispatch({type: LOADING, isLoading: true});
      return Axios.delete(url, {
        headers: path(['userReducer', 'user', 'sessionId'], store.getState())
          ? {
              'Content-Type': 'application/json',
              authentication: path(
                ['userReducer', 'user', 'sessionId'],
                store.getState(),
              ),
            }
          : {
              'Content-Type': 'application/json',
            },
        data: {
          ...formdata,
        },
      })
        .then((responseJson: AxiosResponse) => {
          dispatch({type: LOADING, isLoading: false});
          console.log(responseJson.data);

          const data = {
            reTryCallback: reTryCallback,
          };
          const apiResponse = responseJson.data;
          const statusCode = path(['statusCode'], apiResponse);
          if (statusCode === STATUS_CODES.STATUS_OK) {
            resolve(responseJson.data);
          } else if (statusCode === STATUS_CODES.BAD_REQUEST) {
            navigation &&
              navigation.navigate(SCREEN_ROUTES.ERROR_SCREEN, {
                data: {
                  ...data,
                  message: path(['data', 'message'], responseJson),
                },
              });
            resolve({message: path(['data', 'message'], responseJson)});
          } else if (statusCode === STATUS_CODES.UNAUTHORIZED) {
            showMessage(translate('common.sessionExpired'));
            dispatch(addUser(null));
            StorageHandler.clearAll();
          } else if (statusCode === STATUS_CODES.NOT_FOUND) {
            navigation &&
              navigation.navigate(SCREEN_ROUTES.ERROR_SCREEN, {
                data: {
                  ...data,
                  message: path(['data', 'message'], responseJson),
                },
              });

            resolve({message: path(['data', 'message'], responseJson)});
          } else if (
            statusCode === STATUS_CODES.INTERNAL_SERVER_ERROR ||
            statusCode === STATUS_CODES.SERVICE_UNAVAILABLE
          ) {
            navigation &&
              navigation.navigate(SCREEN_ROUTES.ERROR_SCREEN, {
                data: {
                  ...data,
                  message: translate('modules.errorMessages.serverError'),
                },
              });

            resolve({message: translate('modules.errorMessages.serverError')});
          } else {
            navigation &&
              navigation.navigate(SCREEN_ROUTES.ERROR_SCREEN, {
                data: {
                  ...data,
                  message: path(['data', 'message'], responseJson),
                },
              });
            resolve({message: path(['data', 'message'], responseJson)});
          }
        })
        .catch((error: AxiosError) => {
          dispatch({type: LOADING, isLoading: false});
          const data = {
            reTryCallback: reTryCallback,
          };
          let message: string = path(['message'], error) || '';
          message = message.includes('400')
            ? translate('modules.errorMessages.somethingWentWrong')
            : message;

          navigation &&
            navigation.navigate(SCREEN_ROUTES.ERROR_SCREEN, {
              data: {...data, message: message},
            });

          resolve({message: message});
        });
    });

export const postApiCall =
  (
    url: string,
    formdata: object = {},
    shouldShowProgressBar: boolean = true,
    navigation: any = null,
    reTryCallback: any = null,
    shouldGo2LevelBack: boolean = false,
  ) =>
  (dispatch: Dispatch) =>
    new Promise((resolve, reject) => {
      console.log('url==>', url, formdata);
      if (shouldShowProgressBar) {
        dispatch({type: LOADING, isLoading: true});
      }

      const data = {
        reTryCallback: reTryCallback,
        shouldGo2LevelBack: shouldGo2LevelBack,
      };

      return Axios.post(url, formdata, {
        headers: path(['userReducer', 'user', 'sessionId'], store.getState())
          ? {
              'Content-Type': 'application/json',
              authentication: path(
                ['userReducer', 'user', 'sessionId'],
                store.getState(),
              ),
            }
          : {
              'Content-Type': 'application/json',
            },
      })
        .then((responseJson: AxiosResponse) => {
          dispatch({type: LOADING, isLoading: false});
          console.log(responseJson.data);
          const apiResponse = responseJson.data;

          const statusCode = path(['statusCode'], apiResponse);
          if (statusCode === STATUS_CODES.STATUS_OK) {
            resolve(responseJson.data);
          } else if (
            statusCode === STATUS_CODES.NO_CONTENT &&
            (url === API_URLS.REGISTER || url === API_URLS.LOGIN)
          ) {
            resolve(responseJson.data);
          } else if (statusCode === STATUS_CODES.BAD_REQUEST) {
            navigation &&
              navigation.navigate(SCREEN_ROUTES.ERROR_SCREEN, {
                data: {
                  ...data,
                  message: path(['data', 'message'], responseJson),
                },
              });
            resolve({message: path(['data', 'message'], responseJson)});
          } else if (statusCode === STATUS_CODES.UNAUTHORIZED) {
            showMessage(translate('common.sessionExpired'));
            dispatch(addUser(null));
            StorageHandler.clearAll();
          } else if (statusCode === STATUS_CODES.NOT_FOUND) {
            navigation &&
              navigation.navigate(SCREEN_ROUTES.ERROR_SCREEN, {
                data: {
                  ...data,
                  message: path(['data', 'message'], responseJson),
                },
              });

            resolve({message: path(['data', 'message'], responseJson)});
          } else if (
            statusCode === STATUS_CODES.INTERNAL_SERVER_ERROR ||
            statusCode === STATUS_CODES.SERVICE_UNAVAILABLE
          ) {
            navigation &&
              navigation.navigate(SCREEN_ROUTES.ERROR_SCREEN, {
                data: {
                  ...data,
                  message: translate('modules.errorMessages.serverError'),
                },
              });

            resolve({message: translate('modules.errorMessages.serverError')});
          } else {
            navigation &&
              navigation.navigate(SCREEN_ROUTES.ERROR_SCREEN, {
                data: {
                  ...data,
                  message: path(['data', 'message'], responseJson),
                },
              });
            resolve({message: path(['data', 'message'], responseJson)});
          }
        })
        .catch((error: AxiosError) => {
          dispatch({type: LOADING, isLoading: false});
          const data = {
            reTryCallback: reTryCallback,
            shouldGo2LevelBack: shouldGo2LevelBack,
          };
          let message: string = path(['message'], error) || '';
          message = message.includes('400')
            ? translate('modules.errorMessages.somethingWentWrong')
            : message;

          navigation &&
            navigation.navigate(SCREEN_ROUTES.ERROR_SCREEN, {
              data: {...data, message: message},
            });

          resolve({message: message});
        });
    });

export const putApiCall =
  (
    url: string,
    formdata: object = {},
    navigation: any = null,
    reTryCallback: any = null,
  ) =>
  (dispatch: Dispatch) =>
    new Promise((resolve, reject) => {
      console.log('url==>', url, formdata);

      dispatch({type: LOADING, isLoading: true});
      return Axios.put(url, formdata, {
        headers: path(['userReducer', 'user', 'sessionId'], store.getState())
          ? {
              'Content-Type': 'application/json',
              authentication: path(
                ['userReducer', 'user', 'sessionId'],
                store.getState(),
              ),
            }
          : {
              'Content-Type': 'application/json',
            },
      })
        .then(responseJson => {
          console.log('responseJson', responseJson);
          dispatch({type: LOADING, isLoading: false});
          console.log('Data==>', responseJson.data);
          const apiResponse = responseJson.data;
          const statusCode = path(['statusCode'], apiResponse);
          const data = {
            reTryCallback: reTryCallback,
          };
          if (statusCode === STATUS_CODES.STATUS_OK) {
            resolve(responseJson.data);
          } else if (statusCode === STATUS_CODES.BAD_REQUEST) {
            navigation.navigate(SCREEN_ROUTES.ERROR_SCREEN, {
              data: {
                ...data,
                message: path(['data', 'message'], responseJson),
              },
            });
            resolve(translate('modules.errorMessages.badRequest'));
          } else if (statusCode === STATUS_CODES.UNAUTHORIZED) {
            showMessage(translate('common.sessionExpired'));
            dispatch(addUser(null));
            StorageHandler.clearAll();
          } else if (statusCode === STATUS_CODES.NOT_FOUND) {
            navigation.navigate(SCREEN_ROUTES.ERROR_SCREEN, {
              data: {
                ...data,
                message: path(['data', 'message'], responseJson),
              },
            });
            resolve(translate('modules.errorMessages.notFound'));
          } else if (
            statusCode === STATUS_CODES.INTERNAL_SERVER_ERROR ||
            statusCode === STATUS_CODES.SERVICE_UNAVAILABLE
          ) {
            navigation.navigate(SCREEN_ROUTES.ERROR_SCREEN, {
              data: {
                ...data,
                message: translate('modules.errorMessages.serverError'),
              },
            });
            resolve(translate('modules.errorMessages.serverError'));
          } else {
            navigation.navigate(SCREEN_ROUTES.ERROR_SCREEN, {
              data: {
                ...data,
                message: path(['data', 'message'], responseJson),
              },
            });
            resolve(translate('modules.errorMessages.unknownError'));
          }
        })
        .catch(error => {
          dispatch({type: LOADING, isLoading: false});
          const data = {
            reTryCallback: reTryCallback,
          };
          navigation &&
            navigation.navigate(SCREEN_ROUTES.ERROR_SCREEN, {
              data: {
                ...data,
                message: path(['message'], error),
              },
            });
          reject(error);
        });
    });

export const getApiCall =
  (
    url: string,
    navigation: any = null,
    reTryCallback: any = null,
    shouldGo2LevelBack: boolean = false,
    isLargeCacheEnabled: boolean = false,
    isSmallCacheEnabled: boolean = false,
    shouldHideLoader: boolean = false,
    sessionId: string = null,
  ) =>
  (dispatch: Dispatch) =>
    new Promise((resolve, reject) => {
      const auth =
        path(['userReducer', 'user', 'sessionId'], store.getState()) ||
        sessionId;
      dispatch({type: LOADING, isLoading: !shouldHideLoader});
      Axios.get(url, {
        headers: auth
          ? {
              'Content-Type': 'application/json',
              authentication: auth,
            }
          : {
              'Content-Type': 'application/json',
            },
        cache: {
          maxAge:
            isLargeCacheEnabled || isSmallCacheEnabled ? 1 * 60 * 1000 : 0,
          exclude: {query: false},
          ignoreCache: !isSmallCacheEnabled,
        },
      })
        .then((responseJson: AxiosResponse) => {
          dispatch({type: LOADING, isLoading: false});
          console.log('get Data==>', responseJson.data);
          const data = {
            reTryCallback: reTryCallback,
            shouldGo2LevelBack: shouldGo2LevelBack,
          };
          const apiResponse = responseJson.data;
          const statusCode = path(['statusCode'], apiResponse);
          if (statusCode === STATUS_CODES.STATUS_OK) {
            resolve(responseJson.data);
          } else if (statusCode === STATUS_CODES.BAD_REQUEST) {
            navigation &&
              navigation.navigate(SCREEN_ROUTES.ERROR_SCREEN, {
                data: {
                  ...data,
                  message: path(['data', 'message'], responseJson),
                },
              });
            resolve(translate('modules.errorMessages.badRequest'));
          } else if (statusCode === STATUS_CODES.UNAUTHORIZED) {
            showMessage(translate('common.sessionExpired'));
            dispatch(addUser(null));
            StorageHandler.clearAll();
          } else if (statusCode === STATUS_CODES.NOT_FOUND) {
            navigation &&
              navigation.navigate(SCREEN_ROUTES.ERROR_SCREEN, {
                data: {
                  ...data,
                  message: path(['data', 'message'], responseJson),
                },
              });
            resolve(translate('modules.errorMessages.notFound'));
          } else if (
            statusCode === STATUS_CODES.INTERNAL_SERVER_ERROR ||
            statusCode === STATUS_CODES.SERVICE_UNAVAILABLE
          ) {
            navigation &&
              navigation.navigate(SCREEN_ROUTES.ERROR_SCREEN, {
                data: {
                  ...data,
                  message: translate('modules.errorMessages.serverError'),
                },
              });
            resolve(translate('modules.errorMessages.serverError'));
          } else {
            navigation &&
              navigation.navigate(SCREEN_ROUTES.ERROR_SCREEN, {
                data: {
                  ...data,
                  message: path(['data', 'message'], responseJson),
                },
              });
            resolve(translate('modules.errorMessages.unknownError'));
          }
        })
        .catch((error: AxiosError) => {
          dispatch({type: LOADING, isLoading: false});
          const data = {
            reTryCallback: reTryCallback,
            shouldGo2LevelBack: shouldGo2LevelBack,
          };
          navigation &&
            navigation.navigate(SCREEN_ROUTES.ERROR_SCREEN, {
              data: {
                ...data,
                message: path(['message'], error),
              },
            });
          reject(error);
        });
    });
