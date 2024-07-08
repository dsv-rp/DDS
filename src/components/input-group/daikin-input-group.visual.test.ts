import {
  clipFor,
  describeEach,
  getStorybookIframeURL,
  type InferStorybookArgTypes,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_INPUT_GROUP_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_INPUT_GROUP_ARG_TYPES>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-input-group--default", args);

describeEach(["TextInput", "Textarea"] as const, (content) => {
  describeEach(["enabled", "disabled"] as const, (state) => {
    describeEach(["optional", "required"] as const, (required) => {
      describeEach(["normal", "error"] as const, (error) => {
        const baseURL = getPageURL({
          content,
          label: "Input Group Label",
          disabled: state === "disabled",
          required: required === "required",
          error: error === "error" ? "Error Text" : undefined,
          helper: "Helper Text",
        });

        test("base", async ({ page }) => {
          await page.goto(baseURL);

          // wait for element to be visible
          const element = await page.waitForSelector("daikin-input-group", {
            state: "visible",
          });

          // take screenshot and check for diffs
          await expect(page).toHaveScreenshot(await clipFor(element));
        });
      });
    });
  });
});
