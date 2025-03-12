import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const Menu = ({handleLogout}) => {
  const padding = {
    paddingRight: 5,
  }

  const menuStyle = {
    display: "flex",
    alignItems: "center",
    backgroundColor: "lightgrey",
    padding
  }

  const user = useSelector((state) => state.user)

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
