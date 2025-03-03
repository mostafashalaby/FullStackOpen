import { useState } from 'react'

const Blog = ({ blog, updateLike, removeBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const sameUser = user && blog.user && user.username === blog.user.username
  if (user && blog.user) {
    console.log('user.username', user.username)
    console.log('blog.user.username', blog.user.username)
  }
  console.log('sameUser', sameUser)
  
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
          <p>likes: {blog.likes} <button data-testid='like-button' onClick={ handleLike }>
            like
          </button></p>
          <p>{blog.user.name}</p>
          {sameUser && (<button onClick={ handleDelete }>remove</button>)}
        </div>
      )}
    </div>
  )
}

export default Blog