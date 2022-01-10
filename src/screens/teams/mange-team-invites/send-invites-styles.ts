import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {hpx} from '../../../utility/responsive';
import {BaseStyles} from '../../../utility/base-styles';

const style = StyleSheet.create<{
  scrollViewStyle: ViewStyle;
  headingTextStyle: TextStyle;
  closeButtonStyle: ImageStyle;
  mainContainerStyle: ViewStyle;
}>({
  mainContainerStyle: {
    flex: 1,
    alignSelf: 'center',
  },
  closeButtonStyle: {
    width: 24,
    height: 24,
    alignSelf: 'flex-end',
  },
  scrollViewStyle: {
    flex: 1,
  },
  headingTextStyle: {
    marginTop: hpx(16),
  },
});

export const SendInvitesStyles = {...BaseStyles, ...style};
