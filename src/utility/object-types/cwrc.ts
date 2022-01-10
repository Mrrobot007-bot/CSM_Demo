export interface CWRCType {
  _id: string;
  name: string;
  end_date: string;
  activity_type: any;
  start_date: string;
  crwcAvgSteps: string;
  crwcTotalSteps?: string;
  crwcAvgDistance?: string;
  myCompanyAvgSteps?: string;
  crwcTotalDistance?: string;
  myCompanyTotalSteps?: string;
  myCompanyAvgDistance?: string;
  myCompanyTotalDistance?: string;
  crwcLeaderBoardData: Array<CrwcLeaderBoardTypes>;
  myCompanyLeaderBoardData?: Array<CompanyLeaderBoardItemType>;
}

export interface CrwcLeaderBoardTypes {
  _id: string;
  name: string;
  owner: string;
  appLogo: string;
  webLogo: string;
  totalSteps: number;
  totalDistance: number;
}

export interface CompanyLeaderBoardItemType {
  _id: string;
  lastName: string;
  firstName: string;
  profilePic: string;
  totalSteps: number;
  totalDistance: string;
}
