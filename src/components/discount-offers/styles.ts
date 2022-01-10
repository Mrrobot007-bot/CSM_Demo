import {StyleSheet, ViewStyle, TextStyle} from 'react-native';

import {color} from '../../theme';
import {BaseStyles} from '../../utility/base-styles';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utility/constants';

const styles = StyleSheet.create<{
  buttonStyle: ViewStyle;
  dashLineStyle: ViewStyle;
  imageBottomView: ViewStyle;
  headingTextStyle: TextStyle;
  discountTextStyle: TextStyle;
  mainContainerStyle: ViewStyle;
  headingContainerStyle: ViewStyle;
  lightestYellowTextColor: ViewStyle;
  headingMainContainerStyles: TextStyle;
}>({
  buttonStyle: {
    backgroundColor: color.palette.black,
    marginVertical: DEVICE_HEIGHT * 0.008,
    marginHorizontal: DEVICE_WIDTH * 0.021,
  },
  dashLineStyle: {
    width: DEVICE_WIDTH * 0.01,
    height: DEVICE_HEIGHT * 0.035,
    backgroundColor: color.palette.lightYellow,
  },
  imageBottomView: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: DEVICE_WIDTH * 0.91,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: DEVICE_HEIGHT * 0.068,
    justifyContent: 'space-around',
  },
  headingTextStyle: {
    flexWrap: 'wrap',
    color: color.palette.lightYellow,
    paddingLeft: DEVICE_WIDTH * 0.032,
  },
  discountTextStyle: {
    flexWrap: 'wrap',
    paddingTop: DEVICE_HEIGHT * 0.03,
    color: color.palette.lightYellow,
    paddingLeft: DEVICE_WIDTH * 0.0426,
  },
  mainContainerStyle: {
    overflow: 'hidden',
    alignSelf: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: DEVICE_WIDTH * 0.91,
    height: DEVICE_WIDTH * 0.91 * 0.4,
  },
  headingContainerStyle: {
    overflow: 'hidden',
    alignSelf: 'center',
    position: 'absolute',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: DEVICE_WIDTH * 0.91,
    height: DEVICE_WIDTH * 0.91 * 0.4,
  },
  lightestYellowTextColor: {
    color: color.palette.lightYellow,
  },
  headingMainContainerStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: DEVICE_HEIGHT * 0.0479,
  },
});

export const DiscountOffersStyles = {...BaseStyles, ...styles};
