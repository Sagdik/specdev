import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd();
const DEFAULT_PASSWORD = 'secret_sauce';

const productCard = (page: any, productName: string) => page.locator('.inventory_item', { hasText: productName });
const cartBadge = (page: any) => page.locator('.shopping_cart_badge');

Given('I am logged in as {string}', async ({ page }, username: string) => {
  await page.goto('/');
  await page.fill('#user-name', username);
  await page.fill('#password', DEFAULT_PASSWORD);
  await page.click('#login-button');
  await expect(page).toHaveURL(/inventory\.html/);
});

When('I sort products by {string}', async ({ page }, sortLabel: string) => {
  await page.selectOption('[data-test="product-sort-container"]', { label: sortLabel });
});

Then('the products should be listed in ascending price order', async ({ page }) => {
  const priceTexts = await page.locator('.inventory_item_price').allTextContents();
  const prices = priceTexts.map((p) => parseFloat(p.replace('$', '')));
  const sorted = [...prices].sort((a, b) => a - b);
  expect(prices).toEqual(sorted);
});

Then('the products should be listed in descending name order', async ({ page }) => {
  const productNames = await page.locator('.inventory_item_name').allTextContents();
  const sorted = [...productNames].sort((a, b) => b.localeCompare(a));
  expect(productNames).toEqual(sorted);
});

When('I add {string} to the cart', async ({ page }, productName: string) => {
  await productCard(page, productName).getByRole('button', { name: 'Add to cart' }).click();
});

When('I remove {string} from the cart', async ({ page }, productName: string) => {
  await productCard(page, productName).getByRole('button', { name: 'Remove' }).click();
});

When('I click the cart', async ({ page }) => {
  await page.click('.shopping_cart_link');
});

When('I proceed to checkout', async ({ page }) => {
  await page.click('#checkout');
});

When('I continue shopping', async ({ page }) => {
  await page.click('#continue-shopping');
});

When('I cancel checkout', async ({ page }) => {
  await page.click('#cancel');
});

When('I enter checkout information with first name {string}, last name {string}, postal code {string}', async ({ page }, firstName: string, lastName: string, postalCode: string) => {
  await page.fill('#first-name', firstName);
  await page.fill('#last-name', lastName);
  await page.fill('#postal-code', postalCode);
  await page.click('#continue');
});

When('I continue checkout without entering information', async ({ page }) => {
  await page.click('#continue');
});

Then('the cart badge should show {string}', async ({ page }, count: string) => {
  await expect(cartBadge(page)).toHaveText(count);
});

Then('the cart badge should not be visible', async ({ page }) => {
  await expect(cartBadge(page)).toHaveCount(0);
});

Then('I should see the checkout overview page', async ({ page }) => {
  await expect(page).toHaveURL(/checkout-step-two\.html/);
  await expect(page.locator('.title')).toHaveText('Checkout: Overview');
});

Then('I should see the checkout error {string}', async ({ page }, error: string) => {
  await expect(page).toHaveURL(/checkout-step-one\.html/);
  await expect(page.locator('[data-test="error"]')).toHaveText(error);
});

Then('I should see {string} in the order summary', async ({ page }, productName: string) => {
  await expect(page.locator('.cart_list')).toContainText(productName);
});

Then('I should see the cart page with {string}', async ({ page }, productName: string) => {
  await expect(page).toHaveURL(/cart\.html/);
  await expect(page.locator('.cart_list')).toContainText(productName);
});
