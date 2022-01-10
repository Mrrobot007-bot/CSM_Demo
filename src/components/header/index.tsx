import React, {useState} from 'react';
import {ImageBackground, TextStyle, View, ViewStyle} from 'react-native';

import {Text, TextPresetStyles} from '../text';
import {HeaderStyles as styles} from './styles';
import {color, spacingPresets} from '../../theme';
import {DEVICE_HEIGHT, getPrimaryColor, images, isAndroid} from '../../utility';

/**
 * An Interface for possible props for the Header component
 */
interface HeaderProps {
  /**
   * An Optional prop used to provide any extra height if required
   */
  extraHeight?: number;

  /**
   * An Optional prop used to render a custom title component instead of text
   */
  customTitle?: React.ReactNode;

  /**
   * An Optional prop used to fix the height of header
   */
  height?: number;

  /**
   * An Optional prop used to render a long header instead of regular one
   */
  isLargeHeader?: boolean;

  /**
   * An Optional prop used to show the left header component, like back button
   */
  leftComponent?: React.ReactNode;

  /**
   * An Optional prop used to render header title text
   */
  title?: string;

  /**
   * An Optional prop used to customize title text style
   */
  titleStyle?: TextStyle;

  /**
   * An Optional prop used to show the right header component, like back button
   */
  rightComponent?: React.ReactNode;

  /**
   * An Optional prop used to hide the default back image
   */
  hideBackImage?: boolean;

  /**
   * An Optional prop used to override headerTransparent property of navigation header
   */
  headerTransparent?: boolean;

  /**
   * An Optional prop used to override the custom title style
   */
  customTitleViewStyle?: ViewStyle;
}

/**
 * Header - A Default header bar used in boostr application, it have
 * multiple types and can be configurable by passing proper props
 */
export const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const [bottomHeight] = useState(-spacingPresets.medium);
  return (
    <View style={{marginBottom: bottomHeight, marginTop: 0}}>
      <ImageBackground
        source={props.hideBackImage ? null : images.headerBack}
        imageStyle={[
          props.hideBackImage
            ? {backgroundColor: getPrimaryColor()}
            : [
                styles.mainHeaderImageStyle,
                {backgroundColor: getPrimaryColor()},
              ],
          props.headerTransparent && {backgroundColor: null},
          props.hideBackImage && {backgroundColor: color.palette.lightYellow},
        ]}
        style={[
          styles.mainHeaderContainerStyle,
          {height: props.height || DEVICE_HEIGHT * 0.084},
        ]}>
        {props.hideBackImage ? (
          <View
            style={[
              styles.hideBackImageContainerStyle,
              {backgroundColor: getPrimaryColor()},
            ]}
          />
        ) : null}
        <View
          style={[
            styles.headerContainerStyle,
            props.isLargeHeader && {
              bottom: DEVICE_HEIGHT * 0.011 + props.extraHeight,
            },
          ]}>
          <View style={[styles.leftComponentContainerStyle]}>
            {props.leftComponent}
          </View>

          <View style={styles.titleComponentContainerStyle}>
            <Text
              preset={TextPresetStyles.HEADLINE_DARK}
              text={props.title}
              numberOfLines={isAndroid ? 1 : 2}
              style={[styles.titleTextStyle, props.titleStyle]}
            />
          </View>

          <View style={styles.rightComponentContainerStyle}>
            {props.rightComponent}
          </View>
        </View>

        <View
          style={[
            styles.customTitleContainerStyle,
            props.customTitleViewStyle,
          ]}>
          {props.customTitle}
        </View>
      </ImageBackground>
    </View>
  );
};
