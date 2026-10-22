/**
 * Test cases source: "Coffee_Shop_Testing.xlsx" (sheet: Coffee Cart - ECommerce)
 *   - Coffee_001: Verify the total price once buy one coffee
 *   - Coffee_002: Verify the total price once buy three coffee
 *   - Coffee_003: Verify the total price once buy the same kind of coffee, 2 units
 */

import { test, expect } from '@playwright/test';

const BASE_URL = 'https://seleniumbase.io/coffee/';
const CHECKOUT_TOTAL = 'button[data-test="checkout"]';
const CART_LINK = 'a[aria-label="Cart page"]';

test.describe('Coffee Cart', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle('Coffee Cart');
  });

  /**
   * Coffee_001
   * Verify the total price once you buy one coffee (Cafe Latte, $16.00).
   */
  test('Coffee_001: Total price for a single coffee (Cafe Latte)', async ({ page }) => {
    await page.locator('div[data-test="Cafe_Latte"]').click();
    await expect(page.locator(CART_LINK)).toHaveText('cart (1)');

    await page.locator(CART_LINK).click();
    await expect(page.locator(CHECKOUT_TOTAL)).toHaveText('Total: $16.00');
  });

  /**
   * Coffee_002
   * Verify the total price once you buy three different coffees:
   * Mocha ($8.00) + Flat White ($18.00) + Cappuccino ($19.00) = $45.00.
   */
  test('Coffee_002: Total price for three different coffees', async ({ page }) => {
    await page.locator('div[data-test="Mocha"]').click();
    await page.locator('div[data-test="Flat_White"]').click();
    await page.locator('div[data-test="Cappuccino"]').click();
    await expect(page.locator(CART_LINK)).toHaveText('cart (3)');

    await page.locator(CART_LINK).click();
    await expect(page.locator(CHECKOUT_TOTAL)).toHaveText('Total: $45.00');
  });

  /**
   * Coffee_003
   * Verify the total price once you buy 2 units of the same coffee:
   * Americano ($7.00) x 2 = $14.00.
   */
  test('Coffee_003: Total price for 2 units of the same coffee (Americano)', async ({ page }) => {
    const americano = page.locator('div[data-test="Americano"]');

    // Buy the first unit
    await americano.click();
    await expect(page.locator(CART_LINK)).toHaveText('cart (1)');

    // Buy a second unit of the same coffee (increases quantity in the cart)
    await americano.click();
    await expect(page.locator(CART_LINK)).toHaveText('cart (2)');

    await page.locator(CART_LINK).click();
    await expect(page.locator(CHECKOUT_TOTAL)).toHaveText('Total: $14.00');
  });
});
