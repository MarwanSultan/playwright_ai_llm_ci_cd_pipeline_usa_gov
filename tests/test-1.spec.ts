import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.usa.gov/');
  await page.getByRole('link', { name: 'Create profile' }).click();
  await page.getByRole('link', { name: 'Agree' }).click();
});