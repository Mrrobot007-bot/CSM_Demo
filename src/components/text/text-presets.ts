import {TextStyle} from 'react-native';
import {RawAppTextStyles} from './text-styles';

// Create a type of all style names.
type AppStyleName = keyof typeof RawAppTextStyles | 'default';

// Export the AppTextStyles which will be used for text presets.
// @ts-ignore
export const AppTextStyles: {[name in AppStyleName]: TextStyle} = {
  ...RawAppTextStyles,
  // @ts-ignore
  default: {...RawAppTextStyles.bodyRegularDarkLeft},
};

// Export the type containing all final style names.
export type AppTextPresetName = AppStyleName;
