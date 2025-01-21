import {
  clipFor,
  getStorybookIframeURL,
  type InferStorybookArgTypes,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_CAROUSEL_ITEM_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_CAROUSEL_ITEM_ARG_TYPES>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-carousel-item--default", args);

const baseURL = getPageURL();

test("base", async ({ page }) => {
  await page.goto(baseURL);

  // wait for element to be visible
  const element = await page.waitForSelector("daikin-carousel-item", {
    state: "visible",
  });

  // take screenshot and check for diffs
  await expect(page).toHaveScreenshot(await clipFor(element));
});
