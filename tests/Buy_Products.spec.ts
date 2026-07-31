import { test, expect } from "./fixtures";
import { PRODUCT_DATA } from "../test-data";

const {
  BOLT_T_SHIRT_ADD_TO_CART,
  BOLT_T_SHIRT_REMOVE,
  FLEECE_JACKET_ADD_TO_CART,
  FLEECE_JACKET_REMOVE,
} = PRODUCT_DATA;



test("Verify title", async ({ page, loginPage, homePage, productsPage, yourCartPage, checkoutPage, checkoutOverviewPage }) => {
  // Login as the standard user and verify the page title.
  await loginPage.StandardUser_Login();

  // Confirm the home page loaded successfully.
  await homePage.expectPageTitle();
  await homePage.expectAppLogoVisible();
  await homePage.expectShoppingCartLinkVisible();

  await productsPage.removeItemIfVisible(BOLT_T_SHIRT_REMOVE);
  await productsPage.removeItemIfVisible(FLEECE_JACKET_REMOVE);

  // Capture product details before adding the item to cart.
  const detailsShirt = await productsPage.ProductDetails(BOLT_T_SHIRT_ADD_TO_CART);
  const savedProductName_Shirt = detailsShirt.textcontent;
  const savedProductDesc_Shirt = detailsShirt.prod_details;
  const savedProductPrice_Shirt = detailsShirt.price;

  // Capture product details before adding the item to cart.
  const detailsJacket = await productsPage.ProductDetails(FLEECE_JACKET_ADD_TO_CART);
  const savedProductName_Jacket = detailsJacket.textcontent;
  const savedProductDesc_Jacket = detailsJacket.prod_details;
  const savedProductPrice_Jacket = detailsJacket.price;

  // Add the bolt t-shirt to the cart and verify the count increments.
  await productsPage.addToCartByDataTest(BOLT_T_SHIRT_ADD_TO_CART);
  await productsPage.expectRemoveButtonVisible(BOLT_T_SHIRT_REMOVE);

  // Add the bolt t-shirt to the cart and verify the count increments.
  await productsPage.addToCartByDataTest(FLEECE_JACKET_ADD_TO_CART);
  await productsPage.expectRemoveButtonVisible(FLEECE_JACKET_REMOVE);

  // Open the cart and verify the item details.
  await yourCartPage.clickCartLink();
  await yourCartPage.expectRemoveButtonVisible(BOLT_T_SHIRT_REMOVE);
  await yourCartPage.expectRemoveButtonVisible(FLEECE_JACKET_REMOVE);

  await yourCartPage.verifyCartItemDetails(
    savedProductName_Shirt,
    savedProductDesc_Shirt,
    savedProductPrice_Shirt,
    BOLT_T_SHIRT_REMOVE,
  );

  await yourCartPage.verifyCartItemDetails(
    savedProductName_Jacket,
    savedProductDesc_Jacket,
    savedProductPrice_Jacket,
    FLEECE_JACKET_REMOVE,
  );

  await yourCartPage.clickCheckoutButton();

  await checkoutPage.fillCheckoutInformation('John', 'Doe', '02453');
  await checkoutPage.clickContinueButton();

  await checkoutOverviewPage.expectOverviewPageElementsVisible();
  await checkoutOverviewPage.expectItemTotalMatches(savedProductPrice_Shirt, savedProductPrice_Jacket);

  await checkoutOverviewPage.clickFinishButton();

  // Wait briefly for visual verification when running headed.
  await page.waitForTimeout(5000);
});