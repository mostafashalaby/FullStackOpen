import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import BlogForm from "./components/BlogForm"
import Menu from "./components/Menu"
import Users from "./components/Users"
import User from "./components/User"
import Blogs from "./components/Blogs"

import { useDispatch, useSelector } from "react-redux"
import { showNotification } from "./reducers/notificationReducer.js"
import { initializeBlogs } from "./reducers/blogReducer.js"
import {
  setUserFromLocalStorage,
  login,
  logout,
} from "./reducers/userReducer.js"
import { Routes, Route, Navigate } from "react-router-dom"

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const user = dispatch(setUserFromLocalStorage())
    blogService.setToken(user.token)
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const loggedInUser = await dispatch(login({ username, password }))
      blogService.setToken(loggedInUser.token)
      setUsername("")
      setPassword("")

      dispatch(showNotification("Logged in successfully", "success", 5))
    } catch (exception) {
      dispatch(showNotification("Wrong credentials", "error", 5))
    }
  }

  const handleLogout = () => {
    try {
      dispatch(logout())
      blogService.setToken(null)

      setUsername("")
      setPassword("")

      dispatch(showNotification("Logged out successfully", "success", 5))
    } catch (exception) {
      dispatch(showNotification("Failed to logout", "error", 5))
    }
  }

  const loginForm = () => (
    <div>
      <h1>Log in to the application</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            data-testid="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            data-testid="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )


  return (
    <div>
      {user ? ( <div>
      <Menu
      handleLogout={handleLogout}
    />
    <Notification />
    <Routes>
      <Route path="/" element={<Blogs />} />
      <Route path="/users" element={<Users />} />
      <Route path="/users/:id" element={<User />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blogs/:id" element={<Blog />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    </div>
      ) : (
        loginForm()
      )}
    </div>
  )
}

export default App
