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

describeEach(["light", "dark"] as const, (theme) => {
  test("base", async ({ page }) => {
    const baseArgs = { $theme: theme, exclusive: false };
    const baseURL = getPageURL(baseArgs);
    await page.goto(baseURL);

    // wait for element to be visible
    const element = await page.waitForSelector("daikin-accordion", {
      state: "visible",
    });

    // take screenshot and check for diffs
    await expect(page).toHaveScreenshot(await clipFor(element));
  });
});
