import React, {useRef, useState} from 'react';
import ViewShot from 'react-native-view-shot';
import RNFetchBlob from 'rn-fetch-blob';
import {View, PermissionsAndroid, ViewStyle} from 'react-native';
import Share from 'react-native-share';
import {openSettings} from 'react-native-permissions';

import {ChallengesStyles as styles} from '../my-challenges-screen/components/challenges-styles';
import {ActivitiesStyles as activityStyles} from './styles';
import {Icon} from '../../components/icon';
import {ICON_TYPES} from '../../components/icon/constants';
import {isIos, showMessage, isAndroid, getPrimaryColor} from '../../utility';
import {DefaultDialog} from '../../components/default-dialog';
import {translate} from '../../i18n';
import {Text} from '../../components/text';
import moment from 'moment';

var RNFS = require('react-native-fs');

interface IChallengesProps {
  children: React.ReactNode;
  label?: string;
  style?: ViewStyle;
  hideShareDownload?: boolean;
  shareViewStyle?: ViewStyle;
}

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
            .then(res => {
              // showMessage(translate('common.fileDownloaded'));
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
      <View
        style={[
          styles.shareViewMainContainerStyle,
          props.style,
          activityStyles.shareMainContainerStyle,
        ]}>
        <Text text={props.label || ' '} />
        {showShareBtn == true ? (
          <View
            style={[props.shareViewStyle, activityStyles.shareContainerStyle]}>
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
        isVisible={showDialog}
        hideDialog={() => setShowDialog(false)}
        header={translate('common.noStoragePermission')}
        description={translate('common.storagePermissionDescription')}
        button1Text={translate('common.cancel')}
        button2Text={translate('common.goToSettings')}
        onButton1Click={() => setShowDialog(false)}
        onButton2Click={onGoToSettingsClick}
        twoButtons
      />
    </ViewShot>
  );
};
