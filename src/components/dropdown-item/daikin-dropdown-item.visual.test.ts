import {
  clipFor,
  describeEach,
  getStorybookIframeURL,
  type InferStorybookArgTypes,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_DROPDOWN_ITEM_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_DROPDOWN_ITEM_ARG_TYPES>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-dropdown-item--default", args);

describeEach(["enabled", "disabled"] as const, (disabled) => {
  const baseURL = getPageURL({
    ...(disabled === "disabled" && { disabled: true }),
  });

  test("base", async ({ page }) => {
    await page.goto(baseURL);

    // wait for element to be visible
    const element = await page.waitForSelector("daikin-dropdown-item", {
      state: "visible",
    });

    // take screenshot and check for diffs
    await expect(page).toHaveScreenshot(await clipFor(element));
  });

  test("hover", async ({ page }) => {
    await page.goto(baseURL);

    // wait for element to be visible
    const element = await page.waitForSelector("daikin-dropdown-item", {
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
    const element = await page.waitForSelector("daikin-dropdown-item", {
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
    const element = await page.waitForSelector("daikin-dropdown-item", {
      state: "visible",
    });

    await page.evaluate((container) => {
      container.focus();
    }, element);

    // take screenshot and check for diffs
    await expect(page).toHaveScreenshot(await clipFor(element));
  });
});