import {
  clipFor,
  describeEach,
  getStorybookIframeURL,
  type InferStorybookArgTypes,
} from "#tests/visual";
import { expect, test, type ElementHandle, type Page } from "@playwright/test";
import type { DAIKIN_RADIO_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_RADIO_ARG_TYPES>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-radio--default", args);

describeEach(["enabled", "disabled", "readonly"], (variant) => {
  describeEach(["left", "right"] as const, (labelPosition) => {
    describeEach(["checked", "unchecked"] as const, (checkState) => {
      const baseURL = getPageURL({
        checked: checkState === "checked",
        disabled: variant === "disabled",
        readonly: variant === "readonly",
        labelPosition,
      });

      // ensure that hovering or clicking does not change the image for disabled and readonly
      const snapshotName =
        variant !== "enabled"
          ? `${variant}-${labelPosition}-${checkState}.png`
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
        const element = await page.waitForSelector("daikin-radio", {
          state: "visible",
        });

        // take screenshot and check for diffs
        await testScreenshot(page, element, "base");
      });

      test("hover", async ({ page }) => {
        await page.goto(baseURL);

        // wait for element to be visible
        const element = await page.waitForSelector("daikin-radio", {
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
        const element = await page.waitForSelector("daikin-radio", {
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
        const element = await page.waitForSelector("daikin-radio", {
          state: "visible",
        });

        await page.evaluate((container) => {
          const radio = container.shadowRoot?.querySelector("input");
          if (!radio) {
            return;
          }
          radio.focus();
        }, element);

        // take screenshot and check for diffs
        await testScreenshot(page, element, "focus");
      });
    });
  });
});
