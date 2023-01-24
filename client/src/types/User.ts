export interface RegistrationUser {
  username: string;
  email: string;
  avatarUrl: string | null;
  password: string;
}

export interface LoginUser {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  avatarUrl: string | null;
  createdAt: Date;
}

export type responseSearchType = Array<User>;
