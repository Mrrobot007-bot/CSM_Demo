import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {View, useWindowDimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

import {color} from '../../theme';
import {translate} from '../../i18n';
import {DaysScreen} from './day-screen';
import {YearScreen} from './year-screen';
import {WeekScreen} from './week-screen';
import {MonthScreen} from './month-screen';
import {hpx} from '../../utility/responsive';
import {ActivitiesStyles as styles} from './styles';
import {Text, TextPresetStyles} from '../../components/text';
import {PullToRefresh} from '../../components/pull-to-refresh';
import {getActivitiesData, getPrimaryColor} from '../../utility';
import {BoostrScreen, HeaderTypes} from '../../components/boostr-screen';

/**
 * An Interface for possible props for the MyActivityScreen component
 */
interface IActivityScreenProps {
  /**
   * Prop used to provide the navigation stuff
   */
  navigation: any;
}

export enum ActivityTabType {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
}

/**
 * MyActivityScreen - A component used to show activities graph with multiple tabs for filtering
 */
export const MyActivityScreen = (props: IActivityScreenProps) => {
  const layout = useWindowDimensions();
  const dispatch = useDispatch();
  const [index, setIndex] = React.useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [routes] = React.useState([
    {key: 'day', title: translate('modules.myActivity.day')},
    {key: 'week', title: translate('modules.myActivity.week')},
    {key: 'month', title: translate('modules.myActivity.month')},
    {key: 'year', title: translate('modules.myActivity.year')},
  ]);

  /**
   * Tabs inside the screen
   */
  const renderScene = SceneMap({
    day: DaysScreen,
    week: WeekScreen,
    month: MonthScreen,
    year: YearScreen,
  });

  React.useEffect(() => {
    getActivitiesData(props.navigation, dispatch);
  }, []);

  const dismissRefresh = () => {
    setRefreshing(true);
    getActivitiesData(props.navigation, dispatch);
    setRefreshing(false);
  };

  return (
    <BoostrScreen
      headerType={HeaderTypes.NORMAL_BACK}
      navigation={props.navigation}
      title={translate('common.myActivity')}>
      <PullToRefresh onRefresh={dismissRefresh} refreshing={refreshing}>
        <View style={[styles.mainContainerStyle, {height: hpx(700)}]}>
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width: layout.width}}
            renderTabBar={(props: any) => (
              <TabBar
                {...props}
                pressColor={color.palette.transparent}
                indicatorStyle={{
                  ...styles.indicatorStyle,
                  backgroundColor: getPrimaryColor(),
                }}
                style={[
                  styles.tabViewStyle,
                  {borderBottomColor: getPrimaryColor(0.3)},
                ]}
                renderLabel={({route, focused}) => (
                  <View
                    style={
                      focused
                        ? [
                            styles.labelContainerFocusedStyle,
                            {backgroundColor: getPrimaryColor()},
                          ]
                        : styles.labelContainerStyle
                    }>
                    <Text
                      preset={TextPresetStyles.FOOT_NOTE_BOLD}
                      style={{
                        color: focused
                          ? color.textSecondary
                          : getPrimaryColor(),
                      }}>
                      {route.title}
                    </Text>
                  </View>
                )}
              />
            )}
          />
        </View>
      </PullToRefresh>
    </BoostrScreen>
  );
};
