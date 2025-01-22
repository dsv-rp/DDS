import {
  clipFor,
  describeEach,
  getStorybookIframeURL,
  type InferStorybookArgTypes,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_TOAST_NOTIFICATION_MANAGER_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<
  typeof DAIKIN_TOAST_NOTIFICATION_MANAGER_ARG_TYPES
>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-toast-notification-manager--default", args);

describeEach(["light", "dark"] as const, (theme) => {
  describeEach(
    [
      "top",
      "top-left",
      "top-right",
      "bottom",
      "bottom-left",
      "bottom-right",
    ] as const,
    (position) => {
      const baseArgs = {
        $theme: theme,
        position,
        isVrt: true,
      };
      const baseURL = getPageURL(baseArgs);

      test("base", async ({ page }) => {
        await page.goto(baseURL);

        // wait for element to be visible
        const element = await page.waitForSelector(
          "sb-toast-notification-container",
          {
            state: "visible",
          }
        );

        // take screenshot and check for diffs
        await expect(page).toHaveScreenshot(await clipFor(element));
      });
    }
  );
});
