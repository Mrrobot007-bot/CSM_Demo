import moment from 'moment';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import React, {useRef, useState} from 'react';
import ViewShot from 'react-native-view-shot';
import {openSettings} from 'react-native-permissions';
import {View, PermissionsAndroid, ViewStyle} from 'react-native';

import {translate} from '../../../i18n';
import {Icon} from '../../../components/icon';
import {Text} from '../../../components/text';
import {ICON_TYPES} from '../../../components/icon/constants';
import {ChallengesStyles as styles} from './challenges-styles';
import {DefaultDialog} from '../../../components/default-dialog';
import {isIos, showMessage, isAndroid, getPrimaryColor} from '../../../utility';

var RNFS = require('react-native-fs');

/**
 * An Interface for possible props for the ShareView Component
 */
interface IChallengesProps {
  /**
   * A prop used to provide the children inside the wrapper
   * component which need to share or download
   */
  children: any;

  /**
   * An optional prop used to provide the label to share view component
   */
  label?: string;

  /**
   * An optional prop used to provide the styles to share view component container
   */
  style?: ViewStyle;

  /**
   * An optional prop used to provide if need to hide
   * share and download button in share view component
   */
  hideShareDownload?: boolean;

  /**
   * An optional prop used to provide the styles to share view component
   */
  shareViewStyle?: ViewStyle;
}

/**
 * ShareViewComponent - A wrapper component used to provide the
 * option of download and share any component
 */
export const ShareViewComponent: React.FC<IChallengesProps> = (
  props: IChallengesProps,
) => {
  const viewShotRef = useRef();
  const [showDialog, setShowDialog] = useState(false);
  const [showShareBtn, setShowShareBtn] = useState(true);

  const onShare = async () => {
    setShowShareBtn(false);
    viewShotRef?.current?.capture().then((uri: any) =>
      RNFS.readFile(uri, 'base64').then((res: any) => {
        let urlString = 'data:image/jpeg;base64,' + res;
        let options = {
          title: 'Boostr',
          message: 'Boostr',
          url: urlString,
          type: 'image/jpeg',
        };
        Share.open(options)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
        setShowShareBtn(true);
      }),
    );
  };

  const downloadFile = async (res: string | number[]) => {
    if (isIos) {
      const dirs = RNFetchBlob.fs.dirs.DocumentDir;
      const date = moment(new Date()).format('DDMMMYYYYHHMMSS');
      var path = dirs + `/Boostr/${date}.jpg`;

      RNFetchBlob.fs
        .writeFile(path, res, 'base64')
        .then(res => {
          RNFetchBlob.ios.previewDocument(path);
          setShowShareBtn(true);
          // showMessage(translate('common.fileDownloaded'));
        })
        .catch(e => {
          showMessage(translate('common.unableToDownloadFile'));
          setShowShareBtn(true);
        });
    }
    if (isAndroid) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          const dirs = RNFetchBlob.fs.dirs;
          const date = moment(new Date()).format('DDMMMYYYYHHMMSS');
          var path = dirs.DCIMDir + `/Boostr/${date}.png`;

          RNFetchBlob.fs
            .writeFile(path, res, 'base64')
            .then(() => {
              RNFetchBlob.android.addCompleteDownload({
                title: translate('common.boostrImageDownloaded'),
                description: translate('common.downloadComplete'),
                mime: 'image/png',
                path: path,
                showNotification: true,
              });
              setShowShareBtn(true);
            })
            .catch(e => {
              showMessage(translate('common.unableToDownloadFile'));
              setShowShareBtn(true);
            });
        } else {
          setShowDialog(true);
          setShowShareBtn(true);
        }
      } catch (err) {
        console.log(err);
        setShowShareBtn(true);
      }
    }
  };

  const captureAndShareScreenshot = () => {
    setShowShareBtn(false);
    viewShotRef?.current?.capture().then((uri: any) =>
      RNFS.readFile(uri, 'base64').then((res: string) => {
        downloadFile(res);
      }),
    );
  };

  const onGoToSettingsClick = () => {
    openSettings().catch(() => showMessage(translate('common.noPermission')));
  };

  return props.hideShareDownload ? (
    props.children
  ) : (
    <ViewShot
      ref={viewShotRef}
      captureMode={'mount'}
      options={{format: 'jpg', quality: 0.8}}>
      <View style={[styles.shareViewMainContainerStyle, props.style]}>
        <Text text={props.label || ' '} />
        {showShareBtn == true ? (
          <View style={[styles.shareContainerStyle, props.shareViewStyle]}>
            <Icon
              onIconClick={onShare}
              icon={ICON_TYPES.SHARE}
              style={{
                ...styles.tildeIconShareView,
                tintColor: getPrimaryColor(),
              }}
            />
            <Icon
              onIconClick={captureAndShareScreenshot}
              icon={ICON_TYPES.SAVE}
              style={{...styles.tildeIconView, tintColor: getPrimaryColor()}}
            />
          </View>
        ) : null}
      </View>

      {props.children}

      <DefaultDialog
        twoButtons
        isVisible={showDialog}
        onButton2Click={onGoToSettingsClick}
        hideDialog={() => setShowDialog(false)}
        button1Text={translate('common.cancel')}
        onButton1Click={() => setShowDialog(false)}
        button2Text={translate('common.goToSettings')}
        header={translate('common.noStoragePermission')}
        description={translate('common.storagePermissionDescription')}
      />
    </ViewShot>
  );
};
