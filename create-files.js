const fs = require('fs');
const path = require('path');

const baseDir = __dirname;
const testsDir = path.join(baseDir, 'tests');
const dataDir = path.join(testsDir, 'data');
const specsDir = path.join(testsDir, 'specs');
const fixturesDir = path.join(testsDir, 'fixtures');

// Create directories
[dataDir, specsDir, fixturesDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✓ Created: ${dir}`);
  }
});

// Base Fixture
const baseFixture = `import { test as base, expect, Page } from '@playwright/test';

type TestFixtures = {
  page: Page;
};

export const test = base.extend<TestFixtures>({});

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
});

// Helper Functions - Search
export const searchHelpers = {
  async performSearch(page: Page, query: string) {
    const searchInput = page.getByRole('searchbox', { name: /search/i });
    const searchButton = page.getByRole('button', { name: /search/i }).first();
    
    await searchInput.fill(query);
    await searchButton.click();
    await page.waitForLoadState('networkidle');
  },

  async verifySearchBoxVisible(page: Page) {
    const searchInput = page.getByRole('searchbox', { name: /search/i });
    return await searchInput.isVisible();
  },

  async getSearchInputValue(page: Page): Promise<string> {
    const searchInput = page.getByRole('searchbox', { name: /search/i });
    return await searchInput.inputValue();
  },

  async clearSearch(page: Page) {
    const searchInput = page.getByRole('searchbox', { name: /search/i });
    await searchInput.clear();
  }
};

// Helper Functions - Navigation
export const navigationHelpers = {
  async getPrimaryNavItems(page: Page): Promise<string[]> {
    const nav = page.locator('nav[aria-label="Primary navigation"]');
    const items = await nav.locator('a').allTextContents();
    return items.filter(item => item.trim().length > 0);
  },

  async getPrimaryNavItemCount(page: Page): Promise<number> {
    const nav = page.locator('nav[aria-label="Primary navigation"]');
    return await nav.locator('a').count();
  },

  async clickNavItem(page: Page, itemName: string) {
    const item = page.getByRole('link', { name: new RegExp(itemName, 'i') });
    await item.click();
    await page.waitForLoadState('networkidle');
  },

  async verifyNavItemExists(page: Page, itemName: string): Promise<boolean> {
    const item = page.getByRole('link', { name: new RegExp(itemName, 'i') });
    return await item.isVisible().catch(() => false);
  },

  async clickLogo(page: Page) {
    const logo = page.getByAltText('USAGov Logo');
    await logo.click();
    await page.waitForLoadState('networkidle');
  },

  async getFooterNavItems(page: Page): Promise<string[]> {
    const footerNav = page.locator('footer nav');
    const items = await footerNav.locator('a').allTextContents();
    return items.filter(item => item.trim().length > 0);
  },

  async verifyAllNavItemsHaveHref(page: Page): Promise<boolean> {
    const nav = page.locator('nav[aria-label="Primary navigation"]');
    const items = await nav.locator('a').all();

    for (const item of items) {
      const href = await item.getAttribute('href');
      if (!href || href.trim() === '') {
        return false;
      }
    }
    return true;
  }
};

// Helper Functions - Page Content
export const pageHelpers = {
  async verifyPageLoaded(page: Page) {
    await page.waitForLoadState('networkidle');
    const h1 = page.locator('h1:has-text("Making government services easier to find")');
    await h1.waitFor({ state: 'visible', timeout: 5000 });
  },

  async getPageTitle(page: Page): Promise<string> {
    return await page.title();
  },

  async getPageURL(page: Page): Promise<string> {
    return page.url();
  },

  async getTopicsCount(page: Page): Promise<number> {
    const topics = page.locator('main ul > li');
    return await topics.count();
  },

  async verifyTopicExists(page: Page, topicName: string): Promise<boolean> {
    const topic = page.getByRole('link', { name: new RegExp(topicName, 'i') });
    return await topic.isVisible().catch(() => false);
  },

  async clickTopic(page: Page, topicName: string) {
    const topic = page.getByRole('link', { name: new RegExp(topicName, 'i') });
    await topic.click();
    await page.waitForLoadState('networkidle');
  },

  async getHeadingCount(page: Page): Promise<number> {
    return await page.locator('h1, h2, h3, h4, h5, h6').count();
  }
};

// Helper Functions - Accessibility
export const accessibilityHelpers = {
  async verifyPageAccessibility(page: Page) {
    const main = page.locator('main');
    const nav = page.locator('nav[aria-label="Primary navigation"]');
    const footer = page.locator('footer');

    expect(await main.isVisible()).toBeTruthy();
    expect(await nav.isVisible()).toBeTruthy();
    expect(await footer.isVisible()).toBeTruthy();
  },

  async verifySkipLinkPresent(page: Page): Promise<boolean> {
    const skipLink = page.getByText('Skip to main content');
    return await skipLink.isVisible().catch(() => false);
  },

  async getImagesWithoutAlt(page: Page): Promise<number> {
    const imagesWithoutAlt = await page.locator('img:not([alt])').count();
    return imagesWithoutAlt;
  },

  async verifyHeadingHierarchy(page: Page): Promise<boolean> {
    const h1Count = await page.locator('h1').count();
    return h1Count >= 1;
  },

  async getPageLang(page: Page): Promise<string | null> {
    return await page.locator('html').getAttribute('lang');
  },

  async checkConsoleErrors(page: Page): Promise<string[]> {
    const errors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    return errors;
  }
};

// Helper Functions - Forms
export const formHelpers = {
  async fillSearchForm(page: Page, query: string) {
    const searchInput = page.getByRole('searchbox', { name: /search/i });
    const searchButton = page.getByRole('button', { name: /search/i }).first();

    await searchInput.fill(query);
    await searchButton.click();
    await page.waitForLoadState('networkidle');
  },

  async submitSearchWithEnter(page: Page, query: string) {
    const searchInput = page.getByRole('searchbox', { name: /search/i });
    await searchInput.fill(query);
    await page.keyboard.press('Enter');
    await page.waitForLoadState('networkidle');
  },

  async clickFindBenefitsButton(page: Page) {
    const button = page.getByRole('button', { name: /find benefits/i });
    await button.click();
    await page.waitForLoadState('networkidle');
  },

  async verifySearchInputAcceptsText(page: Page, text: string): Promise<boolean> {
    const searchInput = page.getByRole('searchbox', { name: /search/i });
    await searchInput.fill(text);
    const value = await searchInput.inputValue();
    return value === text;
  }
};

// Helper Functions - Links
export const linkHelpers = {
  async getMainContentLinksCount(page: Page): Promise<number> {
    const main = page.locator('main');
    return await main.locator('a').count();
  },

  async verifyLinksHaveText(page: Page): Promise<boolean> {
    const links = page.locator('main a');
    const allLinks = await links.all();

    for (const link of allLinks.slice(0, 10)) {
      const text = await link.textContent();
      if (!text || text.trim().length === 0) {
        return false;
      }
    }
    return true;
  },

  async verifyLinksHaveHref(page: Page): Promise<boolean> {
    const links = page.locator('main a');
    const allLinks = await links.all();

    for (const link of allLinks.slice(0, 10)) {
      const href = await link.getAttribute('href');
      if (!href || href.trim().length === 0) {
        return false;
      }
    }
    return true;
  },

  async getAllLinkUrls(page: Page, limit: number = 20): Promise<(string | null)[]> {
    const links = page.locator('main a');
    const allLinks = await links.all();

    const urls = await Promise.all(
      allLinks.slice(0, limit).map(link => link.getAttribute('href'))
    );

    return urls;
  },

  async verifyLinkHasValidProtocol(page: Page, href: string): Promise<boolean> {
    return /^(https?:\\/\\/|\\/)/.test(href);
  }
};

export { expect };`;

fs.writeFileSync(path.join(fixturesDir, 'base.fixture.ts'), baseFixture);
console.log('✓ Created: tests/fixtures/base.fixture.ts');

// Test Data
const testData = `export const searchTestData = [
  {
    query: 'passport',
    expectedKeywords: ['passport', 'travel', 'document'],
    description: 'Search for passport information'
  },
  {
    query: 'unemployment benefits',
    expectedKeywords: ['unemployment', 'benefits', 'employment'],
    description: 'Search for unemployment benefits'
  },
  {
    query: 'federal student aid',
    expectedKeywords: ['student', 'aid', 'education', 'federal'],
    description: 'Search for federal student aid information'
  },
  {
    query: 'social security',
    expectedKeywords: ['social', 'security'],
    description: 'Search for social security information'
  },
  {
    query: 'tax filing',
    expectedKeywords: ['tax', 'filing', 'irs'],
    description: 'Search for tax filing information'
  },
  {
    query: 'medicare',
    expectedKeywords: ['medicare', 'health', 'insurance'],
    description: 'Search for medicare information'
  },
  {
    query: 'disability services',
    expectedKeywords: ['disability', 'services', 'assistance'],
    description: 'Search for disability services'
  },
  {
    query: 'housing assistance',
    expectedKeywords: ['housing', 'assistance', 'rent'],
    description: 'Search for housing assistance programs'
  }
];

export const navigationTestData = [
  {
    label: 'The U.S. and its government',
    path: '/about-the-us',
    description: 'Navigate to U.S. government information'
  },
  {
    label: 'Government benefits',
    path: '/benefits',
    description: 'Navigate to government benefits section'
  },
  {
    label: 'Immigration and U.S. citizenship',
    path: '/immigration-and-citizenship',
    description: 'Navigate to immigration information'
  },
  {
    label: 'Money and credit',
    path: '/money',
    description: 'Navigate to money and credit section'
  },
  {
    label: 'Taxes',
    path: '/taxes',
    description: 'Navigate to taxes section'
  },
  {
    label: 'Travel',
    path: '/travel',
    description: 'Navigate to travel section'
  },
  {
    label: 'Education',
    path: '/education',
    description: 'Navigate to education section'
  },
  {
    label: 'Jobs, labor laws, and unemployment',
    path: '/jobs-labor-laws-unemployment',
    description: 'Navigate to jobs and labor information'
  },
  {
    label: 'Health',
    path: '/health',
    description: 'Navigate to health information'
  },
  {
    label: 'Military and veterans',
    path: '/military-and-veterans',
    description: 'Navigate to military and veterans services'
  }
];

export const criticalServiceLinks = [
  {
    name: 'Get or renew a passport',
    path: '/passport',
    description: 'Passport services'
  },
  {
    name: 'Find unclaimed money',
    path: '/unclaimed-money',
    description: 'Unclaimed money service'
  },
  {
    name: 'Find how to get a REAL ID',
    path: '/real-id',
    description: 'REAL ID information'
  },
  {
    name: 'File for unemployment benefits',
    path: '/unemployment-benefits',
    description: 'Unemployment benefits filing'
  }
];

export const edgeCaseTestData = {
  searches: [
    { query: '', description: 'Empty search' },
    { query: ' ', description: 'Whitespace only' },
    { query: '!@#$%^&*()', description: 'Special characters' },
    { query: 'a'.repeat(1000), description: 'Very long search term' },
    { query: '中文', description: 'Non-English characters' },
    { query: 'xyzabc123notfound', description: 'Non-existent term' }
  ]
};`;

fs.writeFileSync(path.join(dataDir, 'test-data.ts'), testData);
console.log('✓ Created: tests/data/test-data.ts');

console.log('\n✅ Core files created successfully!');
console.log('\nNow create remaining spec files manually or copy from the previous instructions.');