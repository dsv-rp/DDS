import { it } from "vitest";

it("the colors.js can be required", ({ expect }) => {
  // Note that this test requires the package built beforehand - run `npm run build` before running the test.

  expect(() => {
    require("@daikin-oss/design-system-web-components/dist/colors.js");
  }).not.toThrow();
});
