const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    id: '5a422aa71b54a676234d17f9',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 40
  },
  {
    id: '5a422aa71b54a676234d17f8',
    title: 'Vroom?',
    author: 'Da Baby',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 10
  },
]

const nonExistingId = async () => {
  const blog = new Blog(
    {
      id: '80',
      title: 'Tester',
      author: 'Mr. Test',
      url: 'google.com',
      likes: 10000,
    },
  )
  await blog.save()
  await blog.deleteOne()

  return Blog.id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const getValidToken = async () => {
  const user = await User.findOne() // Get any existing user
  if (!user) {
    throw new Error('No users found in the database. Ensure a user exists before calling getValidToken.')
  }

  const userForToken = {
    username: user.username,
    id: user._id.toString(),
  }

  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '1h' })
  console.log(token)
  return token
}


module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  getValidToken
}