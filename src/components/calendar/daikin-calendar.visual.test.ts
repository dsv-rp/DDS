import {
  clipFor,
  describeEach,
  getStorybookIframeURL,
  type InferStorybookArgTypes,
} from "#tests/visual";
import { expect, test, type Page } from "@playwright/test";
import type { DAIKIN_CALENDER_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_CALENDER_ARG_TYPES>;

const getPageURL = (args: StoryArgs = {}) =>
  getStorybookIframeURL("components-calendar--default", args);

const base = async (page: Page, baseURL: string) => {
  await page.clock.setFixedTime(new Date("2025-01-10T00:00:00.000Z"));
  await page.goto(baseURL);

  // wait for element to be visible
  const element = await page.waitForSelector("daikin-calendar", {
    state: "visible",
  });

  // take screenshot and check for diffs
  await expect(page).toHaveScreenshot(await clipFor(element));
};

describeEach(["light", "dark"] as const, (theme) => {
  describeEach(["year", "month", "date"] as const, (view) => {
    describeEach(["full", "short"] as const, (range) => {
      describeEach(["normal", "selected"] as const, (selected) => {
        const baseArgs = {
          $theme: theme,
          view,
          ...(range === "short" && {
            min: "2019-12-13",
            max: "2020-02-05",
            defaultValue: "2019-12-20",
          }),
          isVrtSelected: selected === "selected",
        };

        const baseURL = getPageURL(baseArgs);

        test("base", async ({ page }) => {
          await base(page, baseURL);
        });
      });
    });
  });
});
