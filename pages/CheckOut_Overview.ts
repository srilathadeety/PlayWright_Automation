import { Page, expect } from '@playwright/test';

export class CheckOutOverview {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectOverviewPageElementsVisible() {
    await expect(this.page.locator('span[data-test="title"]')).toBeVisible();
    await expect(this.page.locator('div[data-test="cart-quantity-label"]')).toBeVisible();
    await expect(this.page.locator('div[data-test="cart-desc-label"]')).toBeVisible();
    await expect(this.page.locator('div[data-test="payment-info-label"]')).toBeVisible();
    await expect(this.page.locator('div[data-test="shipping-info-label"]')).toBeVisible();
    await expect(this.page.locator('#finish')).toBeVisible();
    await expect(this.page.locator('#cancel')).toBeVisible();
  }

  async expectItemTotalMatches(savedProductPrice_Shirt: string, savedProductPrice_Jacket: string) {
    const subtotalLabel = this.page.locator('div[data-test="subtotal-label"]');
    await expect(subtotalLabel).toBeVisible();

    const expectedTotal = Number.parseFloat(savedProductPrice_Shirt.replace(/[^\d.]/g, ''))
      + Number.parseFloat(savedProductPrice_Jacket.replace(/[^\d.]/g, ''));

    await expect(subtotalLabel).toContainText(`Item total: $${expectedTotal.toFixed(2)}`);
  }

  async clickFinishButton() {
    await expect(this.page.locator('#finish')).toBeVisible();
    await this.page.locator('#finish').click();
  }
}
