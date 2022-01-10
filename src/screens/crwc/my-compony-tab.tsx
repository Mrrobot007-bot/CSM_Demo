import React from 'react';
import {View} from 'react-native';

import {TabContent} from './tab-content';
import {SettingScreenStyles as styles} from './styles';
import {ShareViewComponent} from '../my-challenges-screen/components/share-view-component';
import {MyCompanyLeaderBoardComponent} from './components/my-company-leader-board-component';

/**
 * MyCompany - A component used to render the MyCompany tab inside CRWC screen
 */
export const MyCompany = (props: {
  navigation: any;
  showTabStatus: any;
  avgDistance: any;
  data: any;
  totalDistance: any;
}) => {
  return (
    <View style={styles.full}>
      <ShareViewComponent shareViewStyle={styles.shareViewStyle}>
        <TabContent
          avgDistance={props.avgDistance}
          totalDistance={props.totalDistance}
        />
        <MyCompanyLeaderBoardComponent crwcData={props.data} />
      </ShareViewComponent>
    </View>
  );
};
