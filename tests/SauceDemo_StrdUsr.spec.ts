import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";

test("Verify title", async ({ page }) => {
  await page.goto("/");
  const pageTitle = await page.title();
  console.log(pageTitle);
  expect(pageTitle).toBe("Swag Labs");

  const username = process.env.SAUCE_DEMO_STANDARD_USER;
  const password = process.env.SAUCE_DEMO_PASS;

  if (!username || !password) {
    throw new Error(
      "SAUCE_DEMO_STANDARD_USER and SAUCE_DEMO_PASS environment variables must be set",
    );
  }

  const loginPage = new LoginPage(page);
  await loginPage.login(username, password);

  const homePage = new HomePage(page);
  await homePage.expectAppLogoVisible();
  await homePage.expectShoppingCartLinkVisible();
});
