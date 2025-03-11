import { useState } from "react"
import { updateLike, removeBlog } from "../reducers/blogReducer"
import { showNotification } from "../reducers/notificationReducer"
import { useDispatch } from "react-redux"

const Blog = ({ blog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)

  const sameUser = user && blog.user && user.username === blog.user.username

  const handleLike = async (event) => {
    event.preventDefault()

    try {
      const updatedBlog = await dispatch(updateLike(blog))

      dispatch(showNotification(`Liked blog '${updatedBlog.title}' by '${updatedBlog.author}'`, 'success', 5))
    }
    catch (exception) {
      dispatch(showNotification('Failed to like blog', 'error', 5))
    }
  }

  const handleDelete = async (event) => {
    event.preventDefault()

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await dispatch(removeBlog(blog.id))

        dispatch(showNotification(`Removed blog '${blog.title}' by '${blog.author}'`, 'success', 5))
      }
      catch (exception) {
        dispatch(showNotification('Failed to remove blog', 'error', 5))
    }
  }
}

  return (
    <div className="blog" style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>
        {visible ? "hide" : "view"}
      </button>
      {visible && (
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
      )}
    </div>
  )
}

export default Blog
