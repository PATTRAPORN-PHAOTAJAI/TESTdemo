# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: saucedemo.spec.ts >> SauceDemo >> TC-MP-004: Products are sorted Name (A to Z) by default
- Location: tests\saucedemo.spec.ts:121:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.selectOption: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[data-test="product_sort_container"]')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - generic [ref=e7]:
          - button "Open Menu" [ref=e8] [cursor=pointer]
          - img "Open Menu" [ref=e9]
        - generic [ref=e10]: Swag Labs
      - generic [ref=e14]:
        - generic [ref=e15]: Products
        - generic [ref=e17] [cursor=pointer]:
          - generic [ref=e18]: Name (A to Z)
          - combobox [ref=e19]:
            - option "Name (A to Z)" [selected]
            - option "Name (Z to A)"
            - option "Price (low to high)"
            - option "Price (high to low)"
    - generic [ref=e23]:
      - generic [ref=e24]:
        - link [ref=e26] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Backpack" [ref=e27]
        - generic [ref=e28]:
          - generic [ref=e29]:
            - link "Sauce Labs Backpack" [ref=e30] [cursor=pointer]:
              - /url: "#"
            - generic [ref=e32]: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.
          - generic [ref=e33]:
            - generic [ref=e34]: $29.99
            - button "Add to cart" [ref=e35] [cursor=pointer]
      - generic [ref=e36]:
        - link [ref=e38] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Bike Light" [ref=e39]
        - generic [ref=e40]:
          - generic [ref=e41]:
            - link "Sauce Labs Bike Light" [ref=e42] [cursor=pointer]:
              - /url: "#"
            - generic [ref=e44]: A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.
          - generic [ref=e45]:
            - generic [ref=e46]: $9.99
            - button "Add to cart" [ref=e47] [cursor=pointer]
      - generic [ref=e48]:
        - link [ref=e50] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Bolt T-Shirt" [ref=e51]
        - generic [ref=e52]:
          - generic [ref=e53]:
            - link "Sauce Labs Bolt T-Shirt" [ref=e54] [cursor=pointer]:
              - /url: "#"
            - generic [ref=e56]: Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.
          - generic [ref=e57]:
            - generic [ref=e58]: $15.99
            - button "Add to cart" [ref=e59] [cursor=pointer]
      - generic [ref=e60]:
        - link [ref=e62] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Fleece Jacket" [ref=e63]
        - generic [ref=e64]:
          - generic [ref=e65]:
            - link "Sauce Labs Fleece Jacket" [ref=e66] [cursor=pointer]:
              - /url: "#"
            - generic [ref=e68]: It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.
          - generic [ref=e69]:
            - generic [ref=e70]: $49.99
            - button "Add to cart" [ref=e71] [cursor=pointer]
      - generic [ref=e72]:
        - link [ref=e74] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Onesie" [ref=e75]
        - generic [ref=e76]:
          - generic [ref=e77]:
            - link "Sauce Labs Onesie" [ref=e78] [cursor=pointer]:
              - /url: "#"
            - generic [ref=e80]: Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.
          - generic [ref=e81]:
            - generic [ref=e82]: $7.99
            - button "Add to cart" [ref=e83] [cursor=pointer]
      - generic [ref=e84]:
        - link [ref=e86] [cursor=pointer]:
          - /url: "#"
          - img "Test.allTheThings() T-Shirt (Red)" [ref=e87]
        - generic [ref=e88]:
          - generic [ref=e89]:
            - link "Test.allTheThings() T-Shirt (Red)" [ref=e90] [cursor=pointer]:
              - /url: "#"
            - generic [ref=e92]: This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.
          - generic [ref=e93]:
            - generic [ref=e94]: $15.99
            - button "Add to cart" [ref=e95] [cursor=pointer]
  - contentinfo [ref=e96]:
    - list [ref=e97]:
      - listitem [ref=e98]:
        - link "Twitter" [ref=e99] [cursor=pointer]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e100]:
        - link "Facebook" [ref=e101] [cursor=pointer]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e102]:
        - link "LinkedIn" [ref=e103] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e104]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  28  | 
  29  |   /**
  30  |    * 1) Guest checkout
  31  |    * Full purchase flow: login -> add product to cart -> checkout ->
  32  |    * fill in shipper (guest) information -> finish -> confirm order.
  33  |    */
  34  |   test('Guest checkout - complete a purchase end-to-end', async ({ page }) => {
  35  |     // Step 1: Login
  36  |     await page.locator('#user-name').fill(USERS.standard.username);
  37  |     await page.locator('#password').fill(USERS.standard.password);
  38  |     await page.locator('#login-button').click();
  39  |     await expect(page).toHaveURL(/inventory\.html/);
  40  |     await expect(page.locator('.inventory_list')).toBeVisible();
  41  | 
  42  |     // Step 2: Add a product to the cart
  43  |     const firstProductName = await page
  44  |       .locator('.inventory_item_name')
  45  |       .first()
  46  |       .innerText();
  47  |     await page.locator('.inventory_item').first().getByRole('button', { name: 'Add to cart' }).click();
  48  |     await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  49  | 
  50  |     // Step 3: Go to cart and verify the item is there
  51  |     await page.locator('.shopping_cart_link').click();
  52  |     await expect(page).toHaveURL(/cart\.html/);
  53  |     await expect(page.locator('.cart_item')).toContainText(firstProductName);
  54  | 
  55  |     // Step 4: Checkout
  56  |     await page.locator('#checkout').click();
  57  |     await expect(page).toHaveURL(/checkout-step-one\.html/);
  58  | 
  59  |     // Step 5: Fill in guest / shipping information
  60  |     await page.locator('#first-name').fill('Guest');
  61  |     await page.locator('#last-name').fill('Tester');
  62  |     await page.locator('#postal-code').fill('10230');
  63  |     await page.locator('#continue').click();
  64  |     await expect(page).toHaveURL(/checkout-step-two\.html/);
  65  | 
  66  |     // Step 6: Verify order overview shows the product and a total
  67  |     await expect(page.locator('.cart_item')).toContainText(firstProductName);
  68  |     await expect(page.locator('.summary_total_label')).toContainText('Total: $');
  69  | 
  70  |     // Step 7: Finish the order
  71  |     await page.locator('#finish').click();
  72  |     await expect(page).toHaveURL(/checkout-complete\.html/);
  73  |     await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  74  |   });
  75  | 
  76  |   /**
  77  |    * 2) TC-LP-002
  78  |    * Verify login with incorrect password.
  79  |    */
  80  |   test('TC-LP-002: Login fails with an incorrect password', async ({ page }) => {
  81  |     await page.locator('#user-name').fill('standard_user');
  82  |     await page.locator('#password').fill('wrong_password');
  83  |     await page.locator('#login-button').click();
  84  | 
  85  |     await expect(page).toHaveURL(BASE_URL);
  86  |     const errorMessage = page.locator('[data-test="error"]');
  87  |     await expect(errorMessage).toBeVisible();
  88  |     await expect(errorMessage).toContainText(
  89  |       'Epic sadface: Username and password do not match any user in this service'
  90  |     );
  91  |   });
  92  | 
  93  |   /**
  94  |    * 3) TC-CP-005
  95  |    * Verify that the cart badge count updates correctly when
  96  |    * multiple items are added to the cart.
  97  |    */
  98  |   test('TC-CP-005: Cart badge count updates correctly', async ({ page }) => {
  99  |     await page.locator('#user-name').fill(USERS.standard.username);
  100 |     await page.locator('#password').fill(USERS.standard.password);
  101 |     await page.locator('#login-button').click();
  102 |     await expect(page.locator('.inventory_list')).toBeVisible();
  103 | 
  104 |     const addToCartButtons = page.getByRole('button', { name: 'Add to cart' });
  105 |     const itemsToAdd = 3;
  106 | 
  107 |     for (let i = 0; i < itemsToAdd; i++) {
  108 |       // Always click the first remaining "Add to cart" button, since
  109 |       // clicked items turn into "Remove" buttons and disappear from this locator.
  110 |       await addToCartButtons.first().click();
  111 |     }
  112 | 
  113 |     await expect(page.locator('.shopping_cart_badge')).toHaveText(String(itemsToAdd));
  114 |   });
  115 | 
  116 |   /**
  117 |    * 4) TC-MP-004
  118 |    * Verify Name (A to Z) sorting - the default sort order on the
  119 |    * product listing page.
  120 |    */
  121 |   test('TC-MP-004: Products are sorted Name (A to Z) by default', async ({ page }) => {
  122 |     await page.locator('#user-name').fill(USERS.standard.username);
  123 |     await page.locator('#password').fill(USERS.standard.password);
  124 |     await page.locator('#login-button').click();
  125 |     await expect(page.locator('.inventory_list')).toBeVisible();
  126 | 
  127 |     // Explicitly (re)select "Name (A to Z)" to match the test case steps.
> 128 |     await page.locator('[data-test="product_sort_container"]').selectOption('az');
      |                                                                ^ Error: locator.selectOption: Test timeout of 30000ms exceeded.
  129 | 
  130 |     const productNames = await page.locator('.inventory_item_name').allInnerTexts();
  131 |     const sortedNames = [...productNames].sort((a, b) => a.localeCompare(b));
  132 | 
  133 |     expect(productNames).toEqual(sortedNames);
  134 |   });
  135 | });
  136 | 
```