import { test } from '@playwright/test';
import { PurchasePage } from '../pages/PurchasePage';
import { LoginPage } from '../pages/LoginPage';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginWithValidData();
});

test.describe('Purchase Tests', () => {
  test('Create Purchase - Success', async ({ page }) => {
    const purchasePage = new PurchasePage(page);
    await purchasePage.navigateToPurchaseForm();
    await purchasePage.fillForm();
    await purchasePage.submitForm();
    await purchasePage.expectSuccessMessage();
  });

  test('Duplicate Invoice Number Handling', async ({ page }) => {
    const purchasePage = new PurchasePage(page);
    await purchasePage.navigateToPurchaseForm();
    await purchasePage.fillForm("1");
    await purchasePage.submitForm();
    await purchasePage.expectDuplicateInvoiceError();
  });
});