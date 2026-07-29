import { expect, Page } from '@playwright/test';

export class YourCart {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  cartBadge() {
    return this.page.locator('span.shopping_cart_badge');
  }

  async getInitialCartCount(): Promise<number> {
    const cartBadge = this.cartBadge();
    return (await cartBadge.count()) > 0
      ? Number(await cartBadge.textContent())
      : 0;
  }

  async getCartCount(): Promise<number> {
    const cartBadge = this.cartBadge();
    return (await cartBadge.count()) > 0
      ? Number(await cartBadge.textContent())
      : 0;
  }

  async expectCartCount(expected: number) {
    await expect(this.cartBadge()).toHaveText(String(expected));
  }

  async clickCartLink() {
    await this.page.click('a[data-test="shopping-cart-link"]');
    const titleText = await this.page.locator('span[data-test="title"]').textContent();
    expect(titleText?.trim()).toBe('Your Cart');

    const qtyText = await this.page.locator('div[data-test="cart-quantity-label"]').textContent();
    expect(qtyText?.trim()).toBe('QTY');
  }
  
  async verifyCartItemDetails(
    expectedName: string,
    expectedDesc: string,
    expectedPrice: string,
    removeButtonId: string,
  ) {
    // Find the cart item `div[data-test="inventory-item"]` that contains the button with the given id
    const cartItem = this.page.locator(`div[data-test="inventory-item"]:has(#${removeButtonId})`).first();
    await expect(cartItem).toBeVisible();

    const nameText = await cartItem.locator('[data-test="inventory-item-name"]').textContent();
    expect(nameText?.trim()).toBe(expectedName);

    const descText = await cartItem.locator('[data-test="inventory-item-desc"]').textContent();
    expect(descText?.trim()).toBe(expectedDesc);

    const priceText = await cartItem.locator('[data-test="inventory-item-price"]').textContent();
    expect(priceText?.trim()).toBe(expectedPrice);
  }

  async removeItem(removeButtonId: string) {
    await this.page.click(`#${removeButtonId}`);
  }

  async removeItemIfVisible(removeButtonId: string) {
    const removeBtn = this.page.locator(`#${removeButtonId}`);
    if (await removeBtn.isVisible()) {
      await removeBtn.click();
    }
  }
}
