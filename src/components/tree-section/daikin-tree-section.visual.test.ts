import {
  clipFor,
  describeEach,
  getStorybookIframeURL,
  type InferStorybookArgTypes,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_TREE_SECTION_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_TREE_SECTION_ARG_TYPES>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-tree-section--default", args);

describeEach(["normal", "selected"] as const, (selected) => {
  describeEach(["enabled", "disabled"] as const, (disabled) => {
    describeEach(["open", "close"] as const, (open) => {
      const baseURL = getPageURL({
        label: "Tree section label",
        disabled: disabled === "disabled",
        open: open === "open",
        selectable: selected === "selected",
        selected: selected === "selected",
      });

      test("base", async ({ page }) => {
        await page.goto(baseURL);

        // wait for element to be visible
        const element = await page.waitForSelector("daikin-tree-section", {
          state: "visible",
        });

        // take screenshot and check for diffs
        await expect(page).toHaveScreenshot(await clipFor(element));
      });
    });
  });
});
