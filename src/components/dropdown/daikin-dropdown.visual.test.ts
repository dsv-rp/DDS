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
  describeEach(["top", "left", "hidden"] as const, (labelPosition) => {
    describeEach(["left", "none"] as const, (icon) => {
      describeEach(["open", "close"] as const, (state) => {
        describeEach(["enabled", "disabled"] as const, (disabled) => {
          const baseURL = getPageURL({
            size,
            label: "Dropdown Label",
            labelPosition,
            ...(icon === "left" && { leftIcon: "positive" as const }),
            ...(state === "open" && { open: true }),
            ...(disabled === "disabled" && { disabled: true }),
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

test("hover", async ({ page }) => {
  const baseURL = getPageURL();
  await page.goto(baseURL);
  // wait for element to be visible
  const element = await page.waitForSelector(
    `div[data-testid="vrt-container"]`,
    {
      state: "visible",
    }
  );
  const button = await element.waitForSelector("button", {
    state: "visible",
  });

  // hover cursor on the element
  await button.hover();

  // take screenshot and check for diffs
  await expect(page).toHaveScreenshot(await clipFor(element));
});

test("active", async ({ page }) => {
  const baseURL = getPageURL();
  await page.goto(baseURL);

  // wait for element to be visible
  const element = await page.waitForSelector(
    `div[data-testid="vrt-container"]`,
    {
      state: "visible",
    }
  );
  const button = await element.waitForSelector("button", {
    state: "visible",
  });

  // hover cursor on the element
  await button.hover();
  await page.mouse.down();

  // take screenshot and check for diffs
  await expect(page).toHaveScreenshot(await clipFor(element));
  await page.mouse.up();
});

test("focus", async ({ page }) => {
  const baseURL = getPageURL();
  await page.goto(baseURL);

  // wait for element to be visible
  const element = await page.waitForSelector(
    `div[data-testid="vrt-container"]`,
    {
      state: "visible",
    }
  );
  const button = await element.waitForSelector("button", {
    state: "visible",
  });

  await page.evaluate((container) => {
    container.focus();
  }, button);

  // take screenshot and check for diffs
  await expect(page).toHaveScreenshot(await clipFor(element));
});
