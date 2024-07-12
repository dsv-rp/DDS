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

describeEach(["withTrailingSlash", "noTrailingSlash"], (noTrailingSlash) => {
  describeEach(["omission", "withoutOmission"] as const, (omission) => {
    const baseURL = getPageURL({
      noTrailingSlash: noTrailingSlash === "noTrailingSlash",
      omission: omission === "omission",
    });

    test("base", async ({ page }) => {
      // await page.setViewportSize({
      //   width: 640,
      //   height: 480,
      // });
      await page.goto(baseURL);
      console.log(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-breadcrumb", {
        state: "visible",
      });

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });
  });
});
