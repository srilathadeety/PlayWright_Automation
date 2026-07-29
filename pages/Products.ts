import { Page, expect } from '@playwright/test';

export class Products {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addToCartByDataTest(dataTest: string) {
    const addToCartBtn = this.page.locator(`button[data-test="${dataTest}"]`);
    await expect(addToCartBtn).toBeVisible();
    await addToCartBtn.click();
  }

  async expectButtonVisible(dataTest: string) {
    const button = this.page.locator(`button[data-test="${dataTest}"]`);
    await expect(button).toBeVisible();
  }

  async expectRemoveButtonVisible(dataTest: string) {
    await this.expectButtonVisible(dataTest);
  }

  async ProductDetails(dataTest: string) {
    const productCard = this.page.locator(`div.inventory_item:has(button[data-test="${dataTest}"])`);
    await expect(productCard).toBeVisible();

    const textcontent = await productCard.locator('.inventory_item_name').textContent();
    const prod_details = await productCard.locator('.inventory_item_desc').textContent();
    const price = await productCard.locator('.inventory_item_price').textContent();

    return {
      textcontent: textcontent?.trim() ?? '',
      prod_details: prod_details?.trim() ?? '',
      price: price?.trim() ?? '',
    };
  }
}
