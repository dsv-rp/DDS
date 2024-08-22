import {
  clipFor,
  describeEach,
  getStorybookIframeURL,
  type InferStorybookArgTypes,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_PAGINATION_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_PAGINATION_ARG_TYPES>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-pagination--default", args);

describeEach(["max6page", "max15page"], (max) => {
  describeEach(["show6page"] as const, () => {
    const baseURL = getPageURL({
      lastPage: max === "max6page" ? 6 : 15,
      pageWindow: 6,
      currentPage: 1,
    });

    test("base", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-pagination", {
        state: "visible",
      });

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });

    if (max === "max15page") {
      test("click dropdown", async ({ page }) => {
        await page.goto(baseURL);

        // wait for element to be visible
        await page.waitForSelector("daikin-pagination", {
          state: "visible",
        });

        const element = await page.waitForSelector("#storyWrap", {
          state: "visible",
        });

        await page.getByLabel("pageDetailRight").click();

        // take screenshot and check for diffs
        await expect(page).toHaveScreenshot(await clipFor(element));
      });

      test("hover dropdown", async ({ page }) => {
        await page.goto(baseURL);

        // wait for element to be visible
        const element = await page.waitForSelector("daikin-pagination", {
          state: "visible",
        });

        await page.getByLabel("pageDetailRight").hover();

        // take screenshot and check for diffs
        await expect(page).toHaveScreenshot(await clipFor(element));
      });

      test("focus dropdown", async ({ page }) => {
        await page.goto(baseURL);

        // wait for element to be visible
        const element = await page.waitForSelector("daikin-pagination", {
          state: "visible",
        });

        await page.getByLabel("pageDetailRight").focus();

        // take screenshot and check for diffs
        await expect(page).toHaveScreenshot(await clipFor(element));
      });
    }

    test("hover page number", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-pagination", {
        state: "visible",
      });

      await page.getByLabel("3").hover();

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });

    test("focus page number", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-pagination", {
        state: "visible",
      });

      await page.getByLabel("3").focus();

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });

    test("hover left chevron", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-pagination", {
        state: "visible",
      });

      await page.getByLabel("leftChevron").hover();

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });

    test("focus left chevron", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-pagination", {
        state: "visible",
      });

      await page.getByLabel("leftChevron").focus();

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });

    test("hover right chevron", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-pagination", {
        state: "visible",
      });

      await page.getByLabel("rightChevron").hover();

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });

    test("focus right chevron", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-pagination", {
        state: "visible",
      });

      await page.getByLabel("rightChevron").focus();

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });
  });
});
