import {
  type InferStorybookArgTypes,
  clipFor,
  describeEach,
  getStorybookIframeURL,
} from "#tests/visual";
import { expect, test } from "@playwright/test";
import type { DAIKIN_LINK_ARG_TYPES } from "./stories/common";

type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_LINK_ARG_TYPES>;

const getPageURL = (story: "default" | "with-sentence", args: StoryArgs = {}) =>
  getStorybookIframeURL(`components-link--${story}`, args);

// FIXME: VRT is not implemented for `:visited` styles, as it will require `launchPersistentContext` which cannot be done with containers.
describeEach(["light", "dark"] as const, (theme) => {
  describeEach(["default", "exist"] as const, (sentence) => {
    const story = sentence === "default" ? "default" : "with-sentence";
    const containerSelector =
      sentence === "exist" ? "p[data-testid='link-container']" : null;

    describeEach(["none", "left", "right"] as const, (icon) => {
      const baseArgs = {
        $theme: theme,
        ...(icon === "right" && {
          rightIcon: "positive",
        }),
        ...(icon === "left" && {
          leftIcon: "positive",
        }),
      };
      const baseURL = getPageURL(story, baseArgs);

      test("base", async ({ page }) => {
        await page.goto(baseURL);

        // wait for element to be visible
        const container = containerSelector
          ? await page.waitForSelector(containerSelector, {
              state: "visible",
            })
          : null;
        const element = await page.waitForSelector("daikin-link", {
          state: "visible",
        });

        // take screenshot and check for diffs
        await expect(page).toHaveScreenshot(
          await clipFor(container ?? element)
        );
      });

      test("hover", async ({ page }) => {
        await page.goto(baseURL);

        // wait for element to be visible
        const container = containerSelector
          ? await page.waitForSelector(containerSelector, {
              state: "visible",
            })
          : null;
        const element = await page.waitForSelector("daikin-link", {
          state: "visible",
        });

        // hover cursor on the element
        await element.hover();

        // take screenshot and check for diffs
        await expect(page).toHaveScreenshot(
          await clipFor(container ?? element)
        );
      });

      test("press", async ({ page }) => {
        await page.goto(baseURL);

        // wait for element to be visible
        const container = containerSelector
          ? await page.waitForSelector(containerSelector, {
              state: "visible",
            })
          : null;
        const element = await page.waitForSelector("daikin-link", {
          state: "visible",
        });

        // hover cursor on the element and hold down mouse button on the element
        await element.hover();
        await page.mouse.down();

        // take screenshot and check for diffs
        await expect(page).toHaveScreenshot(
          await clipFor(container ?? element)
        );
        await page.mouse.up();
      });

      test("focus", async ({ page }) => {
        await page.goto(baseURL);

        // wait for element to be visible
        const container = containerSelector
          ? await page.waitForSelector(containerSelector, {
              state: "visible",
            })
          : null;
        const element = await page.waitForSelector("daikin-link", {
          state: "visible",
        });

        await page.evaluate((container) => {
          container.focus();
        }, element);

        // take screenshot and check for diffs
        await expect(page).toHaveScreenshot(
          await clipFor(container ?? element)
        );
      });

      test("disabled", async ({ page }) => {
        // load page with disabled=true
        await page.goto(
          getPageURL(story, {
            ...baseArgs,
            disabled: true,
          })
        );

        // wait for element to be visible
        const container = containerSelector
          ? await page.waitForSelector(containerSelector, {
              state: "visible",
            })
          : null;
        const element = await page.waitForSelector("daikin-link", {
          state: "visible",
        });

        // take screenshot and check for diffs
        await expect(page).toHaveScreenshot(
          await clipFor(container ?? element)
        );
      });
    });
  });
});
