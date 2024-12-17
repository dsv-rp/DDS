import {
  clipFor,
  describeEach,
  getStorybookIframeURL,
  type InferStorybookArgTypes,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_BREADCRUMB_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_BREADCRUMB_ARG_TYPES>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-breadcrumb--default", args);

describeEach(["light", "dark"] as const, (theme) => {
  test("base", async ({ page }) => {
    const baseArgs = { $theme: theme, showVisited: false };
    await page.goto(getPageURL(baseArgs));

    // wait for element to be visible
    const element = await page.waitForSelector("daikin-breadcrumb", {
      state: "visible",
    });

    // take screenshot and check for diffs
    await expect(page).toHaveScreenshot(await clipFor(element));
  });
});
