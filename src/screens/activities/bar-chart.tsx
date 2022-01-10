import React from 'react';
import {View} from 'react-native';

import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
} from 'victory-native';
import {color} from '../../theme';
import {ActivitiesStyles as styles} from './styles';
import {DEVICE_WIDTH, getPrimaryColor} from '../../utility';
import {AppTextStyles, Text, TextPresetStyles} from '../../components/text';

/**
 * An Interface for possible props for the BarChart component
 */
interface IBarChartProps {
  /**
   * A prop used to pass data for bar chart
   */
  data: any;

  /**
   * Bar chart label text
   */
  mainLabelText: string;

  /**
   * Key name from where the data will fetch on x-axis
   */
  xItemKey: string;

  /**
   * Key name from where the data will fetch on y-axis
   */
  yItemKey: string;
}

/**
 * BarChart - A component used to show bar graph used in my activities section
 */
export const BarChart = (props: IBarChartProps) => {
  return (
    <View style={styles.mainStyle}>
      <Text
        preset={TextPresetStyles.MINI_FONT_REGULAR}
        style={styles.barTypeLabelStyle}>
        {props.mainLabelText}
      </Text>
      <View>
        <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
          <VictoryAxis
            style={{
              axis: {stroke: color.palette.grey6, strokeWidth: 1},
              ticks: {size: 0},
              tickLabels: {
                ...AppTextStyles.miniFontRegular,
                ...styles.barLabelStyle,
              },
            }}
          />

          <VictoryAxis
            dependentAxis
            style={{
              axis: {stroke: color.palette.grey6, strokeWidth: 1},
              ticks: {size: 0},
              tickLabels: {
                ...AppTextStyles.miniFontRegular,
                ...styles.barLabelStyle,
              },
            }}
          />

          <VictoryBar
            cornerRadius={{
              topLeft: DEVICE_WIDTH * 0.01,
              topRight: DEVICE_WIDTH * 0.01,
              bottomLeft: DEVICE_WIDTH * 0.01,
              bottomRight: DEVICE_WIDTH * 0.01,
            }}
            data={props.data.map(item => {
              return {
                ...item,
                steps: item.steps > 0 ? item.steps : 0.00000001,
                distance: item.distance > 0 ? item.distance : 0.00000001,
              };
            })}
            x={props.xItemKey}
            y={props.yItemKey}
            style={{
              data: {fill: getPrimaryColor(), width: DEVICE_WIDTH * 0.02},
            }}
          />
        </VictoryChart>
      </View>
    </View>
  );
};
