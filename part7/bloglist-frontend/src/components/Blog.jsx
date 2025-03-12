import { useParams, useNavigate } from "react-router-dom"
import { updateLike, removeBlog } from "../reducers/blogReducer.js"
import { showNotification } from "../reducers/notificationReducer.js"
import { useDispatch, useSelector } from "react-redux"

const Blog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const id = useParams().id
  const blog = useSelector((state) => state.blogs.find((blog) => blog.id === id))
  const user = useSelector((state) => state.user)

  if (!blog) {
    return null
  }

  console.log("Blog.jsx, blog:", blog)
  console.log("Blog.jsx, user:", user)
  const sameUser = user && blog.user && user.username === blog.user.username

  const handleLike = async (event) => {
    event.preventDefault()

    try {
      const updatedBlog = await dispatch(updateLike(blog))

      dispatch(
        showNotification(
          `Liked blog '${updatedBlog.title}' by '${updatedBlog.author}'`,
          "success",
          5,
        ),
      )
    } catch (exception) {
      dispatch(showNotification("Failed to like blog", "error", 5))
    }
  }

  const handleDelete = async (event) => {
    event.preventDefault()

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await dispatch(removeBlog(blog.id))

        navigate('/')
        dispatch(
          showNotification(
            `Removed blog '${blog.title}' by '${blog.author}'`,
            "success",
            5,
          ),
        )
      } catch (exception) {
        dispatch(showNotification("Failed to remove blog", "error", 5))
      }
    }
  }

  return (
    <div className="blog">
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <p>{blog.url}</p>
        <p>
          likes: {blog.likes}{" "}
          <button data-testid="like-button" onClick={handleLike}>
            like
          </button>
        </p>
        <p>{blog.user.name}</p>
        {sameUser && <button onClick={handleDelete}>remove</button>}
      </div>
    </div>
  )
}

export default Blog
