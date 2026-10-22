/**
 *   1) Guest checkout - full end-to-end purchase flow
 *   2) TC-LP-002  Verify login with incorrect password
 *   3) TC-CP-005  Verify that the cart badge count updates correctly
 *   4) TC-MP-004  Verify Name (A to Z) sorting (default sort)
 */

import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com/';

const USERS = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
};

test.describe('SauceDemo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  /**
   * 1) Guest checkout
   * Full purchase flow: login -> add product to cart -> checkout ->
   * fill in shipper (guest) information -> finish -> confirm order.
   */
  test('Guest checkout - complete a purchase end-to-end', async ({ page }) => {
    // Step 1: Login
    await page.locator('#user-name').fill(USERS.standard.username);
    await page.locator('#password').fill(USERS.standard.password);
    await page.locator('#login-button').click();
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('.inventory_list')).toBeVisible();

    // Step 2: Add a product to the cart
    const firstProductName = await page
      .locator('.inventory_item_name')
      .first()
      .innerText();
    await page.locator('.inventory_item').first().getByRole('button', { name: 'Add to cart' }).click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // Step 3: Go to cart and verify the item is there
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/cart\.html/);
    await expect(page.locator('.cart_item')).toContainText(firstProductName);

    // Step 4: Checkout
    await page.locator('#checkout').click();
    await expect(page).toHaveURL(/checkout-step-one\.html/);

    // Step 5: Fill in guest / shipping information
    await page.locator('#first-name').fill('Guest');
    await page.locator('#last-name').fill('Tester');
    await page.locator('#postal-code').fill('10230');
    await page.locator('#continue').click();
    await expect(page).toHaveURL(/checkout-step-two\.html/);

    // Step 6: Verify order overview shows the product and a total
    await expect(page.locator('.cart_item')).toContainText(firstProductName);
    await expect(page.locator('.summary_total_label')).toContainText('Total: $');

    // Step 7: Finish the order
    await page.locator('#finish').click();
    await expect(page).toHaveURL(/checkout-complete\.html/);
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });

  /**
   * 2) TC-LP-002
   * Verify login with incorrect password.
   */
  test('TC-LP-002: Login fails with an incorrect password', async ({ page }) => {
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('wrong_password');
    await page.locator('#login-button').click();

    await expect(page).toHaveURL(BASE_URL);
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  /**
   * 3) TC-CP-005
   * Verify that the cart badge count updates correctly when
   * multiple items are added to the cart.
   */
  test('TC-CP-005: Cart badge count updates correctly', async ({ page }) => {
    await page.locator('#user-name').fill(USERS.standard.username);
    await page.locator('#password').fill(USERS.standard.password);
    await page.locator('#login-button').click();
    await expect(page.locator('.inventory_list')).toBeVisible();

    const addToCartButtons = page.getByRole('button', { name: 'Add to cart' });
    const itemsToAdd = 3;

    for (let i = 0; i < itemsToAdd; i++) {
      // Always click the first remaining "Add to cart" button, since
      // clicked items turn into "Remove" buttons and disappear from this locator.
      await addToCartButtons.first().click();
    }

    await expect(page.locator('.shopping_cart_badge')).toHaveText(String(itemsToAdd));
  });

  /**
   * 4) TC-MP-004
   * Verify Name (A to Z) sorting - the default sort order on the
   * product listing page.
   */
  test('TC-MP-004: Products are sorted Name (A to Z) by default', async ({ page }) => {
    await page.locator('#user-name').fill(USERS.standard.username);
    await page.locator('#password').fill(USERS.standard.password);
    await page.locator('#login-button').click();
    await expect(page.locator('.inventory_list')).toBeVisible();

    // Explicitly (re)select "Name (A to Z)" to match the test case steps.
    await page.locator('[data-test="product_sort_container"]').selectOption('az');

    const productNames = await page.locator('.inventory_item_name').allInnerTexts();
    const sortedNames = [...productNames].sort((a, b) => a.localeCompare(b));

    expect(productNames).toEqual(sortedNames);
  });
});
