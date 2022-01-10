import React from 'react';
import {View} from 'react-native';
import {SettingScreenStyles as styles} from './styles';

import {TabContent} from './tab-content';
import {CrwcLeaderBoardComponent} from './components/crwc-leader-board-component';
import {ShareViewComponent} from '../my-challenges-screen/components/share-view-component';

/**
 * CrwcTab - A component used to render the CRWC tab inside CRWC screen
 */
export const CrwcTab = (props: {
  data: any;
  navigation: any;
  showTabStatus: any;
  avgDistance: any;
  totalDistance: any;
}) => {
  return (
    <View style={styles.full}>
      <ShareViewComponent shareViewStyle={styles.shareViewStyle}>
        <TabContent
          avgDistance={props.avgDistance}
          totalDistance={props.totalDistance}
        />
        <CrwcLeaderBoardComponent crwcData={props.data} />
      </ShareViewComponent>
    </View>
  );
};
