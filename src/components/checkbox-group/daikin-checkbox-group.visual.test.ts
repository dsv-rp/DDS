import {
  clipFor,
  describeEach,
  getStorybookIframeURL,
  type InferStorybookArgTypes,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_CHECKBOX_GROUP_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_CHECKBOX_GROUP_ARG_TYPES>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-checkbox-group--default", args);

describeEach(["horizontal", "vertical"], (orientation) => {
  const baseArgs = {
    orientation: orientation,
  };
  const baseURL = getPageURL(baseArgs);

  test("base", async ({ page }) => {
    await page.goto(baseURL);

    // wait for element to be visible
    const element = await page.waitForSelector("daikin-checkbox-group", {
      state: "visible",
    });

    // take screenshot and check for diffs
    await expect(page).toHaveScreenshot(await clipFor(element));
  });

  test("disabled", async ({ page }) => {
    await page.goto(getPageURL({ ...baseArgs, disabled: true }));

    // wait for element to be visible
    const element = await page.waitForSelector("daikin-checkbox-group", {
      state: "visible",
    });

    // take screenshot and check for diffs
    await expect(page).toHaveScreenshot(await clipFor(element));
  });
});
