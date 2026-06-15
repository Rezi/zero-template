import {expect, test} from '@playwright/test'

test('home page loads and renders the shell', async ({page}) => {
  await page.goto('/')

  // The app shell should mount and the document should have a title.
  await expect(page).toHaveTitle(/zero-music/i)
})

test('shows the sign in control', async ({page}) => {
  await page.goto('/')

  await expect(page.getByRole('button', {name: /sign in/i})).toBeVisible()
})
