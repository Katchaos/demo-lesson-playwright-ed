import type { Locator, Page } from '@playwright/test'

export class OrderPage {
  readonly page: Page
  readonly statusButton: Locator
  readonly userNameField: Locator
  readonly orderButton: Locator
  readonly userPhoneField: Locator
  readonly userCommentField: Locator
  readonly mainPageLink: Locator
  readonly orderCreatedButton: Locator
  readonly logOutButton: Locator
  readonly userNameLengthError: Locator
  readonly userPhoneLengthError: Locator
  readonly userNameEmptyFieldError: Locator
  readonly userPhoneEmptyFieldError: Locator


  // add more locators here

  constructor(page: Page) {
    this.page = page
    this.statusButton = page.getByTestId('openStatusPopup-button')
    this.userNameField = page.getByTestId('username-input')
    this.orderButton = page.getByTestId('createOrder-button')
    this.userPhoneField = page.getByTestId('phone-input')
    this.userCommentField = page.getByTestId('comment-input')
    this.mainPageLink = page.getByTestId('mainPage-link')
    this.orderCreatedButton = page.getByTestId('orderSuccessfullyCreated-popup-ok-button')
    this.logOutButton = page.getByTestId('logout-button')
    this.userNameLengthError = page.getByText('The field must contain at least of characters: 2')
    this.userPhoneLengthError = page.getByText('The field must contain at least of characters: 6')
    this.userNameEmptyFieldError = this.userNameEmptyFieldError = page.locator('[data-name="username-input-error"]', {
      hasText: 'The field must be filled in.'})
    this.userPhoneEmptyFieldError = this.userPhoneEmptyFieldError = page.locator('[data-name="phone-input-error"]', {
      hasText: 'The field must be filled in.'})
    // add more locators here
  }
}
