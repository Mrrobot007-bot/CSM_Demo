import {path} from 'ramda';
import {useDispatch} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useIsFocused} from '@react-navigation/core';

import {color} from '../../theme';
import {translate} from '../../i18n';
import {
  BoostrScreen,
  HeaderTypes,
  HeaderRightComponentType,
} from '../../components/boostr-screen';
import {
  FormTextInput,
  TextInputPreset,
  TextInputReturnKeyType,
} from '../../components/form-text-input';
import {API_URLS} from '../../services/urls';
import {Button} from '../../components/button';
import {postApiCall} from '../../services/api-services';
import {STATUS_CODES} from '../../services/status-codes';
import {ContactUsFeedbackStyles as styles} from './styles';
import {Text, TextPresetStyles} from '../../components/text';
import {getUserStore} from '../../redux/reducers/userReducer';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {defaultAlert, getPrimaryColor, showMessage} from '../../utility';

/**
 * An Interface for possible props for the Feedback component
 */
interface IFeedbackScreensProps {
  /**
   * Navigation prop used to set the navigation stuff in the
   * component like, go back, move to other screen, etc.
   */
  navigation: any;
}

/**
 * The feedback rating options providing to user
 */
const DefaultRating = [
  {rating: 1, selected: false},
  {rating: 2, selected: false},
  {rating: 3, selected: false},
  {rating: 4, selected: false},
  {rating: 5, selected: false},
  {rating: 6, selected: false},
  {rating: 7, selected: false},
  {rating: 8, selected: false},
  {rating: 9, selected: false},
  {rating: 10, selected: false},
];

/**
 * ContactUsFeedback - A screen used to get user feedback
 */
export const ContactUsFeedback = (props: IFeedbackScreensProps) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState([]);
  const [ratingSelected, setRatingSelected] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    setRating(DefaultRating);
  }, []);

  /**
   * Sending feedback to server
   */
  const onSendClick = async () => {
    let params = {
      user_id: getUserStore().user._id,
      feedback: comment,
      rating: ratingSelected,
    };
    try {
      let apiResponse = await dispatch(
        postApiCall(
          API_URLS.FEEDBACK,
          params,
          true,
          props.navigation,
          onSendClick,
        ),
      );
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        showMessage(translate('modules.feedback.thankYou'));
        props.navigation.pop(1);
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };

  /**
   * choosing the star value
   */
  const onSelect = (ratingNum: number) => {
    setRatingSelected(ratingNum);
    let updatedList = rating.map(item => {
      if (item.rating <= ratingNum) {
        return {...item, selected: true};
      } else {
        return {...item, selected: false};
      }
    });
    setRating(updatedList);
  };

  const renderRating = (item: any) => {
    return (
      <TouchableOpacity
        onPress={() => onSelect(item.item.rating)}
        style={[
          styles.ratingBoxStyle,
          {
            backgroundColor: item.item.selected
              ? getPrimaryColor()
              : color.palette.grey10,
          },
        ]}>
        <Text
          preset={TextPresetStyles.CAPTION_2}
          style={styles.secondaryLabelTextStyle}
          text={item.item.rating}
        />
      </TouchableOpacity>
    );
  };
  const isSendDisabled = ratingSelected === null || comment === '';

  return (
    <BoostrScreen
      navigation={props.navigation}
      headerRightComponentType={HeaderRightComponentType.ICON_TEXT}
      headerType={useIsFocused() ? HeaderTypes.NORMAL_BACK : HeaderTypes.NONE}
      title={translate('modules.feedback.title')}>
      <ScrollView style={styles.mainViewContainer}>
        <View style={styles.mainViewContainer}>
          <Text
            preset={TextPresetStyles.DESCRIPTION}
            style={[styles.secondaryLabelTextStyle, styles.descriptionTextView]}
            tx={'modules.feedback.weLoveToHear'}
          />
          <FormTextInput
            onChangeText={setComment}
            topPlaceholderTx={'common.comment'}
            topPlaceholderTextColor={color.palette.grey9}
            preset={TextInputPreset.DESCRIPTION}
            returnKeyType={TextInputReturnKeyType.DONE}
            checkValidation
            blurOnSubmit={true}
          />
          <Text
            preset={TextPresetStyles.TITLE_BOLD}
            style={[styles.secondaryLabelTextStyle, styles.smallMargin]}
            tx={'modules.feedback.recommendBoostr'}
          />
          <Text
            preset={TextPresetStyles.DESCRIPTION_SARA}
            style={[styles.secondaryLabelTextStyle, styles.smallMargin]}
            tx={'modules.feedback.pleaseSelect'}
          />
          <FlatList numColumns={10} data={rating} renderItem={renderRating} />
          <View style={styles.leastMostTextContainer}>
            <Text
              preset={TextPresetStyles.MINI_FONT_SARA}
              style={styles.grayText}
              tx={'modules.feedback.leastLikely'}
            />
            <Text
              preset={TextPresetStyles.MINI_FONT_SARA}
              style={styles.grayText}
              tx={'modules.feedback.mostLikely'}
            />
          </View>
          <Button
            style={styles.sendButtonStyle}
            tx={'common.send'}
            onPress={() => onSendClick()}
            disabled={isSendDisabled}
          />
        </View>
      </ScrollView>
    </BoostrScreen>
  );
};
