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
  getStorybookIframeURL("components-tooltip--default", args);

describeEach(["light", "dark"] as const, (theme) => {
  describeEach(["default", "inverse"] as const, (color) => {
    describeEach(["top", "bottom", "left", "right"] as const, (placement) => {
      const baseArgs = {
        $theme: theme,
        color,
        placement,
        hasSlot: false,
        hasFocusableTrigger: false,
        __vrtContainer__: true,
      };
      const baseURL = getPageURL(baseArgs);

      test("center", async ({ page }) => {
        await page.goto(baseURL);

        // wait for element to be visible
        const viewArea = await page.waitForSelector(
          '[data-testid="view-area"]',
          {
            state: "visible",
          }
        );

        const triggerElement = await page.waitForSelector("daikin-tooltip", {
          state: "visible",
        });

        await viewArea.evaluate((el) => el.scrollTo(350, 400));

        // hover cursor on the element
        await triggerElement.hover();

        // take screenshot and check for diffs
        await expect(page).toHaveScreenshot(await clipFor(viewArea));
      });

      test("leftTop", async ({ page }) => {
        await page.goto(baseURL);

        // wait for element to be visible
        const viewArea = await page.waitForSelector(
          '[data-testid="view-area"]',
          {
            state: "visible",
          }
        );

        const triggerElement = await page.waitForSelector("daikin-tooltip", {
          state: "visible",
        });

        await viewArea.evaluate((el) => el.scrollTo(700, 1400));

        // hover cursor on the element
        await triggerElement.hover();

        // take screenshot and check for diffs
        await expect(page).toHaveScreenshot(await clipFor(viewArea));
      });

      test("rightBottom", async ({ page }) => {
        await page.goto(baseURL);

        // wait for element to be visible

        const viewArea = await page.waitForSelector(
          '[data-testid="view-area"]',
          {
            state: "visible",
          }
        );

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
});

describeEach(["attribute", "slot"] as const, (description) => {
  test("base", async ({ page }) => {
    await page.goto(
      getPageURL({
        placement: "bottom",
        hasSlot: description === "slot",
        __vrtContainer__: true,
      })
    );

    // wait for element to be visible
    const viewArea = await page.waitForSelector('[data-testid="view-area"]', {
      state: "visible",
    });

    const triggerElement = await page.waitForSelector("daikin-tooltip", {
      state: "visible",
    });

    await viewArea.evaluate((el) => el.scrollTo(350, 400));

    // hover cursor on the element
    await triggerElement.hover();

    // take screenshot and check for diffs
    await expect(page).toHaveScreenshot(await clipFor(viewArea));
  });
});
