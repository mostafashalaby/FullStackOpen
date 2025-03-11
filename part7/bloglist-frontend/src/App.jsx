import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import BlogForm from "./components/BlogForm"

import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from "./reducers/notificationReducer"
import { initializeBlogs } from "./reducers/blogReducer"
import { setUserFromLocalStorage, login, logout } from "./reducers/userReducer"

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

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

      dispatch(showNotification('Logged in successfully', 'success', 5))

    } catch (exception) {
      dispatch(showNotification('Wrong credentials', 'error', 5))
    }
  }

  const handleLogout = () => {
    try {
      dispatch(logout())
      blogService.setToken(null)

      setUsername("")
    setPassword("")

    dispatch(showNotification('Logged out successfully', 'success', 5))
    } catch (exception) {
      dispatch(showNotification('Failed to logout', 'error', 5))
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

  const blogForm = () => (
    <div>
      <h1>Blogs Page</h1>
      <div style={{ display: "flex", alignItems: "center" }}>
        <p>{user.name} logged-in</p>
        <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
          logout
        </button>
      </div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <h2>Available Blogs</h2>
      {blogs
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
          />
        ))}
    </div>
  )

  return (
    <div>
      <Notification/>
      {user === null ? loginForm() : blogForm()}
    </div>
  )
}

export default App
