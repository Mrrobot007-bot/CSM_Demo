import {path} from 'ramda';
import {View, ViewStyle} from 'react-native';
import {WebView} from 'react-native-webview';
import {StackActions} from '@react-navigation/native';
import React, {FC, ReactElement, useState, useRef} from 'react';

import {Icon} from '../icon';
import {Button} from '../button';
import {ProgressBar} from '../progress-bar';
import {getPrimaryColor, SCREEN_ROUTES} from '../../utility';
import {ICON_TYPES} from '../icon/constants';
import {Text, TextPresetStyles} from '../text';
import {WebViewStyles as styles} from './styles';
import {BoostrScreen, HeaderTypes} from '../boostr-screen';
import {useIsFocused, useNavigation} from '@react-navigation/core';

/**
 * An Interface for possible props for the CustomWebView component
 */
interface WebViewProps {
  /**
   * To choose webview type from available different types, i.e (html, url)
   */
  data?: string;

  /**
   * To choose webview  url
   */
  link?: string;
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle | object;
}

/**
 * Component to show Webview
 */
const CustomWebView: FC<WebViewProps> = (props: WebViewProps): ReactElement => {
  const [isLoading, setIsLoading] = useState(true);
  const [canWebViewGoBack, setCanWebViewGoBack] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(props.link);
  const [error, setError] = useState(null);
  const webViewRef = useRef(null);
  const navigation = useNavigation();

  const onTryAgainClick = () => {
    navigation.dispatch(
      StackActions.replace(SCREEN_ROUTES.WEB_VIEW, {
        link: path(['route', 'params', 'link'], props),
        name: path(['route', 'params', 'name'], props),
      }),
    );
  };

  const webViewContainerStyle = [styles.webviewContainer, props.style];
  const onLeftComponentClick = () => {
    try {
      canWebViewGoBack ||
      currentUrl !== path(['route', 'params', 'link'], props)
        ? webViewRef.current.goBack()
        : navigation.goBack();
    } catch (e) {
      navigation.goBack();
    }
  };
  return (
    <BoostrScreen
      navigation={navigation}
      headerType={useIsFocused() ? HeaderTypes.NORMAL_CROSS : HeaderTypes.NONE}
      onLeftComponentClick={onLeftComponentClick}
      title={path(['route', 'params', 'name'], props)}>
      {!error ? (
        <View style={{flex: 1}}>
          <WebView
            ref={webViewRef}
            useWebKit={true}
            allowsInlineMediaPlayback={true}
            style={webViewContainerStyle}
            onLoadStart={syntheticEvent => {
              const {nativeEvent} = syntheticEvent;
              setCanWebViewGoBack(nativeEvent.canGoBack);
              setCurrentUrl(nativeEvent.url);
            }}
            onLoad={() => {
              setIsLoading(true);
            }}
            onLoadEnd={() => setIsLoading(false)}
            onError={syntheticEvent =>
              setError(path(['nativeEvent', 'description'], syntheticEvent))
            }
            source={{uri: path(['route', 'params', 'link'], props)}}
          />

          {isLoading && <View style={styles.innerContainer} />}
          {isLoading && <ProgressBar />}
        </View>
      ) : (
        <View style={styles.mainContainerStyle}>
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
            text={error}
            style={styles.centerTextStyle}
          />

          <Button
            tx={'common.tryAgain'}
            onPress={onTryAgainClick}
            style={styles.buttonStyle}
          />
        </View>
      )}
    </BoostrScreen>
  );
};

const defaultProps: WebViewProps = {
  data: '',
};

CustomWebView.defaultProps = defaultProps;
export {CustomWebView};
