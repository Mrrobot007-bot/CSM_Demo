import {Platform, Dimensions} from 'react-native';

export const MIN_PASSWORD_LENGTH = 6;
export const isIos = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const DEVICE_WIDTH = Dimensions.get('window').width;
export const DEVICE_HEIGHT = Dimensions.get('window').height;
export const DEFAULT_HEADER_HEIGHT = Math.min(DEVICE_HEIGHT * 0.1, 64);
export const GOOGLE_PLACES_API_KEY = '';

export const loaderJson = require('../assets/lottie/loader.json');
export const listLoaderJson = require('../assets/lottie/listLoader.json');

export enum DefaultPreferenceKeys {
  PASSWORD = 'password',
  DEVICE_TOKEN = 'deviceToken',
  EMAIL_ADDRESS = 'emailAddress',
  NOTIFICATION_LIST = '@noti_list',
  LOGOUT_CLICK_PERMISSION = 'logoutClick',
  HEALTH_KIT_PERMISSION = 'healthKitPermission',
}

/** contains preference values */
export enum PREFERENCE_VALUES {
  HEALTH_KIT_PERMISSION_COMPLETED = 'true',
  LOGOUT_CLICK_PERMISSION_COMPLETED = 'true',
}

export enum INTENSITY_TYPES {
  HIGH = 'High',
  LIGHT = 'Light',
  MODERATE = 'Moderate',
}

export enum ACTIVITY_TYPES {
  RUGBY = 'Rugby',
  SQUASH = 'Squash',
  TENNIS = 'Tennis',
  RUNNING = 'Running',
  CRICKET = 'Cricket',
  CYCLING = 'Cycling',
  WALKING = 'Walking',
  BASEBALL = 'Baseball',
  LACROSSE = 'Lacrosse',
  BADMINTON = 'Badminton',
  BASKETBALL = 'Basketball',
  VOLLEYBALL = 'Volleyball',
  FIELD_HOCKEY = 'Field Hockey',
  TABLE_TENNIS = 'Table Tennis',
  EXERCISE_CLASS = 'Exercise class',
  FOOTBALL_SOCCER = 'Football (Soccer)',
  WHEELCHAIR_RUGBY = 'Wheelchair Rugby',
  FOOTBALL_AMERICAN = 'Football (American)',
  WHEELCHAIR_WORKOUT = 'Wheelchair Workout',
  CYCLING_HAND_CYCLING = 'Cycling (Hand Cycling)',
  WALKING_WITH_CRUTCHES = 'Walking with Crutches',
  WHEELCHAIR_BASKETBALL = 'Wheelchair Basketball',
}
export enum CREATE_CHALLENGES_TYPE {
  RELAY = 'relay',
  MEET_UP = 'meetUp',
  FAR_OUT = 'farOut',
  TIME_TRIAL = 'timeTrial',
  HAPPY_FEET = 'happyFeet',
}

export enum LOW_INTENSITY_ACTIVITIES_VALUES {
  RUGBY = 6,
  TENNIS = 4,
  SQUASH = 6,
  CRICKET = 3,
  CYCLING = 3,
  RUNNING = 7,
  WALKING = 3.0,
  BADMINTON = 3,
  BASEBALL = 3,
  LACROSSE = 6,
  VOLLEYBALL = 5,
  BASKETBALL = 6,
  TABLE_TENNIS = 4,
  FIELD_HOCKEY = 6,
  EXERCISE_CLASS = 4,
  FOOTBALL_SOCCER = 5,
  WHEELCHAIR_RUGBY = 5,
  FOOTBALL_AMERICAN = 5,
  WHEELCHAIR_WORKOUT = 3,
  CYCLING_HAND_CYCLING = 3,
  WALKING_WITH_CRUTCHES = 5,
  WHEELCHAIR_BASKETBALL = 5,
}

export enum MODERATE_INTENSITY_ACTIVITIES_VALUES {
  RUGBY = 8,
  SQUASH = 9,
  TENNIS = 6,
  CRICKET = 4,
  RUNNING = 10,
  CYCLING = 7,
  LACROSSE = 8,
  BASEBALL = 4,
  WALKING = 3.0,
  BADMINTON = 6,
  BASKETBALL = 8,
  VOLLEYBALL = 6,
  TABLE_TENNIS = 6,
  FIELD_HOCKEY = 8,
  EXERCISE_CLASS = 6,
  FOOTBALL_SOCCER = 7,
  WHEELCHAIR_RUGBY = 7,
  FOOTBALL_AMERICAN = 6,
  WHEELCHAIR_WORKOUT = 3,
  CYCLING_HAND_CYCLING = 5,
  WALKING_WITH_CRUTCHES = 5,
  WHEELCHAIR_BASKETBALL = 7,
}

export enum HIGH_INTENSITY_ACTIVITIES_VALUES {
  RUGBY = 11,
  SQUASH = 12,
  CRICKET = 5,
  TENNIS = 10,
  CYCLING = 10,
  RUNNING = 12,
  BASEBALL = 5,
  LACROSSE = 10,
  WALKING = 3.0,
  BADMINTON = 9,
  VOLLEYBALL = 8,
  BASKETBALL = 11,
  TABLE_TENNIS = 9,
  FIELD_HOCKEY = 10,
  EXERCISE_CLASS = 9,
  WHEELCHAIR_RUGBY = 9,
  FOOTBALL_SOCCER = 11,
  FOOTBALL_AMERICAN = 7,
  WHEELCHAIR_WORKOUT = 7,
  CYCLING_HAND_CYCLING = 7,
  WALKING_WITH_CRUTCHES = 5,
  WHEELCHAIR_BASKETBALL = 9,
}

export enum SCREEN_ROUTES {
  HOME = 'Home',
  FAQ = 'FAQScreen',
  WEB_VIEW = 'webView',
  HOME_TAB = 'homeTab',
  TEAM_TAB = 'teamTab',
  EDIT_TEAM = 'editTeam',
  MENU_SCREEN = 'MenuScreen',
  SEND_BOOSTR = 'SendBoostr',
  HOME_SCREEN = 'homeScreen',
  TRACKER_TAB = 'trackerTab',
  REWARDS_TAB = 'rewardsTab',
  TEAM_SCREEN = 'teamScreen',
  CRWC_SCREEN = 'crwcScreen',
  HOW_IT_WORKS = 'HowItWorks',
  TEAM_PROFILE = 'teamProfile',
  LOGIN_SCREEN = 'LoginScreen',
  ERROR_SCREEN = 'ErrorScreen',
  GOALS_REWARDS = 'GoalsRewards',
  SPLASH_SCREEN = 'SplashScreen',
  CLAIM_REWARDS = 'ClaimRewards',
  TAB_NAVIGATOR = 'TabNavigator',
  TEAM_LEADERBOARD = 'teamLeader',
  CHALLENGES_TAB = 'challengesTab',
  TRACKER_SCREEN = 'trackerScreen',
  FUTURE_REWARDS = 'FutureRewards',
  REWARDS_SCREEN = 'rewardsScreen',
  MANAGE_INVITES = 'ManageInvites',
  MAIN_NAVIGATOR = 'mainNavigator',
  SETTING_SCREEN = 'settingScreen',
  PROFILE_SCREEN = 'profileScreen',
  REGISTER_SCREEN = 'RegisterScreen',
  WELLNESS_SCREEN = 'wellnessScreen',
  NEWSFEED_SCREEN = 'newsFeedScreen',
  ACTIVITY_SCREEN = 'ActivityScreen',
  SEND_TEAM_INVITE = 'sendTeamInvite',
  SEND_CHAT_SCREEN = 'sendChatScreen',
  CRWC_LEADERBOARD = 'crwcLeaderBoard',
  USER_LEADERBOARD = 'userLeaderBoard',
  INVITED_TEAM_LIST = 'invitedTeamList',
  REACTIVATE_SCREEN = 'ReactivateScreen',
  ONBOARDING_SCREEN = 'OnboardingScreen',
  CHALLENGES_SCREEN = 'challengesScreen',
  CREATE_TEAM_SCREEN = 'createTeamScreen',
  COMMON_LEADERBOARD = 'commonLeaderBoard',
  MANAGE_TEAM_INVITES = 'manageTeamInvites',
  CONTACT_US_FEEDBACK = 'contactUsFeedback',
  DASHBOARD_NAVIGATOR = 'DashboardNavigator',
  MY_CHALLENGES_SCREEN = 'MyChallengesScreen',
  PRIVACY_POLICY_SCREEN = 'PrivacyPolicyScreen',
  TERMS_CONDITION_SCREEN = 'TermsConditionScreen',
  FORGOT_PASSWORD_SCREEN = 'ForgotPasswordScreen',
  SEND_BOOSTR_MAIN_SCREEN = 'sendBoostrMainScreen',
  RELAY_CHALLENGES_SCREEN = 'relayChallengesScreen',
  CREATE_CHALLENGES_SCREEN = 'CreateChallengesScreen',
}

export enum MANAGE_INVITES_TYPES {
  ALL = 'all',
  JOINED = 'joined',
  DETAILS = 'details',
  WAITING = 'waiting',
  DECLINED = 'declined',
  ACCEPTED = 'accepted',
}

export enum INFO_CONTENT_ID_TYPES {
  MY_ACTIVITY_STEPS = 'MyActivity steps',
  GOALS_REWARDS_HOW_IT_WORKS = 'Goals how_it_works',
  ARCHIVE_TEAM_TOOLTIP = 'editTeam archiveTeamInfo',
  TEAM_PROFILE_LEADER_BOARD = 'teamProfile leaderboard',
  EDIT_TEAM_CLOSED_TEAM = 'Create Team-Closed Team info',
  CREATE_MEET_UP_CHALLENGE_INFO = 'Meet Up-Challenge info',
  CREATE_FAR_OUT_CHALLENGE_INFO = 'Far Out-Challenge info',
  CREATE_TEAM_CLOSED_TEAM = 'Create Team-Closed Team info',
  MANUAL_TRACKING_DISTANCE = 'undefined-Distance info icon',
  CHALLENGE_TEAM_LEADER_BOARD = 'Challenge team_leaderboard',
  CRWC_MY_ORGANIZATION_LEADER_BOARD = 'Crwc my_org_leaderboard',
  CREATE_RELAY_CHALLENGE_INFO = 'Relay Challenge-Challenge info',
  CREATE_TIME_TRIAL_CHALLENGE_INFO = 'Time Trial-challenge Info',
  CREATE_HAPPY_FEET_CHALLENGE_INFO = 'Happy Feet-Challenge info',
  CRWC_ORGANIZATION_LIST_LEADER_BOARD = 'Crwc org_list_leaderboard',
  OPEN_CHALLENGE_FILTER = 'Open Challenges-Filter by Challenge info text',
  CREATE_CHALLENGE_TEAM_CHALLENGE = 'Relay Challenge-Team Challenge info',
  CREATE_CHALLENGE_FUNDRAISING = 'Relay Challenge-Charity Challenge info',
  CREATE_CHALLENGE_CLOSED_CHALLENGE = 'Relay Challenge-Closed Challenge info',
  GOALS_REWARDS_YOUR_GOAL = 'goals & rewards_streaks-Your Goal This Week Info',
  MANUAL_TRACKING_INTENSITY = 'InAppTracker_04 (manual entry 01)-Intensity info icon',
}

export enum TEAM_PAGE_TYPE {
  MY_TEAM = 'myTeam',
  JOIN_TEAM = 'joinTeam',
  ARCHIVED_TEAM = 'archivedTeam',
}
