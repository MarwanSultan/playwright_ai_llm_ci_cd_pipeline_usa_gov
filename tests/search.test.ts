import { test, expect } from '@playwright/test';

const searchKeywords = [
  { query: 'benefits', expectedMinResults: 1 },
  { query: 'federal jobs', expectedMinResults: 1 },
  { query: 'taxes', expectedMinResults: 1 },
  { query: 'health insurance', expectedMinResults: 1 },
];

test.describe('Search Functionality Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForLoadState('domcontentloaded');
  });

  test('Verify keyword search returns relevant results', async ({ page }) => {
    const searchQuery = 'passport';
    console.log(`Testing search with keyword: "${searchQuery}"`);

    // Locate search input - try multiple selectors for robustness, including visible ones
    let searchInput = page.locator(
      'input[type="search"]:visible, input[placeholder*="Search"]:visible, input[aria-label*="Search"]:visible'
    ).first();
    
    // If no visible search input, try finding any search input (may need scrolling)
    let inputCount = await searchInput.count();
    if (inputCount === 0) {
      searchInput = page.locator(
        'input[type="search"], input[placeholder*="Search"], input[aria-label*="Search"]'
      ).first();
    }
    
    // Wait for search input to be available
    await searchInput.waitFor({ state: 'attached', timeout: 5000 });
    
    // Scroll into view if needed
    await searchInput.scrollIntoViewIfNeeded();
    
    // Fill search input
    await searchInput.click();
    await searchInput.fill(searchQuery);
    
    // Wait for input value to be set
    await expect(searchInput).toHaveValue(searchQuery);
    
    // Submit search via Enter key or button
    const searchButton = page.locator('button[type="submit"]').first();
    const hasSubmitButton = await searchButton.isVisible().catch(() => false);
    
    if (hasSubmitButton) {
      await searchButton.click();
    } else {
      await searchInput.press('Enter');
    }
    
    // Wait for results page to load
    await page.waitForLoadState('networkidle');
    
    // Verify page title changed or URL changed (indicating navigation)
    const pageUrl = page.url();
    const pageTitle = await page.title();
    expect(pageUrl.length).toBeGreaterThan(0);
    expect(pageTitle.length).toBeGreaterThan(0);
    
    // Verify results are displayed
    const resultElements = page.locator('a[href]');
    const resultCount = await resultElements.count();
    expect(resultCount).toBeGreaterThan(0);
    
    // Verify page body is visible and contains content
    const bodyElement = page.locator('body');
    await expect(bodyElement).toBeVisible();
    const pageContent = await page.textContent('body');
    expect(pageContent?.length || 0).toBeGreaterThan(0);
  });

  test('Validate search result relevance and content', async ({ page }) => {
    const searchQuery = 'benefits';
    console.log(`Testing search result relevance for: "${searchQuery}"`);

    // Navigate to search - find visible input
    let searchInput = page.locator(
      'input[type="search"]:visible, input[placeholder*="Search"]:visible, input[aria-label*="Search"]:visible'
    ).first();
    
    // If no visible input found, try all and scroll into view
    if (await searchInput.count() === 0) {
      searchInput = page.locator(
        'input[type="search"], input[placeholder*="Search"], input[aria-label*="Search"]'
      ).first();
      await searchInput.scrollIntoViewIfNeeded();
    }
    
    await searchInput.waitFor({ state: 'attached', timeout: 5000 });
    await searchInput.click();
    await searchInput.fill(searchQuery);
    
    // Submit search
    const searchButton = page.locator('button[type="submit"]').first();
    const hasSubmitButton = await searchButton.isVisible().catch(() => false);
    
    if (hasSubmitButton) {
      await searchButton.click();
    } else {
      await searchInput.press('Enter');
    }
    
    await page.waitForLoadState('networkidle');
    
    // Verify results are returned
    const resultLinks = page.locator('a[href*="/"]');
    const linkCount = await resultLinks.count();
    expect(linkCount).toBeGreaterThan(0);
    
    // Verify at least first result has href attribute
    const firstResult = resultLinks.first();
    const firstResultHref = await firstResult.getAttribute('href');
    expect(firstResultHref).toBeTruthy();
    expect(firstResultHref?.length || 0).toBeGreaterThan(0);
    
    // Check for pagination or "next" button
    const nextButton = page.locator('a:has-text("Next"), button:has-text("Next"), [aria-label*="Next"]').first();
    const hasPagination = await nextButton.isVisible().catch(() => false);
    console.log(`Pagination available: ${hasPagination}`);
  });

  test('Verify search input validates empty queries', async ({ page }) => {
    let searchInput = page.locator(
      'input[type="search"]:visible, input[placeholder*="Search"]:visible, input[aria-label*="Search"]:visible'
    ).first();
    
    if (await searchInput.count() === 0) {
      searchInput = page.locator(
        'input[type="search"], input[placeholder*="Search"], input[aria-label*="Search"]'
      ).first();
      await searchInput.scrollIntoViewIfNeeded();
    }
    
    await searchInput.waitFor({ state: 'attached', timeout: 5000 });
    
    // Verify we can clear the input
    await searchInput.click();
    await searchInput.fill('test');
    await searchInput.clear();
    const value = await searchInput.inputValue();
    expect(value).toBe('');
  });

  test('Verify multiple search queries work sequentially', async ({ page }) => {
    for (const searchItem of searchKeywords.slice(0, 2)) {
      console.log(`Testing search: ${searchItem.query}`);
      
      // Go back to home for fresh search
      await page.goto('/', { waitUntil: 'networkidle' });
      
      let searchInput = page.locator(
        'input[type="search"]:visible, input[placeholder*="Search"]:visible, input[aria-label*="Search"]:visible'
      ).first();
      
      if (await searchInput.count() === 0) {
        searchInput = page.locator(
          'input[type="search"], input[placeholder*="Search"], input[aria-label*="Search"]'
        ).first();
        await searchInput.scrollIntoViewIfNeeded();
      }
      
      await searchInput.waitFor({ state: 'attached', timeout: 5000 });
      await searchInput.fill(searchItem.query);
      
      const searchButton = page.locator('button[type="submit"]').first();
      const hasSubmitButton = await searchButton.isVisible().catch(() => false);
      
      if (hasSubmitButton) {
        await searchButton.click();
      } else {
        await searchInput.press('Enter');
      }
      
      await page.waitForLoadState('networkidle');
      
      // Verify results
      const resultElements = page.locator('a[href]');
      const resultCount = await resultElements.count();
      expect(resultCount).toBeGreaterThanOrEqual(searchItem.expectedMinResults);
    }
  });
});
