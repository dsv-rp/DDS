import {
  clipFor,
  describeEach,
  getStorybookIframeURL,
  type InferStorybookArgTypes,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_ICON_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_ICON_ARG_TYPES>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-icon--default", args);

describeEach(["black", "white", "default", "current"] as const, (color) => {
  describeEach(["s", "m", "l", "xl"] as const, (size) => {
    const baseURL = getPageURL({
      icon: "close",
      color,
      size,
    });

    test("base", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-icon", {
        state: "visible",
      });

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });
  });
});
