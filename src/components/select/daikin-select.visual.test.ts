import {
  clipFor,
  describeEach,
  getStorybookIframeURL,
  type InferStorybookArgTypes,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_SELECT_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_SELECT_ARG_TYPES>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-select--default", args);

describeEach(["light", "dark"] as const, (theme) => {
  describeEach(["normal", "error"] as const, (error) => {
    const baseArgs = {
      $theme: theme,
      error: error === "error",
    };

    const baseURL = getPageURL(baseArgs);

    test("base", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-select", {
        state: "visible",
      });

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });

    test("hover", async ({ page }) => {
      await page.goto(baseURL);
      // wait for element to be visible
      const element = await page.waitForSelector("daikin-select", {
        state: "visible",
      });

      // hover cursor on the element
      await element.hover();

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });

    test("active", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-select", {
        state: "visible",
      });

      // hover cursor on the element
      await element.hover();
      await page.mouse.down();

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
      await page.mouse.up();
    });

    test("focus", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-select", {
        state: "visible",
      });

      await page.evaluate((container) => {
        container.focus();
      }, element);

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });

    test("disabled", async ({ page }) => {
      await page.goto(getPageURL({ ...baseArgs, disabled: true }));

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-select", {
        state: "visible",
      });

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });
  });
});
