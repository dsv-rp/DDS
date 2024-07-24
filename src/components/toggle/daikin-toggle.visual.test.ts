import {
  clipFor,
  describeEach,
  getStorybookIframeURL,
  type InferStorybookArgTypes,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_TOGGLE_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_TOGGLE_ARG_TYPES>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-toggle--default", args);

describeEach(["enabled", "disabled"], (variant) => {
  describeEach(["default", "small"] as const, (size) => {
    describeEach(["checked", "unchecked"] as const, (checkState) => {
      const baseURL = getPageURL({
        toggled: checkState === "checked",
        disabled: variant === "disabled",
        size: size,
      });

      test("base", async ({ page }) => {
        await page.goto(baseURL);

        // wait for element to be visible
        const element = await page.waitForSelector("daikin-toggle", {
          state: "visible",
        });

        // take screenshot and check for diffs
        await expect(page).toHaveScreenshot(await clipFor(element));
      });
    });
  });
});
