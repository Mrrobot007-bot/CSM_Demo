import {path} from 'ramda';
import {connect} from 'react-redux';
import React, {useState} from 'react';

import {ActivityTabType} from '.';
import {CommonComponent} from './common-component';

/**
 * An Interface for possible props for the Week component
 */
interface IActivityScreenProps {}

/**
 * Days - A component used to show Week activities graph
 */
const Week = (props: IActivityScreenProps) => {
  const [weekActivities, setWeekActivities] = useState(
    path(['user', 'weekActivities'], props) || [],
  );

  React.useEffect(() => {
    setWeekActivities(path(['user', 'weekActivities'], props) || []);
  }, [path(['user'], props)]);

  return (
    <CommonComponent
      data={weekActivities}
      xItemKey={'day'}
      activityTabType={ActivityTabType.WEEK}
    />
  );
};

function mapStateToProps(state: any) {
  return {
    user: state.userReducer.user,
  };
}

export const WeekScreen = connect(mapStateToProps)(Week);
