import {StyleSheet, ViewStyle} from 'react-native';

import {color, spacingPresets} from '../../theme';
import {DEVICE_WIDTH} from '../../utility/constants';
import {BaseStyles} from '../../utility/base-styles';

const styles = StyleSheet.create<{
  twoButtonStyle: ViewStyle;
  headerTextStyle: ViewStyle;
  singleButtonStyle: ViewStyle;
  modalContentStyle: ViewStyle;
  buttonsBorderStyle: ViewStyle;
  descriptionTextStyle: ViewStyle;
  singleButtonContainerStyle: ViewStyle;
  buttonsBorderStyleForSingleButton: ViewStyle;
}>({
  twoButtonStyle: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftColor: color.palette.grey6,
    paddingVertical: spacingPresets.smaller,
  },
  headerTextStyle: {
    textAlign: 'center',
    color: color.palette.black,
    marginBottom: spacingPresets.small,
    marginHorizontal: DEVICE_WIDTH * 0.045,
  },

  singleButtonStyle: {
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    margin: spacingPresets.medium,
    padding: spacingPresets.medium,
    borderColor: color.palette.black_10,
    backgroundColor: color.palette.black_40,
  },
  modalContentStyle: {
    borderRadius: 14,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: DEVICE_WIDTH * 0.91,
    marginTop: spacingPresets.large,
    paddingTop: spacingPresets.large,
    borderColor: color.palette.black_10,
  },

  buttonsBorderStyle: {
    width: '100%',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacingPresets.smaller,
    borderTopColor: color.palette.grey6,
  },

  descriptionTextStyle: {
    marginBottom: spacingPresets.small,
    marginHorizontal: DEVICE_WIDTH * 0.045,
    paddingHorizontal: spacingPresets.small,
  },

  singleButtonContainerStyle: {
    width: '100%',
    borderTopWidth: 1,
    marginTop: spacingPresets.smaller,
    borderTopColor: color.palette.grey4,
  },
  buttonsBorderStyleForSingleButton: {
    width: '50%',
    marginTop: 0,
    alignSelf: 'center',
    justifyContent: 'center',
    borderTopColor: 'transparent',
  },
});

export const DefaultDialogStyles = {...BaseStyles, ...styles};
