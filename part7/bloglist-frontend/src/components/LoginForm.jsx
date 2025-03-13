import { useDispatch } from "react-redux"
import { useState } from "react"
import { login, logout } from "../reducers/userReducer"
import { showNotification } from "../reducers/notificationReducer"
import blogService from "../services/blogs"

const LoginForm = () => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

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

    return (
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
    }

export default LoginForm