import {
  clipFor,
  describeEach,
  getStorybookIframeURL,
  type InferStorybookArgTypes,
} from "#tests/visual";
import { expect, test, type ElementHandle, type Page } from "@playwright/test";
import type { DAIKIN_CHECKBOX_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_CHECKBOX_ARG_TYPES>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-checkbox--small", args);

describeEach(["enabled", "disabled", "readonly"], (variant) => {
  describeEach(["small", "large"] as const, (size) => {
    describeEach(["left", "right"] as const, (labelPosition) => {
      describeEach(
        ["unchecked", "indeterminate", "checked"] as const,
        (checkState) => {
          const baseURL = getPageURL({
            label: "Checkbox Label",
            checkState,
            disabled: variant === "disabled",
            readonly: variant === "readonly",
            labelPosition,
            size,
          });

          // ensure that hovering or clicking does not change the image for disabled and readonly
          const snapshotName =
            variant !== "enabled"
              ? `${variant}-${size}-${labelPosition}-${checkState}.png`
              : null;

          const testScreenshot = async (
            page: Page,
            element: ElementHandle<HTMLElement>
          ): Promise<void> => {
            if (snapshotName) {
              await expect(page).toHaveScreenshot(
                snapshotName,
                await clipFor(element)
              );
            } else {
              await expect(page).toHaveScreenshot(await clipFor(element));
            }
          };

          test("base", async ({ page }) => {
            await page.goto(baseURL);

            // wait for element to be visible
            const element = await page.waitForSelector("daikin-checkbox", {
              state: "visible",
            });

            // take screenshot and check for diffs
            await testScreenshot(page, element);
          });

          test("hover", async ({ page }) => {
            await page.goto(baseURL);

            // wait for element to be visible
            const element = await page.waitForSelector("daikin-checkbox", {
              state: "visible",
            });

            // hover cursor on the element
            await element.hover();

            // take screenshot and check for diffs
            await testScreenshot(page, element);
          });

          test("press", async ({ page }) => {
            await page.goto(baseURL);

            // wait for element to be visible
            const element = await page.waitForSelector("daikin-checkbox", {
              state: "visible",
            });

            // hover cursor on the element and hold down mouse button on the element
            await element.hover();
            await page.mouse.down();

            // take screenshot and check for diffs
            await testScreenshot(page, element);
            await page.mouse.up();
          });

          test("focus", async ({ page }) => {
            await page.goto(baseURL);

            // wait for element to be visible
            const element = await page.waitForSelector("daikin-checkbox", {
              state: "visible",
            });

            await page.evaluate((container) => {
              container.focus();
            }, element);

            // take screenshot and check for diffs
            await testScreenshot(page, element);
          });
        }
      );
    });
  });
});
