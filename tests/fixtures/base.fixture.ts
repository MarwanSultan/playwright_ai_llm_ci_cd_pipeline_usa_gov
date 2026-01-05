import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 45000 });
});

test.afterEach(async ({ page, context, browser }) => {
  try {
    await page.close();
  } catch (e) {
    // Page may already be closed
  }
  try {
    await context.close();
  } catch (e) {
    // Context may already be closed
  }
});

test.afterAll(async () => {
  console.log('Test execution completed. Closing browsers.');
});

export { test, expect };