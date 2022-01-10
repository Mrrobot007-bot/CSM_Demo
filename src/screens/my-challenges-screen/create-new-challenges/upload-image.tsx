import {path} from 'ramda';
import fs from 'react-native-fs';
import React, {useState} from 'react';
import {decode} from 'base64-arraybuffer';
import {openSettings} from 'react-native-permissions';
import {Image, Keyboard, TextStyle, View} from 'react-native';

import {
  images,
  showMessage,
  defaultAlert,
  getPrimaryColor,
  uploadThumbnailImageOnS3,
} from '../../../utility';
import {translate} from '../../../i18n';
import {Icon} from '../../../components/icon';
import {Button} from '../../../components/button';
import {RelayChallengesStyles as styles} from './styles';
import ImagePicker from 'react-native-image-crop-picker';
import {ICON_TYPES} from '../../../components/icon/constants';
import {Text, TextPresetStyles} from '../../../components/text';
import {DefaultDialog} from '../../../components/default-dialog';
import {ButtonPreset, ButtonType} from '../../../components/button';
import {FastImageModified} from '../../../components/fast-image-modified';

/**
 * An Interface for possible props for the UploadImage component
 */
interface IUploadImageProps {
  /**
   * A prop used to determine the label text of component
   */
  headerText?: string;

  /**
   * A prop used to provide url to load image if already exist
   */
  imageUrl?: any;

  /**
   * A prop used to provide the label text style if required
   */
  labelTextStyle?: TextStyle;

  /**
   * A prop used to provide the callback of setting image url
   */
  setImageUrl: (url: any) => void;

  /**
   * A prop used to provide the callback of setting progressbar status
   */
  setShowProgressBar: (show: boolean) => void;

  /**
   * A prop used to provide the label text style if required by using
   */
  textPreset?: TextPresetStyles;
}

/**
 * UploadImage - A component which used to upload image from device
 */

export const UploadImage: React.FC<IUploadImageProps> = (
  props: IUploadImageProps,
) => {
  const [showDialog, setShowDialog] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [remoteImageWidth, setRemoteImageWidth] = useState(50);
  const [remoteImageHeight, setRemoteImageHeight] = useState(50);

  React.useEffect(() => {
    try {
      if (props.imageUrl) {
        Image.getSize(props.imageUrl, (width, height) => {
          setRemoteImageWidth(width);
          setRemoteImageHeight(height);
        });
      }
    } catch (e) {}
  }, []);

  const onOkSettingsClick = () => {
    openSettings().catch(() => showMessage(translate('common.noPermission')));
  };
  const handleChoosePhoto = () => {
    Keyboard.dismiss();
    ImagePicker.openPicker({
      includeBase64: true,
      mediaType: 'photo',
      cropping: true,
    })
      .then(async (images: any) => {
        props.setShowProgressBar(true);
        const {
          s3bucket,
          contentType,
          contentDeposition,
          fileName,
          RandomNumber,
        } = await uploadThumbnailImageOnS3(images.path || images.sourceURL);
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
          s3bucket.upload(params, (err: any, data: any) => {
            const message: string = path(['code'], err) || '';
            if (err) {
              props.setShowProgressBar(false);
              if (message.toLowerCase().includes('permission')) {
                setShowDialog(true);
              } else {
                defaultAlert(
                  translate('modules.errorMessages.error'),
                  translate('modules.errorMessages.imageUploadError'),
                );
              }
              setUploadedImage(null);
            } else {
              props.setShowProgressBar(false);
              props.setImageUrl(data.Location);
              setUploadedImage(images);
            }
          });
        });
      })
      .catch(e => {
        props.setShowProgressBar(false);
        setUploadedImage(null);
        const message: string = path(['code'], e) || '';
        if (message.toLowerCase().includes('permission')) {
          setShowDialog(true);
        } else {
          defaultAlert(
            translate('modules.errorMessages.error'),
            translate('modules.errorMessages.imageUploadError'),
          );
        }
      });
  };

  return (
    <View>
      <Text
        preset={props.textPreset || TextPresetStyles.TEXT_LABEL}
        style={[styles.imageUploadTextStyle, props.labelTextStyle]}
        text={
          path(['headerText'], props) ||
          translate('modules.myChallenges.imageUpload')
        }
      />
      <View style={styles.uploadSectionStyle}>
        <Button
          tx={'common.upload'}
          onPress={handleChoosePhoto}
          disabled={uploadedImage || props.imageUrl}
          preset={ButtonPreset.SMALL}
          type={ButtonType.SECONDARY}
          style={styles.uploadButtonStyle}
        />

        {uploadedImage &&
        uploadedImage.data &&
        uploadedImage.height &&
        uploadedImage.width ? (
          <View>
            <Image
              source={{
                uri: `data:image/gif;base64,${uploadedImage.data}`,
              }}
              style={[
                {...styles.imagePreviewStyle, borderColor: getPrimaryColor()},
                {
                  height: (uploadedImage.height / uploadedImage.width) * 50,
                },
              ]}
            />
            <View style={styles.crossIconContainerStyle}>
              <Icon
                icon={ICON_TYPES.CROSS}
                onIconClick={() => {
                  setUploadedImage(null);
                  props.setImageUrl(null);
                }}
                style={styles.crossIconStyle}
              />
            </View>
          </View>
        ) : props.imageUrl ? (
          <View>
            <FastImageModified
              url={props.imageUrl}
              defaultImage={images.defaultImage_2}
              style={[
                {...styles.imagePreviewStyle, borderColor: getPrimaryColor()},
                {
                  height: (remoteImageHeight / remoteImageWidth) * 50,
                },
              ]}
            />
            <View style={styles.crossIconContainerStyle}>
              <Icon
                icon={ICON_TYPES.CROSS}
                onIconClick={() => {
                  setUploadedImage(null);
                  props.setImageUrl(null);
                }}
                style={styles.crossIconStyle}
              />
            </View>
          </View>
        ) : null}
      </View>
      <DefaultDialog
        twoButtons
        isVisible={showDialog}
        hideDialog={() => setShowDialog(false)}
        button1Text={translate('common.cancel')}
        onButton2Click={() => onOkSettingsClick()}
        onButton1Click={() => setShowDialog(false)}
        button2Text={translate('common.goToSettings')}
        header={translate('common.photoPermissionHeading')}
        description={translate('common.getPhotoPermission')}
      />
    </View>
  );
};
