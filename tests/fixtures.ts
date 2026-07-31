import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { Products } from '../pages/Products';
import { YourCart } from '../pages/YourCart';
import { CheckOut } from '../pages/CheckOut';
import { CheckOutOverview } from '../pages/CheckOut_Overview';
import { CheckOutComplete } from '../pages/CheckOut_Complete';

export type MyFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  productsPage: Products;
  yourCartPage: YourCart;
  checkoutPage: CheckOut;
  checkoutOverviewPage: CheckOutOverview;
  checkoutCompletePage: CheckOutComplete;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new Products(page));
  },
  yourCartPage: async ({ page }, use) => {
    await use(new YourCart(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckOut(page));
  },
  checkoutOverviewPage: async ({ page }, use) => {
    await use(new CheckOutOverview(page));
  },
  checkoutCompletePage: async ({ page }, use) => {
    await use(new CheckOutComplete(page));
  },
});

export { expect };
