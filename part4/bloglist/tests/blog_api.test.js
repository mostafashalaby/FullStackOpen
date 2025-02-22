const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

describe('when there are some blogs saved initially', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
      let blogObject = new Blog(blog)
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

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Yessir',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 7,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)


    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)


    const titles = blogsAtEnd.map(n => n.title)
    assert(titles.includes('Yessir'))
  })

  test('if "likes" is missing, default to 0', async () => {

    const newBlog = {
      title: 'Yessir',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf'
    }

    await api
      .post('/api/blogs')
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
      .send(newBlog)
      .expect(400)
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

      const ids = blogsAtEnd.map(r => r.id)
      assert(!ids.includes(blogToDelete.id))
    })

    test('fails with status code 400 if id is invalid', async () => {
      await helper.blogsInDb()
      await api
        .delete('/api/blogs/invalididlol')
        .expect(400)
    })
  })

  describe('updating a blog', () => {
    test('succeeds with status code 200 if id is valid, updating likes', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
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
        .expect(400)
    })
  })
})


after(async () => {
  await mongoose.connection.close()
})