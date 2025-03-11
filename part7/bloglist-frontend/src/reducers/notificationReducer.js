import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: "",
  type: ""
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification(state) {
      return initialState
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const showNotification = (message, type, time) => {
  return async dispatch => {
    dispatch(setNotification({ message, type }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
  }
}

export default notificationSlice.reducer