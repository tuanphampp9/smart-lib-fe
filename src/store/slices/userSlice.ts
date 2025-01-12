import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface userState {
  email: string
  id: string
  name: string
  role: {
    active: boolean
    name: string
    permissions: any[]
  }
}

const initialState: userState = {
  email: '',
  id: '',
  name: '',
  role: {
    active: false,
    name: '',
    permissions: [],
  },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setInfoUser: (state, action: PayloadAction<userState>) => {
      state.email = action.payload.email
      state.id = action.payload.id
      state.name = action.payload.name
      state.role = action.payload.role
    },
  },
})

export const { setInfoUser } = userSlice.actions

export default userSlice.reducer
