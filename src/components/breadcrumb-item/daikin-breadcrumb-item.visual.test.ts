import {
  clipFor,
  describeEach,
  getStorybookIframeURL,
  type InferStorybookArgTypes,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_BREADCRUMB_ITEM_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<
  typeof DAIKIN_BREADCRUMB_ITEM_ARG_TYPES
>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-breadcrumb-item--normal", args);

describeEach(["enabled", "disabled"], (state) => {
  describeEach(["normal", "ellipsis"] as const, (variant) => {
    describeEach(
      ["trailingSlash", "noTrailingSlash"] as const,
      (trailingSlash) => {
        const baseURL = getPageURL({
          disabled: state === "disabled",
          trailingSlash: trailingSlash === "trailingSlash",
          variant,
        });

        test("base", async ({ page }) => {
          await page.goto(baseURL);

          // wait for element to be visible
          const element = await page.waitForSelector("daikin-breadcrumb-item", {
            state: "visible",
          });

          // take screenshot and check for diffs
          await expect(page).toHaveScreenshot(await clipFor(element));
        });

        test("hover", async ({ page }) => {
          await page.goto(baseURL);

          // wait for element to be visible
          const element = await page.waitForSelector("daikin-breadcrumb-item", {
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
          const element = await page.waitForSelector("daikin-breadcrumb-item", {
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
          const element = await page.waitForSelector("daikin-breadcrumb-item", {
            state: "visible",
          });

          await page.evaluate((container) => {
            const a = container.shadowRoot?.querySelector("a");
            if (!a) {
              return;
            }
            a.focus();
          }, element);

          // take screenshot and check for diffs
          await expect(page).toHaveScreenshot(await clipFor(element));
        });
      }
    );
  });
});
