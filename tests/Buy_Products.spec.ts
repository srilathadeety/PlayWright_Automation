import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { Products } from "../pages/Products";
import { YourCart } from "../pages/YourCart";
import { CheckOut } from "../pages/CheckOut";
import { CheckOutOverview } from "../pages/CheckOut_Overview";


const BOLT_T_SHIRT_ADD_TO_CART = 'add-to-cart-sauce-labs-bolt-t-shirt';
const BOLT_T_SHIRT_REMOVE = 'remove-sauce-labs-bolt-t-shirt';
const FLEECE_JACKET_ADD_TO_CART = 'add-to-cart-sauce-labs-fleece-jacket';
const FLEECE_JACKET_REMOVE = 'remove-sauce-labs-fleece-jacket';



test("Verify title", async ({ page }) => {
  // Login as the standard user and verify the page title.
  const loginPage = new LoginPage(page);
  await loginPage.StandardUser_Login();

  // Confirm the home page loaded successfully.
  const homePage = new HomePage(page);
  await homePage.expectPageTitle();
  await homePage.expectAppLogoVisible();
  await homePage.expectShoppingCartLinkVisible();

  const products = new Products(page);
  await products.removeItemIfVisible(BOLT_T_SHIRT_REMOVE);
  await products.removeItemIfVisible(FLEECE_JACKET_REMOVE);

  // Capture product details before adding the item to cart.
  const detailsShirt = await products.ProductDetails(BOLT_T_SHIRT_ADD_TO_CART);
  const savedProductName_Shirt = detailsShirt.textcontent;
  const savedProductDesc_Shirt = detailsShirt.prod_details;
  const savedProductPrice_Shirt = detailsShirt.price;

  // Capture product details before adding the item to cart.
  const detailsJacket = await products.ProductDetails(FLEECE_JACKET_ADD_TO_CART);
  const savedProductName_Jacket = detailsJacket.textcontent;
  const savedProductDesc_Jacket = detailsJacket.prod_details;
  const savedProductPrice_Jacket = detailsJacket.price;

  // Add the bolt t-shirt to the cart and verify the count increments.
  await products.addToCartByDataTest(BOLT_T_SHIRT_ADD_TO_CART);
  await products.expectRemoveButtonVisible(BOLT_T_SHIRT_REMOVE);

  // Add the bolt t-shirt to the cart and verify the count increments.
  await products.addToCartByDataTest(FLEECE_JACKET_ADD_TO_CART);
  await products.expectRemoveButtonVisible(FLEECE_JACKET_REMOVE);

  // Open the cart and verify the item details.
  const yourCart = new YourCart(page);
  await yourCart.clickCartLink();
  await yourCart.expectRemoveButtonVisible(BOLT_T_SHIRT_REMOVE);
  await yourCart.expectRemoveButtonVisible(FLEECE_JACKET_REMOVE);

  await yourCart.verifyCartItemDetails(
    savedProductName_Shirt,
    savedProductDesc_Shirt,
    savedProductPrice_Shirt,
    BOLT_T_SHIRT_REMOVE,
  );

  await yourCart.verifyCartItemDetails(
    savedProductName_Jacket,
    savedProductDesc_Jacket,
    savedProductPrice_Jacket,
    FLEECE_JACKET_REMOVE,
  );

  await yourCart.clickCheckoutButton();

  const checkOut = new CheckOut(page);
  await checkOut.fillCheckoutInformation('John', 'Doe', '02453');
  await checkOut.clickContinueButton();

  const checkOutOverview = new CheckOutOverview(page);
  await checkOutOverview.expectOverviewPageElementsVisible();
  await checkOutOverview.expectItemTotalMatches(savedProductPrice_Shirt, savedProductPrice_Jacket);

  await checkOutOverview.clickFinishButton();

  // Wait briefly for visual verification when running headed.
  await page.waitForTimeout(5000);
});