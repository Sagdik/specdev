import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd();
const DEFAULT_PASSWORD = 'secret_sauce';

async function loginAs(page: any, username: string, password: string = DEFAULT_PASSWORD) {
  await page.fill('#user-name', username);
  await page.fill('#password', password);
  await page.click('#login-button');
}

Given('I am on the SauceDemo login page', async ({ page }) => {
  await page.goto('/');
});

When('I log in as {string} with password {string}', async ({ page }, username: string, password: string) => {
  await loginAs(page, username, password);
});

Then('I should see the products inventory page', async ({ page }) => {
  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.locator('.title')).toHaveText('Products');
});

When('I open the menu and log out', async ({ page }) => {
  await page.click('#react-burger-menu-btn');
  await page.click('#logout_sidebar_link');
});

Then('I should be redirected to the login page', async ({ page }) => {
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('#login-button')).toBeVisible();
});

Then('I should see an error message containing {string}', async ({ page }, text: string) => {
  await expect(page.locator('[data-test="error"]')).toContainText(text);
});
