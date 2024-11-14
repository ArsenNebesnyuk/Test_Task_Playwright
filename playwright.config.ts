import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://app.staging.systima.no/',
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  testDir: './tests',
  reporter: [['html', { outputFolder: 'playwright-report' }]],
});