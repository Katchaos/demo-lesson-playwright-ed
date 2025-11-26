import { Locator, Page } from '@playwright/test'
import { BasePage } from './base-page'

export class OrderFoundPage extends  BasePage {
  readonly statusListItem: Locator;

  constructor(page: Page) {
    super(page)
    this.statusListItem = page.getByTestId('status-item-0')
  }

}
