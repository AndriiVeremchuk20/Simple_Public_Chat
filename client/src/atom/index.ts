import { atom } from 'jotai'
import { User } from '../types/User'

export const appUserAtom = atom<User | null>(null);
