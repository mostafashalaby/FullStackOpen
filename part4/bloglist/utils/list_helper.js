const lodash = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const likes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
  const reducer = (favourite, blog) => {
    if (favourite === null) {
      return blog
    }

    return blog.likes > favourite.likes ? blog : favourite
  }

  return blogs.reduce(reducer, null)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const count = lodash.countBy(blogs, 'author')
  const author = lodash.maxBy(Object.keys(count), (author) => count[author])

  return {
    author,
    blogs: count[author]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const likesByAuthor = lodash.reduce(
    blogs,
    (acc, blog) => {
      acc[blog.author] = (acc[blog.author] || 0) + blog.likes
      return acc
    },
    {}
  )

  console.log(likesByAuthor)
  const author = lodash.maxBy(Object.keys(likesByAuthor), (author) => likesByAuthor[author])


  return {
    author,
    likes: likesByAuthor[author]
  }

}



module.exports = {
  dummy,
  likes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}