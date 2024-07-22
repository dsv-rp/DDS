import {
  clipFor,
  describeEach,
  getStorybookIframeURL,
  type InferStorybookArgTypes,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_TOOLTIP_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_TOOLTIP_ARG_TYPES>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-tooltip--light", args);

describeEach(["light", "dark"] as const, (variant) => {
  describeEach(["top", "bottom", "left", "right"] as const, (placement) => {
    const baseURL = getPageURL({
      variant: variant,
      placement: placement,
    });

    test("hover", async ({ page }) => {
      console.log(baseURL);
      await page.goto(baseURL);

      // wait for element to be visible
      const triggerElement = await page.waitForSelector("daikin-tooltip", {
        state: "visible",
      });
      const viewArea = await page.waitForSelector(".lin", {
        state: "visible",
      });
      await viewArea.scrollIntoViewIfNeeded();
      await triggerElement.hover();

      // // hover cursor on the element
      // await element.hover();

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(viewArea));
    });
  });
});
