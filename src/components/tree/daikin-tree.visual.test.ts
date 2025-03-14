import {
  clipFor,
  describeEach,
  getStorybookIframeURL,
  type InferStorybookArgTypes,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_TREE_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_TREE_ARG_TYPES>;

const getPageURL = (
  args: StoryArgs = {},
  story: "default" | "manual" = "default"
) => getStorybookIframeURL(`components-tree--${story}`, args);

describeEach(["light", "dark"] as const, (theme) => {
  describeEach(["normal", "selectable"] as const, (selectable) => {
    describeEach(["none", "selected"] as const, (selected) => {
      const baseArgs = {
        $theme: theme,
        selectable: selectable === "selectable",
      };
      const baseURL = getPageURL(
        baseArgs,
        selected === "selected" ? "manual" : "default"
      );

      test("base", async ({ page }) => {
        await page.goto(baseURL);

        // wait for element to be visible
        const element = await page.waitForSelector("daikin-tree", {
          state: "visible",
        });

        // take screenshot and check for diffs
        await expect(page).toHaveScreenshot(await clipFor(element));
      });
    });
  });
});
