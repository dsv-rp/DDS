import {
  clipFor,
  describeEach,
  getStorybookIframeURL,
  type InferStorybookArgTypes,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_TREE_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_TREE_ARG_TYPES>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-tree--default", args);

describeEach(["normal", "selectable"] as const, (selectable) => {
  test("base", async ({ page }) => {
    await page.goto(
      getPageURL({ selectable: selectable === "selectable", selected: "1" })
    );

    // wait for element to be visible
    const element = await page.waitForSelector("daikin-tree", {
      state: "visible",
    });

    // take screenshot and check for diffs
    await expect(page).toHaveScreenshot(await clipFor(element));
  });
});
