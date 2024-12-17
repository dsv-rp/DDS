import {
  clipFor,
  describeEach,
  getStorybookIframeURL,
  type InferStorybookArgTypes,
} from "#tests/visual";
import { expect, test, type Page } from "@playwright/test";
import type { DAIKIN_DROPDOWN_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_DROPDOWN_ARG_TYPES>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-dropdown--default", args);

const base = async (page: Page, baseURL: string) => {
  await page.goto(baseURL);

  // wait for element to be visible
  const element = await page.waitForSelector(
    `div[data-testid="vrt-container"]`,
    {
      state: "visible",
    }
  );

  // take screenshot and check for diffs
  await expect(page).toHaveScreenshot(await clipFor(element));
};

describeEach(["light", "dark"] as const, (theme) => {
  describeEach(["open", "close"] as const, (state) => {
    describeEach(["normal", "error"] as const, (error) => {
      const baseArgs = {
        $theme: theme,
        open: state === "open",
        error: error === "error",
        value: "value1",
      };

      const baseURL = getPageURL(baseArgs);

      test("base", async ({ page }) => {
        await base(page, baseURL);
      });

      test("hover", async ({ page }) => {
        await page.goto(baseURL);
        // wait for element to be visible
        const element = await page.waitForSelector(
          `div[data-testid="vrt-container"]`,
          {
            state: "visible",
          }
        );
        const button = await element.waitForSelector("button", {
          state: "visible",
        });

        // hover cursor on the element
        await button.hover();

        // take screenshot and check for diffs
        await expect(page).toHaveScreenshot(await clipFor(element));
      });

      test("active", async ({ page }) => {
        await page.goto(baseURL);

        // wait for element to be visible
        const element = await page.waitForSelector(
          `div[data-testid="vrt-container"]`,
          {
            state: "visible",
          }
        );
        const button = await element.waitForSelector("button", {
          state: "visible",
        });

        // hover cursor on the element
        await button.hover();
        await page.mouse.down();

        // take screenshot and check for diffs
        await expect(page).toHaveScreenshot(await clipFor(element));
        await page.mouse.up();
      });

      test("focus", async ({ page }) => {
        await page.goto(baseURL);

        // wait for element to be visible
        const element = await page.waitForSelector(
          `div[data-testid="vrt-container"]`,
          {
            state: "visible",
          }
        );
        const button = await element.waitForSelector("button", {
          state: "visible",
        });

        await page.evaluate((container) => {
          container.focus();
        }, button);

        // take screenshot and check for diffs
        await expect(page).toHaveScreenshot(await clipFor(element));
      });

      test("disabled", async ({ page }) => {
        await base(page, getPageURL({ ...baseArgs, disabled: true }));
      });

      test("unselected", async ({ page }) => {
        await base(page, getPageURL({ ...baseArgs, value: undefined }));
      });
    });
  });
});

describeEach(["default", "many"] as const, (option) => {
  const baseURL = getPageURL({
    open: true,
    option,
  });

  test("base", async ({ page }) => {
    await base(page, baseURL);
  });
});
