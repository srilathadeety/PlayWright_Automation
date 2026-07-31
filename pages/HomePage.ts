import { Page, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectPageTitle() {
    const pageTitle = await this.page.title();
    expect(pageTitle).toBe('Swag Labs');
  }

  async expectAppLogoVisible() {
    await expect(this.page.locator('div.app_logo')).toBeVisible();
  }

  async expectShoppingCartLinkVisible() {
    await expect(this.page.locator('a[data-test="shopping-cart-link"]')).toBeVisible();
  }
}
