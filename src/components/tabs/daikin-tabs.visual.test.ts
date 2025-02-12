// import {
//   clipFor,
//   describeEach,
//   getStorybookIframeURL,
//   type InferStorybookArgTypes,
// } from "#tests/visual";
// import { expect, test } from "@playwright/test";
// import type { DAIKIN_TABS_ARG_TYPES } from "./stories/common";

// type StoryArgs = InferStorybookArgTypes<typeof DAIKIN_TABS_ARG_TYPES>;

// const getPageURL = (
//   base: "default" | "fit" | "scrollable",
//   args: StoryArgs = {}
// ) => getStorybookIframeURL(`components-tabs--${base}`, args);

// describeEach(["light", "dark"] as const, (theme) => {
//   describeEach(["default", "fit", "scrollable"] as const, (base) => {
//     const targetTabs = {
//       default: ["foo", "baz"],
//       fit: ["foo"],
//       scrollable: ["tab1", "tab10", "tab20"],
//     }[base];

//     describeEach(targetTabs, (selectedTab) => {
//       const baseArgs = {
//         $theme: theme,
//         value: selectedTab,
//       };
//       const baseURL = getPageURL(base, baseArgs);

//       test("base", async ({ page }) => {
//         await page.goto(baseURL);

//         // wait for element to be visible
//         const element = await page.waitForSelector("daikin-tabs", {
//           state: "visible",
//         });

//         // take screenshot and check for diffs
//         await expect(page).toHaveScreenshot(await clipFor(element));
//       });
//     });
//   });
// });
