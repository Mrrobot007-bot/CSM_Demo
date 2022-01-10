import * as React from 'react';
import {
  View,
  Image,
  ViewStyle,
  ImageStyle,
  RegisteredStyle,
  TouchableOpacity,
} from 'react-native';

import {icons} from './constants';
import {IconTypes} from './constants';

const ROOT: ImageStyle = {
  resizeMode: 'contain',
};

/**
 * An Interface for possible props for the Icon component
 */
export interface IconProps {
  /**
   * Style overrides for the icon container
   */
  containerStyle?: ViewStyle | RegisteredStyle<any>;

  /**
   * The name of the icon
   */

  icon?: IconTypes;

  /**
   *  To determine, icon should be clickable or not & define Action if icon is clickable
   */
  onIconClick?: () => void;

  /**
   * Style overrides for the icon image
   */
  style?: ImageStyle | RegisteredStyle<any>;
}

/** Icon , component used to render Icon, it can be clickable or not */
const Icon: React.FC<IconProps> = (props: IconProps) => {
  const {style: styleOverride, icon, containerStyle, onIconClick} = props;
  const style: ImageStyle = {
    ...ROOT,
    ...(styleOverride as Object),
    ...(containerStyle as Object),
  };

  return icon ? (
    onIconClick ? (
      <TouchableOpacity style={containerStyle} onPress={onIconClick}>
        <Image style={style} source={icons[icon]} />
      </TouchableOpacity>
    ) : (
      <View style={containerStyle}>
        <Image resizeMode={'contain'} style={style} source={icons[icon]} />
      </View>
    )
  ) : null;
};
export {Icon};
