import { UserType } from '@/lib/types/userType'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface userState {
  user: UserType
}

const initialState: userState = {
  user: {} as UserType,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setInfoUser: (state, action: PayloadAction<userState>) => {
      state.user = action.payload.user
    },
  },
})

export const { setInfoUser } = userSlice.actions

export default userSlice.reducer
