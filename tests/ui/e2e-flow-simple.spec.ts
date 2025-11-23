import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { faker } from '@faker-js/faker/locale/en'
import { PASSWORD, USERNAME } from '../../config/env-data'

test('signIn button disabled when incorrect data inserted', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  await authPage.usernameField.fill(faker.lorem.word(2))
  await authPage.passwordField.fill(faker.lorem.word(2))
  await expect(authPage.signInButton).toBeDisabled()
})

test('login with correct credentials and verify order creation page', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await expect(orderCreationPage.userNameField).toBeVisible()
  await expect(orderCreationPage.orderButton).toBeVisible()
  await expect(orderCreationPage.userPhoneField).toBeVisible()
  await expect(orderCreationPage.userCommentField).toBeVisible()
})

test('login and create order successfully', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.userNameField.fill(faker.lorem.word(7))
  await orderCreationPage.userPhoneField.fill(faker.lorem.word(7))
  await orderCreationPage.orderButton.click()
  await expect(orderCreationPage.orderCreatedButton).toBeVisible()
})

test('login and verify validation errors', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.userNameField.fill(faker.lorem.word(1))
  await orderCreationPage.userPhoneField.fill(faker.lorem.word(5))
  await expect (orderCreationPage.userNameLengthError).toBeVisible()
  await expect (orderCreationPage.userPhoneLengthError).toBeVisible()
  await expect(orderCreationPage.orderButton).toBeDisabled()
})

test('login and verify validation errors with empty fields', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.userNameField.fill(faker.lorem.word(1))
  await orderCreationPage.userPhoneField.fill(faker.lorem.word(1))
  await orderCreationPage.userNameField.fill('')
  await orderCreationPage.userPhoneField.fill('')
  await expect (orderCreationPage.userNameEmptyFieldError).toBeVisible()
  await expect (orderCreationPage.userPhoneEmptyFieldError).toBeVisible()
})

test('login and log out', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.logOutButton.click()
  await expect (authPage.signInButton).toBeVisible()
})
