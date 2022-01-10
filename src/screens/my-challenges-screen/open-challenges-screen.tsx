import {path} from 'ramda';
import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {ScrollView} from 'react-native-gesture-handler';
import {connect, RootStateOrAny, useDispatch, useSelector} from 'react-redux';

import {
  showMessage,
  defaultAlert,
  getLiveChallenges,
  INFO_CONTENT_ID_TYPES,
} from '../../utility';
import {color} from '../../theme';
import {translate} from '../../i18n';
import {API_URLS} from '../../services/urls';
import {Challenges} from './components/challenges';
import {InfoComponent} from '../../components/info';
import {STATUS_CODES} from '../../services/status-codes';
import {MyChallengesScreenStyles as styles} from './styles';
import {getUpdatedData} from './components/get-live-challenges';
import {getApiCall, postApiCall} from '../../services/api-services';
import {DefaultDropDownPicker} from '../../components/drop-down-picker';
import {ActivitiesType} from '../../utility/object-types/auth-response';
import {ChallengeScreenTypes} from '../../utility/object-types/challenge';

/**
 * Different types of challenges options available in app
 */
const TypeOfChallenges = [
  {label: 'All', value: 'All'},
  {label: 'Relay', value: 'relay'},
  {label: 'Time Trail', value: 'timeTrial'},
  {label: 'Happy Feet', value: 'happyFeet'},
  {label: 'Meet Up', value: 'meetUp'},
  {label: 'Far Out', value: 'farOut'},
];

/**
 * An Interface for possible props for the LiveChallenges Screen
 */
interface IOpenChallengesScreenProps {
  /**
   * A prop used to provide the of open challenges
   */
  challengesData: any;
}

/**
 * OpenChallenges - A screen used to provide the list of open challenges
 */
const OpenChallenges = (props: IOpenChallengesScreenProps) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [pageNumber, setPageNumber] = useState(1);
  const [activitiesList, setActivities] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isPickerOpened, setIsPickerOpened] = useState(false);
  const [selectedTracker, setSelectedTracker] = useState(null);
  const [challengeType, setSelectedChallengeType] = useState(null);
  const [shouldStopLoading, setShouldStopLoading] = useState(false);
  const [isChallengeTypeOpened, setIsChallengeTypeOpened] = useState(false);
  const [challengesData, setChallengesData] = useState(props.challengesData);
  const userReducer = useSelector((state: RootStateOrAny) => state.userReducer);

  const dropDownSet = (value: string) => {
    if (value == 'challenge') {
      setIsPickerOpened(false);
      setIsChallengeTypeOpened(!isChallengeTypeOpened);
    } else if (value == 'activity') {
      setIsChallengeTypeOpened(false);
      setIsPickerOpened(!isPickerOpened);
    }
  };

  useEffect(() => {
    getActivities();
  }, []);

  useEffect(() => {
    setChallengesData(challengesData);
  }, [props.challengesData]);

  const getActivities = async () => {
    if (shouldStopLoading) {
      return;
    }
    try {
      const apiResponse = await dispatch(
        getApiCall(
          `${API_URLS.ACTIVITIES}?type=challenge`,
          navigation,
          getActivities,
          false,
          false,
          false,
          pageNumber > 1,
        ),
      );

      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        let newArray: Array<Object> = [];
        let obj = {label: 'All', value: 'All', _id: 'All'};
        newArray.push(obj);
        let activities: Array<ActivitiesType> =
          path(['data'], apiResponse) || [];
        activities.map((e: ActivitiesType) => {
          let obj = {label: e.name, value: e._id};
          newArray.push(obj);
        });

        setActivities(newArray);
        openChallengeList();
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };

  const openChallengeList = async () => {
    let parameters = {
      pageNo: 1,
      limit: 10,
      name: challengeType === 'All' ? null : challengeType,
      activityId:
        selectedTracker === null ||
        selectedTracker === '' ||
        selectedTracker === 'All'
          ? []
          : `${selectedTracker}`.split(','),
    };

    if (shouldStopLoading) return;
    if (pageNumber > 1) {
      setIsDataLoading(true);
    }
    try {
      const apiResponse = await dispatch(
        postApiCall(API_URLS.OPEN_CHALLENGE, parameters, pageNumber <= 1),
      );
      console.log('userAPiDataOpen==>', pageNumber, apiResponse);
      setIsDataLoading(false);
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        let userApiData: Array<any> = path(['data'], apiResponse) || [];
        userApiData = getUpdatedData(userApiData, ChallengeScreenTypes.OPEN);
        userApiData = userApiData.filter(item => {
          const isItemFound = challengesData.find(
            (oldItem: any) => path(['_id'], oldItem) === path(['_id'], item),
          );
          return isItemFound ? null : item;
        });

        if (userApiData && userApiData.length > 0) {
          setPageNumber(pageNumber + 1);
          const updatedUserData = [...challengesData, ...userApiData];
          setChallengesData(updatedUserData);
        } else {
          setShouldStopLoading(true);
        }
      }
    } catch (e) {
      setIsDataLoading(false);
    }
  };

  const setTracker = (text: string) => {
    setPageNumber(1);
    setShouldStopLoading(false);
    setChallengesData([]);

    setSelectedTracker(text);
    openChallengeList();
  };

  const setChallengeType = (text: string) => {
    setPageNumber(1);
    setShouldStopLoading(false);
    setChallengesData([]);

    setSelectedChallengeType(text);
    openChallengeList();
  };

  const onJoinClick = async (_id: any) => {
    let parameters = {
      challengeId: _id,
    };
    const apiResponse = await dispatch(
      postApiCall(
        API_URLS.JOIN_OPEN_CHALLENGE,
        parameters,
        true,
        navigation,
        onJoinClick,
      ),
    );
    if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
      showMessage(translate('modules.myChallenges.challengeJoined'));
      const updatedChallenges = challengesData.filter(
        (item: any) => path(['_id'], item) !== _id,
      );
      setChallengesData(updatedChallenges);
      getLiveChallenges(userReducer, true);
    }
  };

  const onListEndReached = () => {
    openChallengeList();
  };

  const headerComponent = () => {
    return (
      <View style={[styles.openChallengeSubContainer, {zIndex: 999}]}>
        <DefaultDropDownPicker
          value={challengeType}
          isOpenPicker={isChallengeTypeOpened}
          setIsOpenPicker={() => dropDownSet('challenge')}
          dropDownItems={TypeOfChallenges}
          topPlaceholderTx={'modules.myChallenges.filterByChallenge'}
          topPlaceholderTextColor={color.textInputPlaceHolderText}
          onSetValue={text => setChallengeType(text)}
          topRightComponent={
            <InfoComponent
              infoContentId={INFO_CONTENT_ID_TYPES.OPEN_CHALLENGE_FILTER}
              style={styles.infoIconStyle}
            />
          }
          style={styles.dropDownPickerStyle}
        />

        <DefaultDropDownPicker
          value={selectedTracker}
          isOpenPicker={isPickerOpened}
          setIsOpenPicker={() => dropDownSet('activity')}
          dropDownItems={activitiesList}
          topPlaceholderTx={'modules.myChallenges.filterByActivity'}
          topPlaceholderTextColor={color.textInputPlaceHolderText}
          onSetValue={text => setTracker(text)}
          dropDownStyle={styles.dropDownStyle}
          style={styles.dropDownPickerStyle}
        />
      </View>
    );
  };

  return (
    <ScrollView style={styles.openChallengeMainContainer}>
      <Challenges
        challenges={challengesData}
        isDataLoading={isDataLoading}
        onJoinClick={onJoinClick}
        listHeader={headerComponent()}
        onListEndReached={onListEndReached}
      />

      <View style={styles.boostrDummy} />
    </ScrollView>
  );
};

function mapStateToProps(state: any) {
  return {
    loading: state.apiReducer.loading,
  };
}

export const OpenChallengesScreen = connect(
  mapStateToProps,
  {},
)(OpenChallenges);
