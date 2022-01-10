import {StyleSheet, ImageStyle, ViewStyle, TextStyle} from 'react-native';

import {color} from '../../theme';
import {BaseStyles} from '../../utility/base-styles';
import {DEVICE_WIDTH, DEVICE_HEIGHT} from '../../utility/constants';

const styles = StyleSheet.create<{
  mainContainer: ViewStyle;
  tildeIconView: ImageStyle;
  imageContainer: ImageStyle;
  topContainerStyle: ViewStyle;
  plusIconViewStyle: ImageStyle;
  titleContainerStyle: ViewStyle;
  sectionTitleContainer: ViewStyle;
  secondaryLabelTextStyle: TextStyle;
}>({
  mainContainer: {
    overflow: 'hidden',
    paddingLeft: DEVICE_WIDTH * 0.042,
    paddingRight: DEVICE_WIDTH * 0.064,
    paddingVertical: DEVICE_HEIGHT * 0.006,
    borderTopRightRadius: DEVICE_HEIGHT * 0.024,
    borderBottomRightRadius: DEVICE_HEIGHT * 0.024,
  },
  tildeIconView: {
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.06,
    height: DEVICE_WIDTH * 0.06,
    paddingRight: DEVICE_WIDTH * 0.1,
  },
  imageContainer: {
    textAlign: 'center',
    justifyContent: 'center',
    color: color.palette.lightYellow,
  },
  topContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  plusIconViewStyle: {
    width: DEVICE_WIDTH * 0.05,
    height: DEVICE_WIDTH * 0.05,
    marginRight: DEVICE_WIDTH * 0.018,
  },
  titleContainerStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: DEVICE_WIDTH * 0.043,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryLabelTextStyle: {
    marginVertical: 0,
    borderStyle: 'solid',
  },
});

export const SectionTitleStyles = {...BaseStyles, ...styles};
