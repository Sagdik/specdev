import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';

const { When, Then } = createBdd();

When('I finish the purchase', async ({ page }) => {
  await page.click('#finish');
});

Then('I should see the order confirmation', async ({ page }) => {
  await expect(page).toHaveURL(/checkout-complete\.html/);
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});