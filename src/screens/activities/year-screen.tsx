import {path} from 'ramda';
import {connect} from 'react-redux';
import React, {useState} from 'react';

import {ActivityTabType} from '.';
import {CommonComponent} from './common-component';

/**
 * An Interface for possible props for the Year component
 */
interface IActivityScreenProps {}

/**
 * Days - A component used to show Year activities graph
 */
const Year = (props: IActivityScreenProps) => {
  const [yearlyActivities, setYearlyActivities] = useState(
    path(['user', 'yearlyActivities'], props) || [],
  );

  React.useEffect(() => {
    setYearlyActivities(path(['user', 'yearlyActivities'], props) || []);
  }, [path(['user'], props)]);
  return (
    <CommonComponent
      data={yearlyActivities}
      xItemKey={'month'}
      activityTabType={ActivityTabType.YEAR}
    />
  );
};

function mapStateToProps(state: any) {
  return {
    user: state.userReducer.user,
  };
}

export const YearScreen = connect(mapStateToProps)(Year);
