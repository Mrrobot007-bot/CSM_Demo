import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {color} from '../../theme';
import {DEVICE_WIDTH} from '../../utility';
import {hpx, wpx} from '../../utility/responsive';
import {BaseStyles} from '../../utility/base-styles';

const styles = StyleSheet.create<{
  grayText: TextStyle;
  smallMargin: TextStyle;
  ratingBoxStyle: ViewStyle;
  sendButtonStyle: ViewStyle;
  mainViewContainer: ViewStyle;
  mainContainerStyle: ViewStyle;
  descriptionTextView: ViewStyle;
  leastMostTextContainer: TextStyle;
  secondaryLabelTextStyle: TextStyle;
}>({
  grayText: {
    color: color.textInputPlaceHolderText,
  },
  smallMargin: {
    marginTop: hpx(8),
  },
  ratingBoxStyle: {
    width: wpx(27),
    height: hpx(27),
    borderRadius: 5,
    marginTop: wpx(24),
    marginRight: wpx(8),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonStyle: {
    marginTop: hpx(40),
  },
  mainViewContainer: {
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.91,
  },
  mainContainerStyle: {
    flex: 1,
    backgroundColor: color.palette.lightYellow,
  },
  descriptionTextView: {
    marginTop: hpx(24),
  },
  leastMostTextContainer: {
    marginTop: hpx(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondaryLabelTextStyle: {
    color: color.palette.black,
  },
});

export const ContactUsFeedbackStyles = {...BaseStyles, ...styles};
