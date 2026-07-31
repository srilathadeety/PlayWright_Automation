import { test, expect } from "./fixtures";
import { PRODUCT_DATA } from "../test-data";

const { BACKPACK_ADD_TO_CART, BACKPACK_REMOVE } = PRODUCT_DATA;

test("Verify title", async ({ page, loginPage, homePage, yourCartPage, productsPage }) => {
  // Login as the standard user and verify the page title.
  await loginPage.StandardUser_Login();

  // Confirm the home page loaded successfully.
  await homePage.expectPageTitle();
  await homePage.expectAppLogoVisible();
  await homePage.expectShoppingCartLinkVisible();

  // Ensure the cart is clean before adding a new item.
  const initialCartCount = await yourCartPage.getInitialCartCount();

  await productsPage.removeItemIfVisible(BACKPACK_REMOVE);

  // Capture product details before adding the item to cart.
  const details = await productsPage.ProductDetails(BACKPACK_ADD_TO_CART);
  const savedProductName = details.textcontent;
  const savedProductDesc = details.prod_details;
  const savedProductPrice = details.price;

  // Add the backpack to the cart and verify the count increments.
  await productsPage.addToCartByDataTest(BACKPACK_ADD_TO_CART);

  const cartCountAfterAdd = await yourCartPage.getCartCount();
  expect(cartCountAfterAdd).toBe(initialCartCount + 1);

  await productsPage.expectRemoveButtonVisible(BACKPACK_REMOVE);

  // Open the cart and verify the item details.
  await yourCartPage.clickCartLink();
  await yourCartPage.verifyCartItemDetails(
    savedProductName,
    savedProductDesc,
    savedProductPrice,
    BACKPACK_REMOVE,
  );

  // Remove the item from cart and verify the count returns to the initial value.
  await productsPage.removeItemIfVisible(BACKPACK_REMOVE);
  const cartCountAfterRemove = await yourCartPage.getCartCount();
  expect(cartCountAfterRemove).toBe(initialCartCount);

  // Wait briefly for visual verification when running headed.
  await page.waitForTimeout(5000);
});