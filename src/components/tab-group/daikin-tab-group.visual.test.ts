import {
  clipFor,
  describeEach,
  getStorybookIframeURL,
  type InferStorybookArgTypes,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_TAB_GROUP_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_TAB_GROUP_ARG_TYPES>;

const getPageURL = (
  base: "default" | "single" | "many",
  args: StoryArgs = {}
) => getStorybookIframeURL(`components-tab-group--${base}`, args);

describeEach(["default", "single", "many"] as const, (base) => {
  describeEach(["default", "condensed"] as const, (size) => {
    const targetTabs = {
      default: ["foo", "baz"],
      single: ["foo"],
      many: ["tab1", "tab10", "tab20"],
    }[base];

    describeEach(targetTabs, (selectedTab) => {
      const baseURL = getPageURL(base, {
        size,
        value: selectedTab,
      });

      test("base", async ({ page }) => {
        await page.goto(baseURL);

        // wait for element to be visible
        const element = await page.waitForSelector("daikin-tab-group", {
          state: "visible",
        });

        // take screenshot and check for diffs
        await expect(page).toHaveScreenshot(await clipFor(element));
      });
    });
  });
});
