import { User } from "./User";

export interface Subscribe {
  _id: string;
  subscribed: string;
  to: string;
}

export interface getSubscribedUsersResponse {
  subscriptionsUsers: Array<User>;
  subscribersUsers: Array<User>;
}

/*
подписчики subscribers

подписки subscriptions
*/