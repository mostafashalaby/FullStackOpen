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

      test('a blog can be liked', async ({ page }) => {
        const blog = await page.getByText('first blog author1')
        await blog.getByRole('button', { name: 'view' }).click()
        await page.getByTestId('like-button').click()
        await expect(blog).toContainText('likes: 1')
      })

      test('a blog can be deleted', async ({ page }) => {
        page.on('dialog', async dialog => {
          await dialog.accept()
        })

        const blog = await page.getByText('second blog author2')
        await blog.getByRole('button', { name: 'view' }).click()
        await blog.getByRole('button', { name: 'remove' }).click()

        await page.getByText('first blog author1')
        await expect(await page.getByText('second blog author2')).not.toBeVisible()
      })

      test('remove button is not shown for blogs created by other users', async ({ page, request }) => {
        await request.post('/api/users', {
          data: {
            username: 'nothanks',
            password: 'quirky',
            name: 'Normaluser'
          }
        })
        await page.getByRole('button', { name: 'logout' }).click()
        await loginWith(page, 'nothanks', 'quirky')

        const blog = await page.getByText('second blog author2')
        await blog.getByRole('button', { name: 'view' }).click()
        await expect(blog.getByRole('button', { name: 'remove' })).not.toBeVisible()
      })

      test('blogs are ordered by likes', async ({ page }) => {
        const blog1 = await page.getByText('first blog author1')
        const blog2 = await page.getByText('second blog author2')
        const blog3 = await page.getByText('third blog author3')

        await blog1.getByRole('button', { name: 'view' }).click()
        await blog1.getByTestId('like-button').click()
        await page.waitForTimeout(2000)
        await blog1.getByRole('button', { name: 'hide' }).click()

        await blog2.getByRole('button', { name: 'view' }).click()
        await blog2.getByTestId('like-button').click()
        await page.waitForTimeout(2000)
        await blog2.getByTestId('like-button').click()
        await page.waitForTimeout(2000)
        await blog2.getByRole('button', { name: 'hide' }).click()

        await blog3.getByRole('button', { name: 'view' }).click()
        await blog3.getByTestId('like-button').click()
        await page.waitForTimeout(2000)
        await blog3.getByTestId('like-button').click()
        await page.waitForTimeout(2000)
        await blog3.getByTestId('like-button').click()
        await page.waitForTimeout(2000)
        await blog3.getByRole('button', { name: 'hide' }).click()

        const blogs = await page.locator('.blog').all()
        await expect(blogs[0]).toContainText('third blog author3')
        await expect(blogs[1]).toContainText('second blog author2')
        await expect(blogs[2]).toContainText('first blog author1')
      })
    })
  })
})