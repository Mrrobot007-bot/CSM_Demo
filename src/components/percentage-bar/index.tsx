import {path} from 'ramda';
import {View, ViewStyle} from 'react-native';
import React, {FC, ReactElement} from 'react';

import {color} from '../../theme';
import {Text, TextPresetStyles} from '../text';
import {DEVICE_WIDTH, getPrimaryColor} from '../../utility';
import {RewardPercentageBarStyles as styles} from './styles';

/**
 * An Enum used to define multiple types of percentage bar
 */
export enum PercentageBarTypes {
  WIDE = 'wide',
  THIN = 'thin',
}

/**
 * An Interface for possible props for the Percentage Bar component
 */
interface percentageBarProps {
  /**
   * The BackgroundColor of the progress bar.
   */
  progressBarBackgroundColor?: string;

  /**
   * The BackgroundColor of the progress bar.
   */
  activeBarBackgroundColor?: string;

  /**
   * Height of the progress bar
   */
  height?: number | string;

  /**
   * width of the progress bar
   */
  width?: number | string;

  /**
   * Active width % of the progress bar
   */
  activePercentage?: string;
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle | object;

  /**
   * An optional left side text.
   */
  text?: string;

  /**
   * An optional prop used to show the outside text as percentage
   */
  isPercentageTextOutside?: boolean;

  /**
   * An prop used to determine the selected Percentage bar
   */
  barType?: PercentageBarTypes;

  /**
   * An prop used to determine disabled color for percentage bar
   */
  disabledColor?: string;

  /**
   * An prop used to override the outer style of bar
   */
  greyBarOuterStyle?: ViewStyle;

  /**
   * An prop used to determine weather we have to show percentage text with bar
   */
  isFloatingPercentage?: boolean;
}

/**
 * PercentageBar - A component which is used to show
 * different kind Percentage / Progress bar for boostr app
 */
export const PercentageBar: FC<percentageBarProps> = (
  props: percentageBarProps,
): ReactElement => {
  let activePercentage = 0;
  try {
    activePercentage = parseFloat(props.activePercentage.replace('%', ''));
  } catch (e) {}
  return (
    <View style={[styles.rowStyle, path(['style'], props)]}>
      {path(['text'], props) && (
        <Text
          text={path(['text'], props)}
          preset={TextPresetStyles.MINI_FONT}
          style={{
            color: path(['activeBarBackgroundColor'], props),
            width: DEVICE_WIDTH * 0.122,
          }}
        />
      )}
      <View style={styles.mainContainerStyle}>
        {path(['isPercentageTextOutside'], props) ? (
          <View
            style={[
              styles.textContainerStyle,
              path(['barType'], props) === PercentageBarTypes.THIN &&
                styles.thinTextContainerStyle,
            ]}>
            <Text
              preset={TextPresetStyles.MINI_FONT}
              style={[
                styles.percentageTextStyles,
                {
                  color: path(['activeBarBackgroundColor'], props),
                  marginBottom: -5,
                  maxWidth: props.isFloatingPercentage
                    ? path(['activePercentage'], props)
                    : '100%',
                },
              ]}
              text={path(['activePercentage'], props)}
            />
          </View>
        ) : (
          <View
            style={[
              styles.textContainerStyle,
              styles.absoluteViewStyle,
              path(['barType'], props) === PercentageBarTypes.THIN &&
                styles.thinTextContainerStyle,
              {
                width: path(['activePercentage'], props)
                  ? path(['activePercentage'], props)
                  : 0,
              },
            ]}>
            <Text
              preset={TextPresetStyles.MINI_FONT}
              style={styles.percentageTextStyles}
              text={
                activePercentage > 10 ? path(['activePercentage'], props) : ''
              }
            />
          </View>
        )}

        <View
          style={[
            styles.greyBarStyle,
            path(['barType'], props) === PercentageBarTypes.THIN &&
              styles.greyBarThinStyle,
            ,
            {
              backgroundColor:
                path(['disabledColor'], props) || color.palette.grey6,
            },
            props.greyBarOuterStyle,
          ]}
        />
        <View
          style={[
            styles.barStyle,
            path(['barType'], props) === PercentageBarTypes.THIN &&
              styles.thinBarStyle,
            !path(['isPercentageTextOutside'], props) && styles.normalBarStyle,
            {
              width: path(['activePercentage'], props)
                ? path(['activePercentage'], props)
                : 0,
              backgroundColor: path(['activeBarBackgroundColor'], props)
                ? path(['activeBarBackgroundColor'], props)
                : getPrimaryColor(),
            },
          ]}
        />
      </View>
    </View>
  );
};
