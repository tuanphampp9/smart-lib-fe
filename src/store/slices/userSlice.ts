import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface userState {
  username: string;
  password: string;
}

const initialState: userState = {
  username: 'hello em be',
  password: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserNameInfo(state, action: PayloadAction<{ username: string }>) {
      state.username = action.payload.username;
    },
    setPasswordInfo(state, action: PayloadAction<{ password: string }>) {
      state.password = action.payload.password;
    },
  },
});

export const { setUserNameInfo, setPasswordInfo } = userSlice.actions;

export default userSlice.reducer;
