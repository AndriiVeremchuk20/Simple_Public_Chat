import { atom } from "recoil";
import { User } from "../types/User";
import { stateKeys } from "./keys";

export const userState = atom<User>({
    key: stateKeys.user,
    default: {} as User,
});
