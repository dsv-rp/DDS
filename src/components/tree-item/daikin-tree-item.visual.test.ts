import {
  clipFor,
  describeEach,
  getStorybookIframeURL,
  type InferStorybookArgTypes,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_TREE_ITEM_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_TREE_ITEM_ARG_TYPES>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-tree-item--button", args);

describeEach(["button", "link"] as const, (type) => {
  const baseArgs = {
    type,
    ...(type === "link" && { href: "#" }),
  };

  const baseURL = getPageURL(baseArgs);

  test("base", async ({ page }) => {
    await page.goto(baseURL);

    // wait for element to be visible
    const element = await page.waitForSelector("daikin-tree-item", {
      state: "visible",
    });

    // take screenshot and check for diffs
    await expect(page).toHaveScreenshot(await clipFor(element));
  });

  test("hover", async ({ page }) => {
    await page.goto(baseURL);

    // wait for element to be visible
    const element = await page.waitForSelector("daikin-tree-item", {
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
    const element = await page.waitForSelector("daikin-tree-item", {
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
    const element = await page.waitForSelector("daikin-tree-item", {
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
    await page.goto(
      getPageURL({
        ...baseArgs,
        disabled: true,
      })
    );

    // wait for element to be visible
    const element = await page.waitForSelector("daikin-tree-item", {
      state: "visible",
    });

    // take screenshot and check for diffs
    await expect(page).toHaveScreenshot(await clipFor(element));
  });
});
