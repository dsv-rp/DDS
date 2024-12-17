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
  describeEach(["default page", "selected page"], (state) => {
    const defaultBaseArgs = {
      $theme: theme,
      total: 7,
      window: 7,
      current: 1,
    };
    const baseURL = getPageURL(defaultBaseArgs);

    test("hover", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-pagination", {
        state: "visible",
      });

      await page
        .getByLabel(state === "default" ? "3" : "1")
        .first()
        .hover();

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });

    test("focus", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-pagination", {
        state: "visible",
      });

      await page
        .getByLabel(state === "default" ? "3" : "1")
        .first()
        .focus();

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });

    test("press", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-pagination", {
        state: "visible",
      });

      // hover cursor on the element and hold down mouse button on the element
      const pageItem = page.getByLabel(state === "default" ? "3" : "1").first();
      await pageItem.hover();
      await page.mouse.down();

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));

      await page.mouse.up();
    });
  });
});

describeEach(["light", "dark"] as const, (theme) => {
  describeEach(["left chevron", "right chevron"], (direction) => {
    const baseArgs = {
      $theme: theme,
      total: 7,
      window: 7,
      current: 2,
    };
    const itemFilter =
      direction === "left chevron"
        ? "Go to the previous page."
        : "Go to the next page.";
    const baseURL = getPageURL(baseArgs);
    test("hover", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-pagination", {
        state: "visible",
      });

      await page.getByLabel(itemFilter).hover();

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });

    test("focus", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-pagination", {
        state: "visible",
      });

      await page.getByLabel(itemFilter).focus();

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });

    test("press", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-pagination", {
        state: "visible",
      });

      await page.getByLabel(itemFilter).hover();
      await page.mouse.down();

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
      await page.mouse.up();
    });
  });
});

describeEach(["light", "dark"] as const, (theme) => {
  describeEach(["default", "ellipsis"], (variant) => {
    const baseArgs = {
      $theme: theme,
      total: variant === "default" ? 7 : 15,
      window: 7,
      current: 1,
    };
    const baseURL = getPageURL(baseArgs);

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
  });
});
