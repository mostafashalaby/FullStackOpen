import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('success');
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
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
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      setNotificationMessage('Logged in successfully')
      setNotificationType('success');

      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)

    } catch (exception) {
      setNotificationMessage('Wrong credentials')
      setNotificationType('error');
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
    setUsername('')
    setPassword('')

    setNotificationMessage('Logged out successfully')
    setNotificationType('success');

    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()

    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))

      setNotificationMessage(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setNotificationType('success');

      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
      
    } catch (exception) {
      setNotificationMessage('Failed to create new blog')
      setNotificationType('error');

      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
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
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password 
            <input
            type="password"
            value={password}
            name="Password"
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
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p>{user.name} logged-in</p>
        <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
          logout
        </button>
      </div>
      {//createNew()}
      }
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm
          createBlog={createBlog}
        />
      </Togglable>
      <h2>Available Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      <Notification message={notificationMessage} type={notificationType} />
      {user === null ?
        loginForm() :
        blogForm()
      }
    </div>
  )
}

export default App