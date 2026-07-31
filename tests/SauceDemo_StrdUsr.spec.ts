import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";

test("Verify title", async ({ page }) => {
  await page.goto("/");
  const pageTitle = await page.title();
  console.log(pageTitle);
  expect(pageTitle).toBe("Swag Labs");

  const loginPage = new LoginPage(page);
  await loginPage.StandardUser_Login();

  const homePage = new HomePage(page);
  await homePage.expectAppLogoVisible();
  await homePage.expectShoppingCartLinkVisible();
});
