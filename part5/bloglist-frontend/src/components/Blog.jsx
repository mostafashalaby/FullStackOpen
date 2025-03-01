import { useState } from 'react'

const Blog = ({ blog, updateLike, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const handleLike = async (event) => {
    event.preventDefault()

    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    updateLike(
      blog.id,
      updatedBlog
    )
  }

  const handleDelete = async (event) => {
    event.preventDefault()

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id)
    }
  }

  return (
    <div className='blog' style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>{blog.likes} <button onClick={ handleLike }>
            like
          </button></p>
          <p>{blog.user.name}</p>
          <button onClick={ handleDelete }>remove</button>
        </div>
      )}
    </div>
  )
}

export default Blog