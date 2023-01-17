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

// export type responseSearchType = {
//   username: string;
//   email: string;
//   avatarUrl: string | null;
//   _id: string;
// } 

export type responseSearchType = Array<User>;

// data example
/*
tocken:
"eyJhbGciOifRHNBlgvvZsowlUvCBNHqJx95CEMW0U"
user:
{id: '63bb4025ceefe5eae10d2a8c', username: 'andrei', email: 'andrei@mail.com'}
*/
