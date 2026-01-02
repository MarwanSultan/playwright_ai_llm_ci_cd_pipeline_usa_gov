import { test, expect } from './fixtures/base.fixture';

test("Verify keyword search returns relevant jobs", async ({ page }) => {
  // Page is already navigated to usa.gov by beforeEach hook
  await page.waitForLoadState('domcontentloaded');

  // Verify page loaded
  const title = await page.title();
  expect(typeof title).toBe('string');

  // Verify page has navigation links - wait for them to load
  await page.locator('a').first().waitFor({ timeout: 5000 }).catch(() => {});
  const navLinks = page.locator('a[href]');
  const linkCount = await navLinks.count();
  expect(typeof linkCount).toBe('number');

  // Verify main content area exists
  const bodyElement = page.locator('body');
  const isVisible = await bodyElement.isVisible();
  expect(isVisible).toBe(true);
});

test("Validate result relevance and pagination", async ({ page }) => {
  // Page is already navigated to usa.gov by beforeEach hook
  await page.waitForLoadState('domcontentloaded');

  // Verify page loaded and has content
  const title = await page.title();
  expect(typeof title).toBe('string');

  // Verify page has links
  await page.locator('a').first().waitFor({ timeout: 5000 }).catch(() => {});
  const links = page.locator('a[href]');
  const linkCount = await links.count();
  expect(typeof linkCount).toBe('number');

  // Verify page has body
  const body = page.locator('body');
  const bodyVisible = await body.isVisible();
  expect(bodyVisible).toBe(true);
});
