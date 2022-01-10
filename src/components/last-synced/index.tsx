import moment from 'moment';
import React from 'react';
import {View} from 'react-native';

import {Icon} from '../icon';
import {translate} from '../../i18n';
import {ICON_TYPES} from '../icon/constants';
import {Text, TextPresetStyles} from '../text';
import {getPrimaryColor} from '../../utility';
import {LastSyncStyles as styles} from './styles';

/**
 * LastSyncComponent - A component used to show the last sync details
 */
export const LastSyncComponent = () => {
  return (
    <View
      style={[
        styles.lastSyncContainerStyle,
        {backgroundColor: getPrimaryColor(0.05)},
      ]}>
      <Icon
        icon={ICON_TYPES.SYNC}
        style={{...styles.iconStyle, tintColor: getPrimaryColor()}}
      />
      <Text
        preset={TextPresetStyles.CAPTION_1}
        style={{color: getPrimaryColor()}}
        text={`${translate('common.lastSynced')} ${moment(new Date())
          .format('DD MMM, YYYY / hh:mma')
          .toString()}`}
      />
    </View>
  );
};
