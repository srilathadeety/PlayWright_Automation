import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { Products } from "../pages/Products";
import { YourCart } from "../pages/YourCart";

const BACKPACK_ADD_TO_CART = 'add-to-cart-sauce-labs-backpack';
const BACKPACK_REMOVE = 'remove-sauce-labs-backpack';

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

  const yourCart = new YourCart(page);
  const initialCartCount = await yourCart.getInitialCartCount();

  await yourCart.removeItemIfVisible(BACKPACK_REMOVE);

  const products = new Products(page);
  const details = await products.ProductDetails(BACKPACK_ADD_TO_CART);
  // store values for later comparison (no immediate assertions)
  const savedProductName = details.textcontent;
  const savedProductDesc = details.prod_details;
  const savedProductPrice = details.price;

  await products.addToCartByDataTest(BACKPACK_ADD_TO_CART);

  const cartCountAfterAdd = await yourCart.getCartCount();
  expect(cartCountAfterAdd).toBe(initialCartCount + 1);

  await products.expectRemoveButtonVisible(BACKPACK_REMOVE);

  await yourCart.clickCartLink();

  // verify the cart page item details match the product details we saved earlier
  await yourCart.verifyCartItemDetails(
    savedProductName,
    savedProductDesc,
    savedProductPrice,
    BACKPACK_REMOVE,
  );

  // remove the item and verify the cart count returns to initial
  await yourCart.removeItem(BACKPACK_REMOVE);
  await page.waitForTimeout(5000);

});