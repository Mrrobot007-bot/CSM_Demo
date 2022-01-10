import {path} from 'ramda';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {useDispatch} from 'react-redux';
import {ImageStyle, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import {Icon} from '../icon';
import {translate} from '../../i18n';
import {API_URLS} from '../../services/urls';
import {ICON_TYPES} from '../icon/constants';
import {Text, TextPresetStyles} from '../text';
import {Button, ButtonPreset} from '../button';
import {InfoComponentStyles as styles} from './styles';
import {getApiCall} from '../../services/api-services';
import {STATUS_CODES} from '../../services/status-codes';
import {ProgressBar, ProgressBarType} from '../progress-bar';
import {
  defaultAlert,
  getPrimaryColor,
  INFO_CONTENT_ID_TYPES,
} from '../../utility';

/**
 * An Interface for possible props for the InfoComponent
 */
interface IInfoComponentProps {
  /**
   * An Optional prop to style the info component
   */
  style?: ImageStyle;

  /**
   * An prop used to get the details of required info icon from server
   */
  infoContentId?: INFO_CONTENT_ID_TYPES;
}

/**
 * An Interface for possible props for the Info modal Component
 */
interface IInfoComponentModalProps {
  /**
   * An prop used to determine weather the Modal will shown or not
   */
  isVisible: boolean;

  /**
   * An prop used to get the details of required info icon from server
   */
  infoContentId: INFO_CONTENT_ID_TYPES;

  /**
   * An prop used to provide callback when the dialog hides
   */
  onHideDialog: () => void;
}

/**
 * InfoModal - A modal component which will shown to user
 * when he/she click on any info icon in app with appropriate content
 */
export const InfoModal = (props: IInfoComponentModalProps) => {
  const dispatch = useDispatch();
  const [answer, setAnswer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldShowRetry, setShouldShowRetry] = useState(false);

  const onHideDialog = () => {
    setAnswer(null);
    setIsLoading(true);
    setShouldShowRetry(false);
    props.onHideDialog();
  };

  /**
   * Getting data from server for appropriate id
   */
  const getData = async () => {
    setIsLoading(true);
    setShouldShowRetry(false);
    let url = `${API_URLS.GET_I_CONTENT}?name=${encodeURIComponent(
      props.infoContentId,
    )}`;
    try {
      const apiResponse = await dispatch(
        getApiCall(url, null, null, false, true, true, true),
      );
      setIsLoading(false);
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        const ApiData: any = path(['data'], apiResponse) || null;
        setAnswer(path([0, 'content'], ApiData));
      } else {
        setShouldShowRetry(true);
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };
  return (
    <Modal
      isVisible={props.isVisible}
      onBackdropPress={onHideDialog}
      onModalShow={getData}
      onModalHide={onHideDialog}>
      <View style={styles.modalContainerStyle}>
        <View style={styles.headerContainerStyle}>
          <View
            style={[styles.crossIconStyle, {tintColor: getPrimaryColor()}]}
          />
          <Text
            preset={TextPresetStyles.HEADLINE_DARK}
            tx={'common.information'}
          />
          <Icon
            icon={ICON_TYPES.CROSS}
            style={styles.crossIconStyle}
            onIconClick={onHideDialog}
          />
        </View>
        <ScrollView style={styles.modalDataViewStyle}>
          {answer && (
            <Text
              preset={TextPresetStyles.DESCRIPTION_SMALL}
              style={styles.answerTextStyle}>
              <Text text={answer} />
            </Text>
          )}

          {shouldShowRetry && (
            <Text
              preset={TextPresetStyles.DESCRIPTION_SMALL}
              style={styles.errorTextStyle}
              tx={'common.unableToLoadData'}
            />
          )}

          {shouldShowRetry && (
            <Button
              tx={'common.retry'}
              onPress={() => {
                setIsLoading(true);
                setShouldShowRetry(false);
                getData();
              }}
              style={styles.retryButtonStyle}
              preset={ButtonPreset.MEDIUM}
            />
          )}
          {isLoading && (
            <View
              style={{
                zIndex: 100,
                height: 150,
                width: '100%',
                marginTop: 20,
              }}>
              <ProgressBar
                progressBarType={ProgressBarType.COMPONENT_SPECIFIC}
              />
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
};

/**
 * InfoComponent - A component which render a info icon on screen where ever
 * required, which is clickable and showing a modal on click
 */
export const InfoComponent = (props: IInfoComponentProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const updatedStyle = {
    ...styles.tildeIconView,
    tintColor: getPrimaryColor(),
    ...props.style,
  };
  return (
    <View>
      <Icon
        icon={ICON_TYPES.TILDE_CIRCLE}
        style={updatedStyle}
        onIconClick={() => setIsModalVisible(true)}
      />
      <InfoModal
        isVisible={isModalVisible}
        onHideDialog={() => setIsModalVisible(false)}
        infoContentId={props.infoContentId || null}
      />
    </View>
  );
};
