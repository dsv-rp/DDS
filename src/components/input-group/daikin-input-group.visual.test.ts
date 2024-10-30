import {
  clipFor,
  describeEach,
  getStorybookIframeURL,
  type InferStorybookArgTypes,
} from "#tests/visual";
import { expect, test, type ElementHandle, type Page } from "@playwright/test";
import type { DAIKIN_INPUT_GROUP_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_INPUT_GROUP_ARG_TYPES>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-input-group--default", args);

const innerContent = {
  Select: "daikin-select",
  TextField: "daikin-text-field",
  Textarea: "daikin-textarea",
};

describeEach(["Select", "TextField", "Textarea"] as const, (content) => {
  describeEach(["enabled", "disabled"] as const, (state) => {
    describeEach(["optional", "required"] as const, (required) => {
      describeEach(["normal", "error"] as const, (error) => {
        describeEach(["visible", "hidden"] as const, (textareaCounter) => {
          const baseURL = getPageURL({
            content,
            disabled: state === "disabled",
            ...(error === "error" && {
              error: "Error Text",
            }),
            ...(required === "required" && {
              required: "Required",
            }),
            textareaCounter: textareaCounter === "visible",
          });

          const snapshotName =
            content === "TextField"
              ? `${content}-${state}-${required}-${error}.png`
              : null;

          const testScreenshot = async (
            page: Page,
            element: ElementHandle<HTMLElement>
          ): Promise<void> => {
            if (snapshotName) {
              await expect(page).toHaveScreenshot(
                snapshotName,
                await clipFor(element)
              );
            } else {
              await expect(page).toHaveScreenshot(await clipFor(element));
            }
          };

          test("base", async ({ page }) => {
            await page.goto(baseURL);

            // wait for element to be visible
            const element = await page.waitForSelector("daikin-input-group", {
              state: "visible",
            });
            await page.waitForSelector(innerContent[content], {
              state: "visible",
            });

            // take screenshot and check for diffs
            await testScreenshot(page, element);
          });
        });
      });
    });
  });
});
