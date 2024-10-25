import {
  type InferStorybookArgTypes,
  clipFor,
  getStorybookIframeURL,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_LIST_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_LIST_ARG_TYPES>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-list--default", args);

test("base", async ({ page }) => {
  await page.goto(getPageURL());

  // wait for element to be visible
  const element = await page.waitForSelector("daikin-list", {
    state: "visible",
  });

  // take screenshot and check for diffs
  await expect(page).toHaveScreenshot(await clipFor(element));
});
