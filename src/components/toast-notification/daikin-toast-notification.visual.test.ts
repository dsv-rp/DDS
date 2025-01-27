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
  describeEach(["horizontal", "vertical"] as const, (layout) => {
    describeEach(["not-closable", "closable"] as const, (closable) => {
      describeEach(["none", "timestamp"] as const, (timestamp) => {
        describeEach(["none", "action"] as const, (action) => {
          const baseArgs = {
            $theme: theme,
            status: "positive",
            layout,
            closable: closable === "closable",
            slotAction: action === "action",
            isVrt: timestamp === "timestamp",
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
        layout: "horizontal",
        closable: true,
        slotAction: false,
      };
      const baseURL = getPageURL(baseArgs);

      test("base", async ({ page }) => {
        await base(page, baseURL);
      });
    }
  );
});
