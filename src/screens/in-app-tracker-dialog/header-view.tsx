import React from 'react';
import {View} from 'react-native-animatable';
import {useDispatch} from 'react-redux';

import {Icon} from '../../components/icon';
import {getPrimaryColor} from '../../utility';
import {InAppTrackerStyles as styles} from './styles';
import {ICON_TYPES} from '../../components/icon/constants';
import {Text, TextPresetStyles} from '../../components/text';
import {showTrackerDialog} from '../../redux/actions/tracker-action';

/**
 * function is show headerView of the tracker
 * @returns 
 */
export const HeaderView = () => {
  const dispatch = useDispatch();
  return (
    <View style={styles.headerContainerStyle}>
      <Icon
        icon={ICON_TYPES.CROSS}
        onIconClick={() => {
          dispatch(showTrackerDialog({isVisible: false}));
        }}
        style={{...styles.crossIconStyle, tintColor: getPrimaryColor()}}
      />
      <Text
        preset={TextPresetStyles.HEADLINE_DARK}
        tx={'modules.inAppTracking.tracking'}
      />
      <View style={styles.crossIconStyle} />
    </View>
  );
};
