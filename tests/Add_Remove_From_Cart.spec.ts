import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { Products } from "../pages/Products";
import { YourCart } from "../pages/YourCart";

const BACKPACK_ADD_TO_CART = 'add-to-cart-sauce-labs-backpack';
const BACKPACK_REMOVE = 'remove-sauce-labs-backpack';

test("Verify title", async ({ page }) => {
  // Login as the standard user and verify the page title.
  const loginPage = new LoginPage(page);
  await loginPage.StandardUser_Login();

  // Confirm the home page loaded successfully.
  const homePage = new HomePage(page);
  await homePage.expectPageTitle();
  await homePage.expectAppLogoVisible();
  await homePage.expectShoppingCartLinkVisible();

  // Ensure the cart is clean before adding a new item.
  const yourCart = new YourCart(page);
  const initialCartCount = await yourCart.getInitialCartCount();

  const products = new Products(page);
  await products.removeItemIfVisible(BACKPACK_REMOVE);

  // Capture product details before adding the item to cart.
  const details = await products.ProductDetails(BACKPACK_ADD_TO_CART);
  const savedProductName = details.textcontent;
  const savedProductDesc = details.prod_details;
  const savedProductPrice = details.price;

  // Add the backpack to the cart and verify the count increments.
  await products.addToCartByDataTest(BACKPACK_ADD_TO_CART);

  const cartCountAfterAdd = await yourCart.getCartCount();
  expect(cartCountAfterAdd).toBe(initialCartCount + 1);

  await products.expectRemoveButtonVisible(BACKPACK_REMOVE);

  // Open the cart and verify the item details.
  await yourCart.clickCartLink();
  await yourCart.verifyCartItemDetails(
    savedProductName,
    savedProductDesc,
    savedProductPrice,
    BACKPACK_REMOVE,
  );

  // Remove the item from cart and verify the count returns to the initial value.
  await products.removeItemIfVisible(BACKPACK_REMOVE);
  const cartCountAfterRemove = await yourCart.getCartCount();
  expect(cartCountAfterRemove).toBe(initialCartCount);

  // Wait briefly for visual verification when running headed.
  await page.waitForTimeout(5000);
});