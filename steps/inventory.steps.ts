import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd();

Given('I am logged in as {string}', async ({ page }, username: string) => {
  await page.goto('/');
  await page.fill('#user-name', username);
  await page.fill('#password', 'secret_sauce');
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

When('I add {string} to the cart', async ({ page }, productName: string) => {
  const item = page.locator('.inventory_item', { hasText: productName });
  await item.getByRole('button', { name: 'Add to cart' }).click();
});

When('I remove {string} from the cart', async ({ page }, productName: string) => {
  const item = page.locator('.inventory_item', { hasText: productName });
  await item.getByRole('button', { name: 'Remove' }).click();
});

Then('the cart badge should show {string}', async ({ page }, count: string) => {
  await expect(page.locator('.shopping_cart_badge')).toHaveText(count);
});

Then('the cart badge should not be visible', async ({ page }) => {
  await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
});
