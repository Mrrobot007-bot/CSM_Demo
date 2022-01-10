export const BASE_URL = 'http://13.58.126.141:4010/';

export enum API_URLS {
  //User
  ACTIVITIES = 'api/activity',
  GET_I_CONTENT = 'api/icontent/get',
  LOGIN = 'api/user/login',
  DEACTIVATE_ACCOUNT = 'api/user/deactivateAccount',
  REGISTER = 'api/user/signup',
  FORGOT_PASSWORD = 'api/user/forgetPassword',
  RESEND_OTP = 'api/user/resendotp',
  VERIFY_OTP = 'api/user/verifyotp',
  RESET_PASSWORD = 'api/user/resetPassword',
  INVITES_LIST = 'api/user/org-user-list',
  INVITE_USER = 'api/user/invite-user',
  CREATE_USER_ACTIVITY = 'api/user/create-user-activity',
  GET_MY_ACTIVITIES = 'api/user/get-my-activities',
  SWITCH_ORGANIZATION = 'api/user/switchOrganization',
  GET_PROFILE = 'api/user/getPublicProfile',
  GET_CRWC = 'api/crwc/crwc-data',
  GET_CRWC_LEADERBOARD = 'api/crwc/crwc-leader-board',
  GET_MY_COMPANY_LEADERBOARD = 'api/crwc/my-company-leader-board',

  GET_DASHBOARD = 'api/user/getUserDashboard',
  EDIT_PROFILE = 'api/user/editprofile/',
  ONBOARDING = 'api/user/onboarding/',

  //Boostr
  SEND_BOOSTR = 'api/boostr/create',
  LIKE_BOOSTR = 'api/boostr/like-boostr',
  COMMENT_BOOSTR = 'api/boostr/comment-boostr',
  CHALLENGE_BOOSTR_LIST = 'api/boostr/challenge-boostr-list',
  CHALLENGE_BOOSTR_COMMENT_LIST = 'api/boostr/boostr-comment-list',

  //Challenges
  CREATE_CHALLENGE = 'api/challenge/create',
  UPDATE_CHALLENGE = 'api/challenge/update',
  MASTER_CHALLENGES_LIST = 'api/challenge/master-challenge-list',
  INVITED_USER_CHALLENGE = 'api/challenge/invited-challenges',
  APPROVE_REJECT_CHALLENGE = 'api/challenge/approve-reject-user-challenge',
  DELETE_INVITE = 'api/challenge/remove-user-challenge',
  OPEN_CHALLENGE = 'api/challenge/open-challenges',
  JOIN_OPEN_CHALLENGE = 'api/challenge/join-open-challenge',
  CHALLENGE_LIST = 'api/challenge/live-challenges',
  COMPLETED_CHALLENGE = 'api/challenge/completed-challenge-list',
  MANAGE_INVITE = 'api/challenge/manage-invite-list',
  LEAVE_CHALLENGE = 'api/challenge/leave-challenge',
  DELETE_CHALLENGE = 'api/challenge/delete-challenge',
  UPCOMING_CHALLENGE_LIST = 'api/challenge/upcoming-challenges',
  CHALLENGE_DATA_WITH_LEADER_BOARD = 'api/challenge/challenge-data-with-leaderboard',
  OPEN_CHALLENGE_ITEM_DATA = 'api/challenge/open-challenge-data',

  //Content
  PRIVACY_POLICY_URL = 'api/content/privacy_policy',
  TERMS_CONDITION_URL = 'api//content/terms_conditions',

  //Faq
  FAQ = 'api/faq/',

  //Feedback
  FEEDBACK = 'api/faq/addFeedback',

  //Category
  GET_CATEGORY_AND_VALUES = 'api/user-category/getCategoryAndValues',

  // Team Challenge
  INVITED_TEAM_CHALLENGE = 'api/team-challenge/invite-team-challenge-list',
  LIVE_TEAM_CHALLENGE_LIST = 'api/team-challenge/live-team-challenge-list',
  TEAM_COMPLETED_CHALLENGE = 'api/team-challenge/completed-team-challenge-list',
  TEAM_OPEN_CHALLENGE = 'api/team-challenge/open-team-challenge-list',
  UPCOMING_TEAM_CHALLENGE_LIST = 'api/team-challenge/upcoming-team-challenge-list',
  MANAGE_TEAM_INVITE = 'api/team-challenge/manage-team-challenge-invites',

  //UserGoal
  USER_GOALS = 'api/userGoal/get',
  CLAIM_REWARD = 'api/userGoal/takeClaim',

  //User Team
  CREATE_TEAM = 'api/user-team/create',
  GET_MY_TEAM_LIST = 'api/user-team/my-team-list',
  GET_OPEN_TEAM_LIST = 'api/user-team/get-open-team-list',
  INVITED_TEAM_LIST = 'api/user-team/get-invite-team-list',
  TEAM_USER_INVITE = 'api/user-team/invite-user-to-team',
  EDIT_TEAM_PROFILE = 'api/user-team/update-team',
  TEAM_PROFILE = 'api/user-team/team-detail',
  JOIN_TEAM = 'api/user-team/join-open-team',
  REMOVE_ARCHIVED = 'api/user-team/archive-team',
  GET_ARCHIVED_TEAM_LIST = 'api/user-team/archive-team-list',
  DELETE_USER_FROM_TEAM = 'api/user-team/delete-user-from-team',
  MANAGE_USER_TEAM_LIST = 'api/user-team/manage-team-users-list',
  LEAVE_TEAM = 'api/user-team/leave-team',
  LEAVE_TEAM_CHALLENGE = 'api/team-challenge/leave-team-challenge',
  ACCEPT_REJECT_INVITED_TEAM = 'api/user-team/accept-decline-team-invitation',
  GET_TEAM_LEADER_BOARD = 'api//user-team/team-leader-board',
  TEAM_INVITES_LIST = 'api/user-team/search-team-list',
  CHANGE_DESIGNATION = 'api/user-team/change-designation',
  RESENT_TEAM_INVITE = 'api/user-team/resend-invite',
  TEAM_CHAT_CREATE_CHAT = 'api/chat/createMessage',
  LIKE_CHAT = 'api/chat/likeChat',
  COMMENT_CHAT = 'api/chat/commentChat',
  COMMENT_CHAT_LIST = 'api/chat/getChatCommentList',
  GET_CHALLENGE_TEAM_LEADERBOARD = 'api/team-challenge/team-challenge-leader-board',
  GET_CHALLENGE_USER_LEADERBOARD = 'api/challenge/challenge-leaderboard',

  //Others
  I_CONTENT_REWARD = 'api/icontent/get?type=admin&&name=reward',
  GOALS_GET = 'api/goal/get',
  NEWSFEED_LIST = 'api/challenge/newsFeed',
  NEWS_FEEDS_LIST = 'api/news-feed/list',
  WELLNESS = 'api/wellness/get',

  ACTIVATE_ACCOUNT = 'api/user/activateAccount',
  CHAT_TEAM_LIST = 'api/chat/getTeamChatList',
}
