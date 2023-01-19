import { atom } from 'jotai'
import { PostResponseData } from '../types/Post';
import { User } from '../types/User'

export const appUserAtom = atom<User | null>(null);
export const postsListAtom = atom<Array<PostResponseData>>([]);