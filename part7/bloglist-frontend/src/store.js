import { configureStore } from "@reduxjs/toolkit"
import notificationReducer from "./reducers/notificationReducer.js"
import blogReducer from "./reducers/blogReducer.js"
import userReducer from "./reducers/userReducer.js"
import usersReducer from "./reducers/usersReducer.js"

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    users: usersReducer,
    user: userReducer,
    notification: notificationReducer,
  },
})

export default store
