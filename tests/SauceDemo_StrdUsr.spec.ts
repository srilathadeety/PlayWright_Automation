import { test, expect } from "./fixtures";

test("Verify title", async ({ page, loginPage, homePage }) => {
  await page.goto("/");
  const pageTitle = await page.title();
  console.log(pageTitle);
  expect(pageTitle).toBe("Swag Labs");

  await loginPage.StandardUser_Login();
  await homePage.expectAppLogoVisible();
  await homePage.expectShoppingCartLinkVisible();
});
