import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { initializeBlogs } from "../reducers/blogReducer"
import Togglable from "./Togglable"
import BlogForm from "./BlogForm"
import { Link } from "react-router-dom"
import { Table } from 'react-bootstrap'

const Blogs = () => {

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
      <Table striped>
        <tbody>
          {blogs.map((blog) => (
          <tr key={blog.id}>
            <td>
            <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
            </td>
          </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Blogs
