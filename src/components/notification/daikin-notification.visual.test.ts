import {
  clipFor,
  describeEach,
  getStorybookIframeURL,
  type InferStorybookArgTypes,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_NOTIFICATION_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_NOTIFICATION_ARG_TYPES>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-notification--inline", args);

describeEach(["toast", "inline"] as const, (variant) => {
  describeEach(
    ["positive", "negative", "warning", "alarm", "information"] as const,
    (status) => {
      describeEach(["single", "multi"] as const, (line) => {
        describeEach(
          [true, false] as const,
          (value) => (value ? "withClose" : "withoutClose"),
          (closeButton) => {
            const baseURL = getPageURL({
              variant,
              status,
              line,
              closeButton,
              title: "Example Notification",
              description: "Description of the notification",
              __vrtDescription__: "Description of the notification",
            });

            test("base", async ({ page }) => {
              await page.goto(baseURL);

              // wait for element to be visible
              const element = await page.waitForSelector(
                "daikin-notification",
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
    }
  );
});
