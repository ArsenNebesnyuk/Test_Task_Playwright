import { test } from '@playwright/test';
import { ContactsPage } from '../pages/ContactsPage';
import { LoginPage } from '../pages/LoginPage';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginWithValidData();
});

test.describe('Contact Creation Tests', () => {
  test('Contact Creation - Validation Failure', async ({ page }) => {
    const contactsPage = new ContactsPage(page);
    await contactsPage.navigateToContacts();
    await contactsPage.createContact('');
    await contactsPage.expectValidationError();
  });

  test('Contact Creation - Success', async ({ page }) => {
    const contactsPage = new ContactsPage(page);
    await contactsPage.navigateToContacts();
    await contactsPage.createContact('Test');
    await contactsPage.expectSuccessMessage();
  });
});