import * as React from 'react';
import {reduce} from 'ramda';
import {
  Text as ReactNativeText,
  TextStyle,
  TextProps as TextProperties,
  RegisteredStyle,
} from 'react-native';

import {translate} from '../../i18n';
import {AppTextStyles} from './text-presets';
import {TextFontWeightTypes} from './constants';
import {AppTextPresetName} from './text-presets';
import {isAndroid} from '../../utility/constants';
import {I18NKeyName} from '../../i18n/translation-keys';

type FontWeight = TextStyle['fontWeight'];

/**
 * An Interface for possible props for the Default Text component
 */
export interface TextProps extends TextProperties {
  /**
   * If want to show ellipsis
   */
  ellipsisRequired?: boolean;

  /**
   * Children components.
   */
  children?: React.ReactNode;

  /**
   * Text which is looked up via i18n.
   */
  tx?: I18NKeyName;

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string;

  /**
   * One of the different types of text presets.
   */
  preset?: AppTextPresetName;

  /**
   * An optional style override useful for padding & margin.
   */
  style?: TextStyle | TextStyle[] | RegisteredStyle<any>;
}

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
const Text: React.FC<TextProps> = (props: TextProps) => {
  // grab the props
  const {
    preset = 'default',
    tx,
    text,
    children,
    ellipsisRequired,
    style: styleOverride,
    ...rest
  } = props;

  // figure out which content to use
  const i18nText = tx && translate(tx);
  const content = i18nText || text || children;
  const ellipsisReq = ellipsisRequired ? ellipsisRequired : false;

  // assemble the style
  const presetToUse = AppTextStyles[preset] || AppTextStyles.default;
  let style;
  if (Array.isArray(styleOverride)) {
    style = reduce(
      (acc, term) => {
        return {...acc, ...term};
      },
      presetToUse,
      styleOverride,
    );
  } else {
    style = {...presetToUse, ...(styleOverride as Object)};
  }

  const fontWeightStyle: TextStyle = {};

  // setting the font weight style
  const weightedStyle = getFontStyleForWeight(
    style.fontFamily,
    style.fontWeight,
  );
  fontWeightStyle.fontFamily = weightedStyle.fontFamily;
  fontWeightStyle.fontWeight = weightedStyle.fontWeight;

  style = {...style, ...fontWeightStyle};

  return (
    <ReactNativeText
      {...rest}
      style={style}
      {...(ellipsisReq ? {ellipsizeMode: 'tail', numberOfLines: 1} : {})}>
      {content}
    </ReactNativeText>
  );
};

// setting the font and weight according platform and text preset
const getFontStyleForWeight = (
  fontFamily?: string,
  fontWeight?: FontWeight,
) => {
  if (fontFamily && fontFamily.includes('CircularXX')) {
    return {
      fontFamily: fontFamily,
      fontWeight: fontWeight,
    };
  }
  // For this font, map specifically to the given format (ultralight, etc)
  switch (fontWeight) {
    case TextFontWeightTypes.NORMAL:
      return {
        fontFamily: `${fontFamily}${isAndroid ? '-Regular' : ''}`,
        fontWeight: undefined,
      };
    case TextFontWeightTypes.BOLD_TEXT:
      return {fontFamily: `${fontFamily}-Bold`, fontWeight: undefined};
    case TextFontWeightTypes.THIN:
      return {
        fontFamily: `${fontFamily}-Light`,
        fontWeight: fontWeight,
      };
    case TextFontWeightTypes.LIGHT:
      return {
        fontFamily: `${fontFamily}-Light`,
        fontWeight: fontWeight,
      };
    case TextFontWeightTypes.BOOK:
      return {fontFamily: `${fontFamily}-Light`, fontWeight: undefined};
    case TextFontWeightTypes.REGULAR:
      return {
        fontFamily: `${fontFamily}${isAndroid ? '-Regular' : ''}`,
        fontWeight: undefined,
      };
    case TextFontWeightTypes.MEDIUM:
      return {
        fontFamily: `${fontFamily}${isAndroid ? '-Regular' : ''}`,
        fontWeight: fontWeight,
      };
    case TextFontWeightTypes.SEMI_BOLD:
      return {
        fontFamily: `${fontFamily}${isAndroid ? '-Regular' : ''}`,
        fontWeight: fontWeight,
      };
    case TextFontWeightTypes.BOLD:
      return {fontFamily: `${fontFamily}-Bold`, fontWeight: undefined};
    case TextFontWeightTypes.EXTRA_BOLD:
      return {fontFamily: `${fontFamily}-Bold`, fontWeight: fontWeight};
    case TextFontWeightTypes.ULTRA_BOLD:
      return {fontFamily: `${fontFamily}-Bold`, fontWeight: fontWeight};
    default: {
      return fontFamily
        ? {
            fontFamily: `${fontFamily}${isAndroid ? '-Regular' : ''}`,
            fontWeight: undefined,
          }
        : {};
    }
  }
};

export {Text};
