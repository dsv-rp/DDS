import {
  type InferStorybookArgTypes,
  clipFor,
  describeEach,
  getStorybookIframeURL,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_BUTTON_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_BUTTON_ARG_TYPES>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-button--fill", args);

describeEach(
  [
    // Light Theme: Variants and Sizes
    ["light", "fill", "small", "default", "none"],
    ["light", "fill", "small", "danger", "none"],
    ["light", "outline", "small", "default", "none"],
    ["light", "outline", "small", "danger", "none"],
    ["light", "ghost", "small", "default", "none"],
    ["light", "ghost", "small", "danger", "none"],

    ["light", "fill", "medium", "default", "none"],
    ["light", "fill", "medium", "danger", "none"],
    ["light", "outline", "medium", "default", "none"],
    ["light", "outline", "medium", "danger", "none"],
    ["light", "ghost", "medium", "default", "none"],
    ["light", "ghost", "medium", "danger", "none"],

    // Light Theme: Icons
    ["light", "fill", "small", "default", "left"],
    ["light", "outline", "small", "default", "left"],
    ["light", "ghost", "small", "default", "left"],
    ["light", "fill", "small", "default", "right"],
    ["light", "outline", "small", "default", "right"],
    ["light", "ghost", "small", "default", "right"],

    ["light", "fill", "medium", "danger", "left"],
    ["light", "outline", "medium", "danger", "left"],
    ["light", "ghost", "medium", "danger", "left"],
    ["light", "fill", "medium", "danger", "right"],
    ["light", "outline", "medium", "danger", "right"],
    ["light", "ghost", "medium", "danger", "right"],

    // Dark Theme
    ["dark", "fill", "medium", "default", "left"],
    ["dark", "fill", "medium", "danger", "left"],
    ["dark", "outline", "medium", "default", "left"],
    ["dark", "outline", "medium", "danger", "left"],
    ["dark", "ghost", "medium", "default", "left"],
    ["dark", "ghost", "medium", "danger", "left"],
  ] as const,
  ([theme, variant, size, color, icon]) => {
    const baseArgs = {
      $theme: theme,
      variant,
      color,
      size,
      ...(icon === "right" && {
        rightIcon: "positive",
      }),
      ...(icon === "left" && {
        leftIcon: "positive",
      }),
    };
    const baseURL = getPageURL(baseArgs);

    test("base", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-button", {
        state: "visible",
      });

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });

    test("hover", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-button", {
        state: "visible",
      });

      // hover cursor on the element
      await element.hover();

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });

    test("press", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-button", {
        state: "visible",
      });

      // hover cursor on the element and hold down mouse button on the element
      await element.hover();
      await page.mouse.down();

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
      await page.mouse.up();
    });

    test("focus", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-button", {
        state: "visible",
      });

      await page.evaluate((container) => {
        container.focus();
      }, element);

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });

    test("disabled", async ({ page }) => {
      // load page with disabled=true
      await page.goto(
        getPageURL({
          ...baseArgs,
          disabled: true,
        })
      );

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-button", {
        state: "visible",
      });

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });
  }
);

describeEach(["button", "link"] as const, (type) => {
  const baseArgs = {
    // Due to Storybook's limitation, we cannot use special characters in `href`.
    ...(type === "link" && ({ type: "link", href: "example" } as const)),
  };

  test("base", async ({ page }) => {
    await page.goto(getPageURL(baseArgs));

    // wait for element to be visible
    const element = await page.waitForSelector("daikin-button", {
      state: "visible",
    });

    // take screenshot and check for diffs
    await expect(page).toHaveScreenshot(
      "type-test-base.png",
      await clipFor(element)
    );
  });

  test("disabled", async ({ page }) => {
    // load page with disabled=true
    await page.goto(
      getPageURL({
        ...baseArgs,
        disabled: true,
      })
    );

    // wait for element to be visible
    const element = await page.waitForSelector("daikin-button", {
      state: "visible",
    });

    // take screenshot and check for diffs
    await expect(page).toHaveScreenshot(
      "type-test-disabled.png",
      await clipFor(element)
    );
  });
});
