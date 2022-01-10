import React, {FC} from 'react';
import {View, ImageBackground} from 'react-native';

import {
  images,
  kmToMiles,
  getPrimaryColor,
  isSelectedUnitKM,
} from '../../utility';
import {translate} from '../../i18n';
import {SettingScreenStyles as styles} from './styles';
import {Text, TextPresetStyles} from '../../components/text';

/**
 * An Interface for possible props for the TabContent component
 */
interface ITabContentProps {
  totalDistance: any;
  avgDistance: any;
}

/**
 * TabContent - A component used to provide the common content of crwc tabs
 */
export const TabContent: FC<ITabContentProps> = (props: ITabContentProps) => {
  return (
    <View>
      <View style={styles.tabContentMainContainerStyle}>
        <ImageBackground
          resizeMode={'cover'}
          style={styles.distanceBg}
          imageStyle={styles.bgCRWCDistanceStyle}
          source={images.bgCRWCDistance}>
          <View style={styles.totalRunContainerStyle}>
            <Text
              preset={TextPresetStyles.CAPTION_3}
              style={[styles.distanceTitleText, {color: getPrimaryColor()}]}
              tx={
                isSelectedUnitKM()
                  ? 'modules.crwc.totalKmRun'
                  : 'modules.crwc.totalMileRun'
              }
            />

            <Text
              preset={TextPresetStyles.CAPTION_3}
              style={[
                styles.distanceTitleText,
                {color: getPrimaryColor()},
                styles.distanceTextSecondary,
              ]}
              tx={
                isSelectedUnitKM()
                  ? 'modules.crwc.avgKmRun'
                  : 'modules.crwc.avgMileRun'
              }
            />
          </View>
          <View style={styles.totalRunContainerSecondaryStyle}>
            <Text
              preset={TextPresetStyles.TITLE_HUGE}
              style={[styles.distanceTitleText, {color: getPrimaryColor()}]}
              text={
                isSelectedUnitKM()
                  ? `${props.totalDistance} ${translate('common.km')}`
                  : `${kmToMiles(props.totalDistance)} ${translate(
                      'common.miles',
                    )}`
              }
            />

            <Text
              preset={TextPresetStyles.TITLE_HUGE}
              style={[
                styles.distanceTitleText,
                {color: getPrimaryColor()},
                styles.distanceTextSecondary,
              ]}
              text={
                isSelectedUnitKM()
                  ? `${props.avgDistance} ${translate('common.km')}`
                  : `${kmToMiles(props.avgDistance)} ${translate(
                      'common.miles',
                    )}`
              }
            />
          </View>

          <View
            style={[styles.btnTextStyle, {backgroundColor: getPrimaryColor()}]}>
            <Text
              preset={TextPresetStyles.FOOT_NOTE_ULTRA_BOLD}
              style={styles.btnText}
              tx={'modules.crwc.btntext'}
            />
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};
