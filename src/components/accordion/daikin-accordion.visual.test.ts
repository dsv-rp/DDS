import {
  type InferStorybookArgTypes,
  clipFor,
  getStorybookIframeURL,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_ACCORDION_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_ACCORDION_ARG_TYPES>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-accordion--default", args);

test("base", async ({ page }) => {
  const baseURL = getPageURL();
  await page.goto(baseURL);

  // wait for element to be visible
  const element = await page.waitForSelector("daikin-accordion", {
    state: "visible",
  });

  // take screenshot and check for diffs
  await expect(page).toHaveScreenshot(await clipFor(element));
});
