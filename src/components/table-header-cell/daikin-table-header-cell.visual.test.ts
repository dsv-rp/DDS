import {
  clipFor,
  describeEach,
  getStorybookIframeURL,
  type InferStorybookArgTypes,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_TABLE_HEADER_CELL_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<
  typeof DAIKIN_TABLE_HEADER_CELL_ARG_TYPES
>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-table-header-cell--default", args);

describeEach(["left", "right", "center"] as const, (alignment) => {
  describeEach(["default", "sortable"] as const, (sortable) => {
    describeEach(["exist", "none"] as const, (leftIcon) => {
      const baseURL = getPageURL({
        alignment,
        sortable: sortable === "sortable",
        leftIcon: leftIcon === "exist" ? "positive" : undefined,
      });

      test("base", async ({ page }) => {
        await page.goto(baseURL);

        // wait for element to be visible
        const element = await page.waitForSelector("daikin-table-header-cell", {
          state: "visible",
        });

        // take screenshot and check for diffs
        await expect(page).toHaveScreenshot(await clipFor(element));
      });

      test("hover", async ({ page }) => {
        await page.goto(baseURL);

        // wait for element to be visible
        const element = await page.waitForSelector("daikin-table-header-cell", {
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
        const element = await page.waitForSelector("daikin-table-header-cell", {
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
        const element = await page.waitForSelector("daikin-table-header-cell", {
          state: "visible",
        });

        await page.evaluate((container) => {
          container.focus();
        }, element);

        // take screenshot and check for diffs
        await expect(page).toHaveScreenshot(await clipFor(element));
      });
    });
  });
});
