import { Page, expect } from '@playwright/test';

export class CheckOut {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectCheckoutFormVisible() {
    await expect(this.page.locator('div.checkout_info')).toBeVisible();
  }

  async expectCheckoutTitleVisible() {
    await expect(this.page.locator('span[data-test="title"]')).toBeVisible();
  }

  async expectInputVisible(dataTest: string) {
    const inputIdMap: Record<string, string> = {
      firstName: 'first-name',
      lastName: 'last-name',
      postalCode: 'postal-code',
    };

    await expect(this.page.locator(`#${inputIdMap[dataTest]}`)).toBeVisible();
  }

  async expectContinueButtonVisible() {
    await expect(this.page.locator('#continue')).toBeVisible();
  }

  async clickContinueButton() {
    await this.expectContinueButtonVisible();
    await this.page.locator('#continue').click();
  }

  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    const firstNameInput = this.page.locator('#first-name');
    const lastNameInput = this.page.locator('#last-name');
    const postalCodeInput = this.page.locator('#postal-code');

    await this.expectCheckoutFormVisible();
    await this.expectCheckoutTitleVisible();
    await this.expectInputVisible('firstName');
    await this.expectInputVisible('lastName');
    await this.expectInputVisible('postalCode');

    await firstNameInput.fill(firstName);
    await lastNameInput.fill(lastName);
    await postalCodeInput.fill(postalCode);
  }
}
