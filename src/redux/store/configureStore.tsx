import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import rootReducer from '../reducers/index';

const persistConfig = {
  key: 'root', //this value will define what will be the key that we will use as identifier to save the persisted information
  storage: AsyncStorage,
};

//using redux with local storage
const persistedReducer = persistReducer(persistConfig, rootReducer);

//creating store now
export const store = createStore(
  persistedReducer,
  undefined,
  applyMiddleware(thunk), //middleware to dispatch action
);

export const persister = persistStore(store);
