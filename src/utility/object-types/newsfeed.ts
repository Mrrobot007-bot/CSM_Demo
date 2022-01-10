export interface NewsFeedType {
  _id: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  description: string;
  boostrs?: Array<BoostrType>;
}

export interface BoostrType {
  _id: string;
  userId: string;
  message: string;
  userName: string;
  userImageUrl: string;
  boostrImageUrl?: string;
  createdDateTime: number;
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
