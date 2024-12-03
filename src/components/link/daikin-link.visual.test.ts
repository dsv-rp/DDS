import {
  type InferStorybookArgTypes,
  clipFor,
  describeEach,
  getStorybookIframeURL,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_LINK_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_LINK_ARG_TYPES>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-link--default", args);

// FIXME: VRT is not implemented for `:visited` styles, as it will require `launchPersistentContext` which cannot be done with containers.
describeEach(["default", "exist"] as const, (sentence) => {
  describeEach(["none", "left", "right"] as const, (icon) => {
    const baseArgs = {
      ...(icon === "right" && {
        rightIcon: "positive",
      }),
      ...(icon === "left" && {
        leftIcon: "positive",
      }),
      withSentence: sentence === "exist",
    };
    const baseURL = getPageURL(baseArgs);

    test("base", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-link", {
        state: "visible",
      });

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });

    test("hover", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-link", {
        state: "visible",
      });

      // hover cursor on the element
      await element.hover();

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });

    test("press", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-link", {
        state: "visible",
      });

      // hover cursor on the element and hold down mouse button on the element
      await element.hover();
      await page.mouse.down();

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
      await page.mouse.up();
    });

    test("focus", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-link", {
        state: "visible",
      });

      await page.evaluate((container) => {
        container.focus();
      }, element);

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });

    test("disabled", async ({ page }) => {
      // load page with disabled=true
      await page.goto(
        getPageURL({
          ...baseArgs,
          disabled: true,
        })
      );

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-link", {
        state: "visible",
      });

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });
  });
});
