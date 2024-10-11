import {
  type InferStorybookArgTypes,
  clipFor,
  describeEach,
  getStorybookIframeURL,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_LIST_ITEM_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_LIST_ITEM_ARG_TYPES>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-list-item--button", args);

describeEach(["exist", "none"] as const, (leftIcon) => {
  describeEach(["exist", "none"] as const, (rightIcon) => {
    describeEach(["checkbox", "none"] as const, (slot) => {
      const baseArgs = {
        ...(leftIcon === "exist" && { leftIcon: "positive" }),
        ...(rightIcon === "exist" && { rightIcon: "chevron-right" }),
        action: slot === "checkbox",
        type: slot === "checkbox" ? "text" : "button",
      };

      const baseURL = getPageURL(baseArgs);

      test("base", async ({ page }) => {
        await page.goto(baseURL);

        // wait for element to be visible
        const element = await page.waitForSelector("daikin-list-item", {
          state: "visible",
        });

        // take screenshot and check for diffs
        await expect(page).toHaveScreenshot(await clipFor(element));
      });

      test("hover", async ({ page }) => {
        await page.goto(baseURL);

        // wait for element to be visible
        const element = await page.waitForSelector("daikin-list-item", {
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
        const element = await page.waitForSelector("daikin-list-item", {
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
        const element = await page.waitForSelector("daikin-list-item", {
          state: "visible",
        });

        // we have to use keyboard to focus on element to make `:focus-visible` work.
        await element.focus();
        await page.keyboard.press("Tab");

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
        const element = await page.waitForSelector("daikin-list-item", {
          state: "visible",
        });

        // take screenshot and check for diffs
        await expect(page).toHaveScreenshot(await clipFor(element));
      });
    });
  });
});

describeEach(["button", "link", "text"] as const, (type) => {
  const baseArgs = {
    type,
    // Due to Storybook's limitation, we cannot use special characters in `href`.
    // Since an `<a>` element without `href` attribute cannot be focused using the tab key, it is necessary to set some kind of value.
    ...(type === "link" && { href: "example" }),
  };

  test("base", async ({ page }) => {
    await page.goto(getPageURL(baseArgs));

    // wait for element to be visible
    const element = await page.waitForSelector("daikin-list-item", {
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
    const element = await page.waitForSelector("daikin-list-item", {
      state: "visible",
    });

    // take screenshot and check for diffs
    await expect(page).toHaveScreenshot(await clipFor(element));
  });
});
