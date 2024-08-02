import { createRequire } from "node:module";
import { it } from "vitest";

it("the package can be resolved", ({ expect }) => {
  // Note that this test requires the package built beforehand - run `npm run build` before running the test.

  const require = createRequire(import.meta.url);

  expect(() =>
    require.resolve("@daikin-oss/design-system-web-components")
  ).not.toThrow();
  expect(() =>
    require.resolve("@daikin-oss/design-system-web-components/index.js")
  ).not.toThrow();
  expect(() =>
    require.resolve("@daikin-oss/design-system-web-components/colors.js")
  ).not.toThrow();
  expect(() =>
    require.resolve(
      "@daikin-oss/design-system-web-components/components/index.js"
    )
  ).not.toThrow();
  expect(() =>
    require.resolve(
      "@daikin-oss/design-system-web-components/components/button/index.js"
    )
  ).not.toThrow();
  expect(() =>
    require.resolve(
      "@daikin-oss/design-system-web-components/components/button/daikin-button.js"
    )
  ).not.toThrow();

  // Without extensions
  expect(() =>
    require.resolve("@daikin-oss/design-system-web-components/index")
  ).not.toThrow();
  expect(() =>
    require.resolve("@daikin-oss/design-system-web-components/colors")
  ).not.toThrow();
  expect(() =>
    require.resolve(
      "@daikin-oss/design-system-web-components/components/button/daikin-button"
    )
  ).not.toThrow();

  // Error - Directories
  expect(() =>
    require.resolve("@daikin-oss/design-system-web-components/components")
  ).toThrow();

  // Error - Invalid extension
  expect(() =>
    require.resolve("@daikin-oss/design-system-web-components/index.cjs")
  ).toThrow();
  expect(() =>
    require.resolve("@daikin-oss/design-system-web-components/index.mjs")
  ).toThrow();
  expect(() =>
    require.resolve("@daikin-oss/design-system-web-components/index.ts")
  ).toThrow();

  // Error - Invalid import path
  expect(() =>
    require.resolve("@daikin-oss/design-system-web-components/not-exists.js")
  ).toThrow();
  expect(() =>
    require.resolve("@daikin-oss/design-system-web-components/not-exists")
  ).toThrow();
  expect(() =>
    require.resolve("@daikin-oss/design-system-web-components/dist/index.js")
  ).toThrow();
  expect(() =>
    require.resolve("@daikin-oss/design-system-web-components/dist/index")
  ).toThrow();
  expect(() =>
    require.resolve("@daikin-oss/design-system-web-components/dist/colors.js")
  ).toThrow();
  expect(() =>
    require.resolve("@daikin-oss/design-system-web-components/dist/colors")
  ).toThrow();

  // Error - Invalid import path - Filesystem paths are not import paths
  expect(() =>
    require.resolve(
      "@daikin-oss/design-system-web-components/dist/cjs/colors.cjs"
    )
  ).toThrow();
  expect(() =>
    require.resolve(
      "@daikin-oss/design-system-web-components/dist/cjs-dev/colors.cjs"
    )
  ).toThrow();
  expect(() =>
    require.resolve(
      "@daikin-oss/design-system-web-components/dist/es/colors.js"
    )
  ).toThrow();
  expect(() =>
    require.resolve(
      "@daikin-oss/design-system-web-components/dist/es-dev/colors.js"
    )
  ).toThrow();
});
