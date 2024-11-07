import {
  clipFor,
  describeEach,
  getStorybookIframeURL,
  type InferStorybookArgTypes,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_PAGINATION_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_PAGINATION_ARG_TYPES>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-pagination--default", args);

describeEach(["default", "ellipsis"], (variant) => {
  const baseURL = getPageURL({
    total: variant === "default" ? 7 : 15,
    window: 7,
    current: 1,
  });

  const activePage2Url = getPageURL({
    total: variant === "default" ? 7 : 15,
    window: 7,
    current: 2,
  });

  test("base", async ({ page }) => {
    await page.goto(baseURL);

    // wait for element to be visible
    const element = await page.waitForSelector("daikin-pagination", {
      state: "visible",
    });

    // take screenshot and check for diffs
    await expect(page).toHaveScreenshot(await clipFor(element));
  });

  if (variant === "ellipsis") {
    test("hover dropdown", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-pagination", {
        state: "visible",
      });

      await page
        .getByLabel("Expand the omitted earlier pages.")
        .first()
        .hover();

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });

    test("focus dropdown", async ({ page }) => {
      await page.goto(baseURL);

      // wait for element to be visible
      const element = await page.waitForSelector("daikin-pagination", {
        state: "visible",
      });

      await page.getByLabel("Expand the omitted earlier pages.").focus();

      // take screenshot and check for diffs
      await expect(page).toHaveScreenshot(await clipFor(element));
    });
  }

  test("hover page", async ({ page }) => {
    await page.goto(baseURL);

    // wait for element to be visible
    const element = await page.waitForSelector("daikin-pagination", {
      state: "visible",
    });

    await page.getByLabel("3").first().hover();

    // take screenshot and check for diffs
    await expect(page).toHaveScreenshot(await clipFor(element));
  });

  test("hover active page", async ({ page }) => {
    await page.goto(baseURL);

    // wait for element to be visible
    const element = await page.waitForSelector("daikin-pagination", {
      state: "visible",
    });

    await page.getByLabel("1").first().hover();

    // take screenshot and check for diffs
    await expect(page).toHaveScreenshot(await clipFor(element));
  });

  test("focus page", async ({ page }) => {
    await page.goto(baseURL);

    // wait for element to be visible
    const element = await page.waitForSelector("daikin-pagination", {
      state: "visible",
    });

    await page.getByLabel("3").first().focus();

    // take screenshot and check for diffs
    await expect(page).toHaveScreenshot(await clipFor(element));
  });

  test("focus active page", async ({ page }) => {
    await page.goto(baseURL);

    // wait for element to be visible
    const element = await page.waitForSelector("daikin-pagination", {
      state: "visible",
    });

    await page.getByLabel("1").first().focus();

    // take screenshot and check for diffs
    await expect(page).toHaveScreenshot(await clipFor(element));
  });

  test("hover left chevron", async ({ page }) => {
    await page.goto(activePage2Url);

    // wait for element to be visible
    const element = await page.waitForSelector("daikin-pagination", {
      state: "visible",
    });

    await page.getByLabel("Left chevron").hover();

    // take screenshot and check for diffs
    await expect(page).toHaveScreenshot(await clipFor(element));
  });

  test("focus left chevron", async ({ page }) => {
    await page.goto(activePage2Url);

    // wait for element to be visible
    const element = await page.waitForSelector("daikin-pagination", {
      state: "visible",
    });

    await page.getByLabel("Left chevron").focus();

    // take screenshot and check for diffs
    await expect(page).toHaveScreenshot(await clipFor(element));
  });

  test("hover right chevron", async ({ page }) => {
    await page.goto(activePage2Url);

    // wait for element to be visible
    const element = await page.waitForSelector("daikin-pagination", {
      state: "visible",
    });

    await page.getByLabel("Right chevron").hover();

    // take screenshot and check for diffs
    await expect(page).toHaveScreenshot(await clipFor(element));
  });

  test("focus right chevron", async ({ page }) => {
    await page.goto(activePage2Url);

    // wait for element to be visible
    const element = await page.waitForSelector("daikin-pagination", {
      state: "visible",
    });

    await page.getByLabel("Right chevron").focus();

    // take screenshot and check for diffs
    await expect(page).toHaveScreenshot(await clipFor(element));
  });
});
