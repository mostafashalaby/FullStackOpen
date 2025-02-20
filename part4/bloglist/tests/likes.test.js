const { test, describe } = require('node:test')

const assert = require('node:assert')

const likes = require('../utils/list_helper.js').likes

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  const listWithMultipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 40,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Vroom?',
      author: 'Da Baby',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f5',
      title: 'Leafy the beefy',
      author: 'Keemstar',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 8,
      __v: 0
    }
  ]

  test('of empty list is zero', () => {
    const result = likes([])
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = likes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('of a bigger list is calculated right', () => {
    const result = likes(listWithMultipleBlogs)
    assert.strictEqual(result, 48)
  })
})