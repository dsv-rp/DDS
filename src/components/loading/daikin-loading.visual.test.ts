import {
  clipFor,
  describeEach,
  getStorybookIframeURL,
  type InferStorybookArgTypes,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_LOADING_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_LOADING_ARG_TYPES>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-loading--default", args);

describeEach(["light", "dark"] as const, (theme) => {
  describeEach(["small", "medium"] as const, (size) => {
    describeEach(["transparent", "colored"] as const, (background) => {
      const baseArgs = {
        $theme: theme,
        size,
        background: background === "colored",
        isVrt: true,
      };

      const baseURL = getPageURL(baseArgs);

      test("base", async ({ page }) => {
        await page.goto(baseURL);

        // wait for element to be visible
        const element = await page.waitForSelector(
          `div[data-testid="vrt-container"]`,
          {
            state: "visible",
          }
        );

        // take screenshot and check for diffs
        await expect(page).toHaveScreenshot(await clipFor(element));
      });
    });
  });
});
