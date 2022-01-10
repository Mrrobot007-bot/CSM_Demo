import React, {FC, ReactElement} from 'react';
import {ImageBackground, TouchableOpacity, View, ViewStyle} from 'react-native';

import {Icon} from '../icon';
import {color} from '../../theme';
import {InfoComponent} from '../info';
import {ICON_TYPES} from '../icon/constants';
import {Text, TextPresetStyles} from '../text';
import {SectionTitleStyles as styles} from './styles';
import {getPrimaryColor, images} from '../../utility';
import {I18NKeyName} from '../../i18n/translation-keys';

/**
 * An Interface for possible props for the TitleProps component
 */
interface TitleProps {
  /**
   * An optional prop used to provide callback for info icon click
   */
  onTildeClick?: () => void;

  /**
   * An optional prop used to provide callback for view-more click
   */
  onViewMoreClick?: () => void;

  /**
   * An optional prop used to show the ifo icon
   */
  shouldShowTildeView?: boolean;

  /**
   * An optional prop used to decide to show view more component
   */
  shouldShowViewMore?: boolean;

  /**
   * An optional prop used to override the styles
   */
  style?: ViewStyle;

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string;

  /**
   * An optional prop used to provide info icon type
   */
  TildeType?: any;

  /**
   * Text which is looked up via i18n.
   */
  tx?: I18NKeyName;

  isCrwc?: boolean;
}

/**
 * SectionTitle - A component used to show app default section title
 */

export const SectionTitle: FC<TitleProps> = (
  props: TitleProps,
): ReactElement => {
  return (
    <View style={[styles.topContainerStyle, props.style]}>
      <View style={styles.sectionTitleContainer}>
        <ImageBackground
          source={images.titleBackground}
          style={[
            styles.mainContainer,
            {backgroundColor: getPrimaryColor()},
            props.isCrwc ? {backgroundColor: color.palette.green} : null,
          ]}>
          <Text
            preset={TextPresetStyles.TITLE}
            style={[
              styles.imageContainer,
              props.isCrwc ? {color: getPrimaryColor()} : null,
            ]}
            tx={props.tx}
            text={props.text}
          />
        </ImageBackground>
        <View>
          {props.shouldShowTildeView && (
            <InfoComponent
              style={{...styles.tildeIconView, tintColor: getPrimaryColor()}}
              infoContentId={props.TildeType}
            />
          )}
        </View>
      </View>
      {props.shouldShowViewMore && (
        <TouchableOpacity
          onPress={props.onViewMoreClick}
          style={styles.titleContainerStyle}>
          <Icon
            icon={ICON_TYPES.ADD}
            style={{...styles.plusIconViewStyle, tintColor: getPrimaryColor()}}
          />
          <Text
            preset={TextPresetStyles.CAPTION_1}
            style={[styles.secondaryLabelTextStyle, {color: getPrimaryColor()}]}
            tx={'modules.Dashboard.viewMore'}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
