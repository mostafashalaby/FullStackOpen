import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { initializeBlogs } from "../reducers/blogReducer"
import Togglable from "./Togglable"
import BlogForm from "./BlogForm"
import { Link } from "react-router-dom"

const Blogs = () => {
      const blogStyle = {
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  return (
    <div>
      <h1>Blogs Page</h1>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <div>
        {blogs.map((blog) => (
          <div key={blog.id} style={blogStyle}>
            <p>
              <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Blogs
