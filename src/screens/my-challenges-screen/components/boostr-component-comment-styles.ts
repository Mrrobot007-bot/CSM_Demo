import {StyleSheet, ViewStyle, TextStyle, ImageStyle} from 'react-native';

import {wpx} from '../../../utility/responsive';
import {color, spacingPresets} from '../../../theme';
import {BaseStyles} from '../../../utility/base-styles';
import {DEVICE_WIDTH, getPrimaryColor} from '../../../utility';

const style = StyleSheet.create<{
  sendIconStyle: ImageStyle;
  userImageStyle: ImageStyle;
  loadMoreTextStyle: TextStyle;
  loadMoreIconStyle: ImageStyle;
  userNameContainerStyle: ViewStyle;
  itemMainContainerStyle: ViewStyle;
  loadMoreContainerStyle: ViewStyle;
  firstRowContainerStyle: ViewStyle;
  writeACommentTextStyle: TextStyle;
  userCommentBoxContainerStyle: ViewStyle;
}>({
  firstRowContainerStyle: {
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: color.palette.grey7,
    paddingTop: spacingPresets.mediumPlus,
    marginTop: spacingPresets.mediumPlus,
  },

  userImageStyle: {
    width: DEVICE_WIDTH * 0.085,
    height: DEVICE_WIDTH * 0.085,
    marginRight: DEVICE_WIDTH * 0.021,
    borderRadius: DEVICE_WIDTH * 0.085,
  },

  userCommentBoxContainerStyle: {
    flex: 1,
    borderRadius: 20,
    padding: spacingPresets.none,
    backgroundColor: color.palette.grey8,
  },

  sendIconStyle: {
    width: wpx(24),
    height: wpx(24),
    tintColor: getPrimaryColor(),
    marginTop: spacingPresets.tiny,
    marginHorizontal: spacingPresets.tiny,
  },

  userNameContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  itemMainContainerStyle: {
    flexDirection: 'row',
    marginTop: spacingPresets.mediumPlus,
  },

  loadMoreContainerStyle: {
    flexDirection: 'row',
    marginTop: spacingPresets.smaller,
    borderBottomColor: color.palette.grey9,
  },
  loadMoreTextStyle: {
    fontStyle: 'italic',
  },
  loadMoreIconStyle: {
    width: wpx(14),
    height: wpx(14),
    marginLeft: spacingPresets.tiny,
  },
  writeACommentTextStyle: {
    lineHeight: 13,
  },
});
export const BoostrCommentComponentStyles = {...BaseStyles, ...style};
