import {
  type InferStorybookArgTypes,
  clipFor,
  describeEach,
  getStorybookIframeURL,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_ACCORDION_ITEM_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_ACCORDION_ITEM_ARG_TYPES>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-accordion-item--default", args);

describeEach(["light", "dark"] as const, (theme) => {
  describeEach(["open", "close"] as const, (open) => {
    const baseArgs = {
      $theme: theme,
      open: open === "open",
    };
    const baseURL = getPageURL(baseArgs);

    test("base", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-accordion-item", {
        state: "visible",
      });

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });

    test("hover", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-accordion-item", {
        state: "visible",
      });
      const summary = await element.waitForSelector("#summary");

      // hover cursor on the element
      await summary.hover();

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });

    test("press", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-accordion-item", {
        state: "visible",
      });
      const summary = await element.waitForSelector("#summary");

      // hover cursor on the element and hold down mouse button on the element
      await summary.hover();
      await page.mouse.down();

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
      await page.mouse.up();
    });

    test("focus", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-accordion-item", {
        state: "visible",
      });
      const summary = await element.waitForSelector("#summary");

      await page.evaluate((container) => {
        container.focus();
      }, summary);

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });

    test("disabled", async ({ page }) => {
      await page.goto(getPageURL({ ...baseArgs, disabled: true }));

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-accordion-item", {
        state: "visible",
      });

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });
  });
});
