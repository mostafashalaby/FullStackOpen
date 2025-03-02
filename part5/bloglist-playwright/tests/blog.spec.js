const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        username: 'root',
        password: 'salainen',
        name: 'Superuser'
      }
    })
    await page.goto('')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.locator('text=Log in to the application')).toBeVisible()

    await expect(page.locator('text=Username')).toBeVisible()
    await expect(page.locator('text=Password')).toBeVisible()
  })


  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'root', 'salainen')
      await expect(page.getByText('Superuser logged-in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'root', 'wrong')
      
      const errorDiv = await page.locator('.error')
      await expect(page.locator('.error')).toHaveText('Wrong credentials')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
      await expect(await page.getByText('Superuser logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'root', 'salainen')
    })
  
    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'a blog created by playwright', 'playwright', 'https://playwright.dev')
      await expect(page.getByText('a blog created by playwright playwright')).toBeVisible()
    })

    describe('and some blogs exist', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'first blog', 'author1', 'https://first.blog')
        await createBlog(page, 'second blog', 'author2', 'https://second.blog')
        await createBlog(page, 'third blog', 'author3', 'https://third.blog')
      })

      test.only('a blog can be liked', async ({ page }) => {
        await page.getByText('second blog').click()
        await page.getByTestId('like-button').click()
        await expect(page.locator('text=likes 1')).toBeVisible()
      })
    })
  })
})