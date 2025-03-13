import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { logout } from "../reducers/userReducer"
import blogService from "../services/blogs"
import { showNotification } from "../reducers/notificationReducer"
import { useDispatch } from "react-redux"


const Menu = () => {
  const padding = {
    paddingRight: 5,
  }

  const menuStyle = {
    display: "flex",
    alignItems: "center",
    backgroundColor: "lightgrey",
    padding
  }

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

    const handleLogout = () => {
      try {
        dispatch(logout())
        blogService.setToken(null)
  
        dispatch(showNotification("Logged out successfully", "success", 5))
      } catch (exception) {
        dispatch(showNotification("Failed to logout", "error", 5))
      }
    }
  
  return (
    <div style={menuStyle}>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
        {user ? (
            <div>
{user.name} logged in <button onClick={handleLogout}>logout</button>
            </div>
        ) : (
            <Link style={padding} to="/login">
            login
            </Link>
        )}
    </div>
  )
}

export default Menu
