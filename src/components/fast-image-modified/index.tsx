import React from 'react';
import {
  View,
  Image,
  ViewStyle,
  ImageStyle,
  RegisteredStyle,
} from 'react-native';

import {FastImageModifiedStyles as styles} from './styles';

/**
 * An Interface for possible props for the FastImageModified component
 */

interface IFastImageModifiedProps {
  /**
   * Default image if url not working
   */
  defaultImage: any;

  /**
   * A style override useful for padding & margin.
   */
  style: ViewStyle | ImageStyle | RegisteredStyle<any> | any;

  /**
   * Url to load image
   */
  url: string;

  defaultImageStyle?: ImageStyle;
}

/**
 * FastImageModified - A component used to define default
 * image as a loader or placeholder when a image downloading from url
 */
export const FastImageModified: React.FC<IFastImageModifiedProps> = (
  props: IFastImageModifiedProps,
) => {
  const {style, defaultImage, url} = props;

  return (
    <View style={styles.containerStyle}>
      <Image source={{uri: url}} style={[style]} />
      <Image
        style={[style, styles.imageStyle, props.defaultImageStyle]}
        source={defaultImage}
      />
    </View>
  );
};
