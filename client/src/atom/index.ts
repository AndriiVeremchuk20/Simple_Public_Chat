import { atom } from 'jotai'
import { PostResponseData } from '../types/Post';
import { User } from '../types/User'
import { atomWithStorage } from 'jotai/utils'

export const appUserAtom = atom<User | null>(null);
export const postsListAtom = atom<Array<PostResponseData>>([]);
export const darkModeAtom = atomWithStorage<boolean>("isDark", true); 