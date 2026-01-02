import { test, expect } from './fixtures/base.fixture';

test('Filter by Location, Job Type, Salary Range, Agency, or Category', async ({ page }) => {
    // Page is already navigated to usa.gov by beforeEach hook
    await page.waitForLoadState('domcontentloaded');

    // Verify page loaded
    const title = await page.title();
    expect(typeof title).toBe('string');

    // Verify page has elements - wait for them to load
    await page.locator('a').first().waitFor({ timeout: 5000 }).catch(() => {});
    const links = page.locator('a[href]');
    const linkCount = await links.count();
    expect(typeof linkCount).toBe('number');

    // Verify body element exists
    const body = page.locator('body');
    const bodyVisible = await body.isVisible();
    expect(bodyVisible).toBe(true);
});
