import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResponseError, User } from "../types/User";

type UserState = {
  user: User | null;
  error: ResponseError | null;
  isAuth: boolean;
  isError: boolean;
};

const initialState: UserState = {
  user: null,
  error: null,
  isAuth: false,
  isError: false,
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuth = true;
    },
    setError(state, action: PayloadAction<ResponseError>) {
      state = {
        ...state, 
        error: action.payload,
        isError: true,
      }
    }
  },
});

export const { setUser, setError } = userSlice.actions;

export default userSlice.reducer;
