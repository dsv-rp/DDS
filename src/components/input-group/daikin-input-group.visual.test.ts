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
  Dropdown: "daikin-dropdown",
  RadioGroup: "daikin-radio-group",
  CheckboxGroup: "daikin-checkbox-group",
  Select: "daikin-select",
  TextField: "daikin-text-field",
  TextArea: "daikin-text-area",
};

describeEach(["light", "dark"] as const, (theme) => {
  describeEach(
    [
      "Dropdown",
      "RadioGroup",
      "CheckboxGroup",
      "Select",
      "TextField",
      "TextArea",
    ] as const,
    (content) => {
      describeEach(["enabled", "disabled"] as const, (state) => {
        describeEach(["optional", "required"] as const, (required) => {
          describeEach(["normal", "error"] as const, (error) => {
            describeEach(["visible", "hidden"] as const, (counter) => {
              const baseArgs = {
                $theme: theme,
                content,
                disabled: state === "disabled",
                ...(error === "error" && {
                  error: "Error Text",
                }),
                ...(required === "required" && {
                  required: "Required",
                }),
                ...(counter === "visible" && {
                  textareaMaxCount: 100,
                }),
              };
              const baseURL = getPageURL(baseArgs);

              const snapshotName =
                content !== "TextArea"
                  ? `${theme}-${content}-${state}-${required}-${error}.png`
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
                const element = await page.waitForSelector(
                  "daikin-input-group",
                  {
                    state: "visible",
                  }
                );
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
    }
  );
});

describeEach(["none", "error"] as const, (textareaLimitExceedError) => {
  const baseURL = getPageURL({
    content: "TextArea",
    ...(textareaLimitExceedError === "error" && {
      textareaLimitExceedError: "The number of characters exceeds the limit",
    }),
    textareaMaxCount: 3,
  });

  test("base", async ({ page }) => {
    await page.goto(baseURL);

    // wait for element to be visible
    const element = await page.waitForSelector("daikin-input-group", {
      state: "visible",
    });
    await page.waitForSelector("daikin-text-area", {
      state: "visible",
    });

    // take screenshot and check for diffs
    await expect(page).toHaveScreenshot(await clipFor(element));
  });
});
