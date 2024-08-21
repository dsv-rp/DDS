import {
  clipFor,
  describeEach,
  getStorybookIframeURL,
  type InferStorybookArgTypes,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_PAGINATION_OVERFLOW_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<
  typeof DAIKIN_PAGINATION_OVERFLOW_ARG_TYPES
>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-pagination-overflow--default", args);

describeEach(["total15items"], () => {
  describeEach(["max5items"] as const, () => {
    const baseURL = getPageURL({
      max: 5,
      totalItems: 15,
      value: 1,
    });

    test("base", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-pagination-overflow", {
        state: "visible",
      });

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });

    test("click dropdown", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      await page.waitForSelector("daikin-pagination-overflow", {
        state: "visible",
      });

      const element = await page.waitForSelector("#storyWrap", {
        state: "visible",
      });

      await page.getByLabel("arrow").click();

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });

    test("hover left chevron", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-pagination-overflow", {
        state: "visible",
      });

      await page.getByLabel("chevronLeft").hover();

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });

    test("hover right chevron", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-pagination-overflow", {
        state: "visible",
      });

      await page.getByLabel("chevronRight").hover();

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });
  });
});
