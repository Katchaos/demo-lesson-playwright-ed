import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { faker } from '@faker-js/faker/locale/en'
import { PASSWORD, USERNAME } from '../../config/env-data'
import { OrderFoundPage }  from '../pages/order-found-page'
import { OrderNotFoundPage } from '../pages/order-not-found-page'

test('signIn button disabled when incorrect data inserted', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  await authPage.usernameField.fill(faker.lorem.word(2))
  await authPage.passwordField.fill(faker.lorem.word(2))
  await expect(authPage.signInButton).toBeDisabled()
  await authPage.verifyPolicyLinkInTheFooter()
})

test('login with correct credentials and verify order creation page', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.verifyLanguageSelector()
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
  await orderCreationPage.verifyPolicyLinkInTheFooter()
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

test('Verify language toggle is visible', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  await authPage.verifyLanguageSelector()
})

test('verify policy links in the footer', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.userNameField.fill(faker.lorem.word(1))
  await orderCreationPage.userPhoneField.fill(faker.lorem.word(5))
  await expect (orderCreationPage.userNameLengthError).toBeVisible()
  await expect (orderCreationPage.userPhoneLengthError).toBeVisible()
  await expect(orderCreationPage.orderButton).toBeDisabled()
  await orderCreationPage.verifyPolicyLinkInTheFooter()
})

test('Verify order not found page', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.statusButton.click()
  await orderCreationPage.searchOrderInput.fill('9999999')
  await orderCreationPage.searchOrderSubmitButton.click()
  const orderNotFound = new OrderNotFoundPage(page)
  await expect(orderNotFound.orderNotFoundTitle).toBeVisible()
  await orderNotFound.verifyPolicyLinkInTheFooter()
})

test('Verify order found page', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.orderButton.click()
  await orderCreationPage.searchOrderInput.fill('13495')
  await orderCreationPage.searchOrderSubmitButton.click()
  const orderFoundPage = new OrderFoundPage(page)
  await expect(orderFoundPage.statusListItem).toBeVisible()
  await orderFoundPage.verifyPolicyLinkInTheFooter()
})
