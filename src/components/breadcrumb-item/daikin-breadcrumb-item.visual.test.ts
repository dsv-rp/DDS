import {
  clipFor,
  describeEach,
  getStorybookIframeURL,
  type InferStorybookArgTypes,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_BREADCRUMB_ITEM_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<
  typeof DAIKIN_BREADCRUMB_ITEM_ARG_TYPES
>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-breadcrumb-item--default", args);

describeEach(["normal"], () => {
  const baseURL = getPageURL({});

  test("base", async ({ page }) => {
    await page.goto(baseURL);

    // wait for element to be visible
    const element = await page.waitForSelector("daikin-breadcrumb-item", {
      state: "visible",
    });

    // take screenshot and check for diffs
    await expect(page).toHaveScreenshot(await clipFor(element));
  });

  test("hover", async ({ page }) => {
    await page.goto(baseURL);

    // wait for element to be visible
    const element = await page.waitForSelector("daikin-breadcrumb-item", {
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
    const element = await page.waitForSelector("daikin-breadcrumb-item", {
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
    const element = await page.waitForSelector("daikin-breadcrumb-item", {
      state: "visible",
    });

    await page.evaluate((container) => {
      const a = container.shadowRoot?.querySelector("a");
      if (!a) {
        return;
      }
      a.focus();
    }, element);

    // take screenshot and check for diffs
    await expect(page).toHaveScreenshot(await clipFor(element));
  });

  test("disabled", async ({ page }) => {
    await page.goto(getPageURL({ disabled: true }));

    // wait for element to be visible
    const element = await page.waitForSelector("daikin-breadcrumb-item", {
      state: "visible",
    });

    // take screenshot and check for diffs
    await expect(page).toHaveScreenshot(await clipFor(element));
  });
});

describeEach(["current"] as const, (variant) => {
  const baseURL = getPageURL({
    variant,
  });

  test("base", async ({ page }) => {
    await page.goto(baseURL);

    // wait for element to be visible
    const element = await page.waitForSelector("daikin-breadcrumb-item", {
      state: "visible",
    });

    // take screenshot and check for diffs
    await expect(page).toHaveScreenshot(await clipFor(element));
  });
});
