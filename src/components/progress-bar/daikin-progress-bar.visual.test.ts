import {
  type InferStorybookArgTypes,
  clipFor,
  describeEach,
  getStorybookIframeURL,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_PROGRESS_BAR_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_PROGRESS_BAR_ARG_TYPES>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-progress-bar--default", args);

describeEach(
  ["inprogress", "completed", "indeterminate", "error"] as const,
  (variant) => {
    describeEach(["exist", "none"] as const, (helper) => {
      test("base", async ({ page }) => {
        const baseURL = getPageURL({
          variant,
          value: variant === "completed" ? 100 : 40,
          ...(helper === "none" && {
            helper: "",
          }),
        });
        await page.goto(baseURL);

        // wait for element to be visible
        const element = await page.waitForSelector("daikin-progress-bar", {
          state: "visible",
        });

        // take screenshot and check for diffs
        await expect(page).toHaveScreenshot(await clipFor(element));
      });
    });
  }
);
