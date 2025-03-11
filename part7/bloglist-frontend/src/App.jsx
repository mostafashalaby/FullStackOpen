import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import BlogForm from "./components/BlogForm"

import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from "./reducers/notificationReducer"
import { initializeBlogs } from "./reducers/blogReducer"

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")

      dispatch(showNotification('Logged in successfully', 'success', 5))

    } catch (exception) {
      dispatch(showNotification('Wrong credentials', 'error', 5))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser")
    blogService.setToken(null)
    setUser(null)
    setUsername("")
    setPassword("")

    dispatch(showNotification('Logged out successfully', 'success', 5))
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
