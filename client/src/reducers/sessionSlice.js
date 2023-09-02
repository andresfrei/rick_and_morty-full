import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession: (state, action) => {
      return action.payload
    },
    unsetSession: (state) => {
      return initialState
    },
    notAuthorized: (state) => {
      return initialState
    }
  }
})

export const { setSession, unsetSession, notAuthorized } = sessionSlice.actions
export default sessionSlice.reducer
