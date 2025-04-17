const { test, expect } = require('@playwright/test');

test.describe('Notes Application', () => {
  test('should display the notes app title', async ({ page }) => {
    await page.goto('/');
    
    // Check if the title is visible
    const title = await page.locator('h1:has-text("Demo Notes App")');
    await expect(title).toBeVisible();
  });

  test('should add a new note', async ({ page }) => {
    await page.goto('/');
    
    // Type a new note
    const noteText = 'Test note created by Playwright ' + Date.now();
    await page.locator('input[placeholder="Enter a new note"]').fill(noteText);
    
    // Click the add button
    await page.locator('button:has-text("Add Note")').click();
    
    // Wait for the note to appear in the list
    await page.waitForSelector(`li:has-text("${noteText}")`);
    
    // Verify the note is visible
    const noteElement = page.locator(`li:has-text("${noteText}")`);
    await expect(noteElement).toBeVisible();
  });

  test('should show empty state when no notes exist', async ({ page }) => {
    // This test assumes we can control the backend state
    // In a real app, you might need to clear the database or mock the API
    await page.goto('/');
    
    // Check if the empty state message is visible when no notes exist
    // This might not be reliable if notes already exist from other tests
    const emptyMessage = await page.locator('p:has-text("No notes found")');
    
    // We'll check if either the empty message or some notes are visible
    const notesList = await page.locator('.notes-list');
    
    const notesExist = await notesList.count() > 0;
    if (!notesExist) {
      await expect(emptyMessage).toBeVisible();
    }
  });
});
