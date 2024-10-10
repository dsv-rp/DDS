import {
  clipFor,
  describeEach,
  getStorybookIframeURL,
  type InferStorybookArgTypes,
} from "#tests/visual";
import { expect, test, type ElementHandle, type Page } from "@playwright/test";
import type { DAIKIN_TEXT_INPUT_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_TEXT_INPUT_ARG_TYPES>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-text-input--default", args);

describeEach(["enabled", "disabled", "readonly"], (variant) => {
  describeEach(["normal", "error"] as const, (error) => {
    describeEach(["empty", "placeholder", "filled"] as const, (content) => {
      describeEach(["left", "right", "both", "none"] as const, (icon) => {
        const baseURL = getPageURL({
          disabled: variant === "disabled",
          readonly: variant === "readonly",
          error: error === "error",
          placeholder: content !== "empty" ? "Placeholder Text" : "",
          value: content === "filled" ? "Content" : "",
          ...((icon === "left" || icon === "both") && {
            leftIcon: "positive",
          }),
          ...((icon === "right" || icon === "both") && {
            rightIcon: "positive",
          }),
        });

        // ensure that hovering or clicking does not change the image for disabled
        const snapshotName =
          variant !== "enabled"
            ? `${variant}-${error}-${content}-${icon}.png`
            : null;

        const testScreenshot = async (
          page: Page,
          element: ElementHandle<HTMLElement>,
          type: "base" | "hover" | "press" | "focus"
        ): Promise<void> => {
          if (snapshotName) {
            if (type === "base") {
              await expect(page).toHaveScreenshot(
                snapshotName,
                await clipFor(element)
              );
            }
          } else {
            await expect(page).toHaveScreenshot(await clipFor(element));
          }
        };

        test("base", async ({ page }) => {
          await page.goto(baseURL);

          // wait for element to be visible
          const element = await page.waitForSelector("daikin-text-input", {
            state: "visible",
          });

          // take screenshot and check for diffs
          await testScreenshot(page, element, "base");
        });

        test("hover", async ({ page }) => {
          await page.goto(baseURL);

          // wait for element to be visible
          const element = await page.waitForSelector("daikin-text-input", {
            state: "visible",
          });

          // hover cursor on the element
          await element.hover();

          // take screenshot and check for diffs
          await testScreenshot(page, element, "hover");
        });

        test("press", async ({ page }) => {
          await page.goto(baseURL);

          // wait for element to be visible
          const element = await page.waitForSelector("daikin-text-input", {
            state: "visible",
          });

          // hover cursor on the element and hold down mouse button on the element
          await element.hover();
          await page.mouse.down();

          // take screenshot and check for diffs
          await testScreenshot(page, element, "press");
          await page.mouse.up();
        });

        test("focus", async ({ page }) => {
          await page.goto(baseURL);

          // wait for element to be visible
          const element = await page.waitForSelector("daikin-text-input", {
            state: "visible",
          });

          await page.evaluate((container) => {
            container.focus();
          }, element);

          // take screenshot and check for diffs
          await testScreenshot(page, element, "focus");
        });
      });
    });
  });
});
