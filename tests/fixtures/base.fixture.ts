import { test as base, expect } from '@playwright/test';

export const test = base.extend({});

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

export { expect };

test('Verify navigation to usa.gov homepage', async ({ page }) => {
  // Check if the USA.gov logo is present
  const logo = page.locator('img[alt="USA.gov logo"]');
  await expect(logo).toBeVisible();
  // Check for the presence of a specific element or text that indicates we are on the correct page.
  const expectedTitle = 'Making government services easier to find | USAGov';
  await expect(page).toHaveTitle(expectedTitle);

  // Additional checks can be added here, such as verifying other elements like navigation links
});
