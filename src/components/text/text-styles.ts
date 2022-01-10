import {Platform} from 'react-native';

import {RawAppTextStyles as commonStyles} from './text-styles-common';

export const RawAppTextStyles = Platform.select({
  ios: commonStyles,
  android: commonStyles,
});
