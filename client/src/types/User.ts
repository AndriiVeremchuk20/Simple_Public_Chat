export interface User {
    username: string;
    email: string;
    avatarUrl?: string;
    password: string;
}

export interface LoginUser {
    username: string;
    password: string;
}