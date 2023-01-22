import { atom } from 'jotai'
import { Like, Post } from '../types/Post';
import { User } from '../types/User'
import { atomWithStorage } from 'jotai/utils'

export const appUserAtom = atom<User | null>(null);
export const postsListAtom = atom<Array<Post>>([]);
export const likedListAtom = atom<Array<Like>>([]);
export const darkModeAtom = atomWithStorage<boolean>("isDark", true); 