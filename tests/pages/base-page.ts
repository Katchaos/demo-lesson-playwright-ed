import { Locator, Page } from '@playwright/test'
import { expect, test } from '@playwright/test'


export abstract class BasePage {
  readonly page: Page
  readonly languageSwitcher: Locator
  // TODO add EN & RU buttons
  readonly privacyPolicyLink: Locator
  readonly cookiePolicyPage: Locator
  readonly termsOfServices: Locator
  // TODO add other documents
  readonly TIMEOUT_VISIBILITY: number = 5000




  protected constructor(page: Page) {
    this.page = page
    this.languageSwitcher = page.locator('div.language')
    this.privacyPolicyLink = page.getByTestId('privacy-policy')
    this.cookiePolicyPage = page.getByTestId('cookie-policy')
    this.termsOfServices = page.getByTestId('terms-of-service')
  }

  async checkElementVisibility(element: Locator): Promise<void> {
    // better test report with 'step'
    await test.step(`Verifying element visibility: ${element}`, async () => {
      await expect(element).toBeVisible({ timeout: this.TIMEOUT_VISIBILITY })
    })
  }

  async verifyLanguageSelector(): Promise<void> {
    await test.step('Verify language selector', async () => {
      await this.checkElementVisibility(this.languageSwitcher)
    })
  }

  async clickElement(element: Locator) {
    await test.step(`Clicking element: ${element}`, async () => {
      await element.click()
    })
  }

  async fillElement(element: Locator, text: string) {
    await test.step(`Filling element: ${element}`, async () => {
      await element.fill(text)
    })
  }

  async verifyPolicyLinkInTheFooter(): Promise<void> {
    await test.step('Verify policy link in the footer', async () => {
      await this.checkElementVisibility(this.privacyPolicyLink)
      await this.checkElementVisibility(this.cookiePolicyPage)
      await this.checkElementVisibility(this.termsOfServices)
    })
  }
}
