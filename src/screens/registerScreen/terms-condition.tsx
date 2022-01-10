import {path} from 'ramda';
import {useDispatch} from 'react-redux';
import HTMLView from 'react-native-htmlview';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import React, {FC, ReactElement, useState} from 'react';

import {translate} from '../../i18n';
import {API_URLS} from '../../services/urls';
import {getApiCall} from '../../services/api-services';
import {STATUS_CODES} from '../../services/status-codes';
import {defaultAlert, DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utility';
import {BoostrScreen, HeaderTypes} from '../../components/boostr-screen';

/**
 * An Interface for possible props for the Terms Condition Screen
 */
interface ITermsConditionScreenProps {
  /**
   * Navigation prop used to set the navigation stuff in the
   * component like, go back, move to other screen, etc.
   */
  navigation: any;
}

/**
 * TermsConditionScreen - A screen use to render the terms & condition data
 */
export const TermsConditionScreen: FC<ITermsConditionScreenProps> = (
  props: ITermsConditionScreenProps,
): ReactElement => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);

  /**
   * function to load initial content
   */
  React.useEffect(() => {
    getContent();
  }, []);

  /**
   * function to load the terms and condition data
   */
  const getContent = async () => {
    try {
      let apiResponse = await dispatch(
        getApiCall(
          API_URLS.TERMS_CONDITION_URL,
          props.navigation,
          getContent,
          true,
          true,
        ),
      );
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        let data: Array<any> = path(['data'], apiResponse) || null;
        setData(path(['terms_condition'], data));
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };
  return (
    <BoostrScreen
      headerType={HeaderTypes.NORMAL_CROSS}
      navigation={props.navigation}
      title={translate('common.termsOfUse')}>
      <ScrollView style={styles.scrollViewStyle}>
        {data && <HTMLView value={data} stylesheet={styles.htmlViewStyle} />}
        <View style={styles.extraViewStyle} />
      </ScrollView>
    </BoostrScreen>
  );
};

const styles = StyleSheet.create({
  scrollViewStyle: {
    paddingVertical: DEVICE_HEIGHT * 0.036,
    paddingHorizontal: DEVICE_WIDTH * 0.042,
  },
  htmlViewStyle: {
    fontSize: 15,
    lineHeight: 20,
  },

  extraViewStyle: {
    width: 1,
    height: DEVICE_HEIGHT * 0.08,
  },
});
