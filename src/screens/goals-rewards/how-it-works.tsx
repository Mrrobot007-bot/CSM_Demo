import {path} from 'ramda';
import {useDispatch} from 'react-redux';
import {View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';

import {translate} from '../../i18n';
import {
  HeaderTypes,
  BoostrScreen,
  HeaderRightComponentType,
} from '../../components/boostr-screen';
import {API_URLS} from '../../services/urls';
import {GoalsRewardsStyles as styles} from './styles';
import {getApiCall} from '../../services/api-services';
import {STATUS_CODES} from '../../services/status-codes';
import {Text, TextPresetStyles} from '../../components/text';
import {defaultAlert, INFO_CONTENT_ID_TYPES} from '../../utility';

/**
 * An Interface for possible props for the HowItWorks Screen
 */
interface IHowItWorksScreenProps {
  /**
   * Prop used to provide the navigation stuff
   */
  navigation: any;
}

/**
 * Used to show how discounts and rewards work goals and reward sections
 */
export const HowItWorks = (props: IHowItWorksScreenProps) => {
  const [howItWork, setHowItWork] = useState('');
  const dispatch = useDispatch();
  const getContent = async () => {
    const url = `${API_URLS.GET_I_CONTENT}?name=${encodeURIComponent(
      INFO_CONTENT_ID_TYPES.GOALS_REWARDS_HOW_IT_WORKS,
    )}`;
    try {
      const apiResponse = await dispatch(
        getApiCall(url, props.navigation, getContent, true, true, false),
      );
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        let data: Array<any> = path(['data'], apiResponse) || [];
        setHowItWork(data[0].content);
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };

  useEffect(() => {
    getContent();
  }, []);

  return (
    <BoostrScreen
      navigation={props.navigation}
      headerRightComponentType={HeaderRightComponentType.ICON_TEXT}
      headerType={HeaderTypes.NORMAL_CROSS}
      title={translate('modules.goalsRewards.howItWorks')}>
      <View style={styles.mainContainerStyle}>
        <ScrollView style={styles.subContainerView}>
          <Text
            preset={TextPresetStyles.DESCRIPTION}
            style={[styles.blackTextStyle, styles.howItWorksDescriptionStyle]}
            text={howItWork}
          />
        </ScrollView>
      </View>
    </BoostrScreen>
  );
};
