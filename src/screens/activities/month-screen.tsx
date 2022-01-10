import {path} from 'ramda';
import {connect} from 'react-redux';
import React, {useState} from 'react';

import {ActivityTabType} from '.';
import {CommonComponent} from './common-component';

/**
 * An Interface for possible props for the Month component
 */
interface IActivityScreenProps {}

/**
 * Days - A component used to show Month activities graph
 */
const Month = (props: IActivityScreenProps) => {
  const [monthActivities, setMonthActivities] = useState(
    path(['user', 'monthActivities'], props) || [],
  );

  React.useEffect(() => {
    setMonthActivities(path(['user', 'monthActivities'], props) || []);
  }, [path(['user'], props)]);
  return (
    <CommonComponent
      data={monthActivities}
      xItemKey={'week'}
      activityTabType={ActivityTabType.MONTH}
    />
  );
};

function mapStateToProps(state: any) {
  return {
    user: state.userReducer.user,
  };
}

export const MonthScreen = connect(mapStateToProps)(Month);
