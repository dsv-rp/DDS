import {
  clipFor,
  describeEach,
  getStorybookIframeURL,
  type InferStorybookArgTypes,
} from "#tests/visual";
import { expect, test, type Page } from "@playwright/test";
import type { DAIKIN_TOAST_NOTIFICATION_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<
  typeof DAIKIN_TOAST_NOTIFICATION_ARG_TYPES
>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-toast-notification--default", args);

const base = async (page: Page, baseURL: string) => {
  await page.goto(baseURL);

  // wait for element to be visible
  const element = await page.waitForSelector("daikin-toast-notification", {
    state: "visible",
  });

  // take screenshot and check for diffs
  await expect(page).toHaveScreenshot(await clipFor(element));
};

describeEach(["light", "dark"] as const, (theme) => {
  describeEach(["single", "multiple"] as const, (line) => {
    describeEach(["not-closable", "closable"] as const, (closable) => {
      describeEach(["none", "timestamp"] as const, (timestamp) => {
        describeEach(["none", "action"] as const, (action) => {
          const baseArgs = {
            $theme: theme,
            status: "positive",
            line,
            closable: closable === "closable",
            timestamp: timestamp === "timestamp",
            slotAction: action === "action",
          };
          const baseURL = getPageURL(baseArgs);

          test("base", async ({ page }) => {
            await base(page, baseURL);
          });
        });
      });
    });
  });
});

describeEach(["light", "dark"] as const, (theme) => {
  describeEach(
    ["positive", "negative", "warning", "alarm", "information"] as const,
    (status) => {
      const baseArgs = {
        $theme: theme,
        status,
        line: "single",
        closable: true,
        timestamp: false,
        slotAction: false,
      };
      const baseURL = getPageURL(baseArgs);

      test("base", async ({ page }) => {
        await base(page, baseURL);
      });
    }
  );
});
