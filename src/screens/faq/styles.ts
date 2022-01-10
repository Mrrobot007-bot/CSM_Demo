import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {color, spacingPresets} from '../../theme';
import {BaseStyles} from '../../utility/base-styles';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utility';
import { wpx } from '../../utility/responsive';

const styles = StyleSheet.create<{
  lineView: ViewStyle;
  questionTextView:ViewStyle;
  sectionTitleStyle: ViewStyle;
  mainContainerStyle: ViewStyle;
  descriptionTextStyle: TextStyle;
  headingMainContainer: ViewStyle;
  headingInnerContainer: ViewStyle;
  arrowIconFocusedStyle: ImageStyle;
  arrowIconUnFocusedStyle: ImageStyle;
  descriptionTextContainer: ViewStyle;
  questionFocusedTextStyle: TextStyle;
  descriptionContainerStyle: ViewStyle;
  questionUnFocusedTextStyle: TextStyle;
}>({
  mainContainerStyle: {
    flex: 1,
    backgroundColor: color.palette.lightYellow,
  },
  sectionTitleStyle: {
    marginTop: DEVICE_HEIGHT * 0.035,
    marginBottom: spacingPresets.small,
  },
  questionTextView:{
    width:wpx(290)
   },
  descriptionContainerStyle: {
    zIndex: -1,
    marginTop: -5,
    alignSelf: 'center',
    borderBottomEndRadius: 10,
    width: DEVICE_WIDTH * 0.91,
    borderBottomStartRadius: 10,
    backgroundColor: color.palette.white,
    paddingBottom: DEVICE_HEIGHT * 0.024,
  },
  descriptionTextContainer: {
    paddingHorizontal: DEVICE_WIDTH * 0.045,
  },
  descriptionTextStyle: {
    color: color.palette.grey3,
    marginTop: DEVICE_HEIGHT * 0.023,
  },
  headingMainContainer: {
    zIndex: 0,
    borderRadius: 15,
    marginBottom: -3,
    overflow: 'hidden',
    alignSelf: 'center',
    justifyContent: 'center',
    width: DEVICE_WIDTH * 0.91,
    height: DEVICE_HEIGHT * 0.074,
    marginTop: DEVICE_HEIGHT * 0.012,
  },
  headingInnerContainer: {
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    backgroundColor: color.palette.white,
    // backgroundColor:color.palette.darkRed,
    paddingHorizontal: DEVICE_WIDTH * 0.037,
  },
  arrowIconFocusedStyle: {
    width: DEVICE_WIDTH * 0.05,
    height: DEVICE_WIDTH * 0.05,
  },

  arrowIconUnFocusedStyle: {
    width: DEVICE_WIDTH * 0.05,
    height: DEVICE_WIDTH * 0.05,
    tintColor: color.palette.grey3,
  },

  lineView: {
    borderTopWidth: 1,
    marginTop: DEVICE_HEIGHT * 0.02,
  },

  questionFocusedTextStyle: {},

  questionUnFocusedTextStyle: {
    color: color.palette.black,
  },
});

export const FAQScreenStyles = {...BaseStyles, ...styles};
