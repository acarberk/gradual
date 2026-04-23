import { expect, test } from "@playwright/test";

test.describe("home page", () => {
  test("renders the Gradual heading", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Gradual" })).toBeVisible();
  });

  test("has correct document title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("Gradual");
  });
});
