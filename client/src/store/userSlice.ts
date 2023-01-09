import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/User";

type UserState = {
  user: User | null;
  isAuth: boolean;
};

const initialState: UserState = {
  user: null,
  isAuth: false,
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
        state.user = action.payload;
        state.isAuth = true;
    },
    removeCurrentUser(state, action: PayloadAction) {
        state.user = null;
        state.isAuth = false;
    },
  },
});

export const { setUser, removeCurrentUser } = userSlice.actions;

export default userSlice.reducer;
