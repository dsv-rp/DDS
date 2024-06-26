import { test, expect } from "@playwright/test";
import { clipFor, describeEach } from "../../tests/visual";

const getPageURL = (variant: string, size: string): string =>
  // The button label is intentionally changed to a string that renders the local and CI environments the same
  `/iframe.html?viewMode=story&id=components-button--primary&args=label:Button1;variant:${variant};size:${size}`;

describeEach(
  ["primary", "secondary", "tertiary", "primaryDanger"] as const,
  (variant) => {
    describeEach(["default", "condensed"] as const, (size) => {
      const baseURL = getPageURL(variant, size);

      test("base", async ({ page }) => {
        await page.goto(baseURL);

        // wait for element to be visible
        const element = await page.waitForSelector("daikin-button", {
          state: "visible",
        });

        // take screenshot and check for diffs
        await expect(page).toHaveScreenshot(await clipFor(element));
      });

      test("hover", async ({ page }) => {
        await page.goto(baseURL);

        // wait for element to be visible
        const element = await page.waitForSelector("daikin-button", {
          state: "visible",
        });

        // hover cursor on the element
        await element.hover();

        // take screenshot and check for diffs
        await expect(page).toHaveScreenshot(await clipFor(element));
      });

      test("press", async ({ page }) => {
        await page.goto(baseURL);

        // wait for element to be visible
        const element = await page.waitForSelector("daikin-button", {
          state: "visible",
        });

        // hover cursor on the element and hold down mouse button on the element
        await element.hover();
        await page.mouse.down();

        // take screenshot and check for diffs
        await expect(page).toHaveScreenshot(await clipFor(element));
        await page.mouse.up();
      });

      test("focus", async ({ page }) => {
        await page.goto(baseURL);

        // wait for element to be visible
        const element = await page.waitForSelector("daikin-button", {
          state: "visible",
        });

        await page.evaluate((container) => {
          container.focus();
        }, element);

        // take screenshot and check for diffs
        await expect(page).toHaveScreenshot(await clipFor(element));
      });

      test("disabled", async ({ page }) => {
        // load page with disabled=true
        await page.goto(`${baseURL};disabled:!true`);

        // wait for element to be visible
        const element = await page.waitForSelector("daikin-button", {
          state: "visible",
        });

        // take screenshot and check for diffs
        await expect(page).toHaveScreenshot(await clipFor(element));
      });
    });
  }
);
