import {
  clipFor,
  describeEach,
  getStorybookIframeURL,
  type InferStorybookArgTypes,
} from "#tests/visual";
import { expect, test, type Page } from "@playwright/test";
import type { DAIKIN_DATE_PICKER_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_DATE_PICKER_ARG_TYPES>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-date-picker--default", args);

const base = async (page: Page, baseURL: string) => {
  await page.clock.setFixedTime(new Date("2025-02-10T00:00:00.000Z"));
  await page.goto(baseURL);

  // wait for element to be visible
  const element = await page.waitForSelector(
    'div[data-testid="vrt-container"]',
    {
      state: "visible",
    }
  );

  // take screenshot and check for diffs
  await expect(page).toHaveScreenshot(await clipFor(element));
};

const hover = async (page: Page, baseURL: string) => {
  await page.clock.setFixedTime(new Date("2025-02-10T00:00:00.000Z"));
  await page.goto(baseURL);

  // wait for element to be visible
  const element = await page.waitForSelector(
    'div[data-testid="vrt-container"]',
    {
      state: "visible",
    }
  );
  const input = await page.waitForSelector("input", {
    state: "visible",
  });

  // hover cursor on the element
  await input.hover();

  // take screenshot and check for diffs
  await expect(page).toHaveScreenshot(await clipFor(element));
};

const press = async (page: Page, baseURL: string) => {
  await page.clock.setFixedTime(new Date("2025-02-10T00:00:00.000Z"));
  await page.goto(baseURL);

  // wait for element to be visible
  const element = await page.waitForSelector(
    'div[data-testid="vrt-container"]',
    {
      state: "visible",
    }
  );
  const input = await page.waitForSelector("input", {
    state: "visible",
  });

  // hover cursor on the element and hold down mouse button on the element
  await input.hover();
  await page.mouse.down();

  // take screenshot and check for diffs
  await expect(page).toHaveScreenshot(await clipFor(element));
  await page.mouse.up();
};

const focus = async (page: Page, baseURL: string) => {
  await page.clock.setFixedTime(new Date("2025-02-10T00:00:00.000Z"));
  await page.goto(baseURL);

  // wait for element to be visible
  const element = await page.waitForSelector(
    'div[data-testid="vrt-container"]',
    {
      state: "visible",
    }
  );
  const input = await page.waitForSelector("input", {
    state: "visible",
  });

  await page.evaluate((container) => {
    container.focus();
  }, input);

  // take screenshot and check for diffs
  await expect(page).toHaveScreenshot(await clipFor(element));
};

describeEach(["light", "dark"] as const, (theme) => {
  describeEach(["open", "close"] as const, (open) => {
    describeEach(["default", "selected"] as const, (selected) => {
      const baseArgs = {
        $theme: theme,
        open: open === "open",
        isVrtSelected: selected === "selected",
      };

      const baseURL = getPageURL(baseArgs);

      test("base", async ({ page }) => {
        await base(page, baseURL);
      });

      test("hover", async ({ page }) => {
        await hover(page, baseURL);
      });

      test("press", async ({ page }) => {
        await press(page, baseURL);
      });

      test("focus", async ({ page }) => {
        await focus(page, baseURL);
      });

      test("disabled", async ({ page }) => {
        await base(page, getPageURL({ ...baseArgs, disabled: true }));
      });

      test("readonly", async ({ page }) => {
        await base(page, getPageURL({ ...baseArgs, readonly: true }));
      });
    });
  });
});
