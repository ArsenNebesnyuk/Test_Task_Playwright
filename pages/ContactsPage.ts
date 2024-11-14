import { Page, expect } from '@playwright/test';

export class ContactsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToContacts() {
    await this.page.click('text=Kontakter');
  }

  async createContact(name: string) {
    await this.page.click('#contacts-create-contact-button');
    await this.page.fill('label:has-text("Navn *")', name);
    await this.page.click('button[type="submit"]');;
  }

  async expectValidationError() {
    const nameError = this.page.getByText('Vennligst skriv inn navn');
    await expect(nameError).toHaveText("Vennligst skriv inn navn");
  }

  async expectSuccessMessage() {
    const successMessage = this.page.locator('.v-snack__content');
    await expect(successMessage).toContainText('Ny kontakt lagret.');
  }
}