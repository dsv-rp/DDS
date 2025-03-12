import {
  clipFor,
  describeEach,
  getStorybookIframeURL,
  type InferStorybookArgTypes,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_SLIDER_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_SLIDER_ARG_TYPES>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-slider--default", args);

describeEach(["light", "dark"] as const, (theme) => {
  const baseArgs = {
    $theme: theme,
    min: "1",
    max: "10",
    step: "1",
    value: "5",
  };

  const baseURL = getPageURL(baseArgs);

  test("base", async ({ page }) => {
    await page.goto(baseURL);

    // wait for element to be visible
    const element = await page.waitForSelector("daikin-slider", {
      state: "visible",
    });

    // take screenshot and check for diffs
    await expect(page).toHaveScreenshot(await clipFor(element));
  });

  test("hover", async ({ page }) => {
    await page.goto(baseURL);

    // wait for element to be visible
    const element = await page.waitForSelector("daikin-slider", {
      state: "visible",
    });

    const sliderThumb = await page.waitForSelector("span[tabindex='0']", {
      state: "visible",
    });

    // hover cursor on the element
    await sliderThumb.hover();

    // take screenshot and check for diffs
    await expect(page).toHaveScreenshot(await clipFor(element));
  });

  test("press", async ({ page }) => {
    await page.goto(baseURL);

    // wait for element to be visible
    const element = await page.waitForSelector("daikin-slider", {
      state: "visible",
    });

    const sliderThumb = await page.waitForSelector("span[tabindex='0']", {
      state: "visible",
    });

    // hover cursor on the element and hold down mouse button on the element
    await sliderThumb.hover();
    await page.mouse.down();

    // take screenshot and check for diffs
    await expect(page).toHaveScreenshot(await clipFor(element));
    await page.mouse.up();
  });

  test("focus", async ({ page }) => {
    await page.goto(baseURL);

    // wait for element to be visible
    const element = await page.waitForSelector("daikin-slider", {
      state: "visible",
    });

    await page.evaluate((container) => {
      const slider = container.shadowRoot?.querySelector(
        "span[tabindex='0']"
      ) as HTMLElement | undefined;
      if (!slider) {
        return;
      }
      slider.focus();
    }, element);

    // take screenshot and check for diffs
    await expect(page).toHaveScreenshot(await clipFor(element));
  });

  test("disabled", async ({ page }) => {
    await page.goto(getPageURL({ ...baseArgs, disabled: true }));

    // wait for element to be visible
    const element = await page.waitForSelector("daikin-slider", {
      state: "visible",
    });

    // take screenshot and check for diffs
    await expect(page).toHaveScreenshot(await clipFor(element));
  });
});
