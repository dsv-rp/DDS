import {
  clipFor,
  describeEach,
  getStorybookIframeURL,
  type InferStorybookArgTypes,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_TEXT_FIELD_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_TEXT_FIELD_ARG_TYPES>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-text-field--default", args);

describeEach(["light", "dark"] as const, (theme) => {
  describeEach(["normal", "error"] as const, (error) => {
    describeEach(["empty", "placeholder", "filled"] as const, (content) => {
      describeEach(["left", "right", "both", "none"] as const, (icon) => {
        const baseArgs = {
          $theme: theme,
          error: error === "error",
          placeholder: content !== "empty" ? "Placeholder Text" : "",
          value: content === "filled" ? "Content" : "",
          ...((icon === "left" || icon === "both") && {
            leftIcon: "positive",
          }),
          ...((icon === "right" || icon === "both") && {
            rightIcon: "positive",
          }),
        };

        const baseURL = getPageURL(baseArgs);

        test("base", async ({ page }) => {
          await page.goto(baseURL);

          // wait for element to be visible
          const element = await page.waitForSelector("daikin-text-field", {
            state: "visible",
          });

          // take screenshot and check for diffs
          await expect(page).toHaveScreenshot(await clipFor(element));
        });

        test("hover", async ({ page }) => {
          await page.goto(baseURL);

          // wait for element to be visible
          const element = await page.waitForSelector("daikin-text-field", {
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
          const element = await page.waitForSelector("daikin-text-field", {
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
          const element = await page.waitForSelector("daikin-text-field", {
            state: "visible",
          });

          await page.evaluate((container) => {
            container.focus();
          }, element);

          // take screenshot and check for diffs
          await expect(page).toHaveScreenshot(await clipFor(element));
        });

        test("disabled", async ({ page }) => {
          await page.goto(getPageURL({ ...baseArgs, disabled: true }));

          // wait for element to be visible
          const element = await page.waitForSelector("daikin-text-field", {
            state: "visible",
          });

          // take screenshot and check for diffs
          await expect(page).toHaveScreenshot(await clipFor(element));
        });

        test("readonly", async ({ page }) => {
          await page.goto(getPageURL({ ...baseArgs, readonly: true }));

          // wait for element to be visible
          const element = await page.waitForSelector("daikin-text-field", {
            state: "visible",
          });

          // take screenshot and check for diffs
          await expect(page).toHaveScreenshot(await clipFor(element));
        });
      });
    });
  });
});
