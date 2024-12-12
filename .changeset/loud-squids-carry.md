---
"@daikin-oss/design-system-web-components": minor
---

**BREAKING CHANGE** The `@daikin-oss/design-system-web-components` package now requires `@daikin-oss/dds-tokens` package as a peer dependency.
**BREAKING CHANGE** The `colors.js` file, which exported colors, has been removed. Please use `@daikin-oss/dds-tokens` instead.
**BREAKING CHANGE** Icon, Tooltip: Changed the prefix for CSS custom properties to `--ddc-` from `--dds-` to avoid conflicts.
