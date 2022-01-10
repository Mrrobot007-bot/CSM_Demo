import {path} from 'ramda';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/core';
import CountDown from 'react-native-countdown-component';
import {View, ImageBackground, Image, useWindowDimensions} from 'react-native';

import {
  images,
  DEVICE_WIDTH,
  defaultAlert,
  getPrimaryColor,
  roundTo2Decimal,
} from '../../utility';
import {color} from '../../theme';
import {CrwcTab} from './crwc-tab';
import {translate} from '../../i18n';
import {
  PercentageBar,
  PercentageBarTypes,
} from '../../components/percentage-bar';
import {Icon} from '../../components/icon';
import {MyCompany} from './my-compony-tab';
import {API_URLS} from '../../services/urls';
import {hpx} from '../../utility/responsive';
import {store} from '../../redux/store/configureStore';
import {SettingScreenStyles as styles} from './styles';
import {STATUS_CODES} from '../../services/status-codes';
import ConfettiCannon from 'react-native-confetti-cannon';
import {ICON_TYPES} from '../../components/icon/constants';
import {Button, ButtonPreset} from '../../components/button';
import {PullToRefresh} from '../../components/pull-to-refresh';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {getApiCall, postApiCall} from '../../services/api-services';
import {BoostrScreen, HeaderTypes} from '../../components/boostr-screen';
import {AppTextStyles, Text, TextPresetStyles} from '../../components/text';

/**
 * An Interface for possible props for the CRWCScreen
 */
interface CRWCScreenProps {
  /**
   * Navigation prop used to set the navigation stuff in the
   * component like, go back, move to other screen, etc.
   */
  navigation: any;
}

export const CRWCScreen = (props: CRWCScreenProps) => {
  const dispatch = useDispatch();
  const partyCrackers = React.useRef();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [endDay, setEndDay] = useState();
  const [endMonth, setEndMonth] = useState();
  const [crwcData, setCrwcData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [completionP, setCompletionP] = useState<any>();
  const [totalSecLeft, setTotalSecLeft] = useState<any>();
  const [showNotiInfo, setShowNotiInfo] = useState(false);
  const [crwcAvgDistance, setCRWCAvgDistance] = useState(0);
  const [crwcTotalDistance, setCRWCTotalDistance] = useState(0);
  const [crwcLeaderBoardData, setCRWCLeaderBoardData] = useState([]);
  const [myCompanyAvgDistance, setMyCompanyAvgDistance] = useState(0);
  const [myCompanyTotalDistance, setMyCompanyTotalDistance] = useState(0);
  const [myCompanyLeaderBoardData, setMyCompanyLeaderBoardData] = useState([]);

  useEffect(() => {
    getCRWCData();
  }, []);

  const getCRWCData = async () => {
    const url = `${API_URLS.GET_CRWC}`;
    try {
      const apiResponse = await dispatch(
        getApiCall(url, props.navigation, getCRWCData, true),
      );
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        let data: any = path(['data'], apiResponse || []);
        if (data != null) {
          let endDate: any = moment(data.end_date);
          let startDate: any = moment(data.start_date);
          let todayDate: any = moment();
          var duration = moment.duration(endDate.diff(todayDate));
          setTotalSecLeft(duration.asSeconds());

          let endDay = endDate.date();
          let endMonth = endDate.format('MMMM');
          var total = moment.duration(endDate.diff(startDate));
          var current = moment.duration(todayDate.diff(startDate));

          let cp =
            new Date(endDate).getTime() < new Date().getTime()
              ? 100
              : roundTo2Decimal(
                  (current.asSeconds() * 100) / total.asSeconds(),
                );

          setShowNotiInfo(new Date(startDate).getTime() > new Date().getTime());
          setEndDay(endDay);
          setEndMonth(endMonth);
          setCompletionP(cp);
        }
        setCrwcData(data);
        setRefreshing(false);
        getCRWCLeaderBoard();
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };

  const getCRWCLeaderBoard = async () => {
    const parameters = {
      pageNo: 1,
      limit: 10,
    };
    try {
      const apiResponse = await dispatch(
        postApiCall(
          API_URLS.GET_CRWC_LEADERBOARD,
          parameters,
          true,
          props.navigation,
          getCRWCLeaderBoard,
          true,
        ),
      );
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        console.log('api Response CRWC LeaderBoard_2==>', apiResponse);
        let data: any = path(['data'], apiResponse || []);
        let leaderboard: any = path(['data', 'list'], apiResponse || []);
        let crwcTD: any = roundTo2Decimal(data.crwcTotalDistance);
        let crwcAD: any = roundTo2Decimal(data.crwcAvgDistance);
        setCRWCTotalDistance(crwcTD);
        setCRWCAvgDistance(crwcAD);
        setCRWCLeaderBoardData(leaderboard);
        getMyCompanyLeaderBoard();
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };

  const getMyCompanyLeaderBoard = async () => {
    const parameters = {
      pageNo: 1,
      limit: 10,
    };
    try {
      const apiResponse = await dispatch(
        postApiCall(
          API_URLS.GET_MY_COMPANY_LEADERBOARD,
          parameters,
          true,
          props.navigation,
          getCRWCLeaderBoard,
          true,
        ),
      );
      if (path(['statusCode'], apiResponse) === STATUS_CODES.STATUS_OK) {
        let data: any = path(['data'], apiResponse || []);
        let leaderboard: any = path(['data', 'list'], apiResponse || []);
        let myCompanyTD: any = roundTo2Decimal(data.myCompanyTotalDistance);
        let myCompanyAD: any = roundTo2Decimal(data.myCompanyAvgDistance);
        setMyCompanyTotalDistance(myCompanyTD);
        setMyCompanyAvgDistance(myCompanyAD);
        setMyCompanyLeaderBoardData(leaderboard);

        setDataFetched(true);
      }
    } catch (e) {
      defaultAlert(translate('modules.errorMessages.error'), e.message);
    }
  };

  const disableNotiInfo = () => {
    setShowNotiInfo(false);
  };

  //Top Info View
  const infoView = () => {
    return (
      <View
        style={[styles.notificationViewStyle, styles.sliderMiddleSpaceStyle]}>
        <Text
          preset={TextPresetStyles.SUB_HEADLINE_REGULAR}
          text={`${translate('modules.crwc.str1')} ${endMonth}${translate(
            'modules.crwc.str2',
          )} ${endDay} ${endMonth}.`}
          style={styles.full}
        />

        <Icon
          icon={ICON_TYPES.CLOSE}
          style={{...styles.bellIconStyle, tintColor: getPrimaryColor()}}
          onIconClick={disableNotiInfo}
        />
      </View>
    );
  };

  const onPartyCrackersStart = () => {
    try {
      if (partyCrackers && partyCrackers.current) {
        const current: any = partyCrackers.current;
        current.start();
      }
    } catch (e) {}
  };

  //Timer CountDown and progress card view render
  const crwcTimerView = () => {
    return (
      <ImageBackground
        resizeMode={'cover'}
        style={[styles.timerBg, {backgroundColor: getPrimaryColor()}]}
        imageStyle={{borderRadius: hpx(20)}}
        source={images.bgCRWCTimer}>
        <PercentageBar
          greyBarOuterStyle={{backgroundColor: color.palette.grey13}}
          activePercentage={`${completionP}%`}
          activeBarBackgroundColor={color.palette.green}
          barType={PercentageBarTypes.THIN}
          isFloatingPercentage
          isPercentageTextOutside
        />

        <View style={styles.timerSubContainer}>
          <Image source={images.crwcLogo} style={styles.crwcLogoStyle} />
          <View style={{height: DEVICE_WIDTH * 0.1}}>
            <Icon icon={ICON_TYPES.TILDE_CIRCLE} style={styles.infoCircle} />
          </View>
          <View style={styles.full} />

          <View style={styles.countDownContainerStyle}>
            <CountDown
              size={17}
              until={totalSecLeft}
              digitStyle={styles.cdDigitStyle}
              digitTxtStyle={[
                AppTextStyles.titleMedium,
                styles.cdDigitTxtStyle,
              ]}
              timeLabelStyle={styles.cdTimeLabelStyle}
              separatorStyle={[
                AppTextStyles.titleMedium,
                styles.cdSeparatorStyle,
              ]}
              showSeparator
              onFinish={() => onPartyCrackersStart()}
            />
          </View>
        </View>
      </ImageBackground>
    );
  };

  const dismissRefresh = () => {
    setRefreshing(true);
    getCRWCData();
  };

  const [routes] = React.useState([
    {key: 'CrwcTab', title: translate('modules.crwc.title')},
    {key: 'MyCompany', title: translate('common.myCompany')},
  ]);
  const renderScene = SceneMap({
    CrwcTab: () => (
      <CrwcTab
        navigation={props.navigation}
        showTabStatus={index}
        totalDistance={crwcTotalDistance}
        avgDistance={crwcAvgDistance}
        data={crwcLeaderBoardData}
      />
    ),

    MyCompany: () => (
      <MyCompany
        navigation={props.navigation}
        showTabStatus={index}
        totalDistance={myCompanyTotalDistance}
        avgDistance={myCompanyAvgDistance}
        data={myCompanyLeaderBoardData}
      />
    ),
  });

  const isLoading = store.getState().apiReducer.loading;
  const crwcHeight = hpx(360) + crwcLeaderBoardData.length * hpx(30);
  const myCompanyHeight = hpx(360) + myCompanyLeaderBoardData.length * hpx(35);

  return (
    <BoostrScreen
      title={translate('modules.crwc.title')}
      navigation={props.navigation}
      headerType={useIsFocused() ? HeaderTypes.NORMAL_BACK : HeaderTypes.NONE}>
      {dataFetched ? (
        <PullToRefresh onRefresh={dismissRefresh} refreshing={refreshing}>
          {!isLoading && (
            <View>
              {showNotiInfo == true ? infoView() : null}
              {crwcData != null ? (
                crwcTimerView()
              ) : (
                <View>
                  <Text
                    preset={TextPresetStyles.FOOT_NOTE}
                    style={styles.noDataTextStyle}
                    tx={'modules.crwc.noCrwcCounter'}
                  />
                  <Button
                    onPress={() => {
                      getCRWCData();
                    }}
                    preset={ButtonPreset.EXTRA_SMALL}
                    text={translate('common.retry')}
                  />
                </View>
              )}
              <View
                style={{
                  width: DEVICE_WIDTH,
                  height: index == 0 ? crwcHeight : myCompanyHeight,
                  backgroundColor: color.palette.lightYellow_50,
                }}>
                <TabView
                  navigationState={{index, routes}}
                  renderScene={renderScene}
                  onIndexChange={setIndex}
                  initialLayout={{width: layout.width}}
                  renderTabBar={(props: any) => (
                    <TabBar
                      {...props}
                      pressColor={'transparent'}
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
            </View>
          )}
        </PullToRefresh>
      ) : null}
      <ConfettiCannon
        count={350}
        origin={{x: -10, y: 0}}
        autoStart={false}
        ref={partyCrackers}
      />
    </BoostrScreen>
  );
};
