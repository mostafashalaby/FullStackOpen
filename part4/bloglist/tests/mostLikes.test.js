const { test, describe } = require('node:test')

const assert = require('node:assert')

const mostLikes = require('../utils/list_helper.js').mostLikes

describe('most likes', () => {
  const listWithOneBlog = [
    {
      id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5
    }
  ]

  const listWithMultiplelikes = [
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
      likes: 12
    },
    {
      id: '5a422aa71b54a676234d17f5',
      title: 'Leafy the beefy',
      author: 'Da Baby',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 88
    }
  ]

  const listWithMultiplelikesRepeatedTop = [
    {
      id: '5a422aa71b54a676234d17f9',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 7
    },
    {
      id: '5a422aa71b54a676234d17f4',
      title: 'Hi guys',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 40
    },
    {
      id: '5a422aa71b54a676234d17f8',
      title: 'Vroom?',
      author: 'Da Baby',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 40
    },
    {
      id: '5a422aa71b54a676234d17f5',
      title: 'Leafy the beefy',
      author: 'Da Baby',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 7
    }
  ]

  test('of empty list is null', () => {
    const result = mostLikes([])
    const expected = null
    assert.deepStrictEqual(result, expected)
  })

  test('when list has only one blog, is that author', () => {
    const result = mostLikes(listWithOneBlog)
    const expected = {
      author: listWithOneBlog[0].author,
      likes: 5
    }
    assert.deepStrictEqual(result, expected)
  })

  test('of a bigger list is calculated right', () => {
    const result = mostLikes(listWithMultiplelikes)
    const expected = {
      author: listWithMultiplelikes[1].author,
      likes: 100
    }
    assert.deepStrictEqual(result, expected)
  })

  test('of a list with duplicated most likes, is first instance', () => {
    const result = mostLikes(listWithMultiplelikesRepeatedTop)
    const expected = {
      author: listWithMultiplelikesRepeatedTop[0].author,
      likes: 47
    }
    assert.deepStrictEqual(result, expected)
  })
})