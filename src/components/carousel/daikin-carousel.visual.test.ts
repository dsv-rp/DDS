import {
  clipFor,
  describeEach,
  getStorybookIframeURL,
  type InferStorybookArgTypes,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_CAROUSEL_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_CAROUSEL_ARG_TYPES>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-carousel--default", args);

describeEach(["ghost", "fill"] as const, (controlButtonVariant) => {
  const baseArgs = { controlButtonVariant };
  const baseURL = getPageURL(baseArgs);

  test("base", async ({ page }) => {
    await page.goto(baseURL);

    // wait for element to be visible
    const element = await page.waitForSelector("daikin-carousel", {
      state: "visible",
    });

    // take screenshot and check for diffs
    await expect(page).toHaveScreenshot(await clipFor(element));
  });
});
