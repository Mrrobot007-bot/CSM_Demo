import React from 'react';
import {path} from 'ramda';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import {View, TouchableOpacity, FlatList} from 'react-native';

import {translate} from '../../i18n';
import {HomeStyles as styles} from './styles';
import {SectionTitle} from '../../components/section-title';
import {WellnessType} from '../../utility/object-types/user';
import {Text, TextPresetStyles} from '../../components/text';
import {DEVICE_HEIGHT, images, SCREEN_ROUTES} from '../../utility';
import {FastImageModified} from '../../components/fast-image-modified';

/**
 * An Interface for possible props for the wellness component
 */
interface IWellnessProps {}

/**
 * Wellness - A Component which used to render wellness list on hoe screen
 */
const Wellness = (props: IWellnessProps) => {
  const navigation = useNavigation();

  /**
   * function to show webview of the link
   * @param link
   * @param name
   */
  const openWebView = async (link: string, name: string) => {
    navigation.navigate(SCREEN_ROUTES.WEB_VIEW, {
      link: link,
      name: name,
    });
  };

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => openWebView(path(['url'], item), path(['header'], item))}
        style={[
          styles.wellnessViewStyle,
          styles.sliderMiddleSpaceStyle,
          {marginBottom: item._id === 3 ? DEVICE_HEIGHT * 0.05 : 0},
        ]}>
        <FastImageModified
          url={path(['image'], item)}
          style={styles.wellnessImageStyle}
          defaultImage={images.defaultImage_2}
        />
        <View style={styles.wellnessImageViewStyle}>
          <Text
            preset={TextPresetStyles.SUB_HEADLINE}
            style={[styles.secondaryLabelTextStyle, styles.blackTextStyle]}
            text={path(['header'], item)}
          />
          <Text
            preset={TextPresetStyles.FOOT_NOTE}
            style={[
              styles.secondaryLabelTextStyle,
              styles.lightGrayTextStyle,
              styles.wellnessDescriptionStyle,
            ]}
            text={path(['description'], item)}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const wellnessData: Array<WellnessType> = path(['wellness'], props) || [];
  return wellnessData && wellnessData.length ? (
    <View style={styles.full}>
      <SectionTitle
        tx={'modules.Dashboard.wellness'}
        shouldShowViewMore
        style={styles.mainTitleContainerStyle}
        onViewMoreClick={() =>
          openWebView(
            'http://13.58.126.141/amondocontent.html',
            translate('modules.Dashboard.wellness'),
          )
        }
      />

      <FlatList
        data={path(['wellness'], props)}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        ListFooterComponent={() => {
          return <View style={styles.wellnessListFootComponentStyle} />;
        }}
      />
    </View>
  ) : null;
};

function mapStateToProps(state: any) {
  return {
    wellness: path(['userReducer', 'user', 'wellness'], state) || [],
  };
}

export const WellnessScreen = connect(mapStateToProps, {})(Wellness);
