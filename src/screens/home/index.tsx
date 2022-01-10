import {path} from 'ramda';
import React, {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/core';
import {Swipeable} from 'react-native-gesture-handler';
import CountDown from 'react-native-countdown-component';
import ConfettiCannon from 'react-native-confetti-cannon';
import {View, TouchableOpacity, ImageBackground, Image} from 'react-native';
import {connect, useDispatch, RootStateOrAny, useSelector} from 'react-redux';

import {
  images,
  defaultAlert,
  SCREEN_ROUTES,
  getPrimaryColor,
  removeNotification,
  getNotificationList,
  DefaultPreferenceKeys,
  INFO_CONTENT_ID_TYPES,
} from '../../utility';
import {
  PercentageBar,
  PercentageBarTypes,
} from '../../components/percentage-bar';
import {
  HeaderTypes,
  BoostrScreen,
  HeaderRightComponentType,
} from '../../components/boostr-screen';
import {WellnessScreen} from './wellness';
import {Icon} from '../../components/icon';
import {HomeStyles as styles} from './styles';
import {color, spacingPresets} from '../../theme';
import {ICON_TYPES} from '../../components/icon/constants';
import {SectionTitle} from '../../components/section-title';
import {YourActivity} from '../../components/your-activity';
import {Button, ButtonPreset} from '../../components/button';
import {PullToRefresh} from '../../components/pull-to-refresh';
import {Challenges} from '../my-challenges-screen/components/challenges';
import {AppTextStyles, Text, TextPresetStyles} from '../../components/text';
import {getHomeData, updateChallengeState, updateRewardsState} from './utils';
import {onNotificationReceive} from '../../redux/actions/notification-action';

/**
 * An Interface for possible props for the Home component
 */
interface IHomeProps {
  /**
   * Navigation prop used to set the navigation stuff in the
   * component like, go back, move to other screen, etc.
   */
  navigation: any;
}

/**
 * HomeScreen - Main screen of boostr application, which have
 * info about crwc, challenges, wellness, goals etc
 */
const HomeScreen = (props: IHomeProps) => {
  const [challenges, setChallenges] = useState(updateChallengeState(props));
  const [notificationData, setNotificationData] = useState([]);
  const [goalActivities, setGoalActivities] = useState(
    updateRewardsState(props),
  );
  const [refreshing, setRefreshing] = useState(false);
  const {notification} = useSelector((state: RootStateOrAny) => ({
    notification: state.notificationReducer.notification,
  }));
  const partyCrackers = React.useRef();
  const completionP =
    path(['user', 'crwc', 'crwcCompletionPercentage'], props) || 0;
  const totalSecLeft = path(['user', 'crwc', 'crwcTimeLeft'], props);

  React.useEffect(() => {
    setRefreshing(false);
    setChallenges(updateChallengeState(props));
    setGoalActivities(updateRewardsState(props));
  }, [
    path(['user', 'liveChallenges'], props),
    path(['user', 'upcomingChallenges'], props),
    path(['user', 'goalsAndRewards', 'activities'], props),
    path(['user', 'crwc'], props),
  ]);

  /**
   * function to load initial data
   */
  useEffect(() => {
    console.log(notification);
    getNotificationData();
    dispatch(onNotificationReceive(false));
  }, [notification]);

  const dispatch = useDispatch();

  /**
   * function to load initial data
   */
  React.useEffect(() => {
    getHomeData(props, dispatch);
    getNotificationData();
  }, []);

  /**
   * function to get notification data
   */
  const getNotificationData = async () => {
    let notificationList = await getNotificationList(
      DefaultPreferenceKeys.NOTIFICATION_LIST,
    );
    setNotificationData(notificationList);
    setRefreshing(false);
  };

  const notificationView = (item: any) => {
    return (
      <Swipeable renderRightActions={() => dismissView(item.id)}>
        <View
          style={[styles.notificationViewStyle, styles.sliderMiddleSpaceStyle]}>
          <View
            style={[
              styles.notificationBellViewStyle,
              {backgroundColor: getPrimaryColor()},
            ]}>
            <Icon
              icon={ICON_TYPES.BELL}
              style={{...styles.bellIconStyle, tintColor: getPrimaryColor()}}
            />
          </View>
          <View style={styles.notificationBellTextStyle}>
            <View>
              <Text
                preset={TextPresetStyles.SUB_HEADLINE}
                style={[styles.secondaryLabelTextStyle, styles.blackTextStyle]}
                text={item.title}
              />
              <Text
                preset={TextPresetStyles.CAPTION_1}
                style={[styles.secondaryLabelTextStyle, styles.grayTextStyle]}
                text={item.message}
              />
            </View>

            {/* start tracking button */}
            {buttonView()}
          </View>
        </View>
      </Swipeable>
    );
  };

  /**
   * Dismiss button View
   */

  const dismissView = (id: any) => {
    return (
      <TouchableOpacity
        style={styles.notificationDismissViewStyle}
        onPress={() => {
          removeNotification(id);
        }}>
        <Icon
          icon={ICON_TYPES.CROSS}
          style={{...styles.closeIconViewStyle, tintColor: getPrimaryColor()}}
        />
        <Text
          preset={TextPresetStyles.MINI_FONT}
          style={[
            styles.secondaryLabelTextStyle,
            {color: getPrimaryColor()},
            styles.dismissTextStyle,
          ]}
          tx={'modules.Dashboard.dismiss'}
        />
      </TouchableOpacity>
    );
  };

  /**
   *  Button view
   * @returns
   */
  const buttonView = () => {
    return (
      <Button
        tx={'modules.Dashboard.startTracking'}
        onPress={() => defaultAlert()}
        preset={ButtonPreset.EXTRA_SMALL}
        style={styles.startTrackingButtonStyle}
      />
    );
  };

  /**
   * function this the pull to refresh
   */
  const dismissRefresh = () => {
    setRefreshing(true);
    getHomeData(props, dispatch);
    getNotificationData();
  };

  /**
   * Timer CountDown and progress card view render
   */
  const crwcTimerView = () => {
    return (
      <ImageBackground
        resizeMode={'cover'}
        style={[styles.timerBg, {backgroundColor: getPrimaryColor()}]}
        imageStyle={styles.crwcTimerContainerStyle}
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
          <View style={styles.crwcInfoIconContainerStyle}>
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
              onFinish={() => partyCrackers?.current?.start()}
            />
          </View>
        </View>
      </ImageBackground>
    );
  };

  return (
    <BoostrScreen
      navigation={props.navigation}
      headerRightComponentType={HeaderRightComponentType.LOGO_ONLY}
      headerType={useIsFocused() ? HeaderTypes.LONG_MENU : HeaderTypes.NONE}>
      <PullToRefresh onRefresh={dismissRefresh} refreshing={refreshing}>
        {notificationData &&
          notificationData.map(item => {
            return <View>{notificationView(item)}</View>;
          })}
        <View>
          {totalSecLeft !== undefined ? (
            <View>
              <SectionTitle
                onViewMoreClick={() =>
                  props.navigation.navigate(SCREEN_ROUTES.CRWC_SCREEN)
                }
                tx={'modules.crwc.title'}
                shouldShowViewMore
                style={styles.mainTitleContainerStyle}
              />

              {crwcTimerView()}
            </View>
          ) : null}
          <SectionTitle
            onViewMoreClick={() =>
              props.navigation.navigate(SCREEN_ROUTES.REWARDS_TAB)
            }
            tx={'modules.Dashboard.goalAndActivity'}
            shouldShowViewMore
            style={styles.mainTitleContainerStyle}
          />

          <YourActivity
            stepsBarColor={getPrimaryColor()}
            timeBarColor={color.palette.black}
            timePercentage={`${goalActivities?.timeProgress}${'%'}`}
            currentSteps={JSON.stringify(goalActivities?.totalSteps)}
            weeklySteps={JSON.stringify(goalActivities?.weeklySteps)}
            stepsPercentage={`${goalActivities?.stepsProgress}${'%'}`}
            infoContentId={INFO_CONTENT_ID_TYPES.GOALS_REWARDS_YOUR_GOAL}
          />

          <View>
            <SectionTitle
              onViewMoreClick={() =>
                props.navigation.navigate(SCREEN_ROUTES.CHALLENGES_TAB)
              }
              tx={'modules.Dashboard.challenges'}
              shouldShowViewMore
              style={styles.mainTitleContainerStyle}
            />
            {challenges && challenges.length ? (
              <Challenges challenges={challenges} isHomeChallenge={true} />
            ) : (
              <View>
                <Text
                  preset={TextPresetStyles.FOOT_NOTE}
                  style={{
                    marginHorizontal: spacingPresets.mediumPlus,
                    marginVertical: spacingPresets.mediumPlus,
                    textAlign: 'center',
                  }}
                  tx={'modules.myChallenges.noLiveChallenges'}
                />
              </View>
            )}
          </View>

          <WellnessScreen />
          <ConfettiCannon
            count={350}
            origin={{x: -20, y: 0}}
            autoStart={false}
            ref={partyCrackers}
          />
        </View>
      </PullToRefresh>
    </BoostrScreen>
  );
};

function mapStateToProps(state: any) {
  return {
    user: state.userReducer.user,
  };
}
export const Home = connect(mapStateToProps, {})(HomeScreen);
