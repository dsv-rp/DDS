import { createRequire } from "node:module";
import { it } from "vitest";

it("the package can be resolved", ({ expect }) => {
  // Note that this test requires the package built beforehand - run `npm run build` before running the test.

  const require = createRequire(import.meta.url);

  expect(() =>
    require.resolve("@daikin-oss/design-system-web-components")
  ).not.toThrow();
  expect(() =>
    require.resolve("@daikin-oss/design-system-web-components/dist/index.js")
  ).not.toThrow();
  expect(() =>
    require.resolve("@daikin-oss/design-system-web-components/dist/colors.js")
  ).not.toThrow();
  expect(() =>
    require.resolve(
      "@daikin-oss/design-system-web-components/dist/components/index.js"
    )
  ).not.toThrow();
  expect(() =>
    require.resolve(
      "@daikin-oss/design-system-web-components/dist/components/button/index.js"
    )
  ).not.toThrow();
  expect(() =>
    require.resolve(
      "@daikin-oss/design-system-web-components/dist/components/button/daikin-button.js"
    )
  ).not.toThrow();

  // Error - Missing extension
  expect(() =>
    require.resolve("@daikin-oss/design-system-web-components/dist")
  ).toThrow();
  expect(() =>
    require.resolve("@daikin-oss/design-system-web-components/dist/index")
  ).toThrow();
  expect(() =>
    require.resolve("@daikin-oss/design-system-web-components/dist/colors")
  ).toThrow();
  expect(() =>
    require.resolve("@daikin-oss/design-system-web-components/dist/components")
  ).toThrow();
  expect(() =>
    require.resolve(
      "@daikin-oss/design-system-web-components/dist/components/button/daikin-button"
    )
  ).toThrow();

  // Error - Invalid extension
  expect(() =>
    require.resolve("@daikin-oss/design-system-web-components/dist/index.cjs")
  ).toThrow();
  expect(() =>
    require.resolve("@daikin-oss/design-system-web-components/dist/index.mjs")
  ).toThrow();
  expect(() =>
    require.resolve("@daikin-oss/design-system-web-components/dist/index.ts")
  ).toThrow();

  // Error - Invalid import path
  expect(() =>
    require.resolve("@daikin-oss/design-system-web-components/index.js")
  ).toThrow();
  expect(() =>
    require.resolve("@daikin-oss/design-system-web-components/index")
  ).toThrow();
  expect(() =>
    require.resolve("@daikin-oss/design-system-web-components/colors.js")
  ).toThrow();
  expect(() =>
    require.resolve("@daikin-oss/design-system-web-components/colors")
  ).toThrow();
});
