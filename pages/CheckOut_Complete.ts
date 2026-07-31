import { Page, expect } from '@playwright/test';

export class CheckOutComplete {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectCompletePageElementsVisible() {
    await expect(this.page.locator('img[data-test="pony-express"]')).toBeVisible();
    await expect(this.page.locator('span[data-test="title"]')).toBeVisible();
    await expect(this.page.locator('h2[data-test="complete-header"]')).toBeVisible();
    await expect(this.page.locator('div[data-test="complete-text"]')).toBeVisible();
    await expect(this.page.locator('#back-to-products')).toBeVisible();
    await expect(this.page.locator('#generate-pdf-order')).toBeVisible();
  }
}

