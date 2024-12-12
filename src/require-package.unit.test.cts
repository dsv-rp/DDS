// @ts-expect-error Vitest only supports `import` even with CommonJS
import { it } from "vitest";

// Note that these tests require the package built beforehand - run `npm run build` before running the test.

// This test fails because lit is ESM only - To use our package from CJS, we have to require individual files.
it.fails("the index.js can be required", ({ expect }) => {
  expect(() => {
    require("@daikin-oss/design-system-web-components");
  }).not.toThrow();
});
