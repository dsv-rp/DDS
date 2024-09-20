---
"@daikin-oss/design-system-web-components": minor
---

**BREAKING CHANGE** Button: The `role` attribute/property is renamed to `button-role` attribute and `buttonRole` property to avoid conflicts with standard HTML attributes.
**BREAKING CHANGE** Button: The `size` attribute now accepts values of `"medium"` and `"small"`, instead of `"default"` and `"condensed"`.
**BREAKING CHANGE** Button: The `variant` attribute now accepts values of `"fill"`, `"outline"` and `"ghost"`, instead of `"primary"`, `"secondary"`, `"tertiary"` and `"primaryDanger"`.
**BREAKING CHANGE** Button: The `isLoading` attribute has been removed.
**BREAKING CHANGE** Button: The `leftIcon` and `rightIcon` attributes have been renamed to `left-icon` and `right-icon` respectively.
**BREAKING CHANGE** Button: The `type` attribute now accepts `"link"`, and whether the button becomes a link is now determined by the `type` attribute, not by the presence of the `href` attribute.
Button: Added `color` attribute that accepts values of `"default"` and `"danger"`.
Button: Updated appearance. (DDS-1284)
