import {path} from 'ramda';
import moment from 'moment';
import {View} from 'react-native';
import React, {useState} from 'react';

import {
  getPrimaryColor,
  INFO_CONTENT_ID_TYPES,
  isSelectedUnitKM,
  kmToMiles,
} from '../../utility';
import {ActivityTabType} from '.';
import {color} from '../../theme';
import {BarChart} from './bar-chart';
import {translate} from '../../i18n';
import {Icon} from '../../components/icon';
import {Button} from '../../components/button';
import {ActivitiesStyles as styles} from './styles';
import {InfoComponent} from '../../components/info';
import {ButtonPreset} from '../../components/button';
import {ShareViewComponent} from './share-view-component';
import {ICON_TYPES} from '../../components/icon/constants';
import {Text, TextPresetStyles} from '../../components/text';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {detailsViewSection} from '../my-challenges-screen/components/challenges';

/**
 * An Interface for possible props for the CommonComponent component
 */
interface ICommonComponentProps {
  /**
   * A prop used to pass data for bar chart
   */
  data: any;

  /**
   * Key name from where the data will fetch on x-axis
   */
  xItemKey: string;

  /**
   * Prop used to determine the tab type for which this component will use
   */
  activityTabType: ActivityTabType;
}

/**
 * An enum for multiple tabs for activities
 */
enum ViewType {
  STEPS = 'Steps',
  DISTANCE = 'Distance',
}

/**
 * CommonComponent - used as a details component for year, month, week, day graph
 */
export const CommonComponent = (props: ICommonComponentProps) => {
  const [viewType, setViewType] = useState(ViewType.STEPS);
  const [isWalkingSelected, setIsWalkingSelected] = useState(false);
  const [isCyclingSelected, setIsCyclingSelected] = useState(false);
  const [isAllSelected, setIsAllSelected] = useState(true);

  /**
   * A method to convert data from km to miles
   */
  const unitConvertedData = () => {
    return props.data.map((item: any) => {
      const activityData: Array<any> = path(['activityData'], item);
      return {
        ...item,
        distance: isSelectedUnitKM()
          ? path(['distance'], item)
          : kmToMiles(path(['distance'], item)),
        activityData: isSelectedUnitKM()
          ? activityData
          : activityData.map((activity: any) => {
              return {
                ...activity,
                totalDistance: kmToMiles(path(['totalDistance'], activity)),
              };
            }),
      };
    });
  };

  const [data, setData] = useState(unitConvertedData());

  /**
   * Setting data on component mount
   */
  React.useEffect(() => {
    setData(unitConvertedData());
  }, [path(['data'], props)]);

  /**
   * Getting formatted date text
   */
  const getDateText = () => {
    switch (props.activityTabType) {
      case ActivityTabType.DAY:
        return moment().startOf('day').format('DD MMM, yyyy / ddd');

      case ActivityTabType.WEEK:
        return `${moment().startOf('week').format('DD MMM, yyyy')} - ${moment()
          .endOf('week')
          .format('DD MMM, yyyy')}`;

      case ActivityTabType.MONTH:
        return `${moment().startOf('month').format('DD MMM, yyyy')} - ${moment()
          .endOf('month')
          .format('DD MMM, yyyy')}`;

      case ActivityTabType.YEAR:
        return `${moment().startOf('year').format('MMM, yyyy')} - ${moment()
          .endOf('year')
          .format('MMM, yyyy')}`;
      default:
        return '';
    }
  };

  /**
   * Filtering data as per walking item click
   */
  const onWalkingClick = () => {
    setIsCyclingSelected(false);
    setIsWalkingSelected(true);
    setIsAllSelected(false);

    let updatedData = props.data.map((item: any) => {
      return {
        ...item,
        activityData: item.activityData.filter(
          (activity: any) => activity.isWRWType,
        ),
      };
    });

    updatedData = updatedData.map((item: any) => {
      return {
        ...item,
        steps: item.activityData.reduce((acc: any, val: any) => {
          return acc + path(['totalSteps'], val);
        }, 0),
        distance: item.activityData.reduce((acc: any, val: any) => {
          return acc + path(['totalDistance'], val);
        }, 0),
      };
    });
    setData(updatedData);
  };

  /**
   * Filtering data as per cycling item click
   */
  const onCyclingClick = () => {
    setIsCyclingSelected(true);
    setIsWalkingSelected(false);
    setIsAllSelected(false);
    let updatedData = props.data.map((item: any) => {
      return {
        ...item,
        activityData: item.activityData.filter(
          (activity: any) => activity.isCyclingType,
        ),
      };
    });

    updatedData = updatedData.map((item: any) => {
      return {
        ...item,
        steps: item.activityData.reduce((acc: any, val: any) => {
          return acc + path(['totalSteps'], val);
        }, 0),
        distance: item.activityData.reduce((acc: any, val: any) => {
          return acc + path(['totalDistance'], val);
        }, 0),
      };
    });

    setData(updatedData);
  };

  /**
   * Filtering data as per All item click
   */
  const onAllClick = () => {
    setIsAllSelected(true);
    setIsCyclingSelected(false);
    setIsWalkingSelected(false);
    setData(props.data);
  };

  const steps = data.reduce((acc: any, val: any) => {
    return acc + path(['steps'], val);
  }, 0);

  let distance = data.reduce((acc: any, val: any) => {
    return acc + path(['distance'], val);
  }, 0);

  distance = isSelectedUnitKM() ? distance : kmToMiles(distance);
  distance = Math.round(distance);
  return (
    <View style={[styles.mainContainerStyle]}>
      <View style={styles.tabContainer}>
        <Text preset={TextPresetStyles.FOOT_NOTE} text={getDateText()} />
        <View style={styles.tabView}>
          <View>
            {viewType != ViewType.STEPS ? (
              <TouchableOpacity
                onPress={() => {
                  setViewType(ViewType.STEPS);
                  onAllClick();
                }}
                style={styles.tabViewTextStyle}>
                <Text
                  preset={TextPresetStyles.SUB_HEADLINE_REGULAR}
                  style={{color: getPrimaryColor()}}
                  tx={'common.steps'}
                />
              </TouchableOpacity>
            ) : (
              <Button
                onPress={() => {}}
                preset={ButtonPreset.EXTRA_SMALL}
                text={translate('common.steps')}
                style={styles.stepsButtonStyle}
              />
            )}
          </View>
          {viewType != ViewType.DISTANCE ? (
            <TouchableOpacity
              onPress={() => setViewType(ViewType.DISTANCE)}
              style={styles.tabViewTextStyle}>
              <Text
                preset={TextPresetStyles.SUB_HEADLINE_REGULAR}
                style={{color: getPrimaryColor()}}
                tx={'common.distance'}
              />
            </TouchableOpacity>
          ) : (
            <Button
              onPress={() => {
                setViewType(ViewType.DISTANCE);
              }}
              preset={ButtonPreset.EXTRA_SMALL}
              text={translate('common.distance')}
              style={styles.distanceButtonStyle}
            />
          )}
        </View>
        <ShareViewComponent>
          <View style={styles.descriptionViewStyle}>
            {/* <View style={styles.shareContainerStyle}>
              <Icon
                onIconClick={() => { }}
                icon={ICON_TYPES.SHARE}
                style={styles.shareIconStyle}
              />
              <Icon
                onIconClick={() => { }}
                icon={ICON_TYPES.SAVE}
                style={styles.tildeIconView}
              />
            </View> */}

            <View style={styles.activityContainerStyle}>
              {viewType === ViewType.DISTANCE ? (
                <>
                  {detailsViewSection(
                    translate('modules.Dashboard.total'),
                    `${distance} ${
                      isSelectedUnitKM()
                        ? translate('common.km').toUpperCase()
                        : translate('common.miles').toUpperCase()
                    }`,
                  )}
                  <View style={styles.flexRow}>
                    <TouchableOpacity
                      style={[
                        styles.activityView,
                        {borderColor: getPrimaryColor()},
                        isWalkingSelected
                          ? {borderColor: getPrimaryColor()}
                          : {borderColor: color.palette.grey6},
                      ]}
                      onPress={onWalkingClick}>
                      <Icon
                        icon={ICON_TYPES.WALKING_BLUE}
                        style={
                          isWalkingSelected
                            ? {
                                ...styles.tildeIconView,
                                tintColor: getPrimaryColor(),
                              }
                            : {
                                ...styles.tildeIconView,
                                tintColor: color.palette.grey5,
                              }
                        }
                      />
                      <Icon
                        icon={ICON_TYPES.WHEEL_CHAIR}
                        style={
                          isWalkingSelected
                            ? {
                                ...styles.tildeIconView,
                                tintColor: getPrimaryColor(),
                              }
                            : {
                                ...styles.tildeIconView,
                                tintColor: color.palette.grey5,
                              }
                        }
                      />
                      <Icon
                        icon={ICON_TYPES.RUNNING}
                        style={
                          isWalkingSelected
                            ? {
                                ...styles.tildeIconView,
                                tintColor: getPrimaryColor(),
                              }
                            : {
                                ...styles.tildeIconView,
                                tintColor: color.palette.grey5,
                              }
                        }
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={onCyclingClick}
                      style={[
                        styles.activityView,
                        {borderColor: getPrimaryColor()},
                        styles.marginStyle,
                        isCyclingSelected
                          ? {borderColor: getPrimaryColor()}
                          : {borderColor: color.palette.grey6},
                      ]}>
                      <Icon
                        icon={ICON_TYPES.CYCLING}
                        style={
                          isCyclingSelected
                            ? {
                                ...styles.tildeIconView,
                                tintColor: getPrimaryColor(),
                              }
                            : {
                                ...styles.tildeIconView,
                                tintColor: color.palette.grey5,
                              }
                        }
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={onAllClick}
                      style={[
                        styles.activityView,
                        {borderColor: getPrimaryColor()},
                        styles.marginStyle,
                        isAllSelected
                          ? {borderColor: getPrimaryColor()}
                          : {borderColor: color.palette.grey6},
                      ]}>
                      <Text
                        preset={TextPresetStyles.SUB_HEADLINE_REGULAR}
                        style={[
                          isAllSelected
                            ? {color: getPrimaryColor()}
                            : {color: color.palette.grey5},
                        ]}
                        tx={'common.all'}
                      />
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <>
                  {detailsViewSection(
                    translate('modules.Dashboard.total'),
                    ` ${Math.round(
                      data.reduce((acc: any, val: any) => {
                        return acc + path(['steps'], val);
                      }, 0),
                    )} ${translate('common.steps').toLowerCase()}`,
                  )}

                  <InfoComponent
                    style={{...styles.tildeView, tintColor: getPrimaryColor()}}
                    infoContentId={INFO_CONTENT_ID_TYPES.MY_ACTIVITY_STEPS}
                  />
                </>
              )}
            </View>

            {viewType === ViewType.STEPS && steps > 0 && data && data.length ? (
              <BarChart
                data={data}
                xItemKey={props.xItemKey}
                yItemKey={'steps'}
                mainLabelText={`(${translate('common.steps')})`}
              />
            ) : viewType === ViewType.STEPS ? (
              <Text
                tx={'modules.myActivity.noActivityTracked'}
                preset={TextPresetStyles.TITLE_CIRCULAR}
                style={styles.noDataTextStyle}
              />
            ) : null}

            {viewType === ViewType.DISTANCE &&
            distance > 0 &&
            data &&
            data.length ? (
              <BarChart
                data={data}
                xItemKey={props.xItemKey}
                yItemKey={'distance'}
                mainLabelText={`(${
                  isSelectedUnitKM()
                    ? translate('common.km')
                    : translate('common.mile')
                })`}
              />
            ) : viewType === ViewType.DISTANCE ? (
              <Text
                tx={'modules.myActivity.noActivityTracked'}
                preset={TextPresetStyles.TITLE_CIRCULAR}
                style={styles.noDataTextStyle}
              />
            ) : null}
          </View>
        </ShareViewComponent>
      </View>
    </View>
  );
};
