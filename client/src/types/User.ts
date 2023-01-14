export interface RegistrationUser {
  username: string
  email: string
  avatarUrl: string | null
  password: string
}

export interface LoginUser {
  username: string
  password: string
}

export interface User {
  id: string
  username: string
  email: string
  avatarUrl: string | null
}

export interface ResponseError {
  msg: string
}

// data example
/*
tocken:
"eyJhbGciOifRHNBlgvvZsowlUvCBNHqJx95CEMW0U"
user:
{id: '63bb4025ceefe5eae10d2a8c', username: 'andrei', email: 'andrei@mail.com'}
*/
