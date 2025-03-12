import { useState } from "react"
import { createBlog } from "../reducers/blogReducer.js"
import { showNotification } from "../reducers/notificationReducer.js"
import { useDispatch } from "react-redux"

const BlogForm = () => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const dispatch = useDispatch()

  const handleCreate = async (event) => {
    event.preventDefault()

    try {
      const returnedBlog = await dispatch(createBlog({ title, author, url }))

      setTitle("")
      setAuthor("")
      setUrl("")

      dispatch(
        showNotification(
          `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
          "success",
          5,
        ),
      )
    } catch (exception) {
      dispatch(showNotification("Failed to create a new blog", "error", 5))
    }
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            placeholder="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            placeholder="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="Url"
            placeholder="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
