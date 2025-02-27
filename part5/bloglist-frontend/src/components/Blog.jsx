import { useState} from 'react'

const Blog = ({ blog, updateLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

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

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>{blog.likes} <button onClick={ handleLike }>
          like
          </button></p>
        <p>{blog.user.name}</p>
      </div>
    </div>  
  )
}

export default Blog