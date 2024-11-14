import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
test.describe('Login Tests', () => {
  test('Successful Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginWithValidData();
    await loginPage.expectLoginSuccess();
  });

  test('Failed Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginWithInvalidData();
    await loginPage.expectLoginFailure();
  });
});