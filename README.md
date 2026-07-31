# DemoSite Automation — Playwright

This project is a Playwright-based end-to-end automation suite for the Sauce Demo demo site. It is structured around the Page Object Model (POM) pattern so test cases stay readable, reusable, and easier to maintain.

The suite exercises the main user journeys for login, product browsing, cart validation, checkout information entry, checkout overview, and order completion.

## Project structure

- `tests/` — Playwright spec files and shared test support such as the fixture module.
- `pages/` — Page Object Model classes that encapsulate page actions and assertions.
- `test-data.ts` — shared product and test constant values used by multiple specs.
- `playwright.config.ts` — Playwright configuration, parallel settings, and failure artifact capture.
- `.env` — environment-specific values such as the app base URL and test credentials.

## Current test specs

### 1. `tests/Add_Remove_From_Cart.spec.ts`
A cart-focused flow that verifies product add/remove behavior and cart interactions.

### 2. `tests/Buy_Products.spec.ts`
A product purchase flow that captures product details, adds multiple products to the cart, verifies the cart contents, and completes the checkout journey.

### 3. `tests/SauceDemo_StrdUsr.spec.ts`
A standard-user login journey used to verify the basic login and landing-page experience.

## Shared test support

- `tests/fixtures.ts` — lightweight Playwright fixture wrapper that supplies common page object instances to specs.
- `test-data.ts` — central repository for shared product action IDs and reusable constants.

## Page Object Model files

- `pages/LoginPage.ts` — handles login navigation and standard user authentication.
- `pages/HomePage.ts` — verifies the home/products page title and core visible UI elements.
- `pages/Products.ts` — product discovery and cart interaction helpers such as add/remove actions and detail extraction.
- `pages/YourCart.ts` — cart page behaviors, item verification, and checkout button actions.
- `pages/CheckOut.ts` — checkout information page helpers for entering name and postal code values and continuing to the next step.
- `pages/CheckOut_Overview.ts` — checkout overview assertions, subtotal verification, and finish button actions.
- `pages/CheckOut_Complete.ts` — confirmation page helper for verifying the order completion screen.

## Prerequisites

- Node.js 18+
- npm

## Setup

1. Install project dependencies:

```bash
npm ci
```

2. Install Playwright browsers if needed:

```bash
npx playwright install
```

3. Create a local `.env` file in the project root with values similar to:

```env
BASE_URL=https://www.saucedemo.com
SAUCE_DEMO_STANDARD_USER=standard_user
SAUCE_DEMO_PASS=secret_sauce
```

## Running tests

Run the full suite:

```bash
npx playwright test
```

Run a single spec in headed mode:

```bash
npx playwright test tests/Buy_Products.spec.ts --headed
```

Generate the HTML report:

```bash
npx playwright show-report
```

## Parallel execution

- Local runs are configured to execute test files in parallel for faster feedback.
- CI runs are intentionally limited to a single worker for stability.
- You can override the worker count from the CLI, for example:

```bash
npx playwright test --workers=2
```

## Notes on the implementation

- The tests are written using Playwright's `test` runner.
- Page interactions are intentionally centralized inside page object classes.
- Shared setup is now exposed through Playwright fixtures to reduce repeated object construction in specs.
- Shared product data is centralized in `test-data.ts` to avoid duplication across the suite.
- The project uses stable selectors such as `data-test` and `id` attributes where appropriate.
- Assertions are done with Playwright `expect` to make the suite resilient and readable.
- Failure screenshots and videos are enabled through the Playwright config for easier debugging.

## CI

The repository includes GitHub Actions support for running the Playwright suite in CI.

Recommended repository secrets:

- `SAUCE_DEMO_STANDARD_USER`
- `SAUCE_DEMO_PASS`

