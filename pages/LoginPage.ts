import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://app.staging.systima.no/login');
  }

  async loginWithValidData() {
    const validData = ["joachim+453459@systima.no", "123456789"]
    await this.page.fill('input[name="email"]', validData[0]);
    await this.page.fill('input[name="password"]', validData[1]);
    await this.page.click('button[type="submit"]');
  }

  async loginWithInvalidData() {
    const validData = ["invaliduser@systima.no", "wrongpassword"]
    await this.page.fill('input[name="email"]', validData[0]);
    await this.page.fill('input[name="password"]', validData[1]);
    await this.page.click('button[type="submit"]');
  }

  async expectLoginSuccess() {
    await expect(this.page).toHaveURL('https://app.staging.systima.no/systimaas7/dashboard');
  }

  async expectLoginFailure() {
    const errorMessage = this.page.locator('.v-alert__content');
    await expect(errorMessage).toBeVisible();
  }
}