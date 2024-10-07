import {
  clipFor,
  describeEach,
  getStorybookIframeURL,
  type InferStorybookArgTypes,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_TABLE_CELL_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_TABLE_CELL_ARG_TYPES>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL(`components-table-cell--default`, args);

describeEach(["left", "right", "center"] as const, (alignment) => {
  describeEach(["subtitle", "none"] as const, (subtitle) => {
    const baseURL = getPageURL({
      alignment,
      ...(subtitle === "subtitle" && { subtitle: "Table cell subtitle" }),
    });

    test("base", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-table-cell", {
        state: "visible",
      });

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });
  });
});
