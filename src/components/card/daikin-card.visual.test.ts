import {
  clipFor,
  describeEach,
  getStorybookIframeURL,
  type InferStorybookArgTypes,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_CARD_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_CARD_ARG_TYPES>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-card--default", args);

describeEach(["light", "dark"] as const, (theme) => {
  describeEach(["outline", "ghost"], (outline) => {
    describeEach(["body", "footer", "both"] as const, (structure) => {
      const baseArgs = {
        $theme: theme,
        outline: outline === "outline",
        withBody: structure === "body" || structure === "both",
        withFooter: structure === "footer" || structure === "both",
      };
      const baseURL = getPageURL(baseArgs);

      test("base", async ({ page }) => {
        await page.goto(baseURL);

        // wait for element to be visible
        const element = await page.waitForSelector("daikin-card", {
          state: "visible",
        });

        // take screenshot and check for diffs
        await expect(page).toHaveScreenshot(await clipFor(element));
      });
    });
  });
});
