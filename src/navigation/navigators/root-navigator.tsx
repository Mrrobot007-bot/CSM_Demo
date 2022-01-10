import React from 'react';
import {StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  DefaultPreferenceKeys,
  DEVICE_WIDTH,
  getPrimaryColor,
  isAndroid,
  SCREEN_ROUTES,
} from '../../utility';
import {TabStyles} from './styles';
import {Home} from '../../screens/home';
import {Tabs} from '../../components/tabs';
import {Icon} from '../../components/icon';
import {Splash} from '../../assets/splash';
import {FAQScreen} from '../../screens/faq';
import {CRWCScreen} from '../../screens/crwc';
import {ErrorScreen} from '../../screens/error';
import {color, spacingPresets} from '../../theme';
import {MyTeamsScreen} from '../../screens/teams';
import {ProfileScreen} from '../../screens/profile';
import {SettingScreen} from '../../screens/settings';
import {NewsfeedScreen} from '../../screens/newsfeed';
import {LoginScreen} from '../../screens/login-screen';
import {CustomWebView} from '../../components/webview';
import {GoalsRewards} from '../../screens/goals-rewards';
import {MyActivityScreen} from '../../screens/activities';
import {ICON_TYPES} from '../../components/icon/constants';
import {TeamProfile} from '../../screens/teams/team-profile';
import {RegisterScreen} from '../../screens/registerScreen';
import DefaultPreference from 'react-native-default-preference';
import {OnboardingScreen} from '../../screens/onboardingScreen';
import {CreateTeamScreen} from '../../screens/teams/create-team';
import {HowItWorks} from '../../screens/goals-rewards/how-it-works';
import {CrwLeaderBoard} from '../../screens/crwc/crwc-leader-board';
import {WellnessMainScreen} from '../../screens/home/wellness-main';
import {ContactUsFeedback} from '../../screens/contactUs-feedback';
import {InvitedTeamList} from '../../screens/teams/invites-team-list';
import {MyChallengesScreen} from '../../screens/my-challenges-screen';
import {ClaimRewards} from '../../screens/goals-rewards/claim-rewards';
import {showTrackerDialog} from '../../redux/actions/tracker-action';
import {InAppTrackerDialog} from '../../screens/in-app-tracker-dialog';
import {FutureRewards} from '../../screens/goals-rewards/future-rewards';
import {EditTeamScreen} from '../../screens/teams/team-profile/edit-team';
import {ForgotPasswordScreen} from '../../screens/forgot-password-screen';
import {ReactivateAccountScreen} from '../../screens/re-activate-account';
import {ManageTeamInvitesScreen} from '../../screens/teams/mange-team-invites';
import {PrivacyPolicyScreen} from '../../screens/registerScreen/privacy-policy';
import {TermsConditionScreen} from '../../screens/registerScreen/terms-condition';
import {SendTeamInvites} from '../../screens/teams/mange-team-invites/send-invites';
import {ManageInvitesScreen} from '../../screens/my-challenges-screen/mange-invites';
import {CommonLeaderBoard} from '../../screens/teams/components/team-leader-board';
import {CreateChallengesScreen} from '../../screens/my-challenges-screen/create-challenge-screen';
import {CreateNewChallengeScreen} from '../../screens/my-challenges-screen/create-new-challenges';
import {SendBoostrScreen} from '../../screens/my-challenges-screen/components/send-boostr-screen';
import {BoostrMainComponent} from '../../screens/my-challenges-screen/components/boostr-main-page';
import {CommonTeamLeaderBoard} from '../../screens/my-challenges-screen/components/common-team-leader-board';
import {UserLeaderBoard} from '../../screens/my-challenges-screen/components/user-leader-board';
const Stack = createStackNavigator();

/**
 * A Component used to provide the navigation for authentication module
 */
const AuthNavigator = () => {
  let initialScreen = false;

  DefaultPreference.get(DefaultPreferenceKeys.LOGOUT_CLICK_PERMISSION).then(
    value => {
      if (value && value === 'true') {
        initialScreen = true;
      }
    },
  );

  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        title: null,
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <Icon
            icon={ICON_TYPES.BACK}
            style={{
              width: DEVICE_WIDTH * 0.064,
              height: DEVICE_WIDTH * 0.064,
              tintColor: color.palette.white,
              marginLeft: DEVICE_WIDTH * 0.032,
              marginTop: StatusBar.currentHeight + spacingPresets.small,
            }}
          />
        ),
      }}
      initialRouteName={SCREEN_ROUTES.LOGIN_SCREEN}>
      <SplashStack.Screen
        name={SCREEN_ROUTES.SPLASH_SCREEN}
        component={Splash}
      />
      <Stack.Screen name={SCREEN_ROUTES.LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen
        name={SCREEN_ROUTES.REACTIVATE_SCREEN}
        component={ReactivateAccountScreen}
      />
      <Stack.Screen
        name={SCREEN_ROUTES.PRIVACY_POLICY_SCREEN}
        component={PrivacyPolicyScreen}
      />
      <Stack.Screen
        name={SCREEN_ROUTES.TERMS_CONDITION_SCREEN}
        component={TermsConditionScreen}
      />
      <Stack.Screen
        name={SCREEN_ROUTES.REGISTER_SCREEN}
        component={RegisterScreen}
      />
      <Stack.Screen
        name={SCREEN_ROUTES.FORGOT_PASSWORD_SCREEN}
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        name={SCREEN_ROUTES.ONBOARDING_SCREEN}
        component={OnboardingScreen}
      />

      <Stack.Screen name={SCREEN_ROUTES.WEB_VIEW} component={CustomWebView} />
      <Stack.Screen name={SCREEN_ROUTES.ERROR_SCREEN} component={ErrorScreen} />
    </Stack.Navigator>
  );
};

/**
 * Creating multiple navigator
 */
const BottomTabStack = createBottomTabNavigator();
const SplashStack = createStackNavigator();
const HomeStack = createStackNavigator();
const TrackerStack = createStackNavigator();
const ChallengesStack = createStackNavigator();
const TeamStack = createStackNavigator();
const RewardsStack = createStackNavigator();

/**
 * A Component used to provide the navigation for Home module
 */
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name={SCREEN_ROUTES.HOME_SCREEN} component={Home} />
      <HomeStack.Screen name={SCREEN_ROUTES.FAQ} component={FAQScreen} />
      <HomeStack.Screen
        name={SCREEN_ROUTES.SETTING_SCREEN}
        component={SettingScreen}
      />
      <HomeStack.Screen
        name={SCREEN_ROUTES.ERROR_SCREEN}
        component={ErrorScreen}
      />
      <HomeStack.Screen
        name={SCREEN_ROUTES.CONTACT_US_FEEDBACK}
        component={ContactUsFeedback}
      />
      <HomeStack.Screen
        name={SCREEN_ROUTES.ACTIVITY_SCREEN}
        component={MyActivityScreen}
      />
      <HomeStack.Screen
        name={SCREEN_ROUTES.PROFILE_SCREEN}
        component={ProfileScreen}
      />
      <HomeStack.Screen
        name={SCREEN_ROUTES.WEB_VIEW}
        component={CustomWebView}
      />

      <HomeStack.Screen
        name={SCREEN_ROUTES.TEAM_PROFILE}
        component={TeamProfile}
      />
      <HomeStack.Screen
        name={SCREEN_ROUTES.CRWC_LEADERBOARD}
        component={CrwLeaderBoard}
      />

      <HomeStack.Screen
        name={SCREEN_ROUTES.CRWC_SCREEN}
        component={CRWCScreen}
      />

      <HomeStack.Screen
        name={SCREEN_ROUTES.NEWSFEED_SCREEN}
        component={NewsfeedScreen}
      />

      <HomeStack.Screen
        name={SCREEN_ROUTES.WELLNESS_SCREEN}
        component={WellnessMainScreen}
      />
    </HomeStack.Navigator>
  );
};

/**
 * A Component used to provide the navigation for Challenge module
 */
const ChallengesStackNavigator = () => {
  return (
    <ChallengesStack.Navigator>
      <ChallengesStack.Screen
        name={SCREEN_ROUTES.CHALLENGES_SCREEN}
        component={MyChallengesScreen}
      />

      <ChallengesStack.Screen
        name={SCREEN_ROUTES.SETTING_SCREEN}
        component={SettingScreen}
      />

      <ChallengesStack.Screen
        name={SCREEN_ROUTES.CREATE_CHALLENGES_SCREEN}
        component={CreateChallengesScreen}
      />

      <ChallengesStack.Screen
        name={SCREEN_ROUTES.RELAY_CHALLENGES_SCREEN}
        component={CreateNewChallengeScreen}
      />

      <Stack.Screen name={SCREEN_ROUTES.HOME} component={Home} />

      <Stack.Screen
        name={SCREEN_ROUTES.SEND_BOOSTR}
        component={SendBoostrScreen}
      />
      <Stack.Screen name={SCREEN_ROUTES.FAQ} component={FAQScreen} />
      <Stack.Screen
        name={SCREEN_ROUTES.MANAGE_INVITES}
        component={ManageInvitesScreen}
      />

      <Stack.Screen name={SCREEN_ROUTES.ERROR_SCREEN} component={ErrorScreen} />

      <Stack.Screen name={SCREEN_ROUTES.WEB_VIEW} component={CustomWebView} />

      <Stack.Screen
        name={SCREEN_ROUTES.ACTIVITY_SCREEN}
        component={MyActivityScreen}
      />

      <Stack.Screen
        name={SCREEN_ROUTES.PROFILE_SCREEN}
        component={ProfileScreen}
      />

      <Stack.Screen name={SCREEN_ROUTES.TEAM_PROFILE} component={TeamProfile} />

      <Stack.Screen
        name={SCREEN_ROUTES.CONTACT_US_FEEDBACK}
        component={ContactUsFeedback}
      />
      <Stack.Screen
        name={SCREEN_ROUTES.TEAM_LEADERBOARD}
        component={CommonTeamLeaderBoard}
      />
      <Stack.Screen
        name={SCREEN_ROUTES.USER_LEADERBOARD}
        component={UserLeaderBoard}
      />

      <Stack.Screen
        name={SCREEN_ROUTES.SEND_BOOSTR_MAIN_SCREEN}
        component={BoostrMainComponent}
      />

      <Stack.Screen
        name={SCREEN_ROUTES.CRWC_LEADERBOARD}
        component={CrwLeaderBoard}
      />

      <Stack.Screen name={SCREEN_ROUTES.CRWC_SCREEN} component={CRWCScreen} />
    </ChallengesStack.Navigator>
  );
};

/**
 * A Component used to provide the navigation for in-app Tracker module
 */
const TrackerStackNavigator = () => {
  return (
    <TrackerStack.Navigator>
      <TeamStack.Screen
        name={SCREEN_ROUTES.TRACKER_SCREEN}
        component={InAppTrackerDialog}
      />

      <TrackerStack.Screen
        name={SCREEN_ROUTES.SETTING_SCREEN}
        component={SettingScreen}
      />
      <TrackerStack.Screen
        name={SCREEN_ROUTES.ERROR_SCREEN}
        component={ErrorScreen}
      />

      <TrackerStack.Screen
        name={SCREEN_ROUTES.WEB_VIEW}
        component={CustomWebView}
      />
      <TrackerStack.Screen
        name={SCREEN_ROUTES.CREATE_TEAM_SCREEN}
        component={CreateTeamScreen}
      />
      <TrackerStack.Screen name={SCREEN_ROUTES.FAQ} component={FAQScreen} />

      <TrackerStack.Screen
        name={SCREEN_ROUTES.ACTIVITY_SCREEN}
        component={MyActivityScreen}
      />

      <TrackerStack.Screen
        name={SCREEN_ROUTES.PROFILE_SCREEN}
        component={ProfileScreen}
      />

      <TrackerStack.Screen
        name={SCREEN_ROUTES.TEAM_PROFILE}
        component={TeamProfile}
      />

      <TrackerStack.Screen
        name={SCREEN_ROUTES.CONTACT_US_FEEDBACK}
        component={ContactUsFeedback}
      />

      <TrackerStack.Screen
        name={SCREEN_ROUTES.CRWC_LEADERBOARD}
        component={CrwLeaderBoard}
      />

      <TrackerStack.Screen
        name={SCREEN_ROUTES.CRWC_SCREEN}
        component={CRWCScreen}
      />
    </TrackerStack.Navigator>
  );
};

/**
 * A Component used to provide the navigation for Team module
 */
const TeamStackNavigator = () => {
  return (
    <TeamStack.Navigator>
      <TeamStack.Screen
        name={SCREEN_ROUTES.TEAM_SCREEN}
        component={MyTeamsScreen}
      />

      <TeamStack.Screen
        name={SCREEN_ROUTES.TEAM_PROFILE}
        component={TeamProfile}
      />

      <TeamStack.Screen
        name={SCREEN_ROUTES.ERROR_SCREEN}
        component={ErrorScreen}
      />

      <TeamStack.Screen
        name={SCREEN_ROUTES.EDIT_TEAM}
        component={EditTeamScreen}
      />
      <TeamStack.Screen
        name={SCREEN_ROUTES.MANAGE_TEAM_INVITES}
        component={ManageTeamInvitesScreen}
      />
      <TeamStack.Screen
        name={SCREEN_ROUTES.SEND_TEAM_INVITE}
        component={SendTeamInvites}
      />
      <TeamStack.Screen
        name={SCREEN_ROUTES.INVITED_TEAM_LIST}
        component={InvitedTeamList}
      />
      <TeamStack.Screen
        name={SCREEN_ROUTES.SETTING_SCREEN}
        component={SettingScreen}
      />
      <TeamStack.Screen
        name={SCREEN_ROUTES.WEB_VIEW}
        component={CustomWebView}
      />
      <TeamStack.Screen
        name={SCREEN_ROUTES.CREATE_TEAM_SCREEN}
        component={CreateTeamScreen}
      />

      <TeamStack.Screen name={SCREEN_ROUTES.FAQ} component={FAQScreen} />

      <TeamStack.Screen
        name={SCREEN_ROUTES.ACTIVITY_SCREEN}
        component={MyActivityScreen}
      />

      <TeamStack.Screen
        name={SCREEN_ROUTES.PROFILE_SCREEN}
        component={ProfileScreen}
      />

      <TeamStack.Screen
        name={SCREEN_ROUTES.CONTACT_US_FEEDBACK}
        component={ContactUsFeedback}
      />
      <TeamStack.Screen
        name={SCREEN_ROUTES.COMMON_LEADERBOARD}
        component={CommonLeaderBoard}
      />

      <TeamStack.Screen
        name={SCREEN_ROUTES.SEND_CHAT_SCREEN}
        component={SendBoostrScreen}
      />
      <TeamStack.Screen
        name={SCREEN_ROUTES.SEND_BOOSTR_MAIN_SCREEN}
        component={BoostrMainComponent}
      />

      <TeamStack.Screen
        name={SCREEN_ROUTES.CRWC_LEADERBOARD}
        component={CrwLeaderBoard}
      />

      <TeamStack.Screen
        name={SCREEN_ROUTES.CRWC_SCREEN}
        component={CRWCScreen}
      />
    </TeamStack.Navigator>
  );
};

/**
 * A Component used to provide the navigation for Goals & Rewards module
 */
const RewardsStackNavigator = () => {
  return (
    <RewardsStack.Navigator>
      <RewardsStack.Screen
        name={SCREEN_ROUTES.REWARDS_SCREEN}
        component={GoalsRewards}
      />

      <RewardsStack.Screen
        name={SCREEN_ROUTES.SETTING_SCREEN}
        component={SettingScreen}
      />
      <RewardsStack.Screen
        name={SCREEN_ROUTES.HOW_IT_WORKS}
        component={HowItWorks}
      />

      <RewardsStack.Screen
        name={SCREEN_ROUTES.CLAIM_REWARDS}
        component={ClaimRewards}
      />
      <RewardsStack.Screen
        name={SCREEN_ROUTES.FUTURE_REWARDS}
        component={FutureRewards}
      />

      <RewardsStack.Screen
        name={SCREEN_ROUTES.ERROR_SCREEN}
        component={ErrorScreen}
      />

      <RewardsStack.Screen
        name={SCREEN_ROUTES.WEB_VIEW}
        component={CustomWebView}
      />

      <RewardsStack.Screen name={SCREEN_ROUTES.FAQ} component={FAQScreen} />

      <RewardsStack.Screen
        name={SCREEN_ROUTES.ACTIVITY_SCREEN}
        component={MyActivityScreen}
      />
      <RewardsStack.Screen
        name={SCREEN_ROUTES.PROFILE_SCREEN}
        component={ProfileScreen}
      />

      <RewardsStack.Screen
        name={SCREEN_ROUTES.TEAM_PROFILE}
        component={TeamProfile}
      />

      <RewardsStack.Screen
        name={SCREEN_ROUTES.CONTACT_US_FEEDBACK}
        component={ContactUsFeedback}
      />

      <RewardsStack.Screen
        name={SCREEN_ROUTES.CRWC_LEADERBOARD}
        component={CrwLeaderBoard}
      />

      <RewardsStack.Screen
        name={SCREEN_ROUTES.CRWC_SCREEN}
        component={CRWCScreen}
      />
    </RewardsStack.Navigator>
  );
};

/**
 * A Component used to provide the navigation for all 4 tabs in application
 */
const TabNavigator = () => {
  const trackerReducer = useSelector(
    (state: RootStateOrAny) => state.trackerReducer,
  );
  const isMiddleItemSelected = trackerReducer.trackerVisible;
  const dispatch = useDispatch();
  return (
    <BottomTabStack.Navigator
      initialRouteName={SCREEN_ROUTES.HOME_TAB}
      tabBarOptions={{
        showLabel: false,
        style: isAndroid
          ? [TabStyles.style.androidStyle, {backgroundColor: getPrimaryColor()}]
          : [TabStyles.style.iosStyle, {backgroundColor: getPrimaryColor()}],
      }}>
      <BottomTabStack.Screen
        name={SCREEN_ROUTES.HOME_TAB}
        component={HomeStackNavigator}
        listeners={{
          tabPress: e => {
            dispatch(showTrackerDialog({isVisible: false}));
          },
        }}
        options={{
          tabBarIcon: ({focused}) => (
            <Tabs
              image={
                !isMiddleItemSelected && focused
                  ? ICON_TYPES.HOME_TAB_FILLED
                  : ICON_TYPES.HOME_TAB
              }
              focused={!isMiddleItemSelected && focused}
            />
          ),
        }}
      />
      <BottomTabStack.Screen
        name={SCREEN_ROUTES.CHALLENGES_TAB}
        component={ChallengesStackNavigator}
        listeners={{
          tabPress: e => {
            dispatch(showTrackerDialog({isVisible: false}));
          },
        }}
        options={{
          tabBarIcon: ({focused}) => (
            <Tabs
              image={
                !isMiddleItemSelected && focused
                  ? ICON_TYPES.CHALLENGES_TAB_FILLED
                  : ICON_TYPES.CHALLENGES_TAB
              }
              focused={!isMiddleItemSelected && focused}
            />
          ),
        }}
      />
      <BottomTabStack.Screen
        name={SCREEN_ROUTES.TRACKER_TAB}
        component={TrackerStackNavigator}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            dispatch(showTrackerDialog({isVisible: true}));
          },
        })}
        options={{
          tabBarIcon: () => (
            <Tabs
              image={
                isMiddleItemSelected
                  ? ICON_TYPES.TRACKER_TAB_FILLED
                  : ICON_TYPES.TRACKER_TAB
              }
              middle
              focused={isMiddleItemSelected}
            />
          ),
        }}
      />
      <BottomTabStack.Screen
        name={SCREEN_ROUTES.TEAM_TAB}
        component={TeamStackNavigator}
        listeners={{
          tabPress: e => {
            dispatch(showTrackerDialog({isVisible: false}));
          },
        }}
        options={{
          tabBarIcon: ({focused}) => (
            <Tabs
              image={
                !isMiddleItemSelected && focused
                  ? ICON_TYPES.TEAM_TAB_FILLED
                  : ICON_TYPES.TEAM_TAB
              }
              focused={!isMiddleItemSelected && focused}
              iconStyle={{
                width: DEVICE_WIDTH * 0.064 * 1.37,
                height: DEVICE_WIDTH * 0.064,
              }}
            />
          ),
        }}
      />
      <BottomTabStack.Screen
        name={SCREEN_ROUTES.REWARDS_TAB}
        component={RewardsStackNavigator}
        listeners={{
          tabPress: e => {
            dispatch(showTrackerDialog({isVisible: false}));
          },
        }}
        options={{
          tabBarIcon: ({focused}) => (
            <Tabs
              image={
                !isMiddleItemSelected && focused
                  ? ICON_TYPES.REWARD_TAB_FILLED
                  : ICON_TYPES.REWARD_TAB
              }
              focused={!isMiddleItemSelected && focused}
            />
          ),
        }}
      />
    </BottomTabStack.Navigator>
  );
};

/**
 * A Component used to switch between authentication and tab navigator as per conditions
 */
const MainNavigator = () => {
  /**The equivalent of map state to props is useSelector */
  const userReducer = useSelector((state: RootStateOrAny) => state.userReducer);
  return (
    <SafeAreaProvider style={{backgroundColor: color.palette.lightYellow}}>
      {userReducer.user &&
      userReducer.user.sessionId &&
      userReducer.user.onboarding ? (
        <TabNavigator />
      ) : (
        <AuthNavigator />
      )}
    </SafeAreaProvider>
  );
};

/**
 * A Component used to provide the navigation in all over the app
 */
export const RootNavigator = () => {
  return (
    <SafeAreaProvider style={{backgroundColor: color.palette.lightYellow}}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
