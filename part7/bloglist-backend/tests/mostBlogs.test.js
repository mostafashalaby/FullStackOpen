const { test, describe } = require('node:test')

const assert = require('node:assert')

const mostBlogs = require('../utils/list_helper.js').mostBlogs

describe('most blogs', () => {
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
      author: 'Da Baby',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 8,
      __v: 0
    }
  ]

  const listWithMultipleBlogsRepeatedTop = [
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f4',
      title: 'Hi guys',
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
      likes: 40,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f5',
      title: 'Leafy the beefy',
      author: 'Da Baby',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 8,
      __v: 0
    }
  ]

  test('of empty list is null', () => {
    const result = mostBlogs([])
    const expected = null
    assert.deepStrictEqual(result, expected)
  })

  test('when list has only one blog, is that author', () => {
    const result = mostBlogs(listWithOneBlog)
    const expected = {
      author: listWithOneBlog[0].author,
      blogs: 1
    }
    assert.deepStrictEqual(result, expected)
  })

  test('of a bigger list is calculated right', () => {
    const result = mostBlogs(listWithMultipleBlogs)
    const expected = {
      author: listWithMultipleBlogs[1].author,
      blogs: 2
    }
    assert.deepStrictEqual(result, expected)
  })

  test('of a list with duplicated most blogs, is first instance', () => {
    const result = mostBlogs(listWithMultipleBlogsRepeatedTop)
    const expected = {
      author: listWithMultipleBlogsRepeatedTop[0].author,
      blogs: 2
    }
    assert.deepStrictEqual(result, expected)
  })
})