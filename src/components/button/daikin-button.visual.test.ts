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

describeEach(["fill", "outline", "ghost"] as const, (variant) => {
  describeEach(["default", "danger"] as const, (color) => {
    describeEach(["none", "left", "right"] as const, (icon) => {
      const baseArgs = {
        variant,
        color,
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
    });
  });
});

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
});
