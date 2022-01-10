export interface ChallengeType {
  //ALL challenges common
  _id: string;
  image: string;
  closed?: boolean;
  address?: string;
  invitedBy: string;
  startDate: string;
  invitedId?: string;
  description: string;
  isFocused?: boolean;
  timeElapsed?: number;
  challengeName: string;
  invitedByUserId: string;
  invitedByImageUrl: string;
  isTeamChallenge?: boolean;
  boostrs?: Array<BoostrType>;
  challengeType?: TypeOfChallenges;
  screenType?: ChallengeScreenTypes;
  includedActivities: Array<ChallengeActivityTypes>;
  usersLeaderBoard?: Array<UserLeaderBoardItemType>;

  //RELAY, TT, FO
  fundRaise?: FundRaiseType;
  teamLeaderBoard?: Array<TeamLeaderBoardItemType>;

  //RELAY, TT, HP, FO
  totalDistanceInKm?: number;

  //RELAY, TT, HP, FO
  endDate?: string;

  //MU
  timeDaily?: number;
  location?: {
    latitude: number;
    longitude: number;
  };

  //MU, TT
  personalBest?: number;

  //RELAY, HP
  completedDistanceInKm?: number;
}

export interface FundRaiseType {
  url?: string;
  imageUrl?: string;
  targetInPounds?: number;
  raisedFundsFor?: string;
  totalRaisedInPounds?: number;
}

export interface TeamUserBoardItemType {
  userId: string;
  userName: string;
  distance: number;
  userPosition: number;
  userImageUrl: string;
}

export interface ChallengeActivityTypes {
  _id: string;
  icon: string;
  name: string;
  selected?: boolean;
  low?: ChallengeActivitySubDataTypes;
  high?: ChallengeActivitySubDataTypes;
  moderate?: ChallengeActivitySubDataTypes;
}

export interface ChallengeActivitySubDataTypes {
  met?: number;
  kcal?: number;
  steps?: number;
}

export enum ChallengeScreenTypes {
  OPEN = 'Open',
  LIVE = 'Live',
  INVITES = 'Invites',
  COMPLETE = 'Complete',
  UPCOMING = 'Upcoming',
}

export enum TypeOfChallenges {
  RELAY = 'relay',
  MEET_UP = 'meetUp',
  FAR_OUT = 'farOut',
  TIME_TRIAL = 'timeTrial',
  HAPPY_FEET = 'happyFeet',
}

export interface BoostrType {
  _id: string;
  userId: string;
  message: string;
  userName: string;
  totalLikes?: number;
  userImageUrl: string;
  totalComments?: number;
  createdDateTime?: number;
  boostrImageUrl?: string;
}

export interface NewsFeedsType {
  _id: string;
  comment: string;
  attachment: string;
  createdAt?: number;
  totalLikes?: number;
  likeCount?: boolean;
  commentCount?: number;
  challengeName: string;
  creator_profilePic: string;
  creator_userFirstName: string;
  creator_userLastName: string;
}

export interface TeamChatType {
  _id: string;
  image?: string;
  message: string;
  likeCount?: number;
  commentCount?: number;
  creator_userId?: string;
  createdDateTime?: number;
  creator_profilePic?: string;
  creator_userLastName?: string;
  creator_userFirstName?: string;
}

export interface BoostrCommentType {
  _id: string;
  userId: string;
  message: string;
  userName: string;
  userImageUrl: string;
  addedDateTime: string;
}

export interface BoostrLikeType {
  _id: string;
  userId: string;
  userName: string;
  userImageUrl: string;
}

export interface UserLeaderBoardItemType {
  //all
  userId: string;
  userName: string;
  userImageUrl: string;
  userPosition: number;
  associatedChallengeId: string;

  //RELAY, HP, FO
  totalDistanceInKm: number;

  //RELAY, TT, HP, FO
  isSpeedIncreased: boolean;

  //TT
  personalBest: number;

  //MU
  secondPerKM?: number;
  speedIncreased?: number;
  distanceIncreasedInKm?: number;
}

export interface TeamLeaderBoardItemType {
  //RELAY, TT, FO
  teamId: string;
  teamName: string;
  isFocused?: boolean;
  teamImageUrl: string;
  teamPosition: number;
  completionPercentage: number;
  isTeamSpeedIncreased: boolean;
  associatedChallengeId: string;
  leaderBoardUsers: Array<UserLeaderBoardItemType>;

  //RELAY, FO
  teamAverageInKm: number;

  //TT
  teamAverageBoostTime: number;
}

export interface ManageInvitesListType {
  status: string;
  user_id: string;
  challenge_id: string;
  user_lastName: string;
  user_firstName: string;
  user_profile_pic: string;
}
