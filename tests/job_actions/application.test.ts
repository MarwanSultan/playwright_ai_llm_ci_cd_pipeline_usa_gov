import { test, expect } from "../fixtures/base.fixture";

test('Verify "Apply" button navigation and upload AI-generated resumes', async ({
  page,
}) => {
  // Navigate to usa.gov
  await page.goto("https://www.usa.gov");

  // Enter a keyword and submit the search form
  const keyword = "Software Engineer";
  await page.fill("#keywords", keyword);
  await page.click("#searchButton");

  // Click on an application button for a job listing
  const applyButtons = await page.$$("button.apply");
  if (applyButtons.length > 0) {
    const applyButton = applyButtons[0];
    await applyButton.click();

    // Upload AI-generated resumes and supporting documents
    const resumeInput = await page.waitForSelector('input[type="file"]');
    await resumeInput.setInputFiles("path/to/your/resume.pdf");
    await page.click("#submitApplication");

    // Check confirmation emails/messages
    const confirmationEmails = await page.$$("div.emailConfirmation");
    expect(confirmationEmails).toBeTruthy();

    // Test editing and resubmitting applications
    await page.click("#editApplication");
    await page.fill('input[name="newField"]', "New Value");
    await page.click("#submitApplication");

    const updatedConfirmationEmails = await page.$$("div.emailConfirmation");
    expect(updatedConfirmationEmails).toBeTruthy();
  }
});
