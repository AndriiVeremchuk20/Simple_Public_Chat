import { atom } from 'jotai'
import { Like, Post } from '../types/Post';
import { User } from '../types/User'
import { atomWithStorage } from 'jotai/utils'
import { Subscribe } from '../types/Subscribe';

export const appUserAtom = atom<User | null>(null);
export const postsListAtom = atom<Array<Post>>([]);
export const likedListAtom = atom<Array<Like>>([]);
export const subscriptionsListAtom = atom<Array<Subscribe>>([]);
export const darkModeAtom = atomWithStorage<boolean>("isDark", true); 