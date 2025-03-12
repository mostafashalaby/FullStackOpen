import { createSlice } from "@reduxjs/toolkit"
import loginService from "../services/login"

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser(state) {
      return null
    },
  },
})

export const { setUser, clearUser } = userSlice.actions

export const setUserFromLocalStorage = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      return user
    }
  }
}

export const login = ({ username, password }) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password })
    dispatch(setUser(user))
    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
    return user
  }
}

export const logout = () => {
  return async (dispatch) => {
    dispatch(clearUser())
    window.localStorage.removeItem("loggedBlogappUser")
  }
}

export default userSlice.reducer
