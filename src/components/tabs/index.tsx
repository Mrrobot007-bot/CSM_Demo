import React from 'react';
import {isAndroid, isIos} from '../../utility';
import {ImageStyle, View, ViewStyle} from 'react-native';

import {Icon} from '../icon';
import {ICON_TYPES} from '../icon/constants';
import {TabsStyles as styles} from './styles';
import {getPrimaryColor} from '../../utility';

/**
 * An Interface for possible props for the Tabs component
 */
interface TabsProps {
  /**
   * Tells tab is focused or not
   */
  focused: boolean;

  /**
   * custom icon style
   */
  iconStyle?: ImageStyle;

  /**
   * Images used inside the tab bar
   */
  image?: ICON_TYPES;

  /**
   * Tells about middle component
   */
  middle?: boolean;

  tabViewStyle?: ViewStyle;
}

/**
 * Tabs - Component used to provide the bottom Tabs
 */
export const Tabs = (props: TabsProps) => {
  // grab the props
  const {image, focused, middle, iconStyle, tabViewStyle} = props;

  return (
    <View style={[styles.tabView, tabViewStyle]}>
      <Icon
        icon={image}
        style={
          middle
            ? isIos
              ? {...styles.middleStyle, backgroundColor: getPrimaryColor()}
              : styles.middleStyle
            : iconStyle || styles.iconStyle
        }
      />

      {middle && isAndroid ? (
        <View
          style={[
            styles.androidExtraViewStyle,
            {backgroundColor: getPrimaryColor()},
          ]}
        />
      ) : null}

      {focused && !middle && <View style={styles.barStyle} />}
    </View>
  );
};
