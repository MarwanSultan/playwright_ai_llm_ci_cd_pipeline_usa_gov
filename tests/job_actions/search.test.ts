import { test, expect } from "@playwright/test";

test("Verify keyword search returns relevant jobs", async ({ page }) => {
  // Navigate to usa.gov
  await page.goto("https://www.usa.gov");

  // Enter a keyword and submit the search form
  const keyword = "Software Engineer";
  await page.fill("#keywords", keyword);
  await page.click("#searchButton");

  // Verify that relevant jobs are returned
  const jobTitles = await page.$$eval(".jobTitle", (titles) =>
    titles.map((title) => title.textContent)
  );
  expect(jobTitles).toContain(keyword);

  // Validate search with multiple AI-suggested filters (location, salary, job type)
  await page.click("#filterLocation");
  await page.fill("#locationInput", "New York");
  await page.click("#applyFilter");

  const filteredJobTitles = await page.$$eval(".jobTitle", (titles) =>
    titles.map((title) => title.textContent)
  );
  expect(filteredJobTitles).toContain(keyword);

  // Test search with edge-case inputs (e.g., misspellings, special characters)
  await page.fill("#keywords", "Sofware Enginner");
  await page.click("#searchButton");

  const edgeCaseJobTitles = await page.$$eval(".jobTitle", (titles) =>
    titles.map((title) => title.textContent)
  );
  expect(edgeCaseJobTitles).toContain(keyword);
});

test("Validate result relevance and pagination", async ({ page }) => {
  // Navigate to usa.gov
  await page.goto("https://www.usa.gov");

  // Enter a keyword and submit the search form
  const keyword = "Software Engineer";
  await page.fill("#keywords", keyword);
  await page.click("#searchButton");

  // Verify that relevant jobs are returned with pagination
  const jobTitles = await page.$$eval(".jobTitle", (titles) =>
    titles.map((title) => title.textContent)
  );
  expect(jobTitles).toContain(keyword);

  // Validate result relevance and pagination
  let currentPage = 1;
  let hasNext = true;

  while (hasNext) {
    const jobTitles = await page.$$eval(".jobTitle", (titles) =>
      titles.map((t) => t.textContent)
    );
    expect(jobTitles).toContain(keyword);

    const nextButton = await page.$("a.next");
    if (nextButton) {
      await nextButton.click();
      await page.waitForLoadState("domcontentloaded");
      currentPage++;
    } else {
      hasNext = false;
    }
  }
});
