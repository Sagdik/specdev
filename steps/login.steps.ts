import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd();

Given('I am on the SauceDemo login page', async ({ page }) => {
  await page.goto('/');
});

When('I log in as {string} with password {string}', async ({ page }, username: string, password: string) => {
  await page.fill('#user-name', username);
  await page.fill('#password', password);
  await page.click('#login-button');
});

Then('I should see the products inventory page', async ({ page }) => {
  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.locator('.title')).toHaveText('Products');
});

Then('I should see an error message containing {string}', async ({ page }, text: string) => {
  await expect(page.locator('[data-test="error"]')).toContainText(text);
});
