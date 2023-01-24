import { User } from "./User";

export interface Subscribe {
  _id: string;
  subscribed: string;
  to: string;
}

export interface getSubscribedUsersResponse {
  followersUsers: Array<User>;
  subscriptionsUsers: Array<User>;
}