import { test, expect } from '@playwright/test';

test('Filter by Location, Job Type, Salary Range, Agency, or Category', async ({ page }) => {
    // Navigate to usa.gov
    await page.goto('https://www.usa.gov');

    // Enter a keyword and submit the search form
    const keyword = 'Software Engineer';
    await page.fill('#keywords', keyword);
    await page.click('#searchButton');

    // Filter by Location, Job Type, Salary Range, Agency, or Category
    await page.click('#filterLocation');
    await page.fill('#locationInput', 'New York');
    await page.click('#applyFilter');

    const filteredJobTitles = await page.$$eval('.jobTitle', titles => titles.map(title => title.textContent));
    expect(filteredJobTitles).toContain(keyword);

    // Test AI-generated multi-filter combinations
    await page.click('#filterAgency');
    await page.fill('#agencyInput', 'Department of Defense');
    await page.click('#applyFilter');

    const agencyFilteredJobTitles = await page.$$eval('.jobTitle', titles => titles.map(title => title.textContent));
    expect(agencyFilteredJobTitles).toContain(keyword);

    // Validate system behavior for conflicting or empty filter criteria
    await page.fill('#locationInput', '');
    await page.click('#applyFilter');
    const emptyLocationJobTitles = await page.$$eval('.jobTitle', titles => titles.map(title => title.textContent));
    expect(emptyLocationJobTitles).toContain(keyword);
});
