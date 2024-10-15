import {
  clipFor,
  getStorybookIframeURL,
  type InferStorybookArgTypes,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_PROGRESS_INDICATOR_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<
  typeof DAIKIN_PROGRESS_INDICATOR_ARG_TYPES
>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-progress-indicator--default", args);

test("base", async ({ page }) => {
  await page.goto(getPageURL());

  // wait for element to be visible
  const element = await page.waitForSelector("daikin-progress-indicator", {
    state: "visible",
  });

  // take screenshot and check for diffs
  await expect(page).toHaveScreenshot(await clipFor(element));
});
