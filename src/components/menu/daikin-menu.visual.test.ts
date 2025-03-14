import {
  clipFor,
  describeEach,
  getStorybookIframeURL,
  type InferStorybookArgTypes,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_MENU_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_MENU_ARG_TYPES>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-menu--default", args);

describeEach(["light", "dark"] as const, (theme) => {
  describeEach(["with divider", "without divider"] as const, (withDivider) => {
    describeEach(["top", "bottom", "left", "right"] as const, (placement) => {
      const baseArgs = {
        $theme: theme,
        divider: withDivider === "with divider",
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

        const triggerElement = await page.waitForSelector("daikin-menu", {
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

        const triggerElement = await page.waitForSelector("daikin-menu", {
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

        const triggerElement = await page.waitForSelector("daikin-menu", {
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
