import {path} from 'ramda';
import React, {useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import {View, TouchableOpacity, FlatList} from 'react-native';

import {
  images,
  defaultAlert,
  SCREEN_ROUTES,
  DEVICE_HEIGHT,
} from '../../utility';
import {translate} from '../../i18n';
import {
  HeaderTypes,
  BoostrScreen,
  HeaderRightComponentType,
} from '../../components/boostr-screen';
import {API_URLS} from '../../services/urls';
import {HomeStyles as styles} from './styles';
import {Button} from '../../components/button';
import {ButtonPreset} from '../../components/button';
import {getApiCall} from '../../services/api-services';
import {STATUS_CODES} from '../../services/status-codes';
import {WellnessType} from '../../utility/object-types/user';
import {Text, TextPresetStyles} from '../../components/text';
import {FastImageModified} from '../../components/fast-image-modified';
import {PaginationLoaderComponent} from '../my-challenges-screen/components/challenges';

/**
 * An Interface for possible props for the Feedback component
 */
interface IWellnessMainScreenProps {}

/**
 * WellnessMain - A screen to render wellness data
 */
const WellnessMain = (props: IWellnessMainScreenProps) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [pageNumber, setPageNumber] = useState(1);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [shouldStopLoading, setShouldStopLoading] = useState(false);
  const [wellnessList, setWellnessList] = useState([]);

  /**
   * function to load initial wellness data
   */
  React.useEffect(() => {
    getWellnessData();
  }, []);

  /**
   * function to get wellness data
   * @returns
   */
  const getWellnessData = async () => {
    if (shouldStopLoading) {
      return;
    }

    if (pageNumber > 1) {
      setIsDataLoading(true);
    }
    const limit = 10;
    const url = `${API_URLS.WELLNESS}?pageNo=${pageNumber}&limit=${limit}`;
    try {
      const apiResponse = await dispatch(
        getApiCall(url, navigation, getWellnessData, true),
      );

      setIsDataLoading(false);
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        let apiWellnessList: Array<WellnessType> =
          path(['data'], apiResponse) || [];

        apiWellnessList = apiWellnessList.filter(item => {
          const isItemFound = wellnessList.find(
            oldItem => path(['_id'], oldItem) === path(['_id'], item),
          );
          return isItemFound ? null : item;
        });

        if (apiWellnessList && apiWellnessList.length) {
          setPageNumber(pageNumber + 1);
          const updatedWellnessList = [...wellnessList, ...apiWellnessList];
          setWellnessList(updatedWellnessList);
        } else {
          setShouldStopLoading(true);
        }
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };

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
              {marginTop: 2},
            ]}
            text={path(['description'], item)}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <BoostrScreen
      navigation={navigation}
      headerRightComponentType={HeaderRightComponentType.ICON_TEXT}
      headerType={HeaderTypes.NORMAL_BACK}
      title={translate('modules.Dashboard.wellness')}>
      {wellnessList && wellnessList.length ? (
        <FlatList
          data={wellnessList}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          onEndReached={() => {
            getWellnessData();
          }}
          ListFooterComponent={() => (
            <PaginationLoaderComponent
              isDataLoading={isDataLoading}
              challengesData={wellnessList}
            />
          )}
        />
      ) : path(['loading'], props) ? null : (
        <View>
          <Text
            preset={TextPresetStyles.FOOT_NOTE}
            style={styles.noDataTextStyle}
            tx={'modules.Dashboard.noWellNessData'}
          />

          <Button
            onPress={() => getWellnessData()}
            preset={ButtonPreset.EXTRA_SMALL}
            text={translate('common.retry')}
          />
        </View>
      )}
    </BoostrScreen>
  );
};

function mapStateToProps(state: any) {
  return {
    loading: state.apiReducer.loading,
  };
}

export const WellnessMainScreen = connect(mapStateToProps, {})(WellnessMain);
