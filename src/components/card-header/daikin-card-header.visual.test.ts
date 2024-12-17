import {
  clipFor,
  describeEach,
  getStorybookIframeURL,
  type InferStorybookArgTypes,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_CARD_HEADER_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_CARD_HEADER_ARG_TYPES>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-card-header--default", args);

describeEach(["light", "dark"] as const, (theme) => {
  describeEach(["icon", "description", "both"], (structure) => {
    const baseArgs = {
      $theme: theme,
      label: "Label Title",
      description:
        structure === "description" || structure === "both"
          ? "Description"
          : "",
      leftIcon: structure === "icon" || structure === "both" ? "alarm" : "",
    };
    const baseURL = getPageURL(baseArgs);

    test("base", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-card-header", {
        state: "visible",
      });

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });
  });
});
