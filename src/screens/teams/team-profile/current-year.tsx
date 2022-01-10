import moment from 'moment';
import React from 'react';
import {View} from 'react-native';

import {TableHeader} from './table-header';
import {UserLeaderBoardStyles as styles} from './user-leader-board-styles';

/**
 * An Interface for possible props for Current year component
 */
interface ICurrentYearScreenProps {
  /**
   * Navigation prop used to set the navigation stuff in the
   * component like, go back, move to other screen, etc.
   */
  navigation: any;

  /**
   * team ID is used to  get team profile
   */
  teamId: string;
  /**
   * my team is used know whether your team owner or not
   */
  myTeam: boolean;

  /**
   * data is for current month
   */
  data: any;
  /**
   * activityType is used get types of data
   */
  activityType: string;

  /**
   * props is used for cycle type data
   */

  onCyclingClick?: () => void;

  /**
   * props is used to onWalk click
   */
  onWalkingClick?: () => void;
}

/**
 *  YearToDateScreen -  A tab component for team profile, year section
 */
export const YearToDateScreen = (props: ICurrentYearScreenProps) => {
  const isWalkingSelected = props.activityType === 'walk' ? true : false;
  const isCyclingSelected = props.activityType === 'walk' ? false : true;
  const myTeam = props.myTeam;

  /**
   * returns the current year
   */
  const getDateText = () => {
    return `${moment().startOf('year').format('MMM, yyyy')} - ${moment()
      .endOf('year')
      .format('MMM, yyyy')}`;
  };

  return (
    <View style={styles.tabMainContainer}>
      <TableHeader
        data={props.data}
        myTeam={myTeam}
        teamId={props.teamId}
        navigation={props.navigation}
        date={getDateText()}
        isWalkingSelected={isWalkingSelected}
        isCyclingSelected={isCyclingSelected}
        onCyclingClick={props.onCyclingClick}
        onWalkingClick={props.onWalkingClick}
      />
    </View>
  );
};
