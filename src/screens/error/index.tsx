import {
  View,
  BackHandler,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {path} from 'ramda';
import React, {useEffect} from 'react';

import {translate} from '../../i18n';
import {Icon} from '../../components/icon';
import {Button} from '../../components/button';
import {ErrorScreenStyles as styles} from './styles';
import {store} from '../../redux/store/configureStore';
import {ICON_TYPES} from '../../components/icon/constants';
import {Text, TextPresetStyles} from '../../components/text';
import {getPrimaryColor, images, SCREEN_ROUTES} from '../../utility';
import {BoostrScreen, HeaderTypes} from '../../components/boostr-screen';

/**
 * An Interface for possible props for the ErrorScreen
 */
interface IActivityScreenProps {
  /**
   * Prop used to provide the navigation stuff
   */
  navigation: any;
}

/**
 * ErrorScreen - A screen which used to show when any error
 * occurred while fetching data from server
 */
export const ErrorScreen = (props: IActivityScreenProps) => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
  }, []);

  useEffect(() => {
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, []);

  const onBackPress = () => {
    const data = path(['route', 'params', 'data'], props);
    const shouldGo2LevelBack: boolean = path(['shouldGo2LevelBack'], data);

    /**
     * Moving 2 level back
     */
    if (shouldGo2LevelBack) {
      props.navigation.pop(2);
    } else {
      props.navigation.goBack(null);
    }

    return true;
  };

  /**
   * Calling api again oin try again
   */
  const onTryAgainClick = () => {
    const data = path(['route', 'params', 'data'], props);
    const reTryCallback: any = path(['reTryCallback'], data);

    props.navigation.goBack(null);
    reTryCallback();
  };
  return (
    <BoostrScreen
      navigation={props.navigation}
      headerTransparent
      onLeftComponentClick={onBackPress}
      headerType={HeaderTypes.NORMAL_CROSS}>
      <ImageBackground
        style={styles.mainContainerStyle}
        source={images.errorBg}>
        <View
          style={[
            styles.iconContainerStyle,
            {backgroundColor: getPrimaryColor()},
          ]}>
          <Icon icon={ICON_TYPES.ERROR} style={styles.iconStyle} />
        </View>
        <Text
          preset={TextPresetStyles.TITLE_HUGE}
          style={[styles.errorTextStyle, {color: getPrimaryColor()}]}
          tx={'common.error!'}
        />
        <Text
          preset={TextPresetStyles.SUB_HEADLINE_REGULAR}
          text={
            path(['route', 'params', 'data', 'message'], props) ||
            translate('common.errorDescription')
          }
          style={styles.centerTextStyle}
        />

        <Button
          tx={'common.tryAgain'}
          onPress={onTryAgainClick}
          style={styles.buttonStyle}
        />

        {path(['userReducer', 'user', 'sessionId'], store.getState()) ? (
          <TouchableOpacity
            onPress={() => {
              props.navigation.popToTop();
              props.navigation.navigate(SCREEN_ROUTES.HOME_SCREEN);
            }}>
            <Text
              preset={TextPresetStyles.SUB_HEADLINE}
              tx={'common.backToHome'}
              style={{color: getPrimaryColor()}}
            />
          </TouchableOpacity>
        ) : null}
      </ImageBackground>
    </BoostrScreen>
  );
};
