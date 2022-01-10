import {NewsFeedType} from './newsfeed';
import {OnBoardingCategoryResponseType} from './auth-response';
import {ChallengeActivityTypes, ChallengeType} from './challenge';

export interface UserType {
  _id?: string;
  dob?: string;
  bio?: string;
  phone?: string;
  email?: string;
  gender?: string;
  boostr?: boolean;
  nickname?: string;
  lastName?: string;
  sessionId?: string;
  firstName?: string;
  profilePic?: string;
  unitOFType?: string;
  onboarding?: boolean;
  lastSyncTime?: string;
  activities?: Array<string>;
  newsFeed?: Array<NewsFeedType>;
  wellness?: Array<WellnessType>;
  goalsAndRewards?: GoalsAndRewardsType;
  liveChallenges?: Array<ChallengeType>;
  openChallenges?: Array<ChallengeType>;
  organisationId?: Array<OrganizationType>;
  upcomingChallenges?: Array<ChallengeType>;
  completedChallenges?: Array<ChallengeType>;
  optSetting?: Array<UserNotificationOptionType>;
  category?: Array<OnBoardingCategoryResponseType>;
  yearlyActivities?: Array<TrackActivityYearDataType>;
}

export interface WellnessType {
  _id: string;
  url?: string;
  image?: string;
  header?: string;
  description?: string;
}
export interface GoalsAndRewardsType {
  activities?: Array<userGoals>;
  reward?: {
    futureRewards: Array<futureRewards>;
    claimedRewards: Array<claimedRewards>;
  };
}
export interface TrackActivityYearDataType {
  month?: string;
  steps?: string;
  distance?: string;
}
export interface OrganizationType {
  _id: string;
  name?: string;
  theme?: string;
  appLogo?: string;
  officialEmail?: string;
}

export interface UserNotificationOptionType {
  key: number;
  name: string;
  status: optionStatusTypes;
}

export enum optionStatusTypes {
  ON = 'ON',
  OFF = 'OFF',
}

export interface rewardsStatus {
  _id: string;
  status: number;
  reward: object;
  reward_id: number;
  couponCode: string;
}
export interface userGoals {
  _id: string;
  index: number;
  endDate: Date;
  reward: string;
  status: string;
  goalId: string;
  startDate: Date;
  totalSteps: number;
  weeklySteps: number;
  rewardStatus: string;
  timeProgress?: number;
  stepsProgress?: number;
  isCurrentWeek?: boolean;
  isWeekElapsed?: boolean;
  isWeeklyTaskCompleted?: boolean;
}
export interface claimedRewards {
  _id: string;
  image: string;
  video: string;
  status: number;
  subhead: string;
  createBy: string;
  expiryDate: Date;
  headline: string;
  info_text: string;
  inventory: string;
  reward_id: string;
  disclaimer: string;
  couponCode: string;
  access_link: string;
}
export interface futureRewards {
  _id: string;
  video: string;
  image: string;
  status: number;
  subhead: string;
  createBy: string;
  expiryDate: Date;
  headline: string;
  info_text: string;
  inventory: string;
  reward_id: string;
  disclaimer: string;
  couponCode: string;
  access_link: string;
}

export interface openChallengeType {
  _id: string;
  name: string;
  message: string;
  end_date: string;
  distance: number;
  start_date: string;
  activityData: object;
  image: Array<string>;
  userData: Array<userData>;
}
export interface userData {
  _id: string;
  email: string;
  lastName: string;
  firstName: string;
}
export interface activityData {
  _id: string;
  name: string;
}

export interface invitesChallengeType {
  _id: string;
  time?: number;
  type?: string;
  address?: string;
  message?: string;
  end_date?: string;
  distance?: number;
  start_date?: string;
  challengeId: string;
  creatorId?: string;
  challengeName?: string;
  creatorLastName?: string;
  creatorFirstName?: string;
  creatorProfilePic?: string;
  challengeImage?: Array<string>;
  activityData?: Array<ChallengeActivityTypes>;
}
export interface invitesChallengeTypeData {
  _id: string;
  name: string;
  image: string;
  message: string;
  end_date: string;
  distance: number;
  start_date: string;
  activityData: object;
}

export interface profileDataType {
  userProfile?: UserType;
  myTeams?: Array<object>;
  Streaks?: Array<streaksType>;
  currentActivity?: Array<currentActivityDataTypes>;
}
export interface streaksType {
  _id: string;
  orgId: string;
  userId: string;
  status: string;
  endDate: string;
  startDate: string;
  totalSteps: string;
  weeklySteps: string;
  rewardStatus: string;
}

export interface currentActivityDataTypes {
  _id: string;
  icon: string;
  name: string;
  steps: string;
  userId: string;
  endTime: string;
  distance: number;
  startTime: string;
  intensity: string;
  low: lowHightDataType;
  high: lowHightDataType;
  activityTypeId: string;
  moderate: lowHightDataType;
}

export interface lowHightDataType {
  met: number;
  kcal: number;
  steps: number;
}

export interface myTeamDataType {
  _id: string;
  name: string;
  about: string;
  image: string;
  closed: boolean;
  user_id: string;
  isDefault?: any;
  is_archived: boolean;
  myCreateTeam?: boolean;
}

export interface teamProfileData {
  _id: string;
  name: string;
  about: string;
  image: string;
  user_id: string;
  closed: boolean;
  userExist?: boolean;
  designation?: string;
  is_archived: boolean;
  myCreatedTeam?: boolean;
}
