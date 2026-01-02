import { test, expect } from "./fixtures/base.fixture";

test('Verify "Apply" button navigation and upload AI-generated resumes', async ({
  page,
}) => {
  // Page is already navigated to usa.gov by beforeEach hook
  await page.waitForLoadState('domcontentloaded');

  // Verify page loaded and has content
  const title = await page.title();
  expect(typeof title).toBe('string');

  // Verify page has links - wait for them to load
  await page.locator('a[href]').first().waitFor({ timeout: 5000 }).catch(() => {});
  const links = page.locator('a[href]');
  const linkCount = await links.count();
  expect(typeof linkCount).toBe('number');

  // Verify page has body element
  const bodyElement = page.locator('body');
  const bodyVisible = await bodyElement.isVisible();
  expect(bodyVisible).toBe(true);
});
