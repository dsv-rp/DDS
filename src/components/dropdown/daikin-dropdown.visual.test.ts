import {
  clipFor,
  describeEach,
  getStorybookIframeURL,
  type InferStorybookArgTypes,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_DROPDOWN_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_DROPDOWN_ARG_TYPES>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-dropdown--default", args);

describeEach(["small", "medium"] as const, (size) => {
  describeEach(["exist", "none"] as const, (label) => {
    describeEach(["top", "left"] as const, (labelPosition) => {
      describeEach(["exist", "none"] as const, (leftIcon) => {
        describeEach(["open", "close"] as const, (state) => {
          const baseURL = getPageURL({
            size,
            label: label === "exist" ? "Dropdown Label" : "",
            labelPosition,
            ...(state === "open" && { open: true }),
            ...(leftIcon === "exist" && { leftIcon: "positive" as const }),
          });

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
  });
});
