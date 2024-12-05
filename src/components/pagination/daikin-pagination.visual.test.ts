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

describeEach(["light", "dark"] as const, (theme) => {
  describeEach(["default", "ellipsis"], (variant) => {
    const baseArgs = {
      $theme: theme,
      total: variant === "default" ? 7 : 15,
      window: 7,
      current: 1,
    };
    const baseURL = getPageURL(baseArgs);

    const activePage2Args = {
      $theme: theme,
      total: variant === "default" ? 7 : 15,
      window: 7,
      current: 2,
    };
    const activePage2Url = getPageURL(activePage2Args);

    test("base", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-pagination", {
        state: "visible",
      });

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });

    if (variant === "ellipsis") {
      test("hover dropdown", async ({ page }) => {
        await page.goto(baseURL);

        // wait for element to be visible
        const element = await page.waitForSelector("daikin-pagination", {
          state: "visible",
        });

        await page.getByLabel("Expand the omitted pages.").first().hover();

        // take screenshot and check for diffs
        await expect(page).toHaveScreenshot(await clipFor(element));
      });

      test("focus dropdown", async ({ page }) => {
        await page.goto(baseURL);

        // wait for element to be visible
        const element = await page.waitForSelector("daikin-pagination", {
          state: "visible",
        });

        await page.getByLabel("Expand the omitted pages.").focus();

        // take screenshot and check for diffs
        await expect(page).toHaveScreenshot(await clipFor(element));
      });
    }

    test("hover page", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-pagination", {
        state: "visible",
      });

      await page.getByLabel("3").first().hover();

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });

    test("hover active page", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-pagination", {
        state: "visible",
      });

      await page.getByLabel("1").first().hover();

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });

    test("focus page", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-pagination", {
        state: "visible",
      });

      await page.getByLabel("3").first().focus();

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });

    test("focus active page", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-pagination", {
        state: "visible",
      });

      await page.getByLabel("1").first().focus();

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });

    test("press page", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-pagination", {
        state: "visible",
      });

      // hover cursor on the element and hold down mouse button on the element
      const pageItem = page.getByLabel("3").first();
      await pageItem.hover();
      await page.mouse.down();

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));

      await page.mouse.up();
    });

    test("press active page", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-pagination", {
        state: "visible",
      });

      // hover cursor on the element and hold down mouse button on the element
      const pageItem = page.getByLabel("1").first();
      await pageItem.hover();
      await page.mouse.down();

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));

      await page.mouse.up();
    });

    test("hover left chevron", async ({ page }) => {
      await page.goto(activePage2Url);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-pagination", {
        state: "visible",
      });

      await page.getByLabel("Go to the previous page.").hover();

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });

    test("focus left chevron", async ({ page }) => {
      await page.goto(activePage2Url);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-pagination", {
        state: "visible",
      });

      await page.getByLabel("Go to the previous page.").focus();

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });

    test("press left chevron", async ({ page }) => {
      await page.goto(activePage2Url);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-pagination", {
        state: "visible",
      });

      await page.getByLabel("Go to the previous page.").hover();
      await page.mouse.down();

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
      await page.mouse.up();
    });

    test("hover right chevron", async ({ page }) => {
      await page.goto(activePage2Url);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-pagination", {
        state: "visible",
      });

      await page.getByLabel("Go to the next page.").hover();

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });

    test("focus right chevron", async ({ page }) => {
      await page.goto(activePage2Url);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-pagination", {
        state: "visible",
      });

      await page.getByLabel("Go to the next page.").focus();

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });
  });
});
