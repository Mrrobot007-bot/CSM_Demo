import {path} from 'ramda';
import {useDispatch} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import {translate} from '../../i18n';
import {
  BoostrScreen,
  HeaderRightComponentType,
  HeaderTypes,
} from '../../components/boostr-screen';
import {Icon} from '../../components/icon';
import {API_URLS} from '../../services/urls';
import {FAQScreenStyles as styles} from './styles';
import {getApiCall} from '../../services/api-services';
import {STATUS_CODES} from '../../services/status-codes';
import {ICON_TYPES} from '../../components/icon/constants';
import {SectionTitle} from '../../components/section-title';
import {defaultAlert, getPrimaryColor} from '../../utility';
import {Text, TextPresetStyles} from '../../components/text';
import {FAQDataResponse} from '../../utility/object-types/auth-response';

/**
 * An Interface for possible props for the FAQScreen
 */
interface IFAQScreenProps {
  /**
   * Prop used to provide the navigation stuff
   */
  navigation: any;
}

/**
 * FAQScreen - A screen used to show the general
 * questions and their answers, regarding app use
 */
export const FAQScreen = (props: IFAQScreenProps) => {
  const [FAQ, setFAQ] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getFaq();
  }, []);

  /**
   * Getting data from server
   */
  const getFaq = async () => {
    try {
      const apiResponse = await dispatch(
        getApiCall(API_URLS.FAQ, props.navigation, getFaq, true, true),
      );
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        let ApiData: Array<FAQDataResponse> = path(['data'], apiResponse) || [];
        ApiData.map((e: FAQDataResponse) => (e['isFocused'] = false));
        setFAQ(ApiData);
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };

  const updateChallengeDate = (FAQId: string) => {
    setFAQ(
      FAQ.map(FAQ => {
        return {
          ...FAQ,
          isFocused: FAQ._id === FAQId ? !FAQ.isFocused : FAQ.isFocused,
        };
      }),
    );
  };

  const mainSectionView = (FAQ: any) => {
    return (
      <TouchableOpacity onPress={() => updateChallengeDate(FAQ._id)}>
        <View style={styles.headingMainContainer}>
          <View
            style={[
              styles.headingInnerContainer,
              {borderBottomColor: getPrimaryColor(0.3)},
            ]}> 
            <View style={styles.questionTextView}>
            <Text
              preset={TextPresetStyles.FOOT_NOTE_BOLD}
              style={
                FAQ.isFocused
                  ? {color: getPrimaryColor()}
                  : styles.questionUnFocusedTextStyle
              }
              text={FAQ.question}
            />
            </View>
            <Icon
              icon={FAQ.isFocused ? ICON_TYPES.UP_ARROW : ICON_TYPES.DOWN_ARROW}
              style={
                FAQ.isFocused
                  ? {
                      ...styles.arrowIconFocusedStyle,
                      tintColor: getPrimaryColor(),
                    }
                  : styles.arrowIconUnFocusedStyle
              }
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <BoostrScreen
      navigation={props.navigation}
      headerRightComponentType={HeaderRightComponentType.ICON_TEXT}
      headerType={HeaderTypes.NORMAL_BACK}
      title={translate('modules.faq.title')}>
      <ScrollView style={styles.mainContainerStyle}>
        <SectionTitle
          tx={'modules.faq.sectionTitle'}
          style={styles.sectionTitleStyle}
        />
        {FAQ.map(FAQ => {
          return (
            <View key={FAQ._id}>
              {mainSectionView(FAQ)}
              {FAQ.isFocused && (
                <View style={styles.descriptionContainerStyle}>
                  <View
                    style={[
                      styles.lineView,
                      {borderTopColor: getPrimaryColor(0.3)},
                    ]}
                  />
                  <View style={styles.descriptionTextContainer}>
                    <Text
                      preset={TextPresetStyles.FOOT_NOTE}
                      style={styles.descriptionTextStyle}
                      text={FAQ.answer}
                    />
                  </View>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </BoostrScreen>
  );
};
