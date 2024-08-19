import { clipFor, describeEach, getStorybookIframeURL } from "#tests/visual";
import { expect, test } from "@playwright/test";

describeEach(
  ["default", "checkbox", "search", "sort", "pagination", "all"],
  (option) => {
    test("base", async ({ page }) => {
      const baseURL = getStorybookIframeURL(`components-table--${option}`, {});
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-table", {
        state: "visible",
      });

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });
  }
);
