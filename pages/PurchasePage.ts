import { Page, expect } from '@playwright/test';

export class PurchasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToPurchaseForm() {
    await this.page.click('text=Bokføring');
    await this.page.click('text=Bokfør andre filer');
  }

  async fillForm(invoiceNumber?: string) {
    const data = ['Systima AS', '100', '01.01.2024', '15.01.2024', '1000 Utvikling, ervervet', '1'];
    await this.page.click('div.v-select__slot label.v-label:has-text("Kontakt (valgfri ved kvittering)")');
    await this.page.click('div.v-list-item__content div.v-list-item__title:has-text("Systima AS")');
    await this.page.getByLabel('Totalt beløp inkl. mva. *').fill(data[1]);
    await this.page.getByLabel('Fakturadato *').fill(data[2]);
    await this.page.getByLabel('Forfallsdato').fill(data[3]);
    // await this.page.selectOption('select[name="account"]', data[4]);
    if (invoiceNumber) {
      await this.page.getByLabel('Fakturanr.').fill(data[5]);
    }
  }

  async submitForm() {
    await this.page.getByRole('button', { name: 'Bokfør', exact: true }).click();
  }

  async expectSuccessMessage() {
    const successMessage = this.page.getByText('Bilag opprettet med bilagsnr. 2024-');
    await expect(successMessage).toContainText('Bilag opprettet med bilagsnr.');
  }

  async expectDuplicateInvoiceError() {
    const errorMessage = this.page.getByText('Fakturanr. er allerede bokført 2024-');
    await expect(errorMessage).toContainText('Fakturanr. er allerede bokført');
  }
}