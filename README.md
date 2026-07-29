# DemoSite Automation — Playwright

Playwright-based end-to-end tests for the Sauce Demo sample site. This repo demonstrates a small POM-style test suite, CI integration, and simple utilities for adding/removing items from the cart.

**Contents**
- tests/: Playwright test files
- pages/: Page Object Model classes (LoginPage, HomePage, Products, YourCart)
- playwright.config.ts: Playwright configuration (loads .env)

## Prerequisites
- Node.js 18+ (tested with Node 24)
- npm

## Setup
1. Install dependencies:

```bash
npm ci
```

2. (Optional) Install Playwright browsers locally:

```bash
npx playwright install
```

3. Copy and populate `.env` at project root with at least:

```
BASE_URL=https://www.saucedemo.com
SAUCE_DEMO_STANDARD_USER=standard_user
SAUCE_DEMO_PASS=secret_sauce
```

## Running tests
- Run the full suite (headless):

```bash
npx playwright test
```

- Run a single spec (headed):

```bash
npx playwright test tests/Add_Remove_From_Cart.spec.ts --headed
```

- Generate HTML report after run:

```bash
npx playwright show-report
```

## Test patterns & helpers
- Tests use a Page Object Model under `pages/`.
- Shared data-test identifiers are centralized in spec files where helpful (e.g. `BACKPACK_ADD_TO_CART`).

## CI (GitHub Actions)
- Workflow: `.github/workflows/playwright.yml` runs on `push`, `pull_request` and weekly via `schedule`.
- Secrets required in Actions: `SAUCE_DEMO_STANDARD_USER`, `SAUCE_DEMO_PASS` (set in repository Secrets).

## Tips
- Prefer `data-test` selectors where available for stable tests.
- Avoid fixed sleeps; use Playwright `expect` and locator conditions.

If you'd like, I can add a CONTRIBUTING section, badge, or a quick troubleshooting guide next.

