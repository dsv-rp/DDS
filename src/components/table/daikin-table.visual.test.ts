import {
  clipFor,
  describeEach,
  getStorybookIframeURL,
  type InferStorybookArgTypes,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_TABLE_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_TABLE_ARG_TYPES>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-table--default", args);

describeEach(["light", "dark"] as const, (theme) => {
  describeEach(["default", "selectable"] as const, (selectable) => {
    describeEach(["default", "sortable"] as const, (sortable) => {
      describeEach(["default", "hasSlot"] as const, (hasSlot) => {
        const baseArgs = {
          $theme: theme,
          selectable: selectable === "selectable",
          sortable: sortable === "sortable",
          hasSlot: hasSlot === "hasSlot",
          sort: undefined,
        };
        const baseURL = getPageURL(baseArgs);

        test("base", async ({ page }) => {
          await page.goto(baseURL);

          // wait for element to be visible
          const element = await page.waitForSelector("daikin-table", {
            state: "visible",
          });

          // take screenshot and check for diffs
          await expect(page).toHaveScreenshot(await clipFor(element));
        });
      });
    });
  });
});
