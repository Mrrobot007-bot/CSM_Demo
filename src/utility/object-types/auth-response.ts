import {Image} from 'react-native-image-crop-picker';
import {OrganizationType, UserNotificationOptionType} from './user';

export interface LoginDataResponse {
  _id: string;
  dob: string;
  bio?: string;
  email: string;
  phone?: string;
  gender: string;
  boostr?: boolean;
  lastName?: string;
  nickname?: string;
  firstName: string;
  unitOFType: string;
  sessionId?: string;
  wheelChair: boolean;
  onboarding?: boolean;
  primaryColor?: string;
  activities: Array<string>;
  organisationId?: Array<OrganizationType>;
  optSetting?: Array<UserNotificationOptionType>;
  category?: Array<OnBoardingCategoryResponseType>;
}

export interface RegisterDataResponse {
  _id: string;
  email: string;
  phone?: string;
  boostr?: boolean;
  firstName: string;
  lastName?: string;
  unitOFType: string;
  sessionId?: string;
  onboarding?: boolean;
}

export interface OnboardingDataResponse {
  _id: string;
  dob?: string;
  email: string;
  phone?: string;
  gender?: string;
  boostr?: boolean;
  nickname?: string;
  firstName: string;
  lastName?: string;
  unitOFType: string;
  sessionId?: string;
  optSetting?: Array<UserNotificationOptionType>;
}

export interface OnBoardingCategoryType {
  _id: string;
  name?: string;
  values?: Array<OnBoardingCategoryValueType>;
}

export interface OnBoardingCategoryResponseType {
  _id: string;
  value_id?: string;
  category_id?: string;
}

export interface OnBoardingCategoryValueType {
  _id: string;
  name?: string;
  image?: string;
}

// todo remove this
export interface UserDepartmentType {
  _id: string;
  name: string;
}

export interface ActivitiesType {
  _id: string;
  name: string;
  selected?: boolean;
}

export interface UserLocationType {
  _id: string;
  name: string;
}

export interface FAQDataResponse {
  _id: string;
  answer: string;
  status: string;
  question: string;
  position: number;
  isFocused?: boolean;
}

export interface IContentResponse {
  _id: string;
  name: string;
  content?: string;
}

export interface InviteListType {
  _id: string;
  email: string;
  lastName: string;
  firstName: string;
  profilePic: string;
}

export interface MasterChallengeListType {
  _id: string;
  name: string;
  icon?: Image;
  detail?: string;
  distance?: number;
  description?: string;
  carousel?: Array<CarouselType>;
}

export interface CarouselType {
  _id: string;
  name?: string;
  image?: string;
  distance?: number;
}

export interface CreateChallengeType {
  challengeType: string;
}
