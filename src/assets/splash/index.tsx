import React from 'react';
import {Platform} from 'react-native';
import LottieView from 'lottie-react-native';
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  images,
  isAndroid,
  SCREEN_ROUTES,
} from '../../utility';
import FastImage from 'react-native-fast-image';
import {StackActions} from '@react-navigation/core';
// const {height, width} = Dimensions.get('screen');

export const Splash = props => {
  React.useEffect(() => {
    setTimeout(() => {
      props.navigation.dispatch(
        StackActions.replace(SCREEN_ROUTES.LOGIN_SCREEN),
      );
    }, 7200);
  }, []);
  return isAndroid ? (
    <LottieView
      source={require('./BoostrSplash.json')}
      style={{
        width: DEVICE_WIDTH,
        height: Platform.OS === 'ios' ? DEVICE_HEIGHT : null,
        alignSelf: 'center',
      }}
      autoPlay
      loop={false}
      onAnimationFinish={() => {
        props.navigation.replace(SCREEN_ROUTES.MAIN_NAVIGATOR);
      }}
    />
  ) : (
    <FastImage
      style={{width: DEVICE_WIDTH, height: DEVICE_HEIGHT}}
      source={images.splashGif}
    />
  );
};
