import { Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput = 'input[data-test="username"]';
  readonly passwordInput = 'input[data-test="password"]';
  readonly loginButton = "#login-button";

  constructor(page: Page) {
    this.page = page;
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }
}
