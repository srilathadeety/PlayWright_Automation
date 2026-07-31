import { Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput = 'input[data-test="username"]';
  readonly passwordInput = 'input[data-test="password"]';
  readonly loginButton = "#login-button";

  constructor(page: Page) {
    this.page = page;
  }

  async StandardUser_Login() {
    const username = process.env.SAUCE_DEMO_STANDARD_USER;
    const password = process.env.SAUCE_DEMO_PASS;

    if (!username || !password) {
      throw new Error(
        "SAUCE_DEMO_STANDARD_USER and SAUCE_DEMO_PASS environment variables must be set",
      );
    }

    await this.page.goto("/");
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }
}
