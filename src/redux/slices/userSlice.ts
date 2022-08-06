import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

const initialState = {
  isAuth: false,
  username: "",
  token: "",
  email: "",
  avatar: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuth(state, action) {
      state.isAuth = action.payload;
      if (!action.payload) {
        state.username = "";
        state.email = "";
        state.token = "";
        state.avatar = "";
      }
    },
    setUserInfo(state, action) {
      state.username = action.payload.user.username;
      state.email = action.payload.user.email;
      state.token = action.payload.user.token;
      state.avatar = action.payload.user.image;
    },
  },
});

export const selectUserInfo = (state: RootState) => state.user;

export const { setAuth, setUserInfo } = userSlice.actions;
export default userSlice.reducer;
