export interface RegistrationUser {
    username: string;
    email: string;
    avatarUrl: string|null;
    password: string;
}

export interface LoginUser {
    username: string;
    password: string;
}

export interface User {
    id: string;
    username: string;
    email: string;
    avatarUrl: string|null;
}

export interface ResponseError {
    msg: string;
}

//data example
/*
tocken: 
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYmI0MDI1Y2VlZmU1ZWFlMTBkMmE4YyIsInJvbGVzIjpbIlVTRVIiXSwiaWF0IjoxNjczMjk5MDMwLCJleHAiOjE2NzMzMDI2MzB9.8i-Zea1L5vSMfRHNBlgvvZsowlUvCBNHqJx95CEMW0U"
user: 
{id: '63bb4025ceefe5eae10d2a8c', username: 'andrei', email: 'andrei@mail.com'}
*/