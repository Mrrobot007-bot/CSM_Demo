import {path} from 'ramda';
import fs from 'react-native-fs';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {decode} from 'base64-arraybuffer';
import {Image, Keyboard, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {useIsFocused, useNavigation} from '@react-navigation/core';

import {
  isAndroid,
  showMessage,
  defaultAlert,
  getPrimaryColor,
  isValidDescription,
  uploadThumbnailImageOnS3,
} from '../../../utility';
import {color} from '../../../theme';
import {translate} from '../../../i18n';
import {
  FormTextInput,
  TextInputPreset,
  TextInputReturnKeyType,
} from '../../../components/form-text-input';
import {Icon} from '../../../components/icon';
import {API_URLS} from '../../../services/urls';
import {Button} from '../../../components/button';
import {postApiCall} from '../../../services/api-services';
import {STATUS_CODES} from '../../../services/status-codes';
import {ProgressBar} from '../../../components/progress-bar';
import {ICON_TYPES} from '../../../components/icon/constants';
import {SendBoostrStyles as styles} from './send-boostr-styles';
import {Text, TextPresetStyles} from '../../../components/text';
import {ButtonPreset, ButtonType} from '../../../components/button';
import {BoostrScreen, HeaderTypes} from '../../../components/boostr-screen';

/**
 * An Interface for possible props for the SendBoostr Screen
 */
interface ISendBoostrScreenProps {}

/**
 * SendBoostrScreen - A screen used to provide a view from where user can send any new boostr
 */
export const SendBoostrScreen: React.FC<ISendBoostrScreenProps> = (
  props: ISendBoostrScreenProps,
) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [comment, setComment] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showProgressBar, setShowProgressBar] = useState(false);

  const handleChoosePhoto = () => {
    Keyboard.dismiss();
    ImagePicker.openPicker({
      includeBase64: true,
      mediaType: 'photo',
      cropping: true,
    }).then(async (images: any) => {
      setUploadedImage(images);

      setShowProgressBar(true);
      const {s3bucket, contentType, contentDeposition, fileName, RandomNumber} =
        await uploadThumbnailImageOnS3(
          isAndroid ? images.path : images.sourceURL,
        );
      const base64 = await fs.readFile(fileName, 'base64');
      const arrayBuffer = decode(base64);
      s3bucket.createBucket(() => {
        const params = {
          Bucket: 'cms-runing-worldcup',
          Key: 'waveyThumbnailImage' + RandomNumber,
          Body: arrayBuffer,
          ContentDisposition: contentDeposition,
          ContentType: contentType,
        };
        console.log('params', params);
        s3bucket.upload(params, (err: any, data: any) => {
          if (err) {
            setShowProgressBar(false);
            defaultAlert(translate('modules.errorMessages.imageUploadError'));
            setUploadedImage(null);
            setImageUrl(null);
          } else {
            setShowProgressBar(false);
            setImageUrl(data.Location);
            setUploadedImage(images);
          }
        });
      });
    });
  };

  const onSendClick = async () => {
    if (!isValidDescription(comment, true)) {
      return;
    }
    Keyboard.dismiss();
    const challengeId = path(['route', 'params', 'challengeId'], props);
    const teamId = path(['route', 'params', 'teamId'], props);

    const parameters = challengeId
      ? imageUrl
        ? {
            challenge_id: challengeId,
            comment: comment,
            attachment: imageUrl,
          }
        : {
            challenge_id: challengeId,
            comment: comment,
          }
      : imageUrl
      ? {
          team_id: teamId,
          message: comment,
          image: imageUrl,
        }
      : {
          team_id: teamId,
          message: comment,
        };
    const apiResponse = await dispatch(
      postApiCall(
        challengeId ? API_URLS.SEND_BOOSTR : API_URLS.TEAM_CHAT_CREATE_CHAT,
        parameters,
      ),
    );

    try {
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        if (challengeId) {
          showMessage(translate('modules.myChallenges.boostrAdded'));
        } else {
          showMessage(translate('modules.teams.chatAdded'));
        }
        navigation.goBack();
      } else {
        showMessage(translate('modules.errorMessages.somethingWentWrong'));
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };

  const challengeId = path(['route', 'params', 'challengeId'], props);
  return (
    <BoostrScreen
      style={styles.mainContainerStyle}
      title={
        challengeId
          ? translate('common.sendABoostr')
          : translate('modules.teams.sendAChat')
      }
      navigation={navigation}
      headerType={useIsFocused() ? HeaderTypes.NORMAL_CROSS : HeaderTypes.NONE}>
      <FormTextInput
        onChangeText={setComment}
        topPlaceholderTx={'common.comment'}
        topPlaceholderTextColor={color.palette.grey9}
        preset={TextInputPreset.DESCRIPTION}
        returnKeyType={TextInputReturnKeyType.DONE}
        isRequired
        checkValidation
        onSubmitEditing={onSendClick}
        blurOnSubmit={true}
      />
      <Text
        text={translate('common.minimumTenCharacters')}
        preset={TextPresetStyles.FOOT_NOTE_BOLD}
        style={styles.minMumStyle}
      />

      <Text
        text={`${translate('common.attachFile')}`}
        preset={TextPresetStyles.FOOT_NOTE_BOLD}
        style={styles.attachFileTextStyle}
      />

      <View style={styles.uploadSectionStyle}>
        <Button
          tx={'common.upload'}
          onPress={handleChoosePhoto}
          preset={ButtonPreset.EXTRA_SMALL}
          type={ButtonType.SECONDARY}
          style={styles.uploadButtonStyle}
        />

        {uploadedImage &&
          uploadedImage.data &&
          uploadedImage.height &&
          uploadedImage.width && (
            <View>
              <Image
                source={{uri: `data:image/gif;base64,${uploadedImage.data}`}}
                style={[
                  {...styles.imagePreviewStyle, borderColor: getPrimaryColor()},
                  {height: (uploadedImage.height / uploadedImage.width) * 50},
                ]}
              />
              <View style={styles.crossIconContainerStyle}>
                <Icon
                  icon={ICON_TYPES.CROSS}
                  onIconClick={() => {
                    setUploadedImage(null);
                    setImageUrl(null);
                  }}
                  style={styles.crossIconStyle}
                />
              </View>
            </View>
          )}
      </View>
      <Button
        tx={'common.send'}
        onPress={onSendClick}
        disabled={!isValidDescription(comment, true)}
        style={styles.sendButtonStyle}
      />
      {showProgressBar && <ProgressBar />}
    </BoostrScreen>
  );
};
