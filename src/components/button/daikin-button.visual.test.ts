import {
  type InferStorybookArgTypes,
  clipFor,
  describeEach,
  getStorybookIframeURL,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_BUTTON_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_BUTTON_ARG_TYPES>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-button--primary", args);

describeEach(
  ["primary", "secondary", "tertiary", "primaryDanger"] as const,
  (variant) => {
    describeEach(["default", "condensed"] as const, (size) => {
      describeEach(["none", "left", "right"] as const, (icon) => {
        const baseURL = getPageURL({
          label: "Button1",
          variant,
          size,
          ...(icon === "right" && {
            rightIcon: "positive",
          }),
          ...(icon === "left" && {
            leftIcon: "positive",
          }),
        });
        const disabledURL = getPageURL({
          label: "Button1",
          variant,
          size,
          disabled: true,
          ...(icon === "right" && {
            rightIcon: "positive",
          }),
          ...(icon === "left" && {
            leftIcon: "positive",
          }),
        });

        test("base", async ({ page }) => {
          await page.goto(baseURL);

          // wait for element to be visible
          const element = await page.waitForSelector("daikin-button", {
            state: "visible",
          });

          // take screenshot and check for diffs
          await expect(page).toHaveScreenshot(await clipFor(element));
        });

        test("hover", async ({ page }) => {
          await page.goto(baseURL);

          // wait for element to be visible
          const element = await page.waitForSelector("daikin-button", {
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
          const element = await page.waitForSelector("daikin-button", {
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
          const element = await page.waitForSelector("daikin-button", {
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
          await page.goto(disabledURL);

          // wait for element to be visible
          const element = await page.waitForSelector("daikin-button", {
            state: "visible",
          });

          // take screenshot and check for diffs
          await expect(page).toHaveScreenshot(await clipFor(element));
        });
      });
    });
  }
);
