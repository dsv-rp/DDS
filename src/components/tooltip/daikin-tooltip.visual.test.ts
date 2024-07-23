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

    test("center", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible

      const viewArea = await page.waitForSelector(".viewArea", {
        state: "visible",
      });

      const triggerElement = await page.waitForSelector("daikin-tooltip", {
        state: "visible",
      });

      await viewArea.evaluate((el) => {
        el.scrollTo(350, 220);
      });

      // hover cursor on the element
      await triggerElement.hover();

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(viewArea));
    });

    test("leftTop", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible

      const viewArea = await page.waitForSelector(".viewArea", {
        state: "visible",
      });

      const triggerElement = await page.waitForSelector("daikin-tooltip", {
        state: "visible",
      });

      await viewArea.evaluate((el) => {
        el.scrollTo(700, 440);
      });

      // hover cursor on the element
      await triggerElement.hover();

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(viewArea));
    });

    test("rightBottom", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible

      const viewArea = await page.waitForSelector(".viewArea", {
        state: "visible",
      });

      const triggerElement = await page.waitForSelector("daikin-tooltip", {
        state: "visible",
      });

      // hover cursor on the element
      await triggerElement.hover();

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(viewArea));
    });
  });
});
