import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import Notification from "./components/Notification"
import Menu from "./components/Menu"
import Users from "./components/Users"
import User from "./components/User"
import Blogs from "./components/Blogs"
import LoginForm from "./components/LoginForm"

import { useDispatch, useSelector } from "react-redux"
import {setUserFromLocalStorage} from "./reducers/userReducer.js"
import { Routes, Route, Navigate } from "react-router-dom"

const App = () => {
  const [loading, setLoading] = useState(true)

  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const initializeUser = async () => {
      const user = await dispatch(setUserFromLocalStorage())
      if (user) {
        blogService.setToken(user.token)
      }
      setLoading(false)
    }
    initializeUser()
  }, [dispatch])
  

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container">
      {user ? ( <div>
      <Menu/>
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
        <LoginForm />
      )}
    </div>
  )
}

export default App
