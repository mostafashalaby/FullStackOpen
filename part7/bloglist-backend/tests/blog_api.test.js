const jwt = require('jsonwebtoken')

const { test, after, beforeEach, describe } = require('node:test')
const bcrypt = require('bcrypt')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

let token

describe('when there are some blogs saved initially and a user is logged in', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({}) // Optional: Ensures a fresh user each time

    // Create test user
    const passwordHash = await bcrypt.hash('testpassword', 10)
    const user = new User({ username: 'testuser', passwordHash })
    await user.save()

    // Generate token for the created user
    const userForToken = { username: user.username, id: user._id.toString() }
    token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '1h' })

    // Add blogs with reference to the user
    for (let blog of helper.initialBlogs) {
      let blogObject = new Blog({ ...blog, user: user._id })
      await blogObject.save()
    }
  })


  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('unique identifier property is "id", not "_id"', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.ok(response.body, 'Response body is undefined')
    assert.ok(response.body.length > 0, 'Response body is empty')

    response.body.forEach(blog => {
      assert.ok(blog.id, 'Blog id is missing')
      assert.strictEqual(blog._id, undefined, 'Blog _id should not exist')
    })

  })

  describe('adding a blog', () => {
    test('a valid blog can be added', async () => {
      const newBlog = {
        title: 'Yessir',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 7,
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)


      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)


      const titles = blogsAtEnd.map(n => n.title)
      assert(titles.includes('Yessir'))
    })

    test('fails with status code 401 if no token provided', async () => {
      const newBlog = {
        title: 'Yessir',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 7,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)
    })

    test('if "likes" is missing, default to 0', async () => {

      const newBlog = {
        title: 'Yessir',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf'
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd[blogsAtEnd.length - 1].likes, 0)
    })

    test('if "title" is missing, get a 400 response code', async () => {

      const newBlog = {
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf'
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
    })

    test('if "url" is missing, get a 400 response code', async () => {

      const newBlog = {
        title: 'Yessir',
        author: 'Edsger W. Dijkstra'
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
    })
  })
  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

      const ids = blogsAtEnd.map(r => r.id)
      assert(!ids.includes(blogToDelete.id))
    })

    test('fails with status code 401 if no token provided', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(401)
    })

    test('fails with status code 400 if id is invalid', async () => {
      await helper.blogsInDb()
      await api
        .delete('/api/blogs/invalididlol')
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
    })
  })

  describe('updating a blog', () => {
    test.only('succeeds with status code 200 if id is valid, updating likes', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)


      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

      const updatedLikes = blogsAtEnd.find(b => b.id === blogToUpdate.id).likes

      assert.strictEqual(updatedLikes, blogToUpdate.likes + 1)
    })

    test('fails with status code 400 if id is invalid', async () => {
      await helper.blogsInDb()
      await api
        .put('/api/blogs/invalididlol')
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
    })
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper status code and message if username is less than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ro',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('shorter than the minimum allowed length'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper status code and message if password is less than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'baby',
      name: 'Regularuser',
      password: 'xo',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('shorter than the minimum allowed length'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})