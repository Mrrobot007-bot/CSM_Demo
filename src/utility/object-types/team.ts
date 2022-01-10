export interface TeamType {
  _id: string;
  name?: string;
  about?: string;
  image?: string;
  isDefault?: any;
  user_id?: string;
  closed?: boolean;
  deleted?: number;
  createdAt?: string;
  updatedAt?: string;
  is_archived?: boolean;
  orgnization_id?: string;
}
