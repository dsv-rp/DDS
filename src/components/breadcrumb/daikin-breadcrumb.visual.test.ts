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
  getStorybookIframeURL("components-breadcrumb--omission", args);

describeEach(["noTrailingSlash", "trailingSlash"], (trailingSlash) => {
  describeEach(["visible", "ellipsis"] as const, (overflow) => {
    const baseURL = getPageURL({
      trailingSlash: trailingSlash === "trailingSlash",
      overflow: overflow,
    });

    test("base", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-breadcrumb", {
        state: "visible",
      });

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });

    test("smallScreen", async ({ page }) => {
      await page.setViewportSize({
        width: 480,
        height: 480,
      });

      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-breadcrumb", {
        state: "visible",
      });

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });
  });
});
