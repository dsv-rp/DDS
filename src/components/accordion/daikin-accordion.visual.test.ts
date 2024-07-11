import {
  type InferStorybookArgTypes,
  clipFor,
  describeEach,
  getStorybookIframeURL,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_ACCORDION_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_ACCORDION_ARG_TYPES>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-accordion--default", args);

describeEach(["open", "close"] as const, (open) => {
  describeEach(["enabled", "disabled"] as const, (disabled) => {
    const baseURL = getPageURL({
      title: "Accordion-title",
      open: open === "open",
      disabled: disabled === "disabled",
    });

    test("base", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-accordion", {
        state: "visible",
      });

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });

    test("hover", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-accordion", {
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
      const element = await page.waitForSelector("daikin-accordion", {
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
      const element = await page.waitForSelector("daikin-accordion", {
        state: "visible",
      });

      const summary = await page.waitForSelector("summary");

      await page.evaluate((container) => {
        container.focus();
      }, summary);

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });
  });
});
