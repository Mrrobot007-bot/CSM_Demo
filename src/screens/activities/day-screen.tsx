import {path} from 'ramda';
import {connect} from 'react-redux';
import React, {useState} from 'react';

import {ActivityTabType} from '.';
import {CommonComponent} from './common-component';

/**
 * An Interface for possible props for the Days component
 */
interface IActivityScreenProps {}

/**
 * Days - A component used to show days activities graph
 */
const Days = (props: IActivityScreenProps) => {
  const [dayActivities, setDayActivities] = useState(
    path(['user', 'weekActivities'], props) || [],
  );

  React.useEffect(() => {
    setDayActivities(path(['user', 'dayActivities'], props) || []);
  }, [path(['user'], props)]);
  return (
    <CommonComponent   
      data={dayActivities}
      xItemKey={'time'}
      activityTabType={ActivityTabType.DAY}
    />
  );
};

//function mapDispatchToProps(dispatch: any) {}

function mapStateToProps(state: any) {
  return {
    user: state.userReducer.user,
  };
}

export const DaysScreen = connect(mapStateToProps)(Days);
