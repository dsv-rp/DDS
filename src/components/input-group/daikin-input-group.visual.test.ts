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

describeEach(["TextInput", "Textarea"] as const, (content) => {
  describeEach(["enabled", "disabled"] as const, (state) => {
    describeEach(["optional", "required"] as const, (required) => {
      describeEach(["normal", "error"] as const, (error) => {
        describeEach(["exist", "hidden"] as const, (counter) => {
          const baseURL = getPageURL({
            content,
            disabled: state === "disabled",
            required: required === "required",
            ...(error === "error" && {
              error: "Error Text",
            }),
            ...(counter === "exist" && {
              textareaMaxCount: 100,
            }),
          });

          const snapshotName =
            content === "TextInput"
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

            // take screenshot and check for diffs
            await testScreenshot(page, element);
          });
        });
      });
    });
  });
});
