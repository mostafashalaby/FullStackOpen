import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { logout } from "../reducers/userReducer"
import blogService from "../services/blogs"
import { showNotification } from "../reducers/notificationReducer"
import { useDispatch } from "react-redux"
import { Navbar, Nav } from 'react-bootstrap'
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
<Navbar collapseOnSelect expand="lg" bg="red">
<Navbar.Toggle aria-controls="responsive-navbar-nav" />
<Navbar.Collapse id="responsive-navbar-nav">
  <Nav className="mr-auto">
  <Nav.Link href="#" as="span">
      <Link style={padding} to="/">
        blogs
      </Link>
      </Nav.Link>
      <Nav.Link href="#" as="span">
      <Link style={padding} to="/users">
        users
      </Link>
      </Nav.Link>
      <Nav.Link href="#" as="span">
        {user ? (
            <div>
{user.name} logged in <button onClick={handleLogout}>logout</button>
            </div>
        ) : (
            <Link style={padding} to="/login">
            login
            </Link>
        )}
      </Nav.Link>
  </Nav>
</Navbar.Collapse>
</Navbar>
  )
}

export default Menu
