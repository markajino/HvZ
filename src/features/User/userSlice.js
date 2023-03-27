import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "username",
  role: "admi",
  faction: "zombie",
  isJoinedSquad: true,
  squadName: "ultraviolet",
  isLoggedIn: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeToAdmin: (state) => {
      state.role = "admin";
    },
    changeToPlayer: (state) => {
      state.role = "player";
    },
  },
});

export const { changeToAdmin, changeToPlayer } = userSlice.actions;

export default userSlice.reducer;
