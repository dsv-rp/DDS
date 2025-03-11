# @daikin-oss/design-system-web-components

## 1.0.0

### Major Changes

- [#156](https://github.com/dsv-rp/DDS/pull/156) [`bb71fa8`](https://github.com/dsv-rp/DDS/commit/bb71fa8316e179b8e7d8b1944123bc9198b51734) Thanks [@yodas7](https://github.com/yodas7)! - v1 Release.

### Minor Changes

- [#98](https://github.com/dsv-rp/DDS/pull/98) [`b5d0822`](https://github.com/dsv-rp/DDS/commit/b5d08224b88151d9be875f3d2ccb195fe71ce9fe) Thanks [@poetrainy](https://github.com/poetrainy)! - **BREAKING CHANGE** Tooltip: The `variant` attribute has been replaced by the `color` attribute, which accepts `default` and `inverse` instead of `light` and `dark`.
  Tooltip: Replaced colors with design tokens (brings dark mode support).
  Tooltip: Update appearance.

- [#143](https://github.com/dsv-rp/DDS/pull/143) [`42c0a7f`](https://github.com/dsv-rp/DDS/commit/42c0a7f06ae2b39e9207a554549fd52f95fc0649) Thanks [@rinjInTokyo](https://github.com/rinjInTokyo)! - **BREAKING CHANGE** Radio Group: Fixed an issue where the `"horizontal"` and `"vertical"` of the `orientation` property were switched. Also, the default value is now `"vertical"`.

- [#109](https://github.com/dsv-rp/DDS/pull/109) [`f08378f`](https://github.com/dsv-rp/DDS/commit/f08378f746e93529d10ce40f9075e4e783b7e7dc) Thanks [@poetrainy](https://github.com/poetrainy)! - Carousel: Initial Implementation. (DDS-1296)

- [#124](https://github.com/dsv-rp/DDS/pull/124) [`2695f01`](https://github.com/dsv-rp/DDS/commit/2695f0162180baeff767334de5a13a0128bad8bc) Thanks [@poetrainy](https://github.com/poetrainy)! - Carousel Item: Added `title` and `description` slots. (DDS-1820)

- [#117](https://github.com/dsv-rp/DDS/pull/117) [`b45a524`](https://github.com/dsv-rp/DDS/commit/b45a524ed060a415621a4a57e1de8efb3925723b) Thanks [@poetrainy](https://github.com/poetrainy)! - **BREAKING CHANGE** Accordion Item: The `open` attribute is now controlled by the parent `<daikin-accordion>` element.
  Accordion: The `openItems` and `exclusive` attributes have been added.
  Accordion Item: The `name` attribute has been added.

- [#130](https://github.com/dsv-rp/DDS/pull/130) [`80374c3`](https://github.com/dsv-rp/DDS/commit/80374c3e3330798ccc5385eacbb5b8c91a53d0dd) Thanks [@rinjInTokyo](https://github.com/rinjInTokyo)! - **BREAKING CHANGE** Icon: Removed arrowUp icon. (DDS-1822)

- [#132](https://github.com/dsv-rp/DDS/pull/132) [`c8e2137`](https://github.com/dsv-rp/DDS/commit/c8e2137ada522398f0f88c7046db309542f56116) Thanks [@poetrainy](https://github.com/poetrainy)! - **BREAKING CHANGE** Tree: The selection status of the tree items is now managed by `selectedItems` property of `daikin-tree`. (DDS-1869)
  **BREAKING CHANGE** Tree: The `selected` property has been removed. Use `selectedItems` instead. (DDS-1869)
  Tree: Updated appearance. (DDS-1869)

### Patch Changes

- [#119](https://github.com/dsv-rp/DDS/pull/119) [`1071b92`](https://github.com/dsv-rp/DDS/commit/1071b9250ed147f76ddf4bb402368897078c9d4b) Thanks [@poetrainy](https://github.com/poetrainy)! - **BREAKING CHANGE** Notification: The notification component has been removed and split into inline notification and toast notification.
  Toast Notification: Initial Implementation. (DDS-1172)
  Inline Notification: Initial Implementation. (DDS-1362)

- [#151](https://github.com/dsv-rp/DDS/pull/151) [`bc99ad1`](https://github.com/dsv-rp/DDS/commit/bc99ad16878f12a4003ea7374971faca3293cbbb) Thanks [@yodas7](https://github.com/yodas7)! - Detect multiple registrations and display a warning if the versions are different.

- [#116](https://github.com/dsv-rp/DDS/pull/116) [`49fbc4b`](https://github.com/dsv-rp/DDS/commit/49fbc4bb39d3c1c39d0486f43cc9f9945fdbe794) Thanks [@rinjInTokyo](https://github.com/rinjInTokyo)! - Pagination: Updated appearance.

- [#128](https://github.com/dsv-rp/DDS/pull/128) [`9e27a56`](https://github.com/dsv-rp/DDS/commit/9e27a565eb2e2f6f9b6781645d6fb04640930a16) Thanks [@poetrainy](https://github.com/poetrainy)! - Progress Bar: Updated appearance. (DDS-1865)

- [#118](https://github.com/dsv-rp/DDS/pull/118) [`b3c90a8`](https://github.com/dsv-rp/DDS/commit/b3c90a8f69b1144e9631c258b7b96bc792e8b7f2) Thanks [@poetrainy](https://github.com/poetrainy)! - Progress Bar: Updated appearance.

- [#133](https://github.com/dsv-rp/DDS/pull/133) [`396b75f`](https://github.com/dsv-rp/DDS/commit/396b75f0e6d9b271024ac35f502596fd7324e933) Thanks [@poetrainy](https://github.com/poetrainy)! - Checkbox: Added a slot to override the label. The behavior does not change if the slot is not used. (DDS-1859)
  Checkbox: Fixed an issue where the size of the component could not be changed. (DDS-1859)
  Checkbox: Updated appearance. (DDS-1859)

- [#139](https://github.com/dsv-rp/DDS/pull/139) [`08c7ebb`](https://github.com/dsv-rp/DDS/commit/08c7ebbfc375e22fa6dec58afc8eda84fc2e2b98) Thanks [@rinjInTokyo](https://github.com/rinjInTokyo)! - List: Updated documentation. (DDS-1838)

- [#113](https://github.com/dsv-rp/DDS/pull/113) [`d379004`](https://github.com/dsv-rp/DDS/commit/d3790049271f9a7c120991335428a48f229bab65) Thanks [@rinjInTokyo](https://github.com/rinjInTokyo)! - Checkbox: Fixed an issue where clicking the label triggers click event twice. (DDS-1679)
  Radio Button: Fixed an issue where clicking the label triggers click event twice. (DDS-1679)

- [#125](https://github.com/dsv-rp/DDS/pull/125) [`551d75d`](https://github.com/dsv-rp/DDS/commit/551d75dfd75794e0761905921d927493dc18e8fb) Thanks [@poetrainy](https://github.com/poetrainy)! - Input Group: Updated appearance. (DDS-1862)

- [#137](https://github.com/dsv-rp/DDS/pull/137) [`a92d21b`](https://github.com/dsv-rp/DDS/commit/a92d21ba7f81e8b4e0dd110753e8bbc6df3bafb4) Thanks [@poetrainy](https://github.com/poetrainy)! - Tabs: The `sizing` attribute has been added. (DDS-1889)
  Tab: Updated appearance. (DDS-1889)

- [#126](https://github.com/dsv-rp/DDS/pull/126) [`6f602fd`](https://github.com/dsv-rp/DDS/commit/6f602fd5c3fcab05fdb7d208d6a5aa298351a318) Thanks [@poetrainy](https://github.com/poetrainy)! - Radio Group: Updated appearance. (DDS-1860)
  Radio: Added a slot to override the label. The behavior does not change if the slot is not used. (DDS-1860)
  Radio: Fixed an issue where the size of the component could not be changed. (DDS-1860)

- [#123](https://github.com/dsv-rp/DDS/pull/123) [`5f75fc5`](https://github.com/dsv-rp/DDS/commit/5f75fc5fa9207762744e55d079ccfbdc74413a36) Thanks [@poetrainy](https://github.com/poetrainy)! - Card: Fixed an issue where the size of the component could not be changed. (DDS-1871)
  Card: Updated appearance. (DDS-1871)

- [#127](https://github.com/dsv-rp/DDS/pull/127) [`146ce67`](https://github.com/dsv-rp/DDS/commit/146ce670de011022ae5fa70debea6bd5db436bcf) Thanks [@poetrainy](https://github.com/poetrainy)! - Select: Updated appearance. (DDS-1872)

- [#140](https://github.com/dsv-rp/DDS/pull/140) [`40d58de`](https://github.com/dsv-rp/DDS/commit/40d58de5f4d8e67d52878c116ef69df4006f1c16) Thanks [@poetrainy](https://github.com/poetrainy)! - Progress Indicator: The `status` property of `<daikin-progress-indicator-item>` is now controlled by the `currentItem` property of the parent `<daikin-progress-indicator>` element. (DDS-1866)

- [#138](https://github.com/dsv-rp/DDS/pull/138) [`4556342`](https://github.com/dsv-rp/DDS/commit/455634225da4fcabd79ca209b286d61700309d17) Thanks [@rinjInTokyo](https://github.com/rinjInTokyo)! - Link: Fixed an issue where the color was incorrect in Firefox. (DDS-1823)

- [#131](https://github.com/dsv-rp/DDS/pull/131) [`cf6fa55`](https://github.com/dsv-rp/DDS/commit/cf6fa55a6f6b0700238fb031643fb4b50cf8d8a0) Thanks [@rinjInTokyo](https://github.com/rinjInTokyo)! - Pagination: Updated appearance. (DDS-1845)
  Pagination: Added ARIA role. (DDS-1845)

- [#149](https://github.com/dsv-rp/DDS/pull/149) [`9edd37a`](https://github.com/dsv-rp/DDS/commit/9edd37a53f1fcedb590fe1cab307123e2aac77a7) Thanks [@poetrainy](https://github.com/poetrainy)! - Link: Updated appearance.

- [#141](https://github.com/dsv-rp/DDS/pull/141) [`bca6b9f`](https://github.com/dsv-rp/DDS/commit/bca6b9fd9a39c6a1de93d195e3fe71354fb8d43c) Thanks [@rinjInTokyo](https://github.com/rinjInTokyo)! - Storybook: Changed the order of the properties in the Controls tab. (DDS-1907)

- [#115](https://github.com/dsv-rp/DDS/pull/115) [`91b8fe9`](https://github.com/dsv-rp/DDS/commit/91b8fe94b3262bd6197428e66192d7b9555b1d09) Thanks [@poetrainy](https://github.com/poetrainy)! - Progress Indicator: Updated appearance.

- [#122](https://github.com/dsv-rp/DDS/pull/122) [`94e5885`](https://github.com/dsv-rp/DDS/commit/94e588554b5e11d41f5dc86cada75b2dd2d41c9d) Thanks [@yodas7](https://github.com/yodas7)! - Updated dependencies.
  This also resolves the problem of some Storybook pages not being able to be opened in Safari.

- [#135](https://github.com/dsv-rp/DDS/pull/135) [`4423787`](https://github.com/dsv-rp/DDS/commit/4423787fcf28f297022690b8bbca3c135742b68f) Thanks [@rinjInTokyo](https://github.com/rinjInTokyo)! - Accordion: Fixed bugs when viewing in Safari. (DDS-1837)
  Accordion: The contents of closed accordions will no longer be found by in-page search.
  Accordion: Updated appearance. (DDS-1837)

- [#129](https://github.com/dsv-rp/DDS/pull/129) [`9042252`](https://github.com/dsv-rp/DDS/commit/9042252d31641f7bd08bc4cc7f61634cff24b3d3) Thanks [@rinjInTokyo](https://github.com/rinjInTokyo)! - Button: Set the maximum width by default. (DDS-1821)
  Button: Fixed an issue where click events could be propagated through disabled links. (DDS-1821)

- [#134](https://github.com/dsv-rp/DDS/pull/134) [`4c49e5e`](https://github.com/dsv-rp/DDS/commit/4c49e5ee305b5f169186245441bd27da8352c748) Thanks [@poetrainy](https://github.com/poetrainy)! - Text Area: Updated appearance. (DDS-1863)

- [#152](https://github.com/dsv-rp/DDS/pull/152) [`65fb740`](https://github.com/dsv-rp/DDS/commit/65fb74071e23e13ca981b76662cff3877d051e79) Thanks [@poetrainy](https://github.com/poetrainy)! - Tabs: Updated appearance. (DDS-1931)

- [#145](https://github.com/dsv-rp/DDS/pull/145) [`fcba2a4`](https://github.com/dsv-rp/DDS/commit/fcba2a4161f164c4301fba97c00097dbffe1ccc0) Thanks [@rinjInTokyo](https://github.com/rinjInTokyo)! - Radio Group: Added support for reflecting the `disabled` property of the Input Group component. (DDS-1829)
  Radio Group: Elements now wrap rather than overflow when placed horizontally. (DDS-1829)

- [#136](https://github.com/dsv-rp/DDS/pull/136) [`a148bc4`](https://github.com/dsv-rp/DDS/commit/a148bc4fa4ea8ee2a44efc45f8739513d5dc6065) Thanks [@poetrainy](https://github.com/poetrainy)! - Table: Updated appearance. (DDS-1857)

## 0.7.0

### Minor Changes

- [#100](https://github.com/dsv-rp/DDS/pull/100) [`b26b122`](https://github.com/dsv-rp/DDS/commit/b26b122562a2dc6400d91026fd9e04e6d4b5f324) Thanks [@poetrainy](https://github.com/poetrainy)! - Progress Indicator: Updated appearance. (DDS-1302)

- [#104](https://github.com/dsv-rp/DDS/pull/104) [`c01e66d`](https://github.com/dsv-rp/DDS/commit/c01e66d51936cb04d46e5daf7ca6239ca85826ba) Thanks [@poetrainy](https://github.com/poetrainy)! - **BREAKING CHANGE** Breadcrumb: The `trailing-slash` and `overflow` attributes have been removed. (DDS-1642)
  **BREAKING CHANGE** Breadcrumb Item: The `trailing-slash` attribute has been removed. (DDS-1642)
  **BREAKING CHANGE** Breadcrumb Item: The `ellipsis` value of the `variant` attribute has been removed. In addition, the `current` value has been added. (DDS-1642)
  Breadcrumb: The `show-visited` attribute has been added. (DDS-1642)
  Breadcrumb: Updated appearance. (DDS-1642)
  Breadcrumb Item: The `show-visited` attribute has been added. (DDS-1642)
  Breadcrumb Item: Updated appearance. (DDS-1642)

- [#105](https://github.com/dsv-rp/DDS/pull/105) [`63cf888`](https://github.com/dsv-rp/DDS/commit/63cf8884649d46837e4012b9d85913dd7bf0cd5f) Thanks [@yodas7](https://github.com/yodas7)! - **BREAKING CHANGE** The `@daikin-oss/design-system-web-components` package now requires `@daikin-oss/dds-tokens` package as a peer dependency.
  **BREAKING CHANGE** The `colors.js` file, which exported colors, has been removed. Please use `@daikin-oss/dds-tokens` instead.
  **BREAKING CHANGE** Icon, Tooltip: Changed the prefix for CSS custom properties to `--ddc-` from `--dds-` to avoid conflicts.

- [#73](https://github.com/dsv-rp/DDS/pull/73) [`18a71f6`](https://github.com/dsv-rp/DDS/commit/18a71f6a86fd4bc1cf04172b0e646a657048cd42) Thanks [@poetrainy](https://github.com/poetrainy)! - Tree: Initial Implementation.

- [#99](https://github.com/dsv-rp/DDS/pull/99) [`0efff7a`](https://github.com/dsv-rp/DDS/commit/0efff7a021f73388d22f50df96be833a4b446ae7) Thanks [@poetrainy](https://github.com/poetrainy)! - Input Group: Updated appearance.
  Progress bar: Updated appearance.

- [#107](https://github.com/dsv-rp/DDS/pull/107) [`2af6462`](https://github.com/dsv-rp/DDS/commit/2af646292808a87f5095f7d97e7647dde3ac2260) Thanks [@yodas7](https://github.com/yodas7)! - Accordion: Replaced colors with design tokens (brings dark mode support).
  Breadcrumb: Replaced colors with design tokens (brings dark mode support).
  Button: Replaced colors with design tokens (brings dark mode support).
  Checkbox: Replaced colors with design tokens (brings dark mode support).
  Dropdown: Replaced colors with design tokens (brings dark mode support).
  Icon: Replaced colors with design tokens (brings dark mode support).
  Icon Button: Replaced colors with design tokens (brings dark mode support).
  Input Group: Replaced colors with design tokens (brings dark mode support).
  Link: Replaced colors with design tokens (brings dark mode support).
  List: Replaced colors with design tokens (brings dark mode support).
  Notification: Replaced colors with design tokens (brings dark mode support).
  Pagination: Replaced colors with design tokens (brings dark mode support).
  Progress Bar: Replaced colors with design tokens (brings dark mode support).
  Progress Indicator: Replaced colors with design tokens (brings dark mode support).
  Radio Button: Replaced colors with design tokens (brings dark mode support).
  Select: Replaced colors with design tokens (brings dark mode support).
  Tab: Replaced colors with design tokens (brings dark mode support).
  Table: Replaced colors with design tokens (brings dark mode support).
  Text Area: Replaced colors with design tokens (brings dark mode support).
  Text Field: Replaced colors with design tokens (brings dark mode support).
  Toggle: Replaced colors with design tokens (brings dark mode support).
  Tree: Replaced colors with design tokens (brings dark mode support).

### Patch Changes

- [#111](https://github.com/dsv-rp/DDS/pull/111) [`598656f`](https://github.com/dsv-rp/DDS/commit/598656fc3851ac15461ffff9ca228fa9ad904deb) Thanks [@rinjInTokyo](https://github.com/rinjInTokyo)! - Card: Initial Implementation. (DDS-1209)

- [#110](https://github.com/dsv-rp/DDS/pull/110) [`5d5db6b`](https://github.com/dsv-rp/DDS/commit/5d5db6b2990aae84511f5c4e721d101dc7887153) Thanks [@poetrainy](https://github.com/poetrainy)! - Icon Button: Fixed the issue where the size could not be changed. (DDS-1650)

- [#101](https://github.com/dsv-rp/DDS/pull/101) [`5150ef1`](https://github.com/dsv-rp/DDS/commit/5150ef1db56729b0adabbc3b246303241af7eed6) Thanks [@poetrainy](https://github.com/poetrainy)! - Text Area: Updated appearance. (DDS-1290)

- [#103](https://github.com/dsv-rp/DDS/pull/103) [`12fcb40`](https://github.com/dsv-rp/DDS/commit/12fcb406567c1a436f3ac39887096e91d63130da) Thanks [@poetrainy](https://github.com/poetrainy)! - Link: Fixed underline not shown correctly with line breaks.

- [#112](https://github.com/dsv-rp/DDS/pull/112) [`ffdda1e`](https://github.com/dsv-rp/DDS/commit/ffdda1eabd3e3e19dd9fe0929c390c9b56ae3340) Thanks [@poetrainy](https://github.com/poetrainy)! - Button: Updated appearance.

## 0.6.0

### Minor Changes

- [#89](https://github.com/dsv-rp/DDS/pull/89) [`c9bd3a7`](https://github.com/dsv-rp/DDS/commit/c9bd3a77932d1f4c3f2547f35daa7b026eff7a08) Thanks [@poetrainy](https://github.com/poetrainy)! - Dropdown: Update appearance.
  Select: Update appearance.
  Text Area: Update appearance.
  Text Input: Update appearance.

- [#53](https://github.com/dsv-rp/DDS/pull/53) [`651bc76`](https://github.com/dsv-rp/DDS/commit/651bc767f92be4a5b48b4c8c48b3378ef0e13855) Thanks [@yodas7](https://github.com/yodas7)! - **BREAKING CHANGE** Some attributes and properties have been renamed or removed.

  The following attributes (not properties) have been renamed to kebab case:

  - `<daikin-notification>`: ~~`closeButton`~~ -> `close-button`

- [#91](https://github.com/dsv-rp/DDS/pull/91) [`a188387`](https://github.com/dsv-rp/DDS/commit/a188387a0da9a452be1ebad4898a54c205d73b8e) Thanks [@poetrainy](https://github.com/poetrainy)! - **BREAKING CHANGE** Dropdown: The `label` attribute has been removed.

### Patch Changes

- [#95](https://github.com/dsv-rp/DDS/pull/95) [`0d78d58`](https://github.com/dsv-rp/DDS/commit/0d78d585963b229c68971d7558b63c2c7d073db9) Thanks [@poetrainy](https://github.com/poetrainy)! - Tooltip: Fixed an issue where the tooltip would remain opened after clicking on the trigger element. (DDS-1631)

- [#88](https://github.com/dsv-rp/DDS/pull/88) [`90e1625`](https://github.com/dsv-rp/DDS/commit/90e1625f6455b60670920e397a51370eba70ace8) Thanks [@poetrainy](https://github.com/poetrainy)! - **BREAKING CHANGE** Icon: The `size` attribute now defaults to `current`.
  Icon Button: Add Icon Button Component. (DDS-1536)
  Icon: The `size` attribute now accepts `current` , which references `--dds-icon-size` CSS variable.

- [#96](https://github.com/dsv-rp/DDS/pull/96) [`bdd827f`](https://github.com/dsv-rp/DDS/commit/bdd827fe1bc400de68f11a63bb6312d368cdadd9) Thanks [@poetrainy](https://github.com/poetrainy)! - Accordion: Update appearance.

- [#49](https://github.com/dsv-rp/DDS/pull/49) [`c1f44f8`](https://github.com/dsv-rp/DDS/commit/c1f44f825e0de8422be87a3efdae2e1e84d5d4da) Thanks [@rinjInTokyo](https://github.com/rinjInTokyo)! - Add pagination component

- [#79](https://github.com/dsv-rp/DDS/pull/79) [`2e351b8`](https://github.com/dsv-rp/DDS/commit/2e351b8137f5d0aac1c5feb9520d25e35e81f138) Thanks [@yodas7](https://github.com/yodas7)! - Correct package type definitions. (DDS-1529)

- [#93](https://github.com/dsv-rp/DDS/pull/93) [`39a5a8f`](https://github.com/dsv-rp/DDS/commit/39a5a8f27079610bf62094486888b9c7c0af3416) Thanks [@poetrainy](https://github.com/poetrainy)! - Link: Initial Implementation. (DDS-1600)

- [#85](https://github.com/dsv-rp/DDS/pull/85) [`82b4fa9`](https://github.com/dsv-rp/DDS/commit/82b4fa95c1c9c60640ca3ce3d336ed00485908e4) Thanks [@rinjInTokyo](https://github.com/rinjInTokyo)! - Modified the descriptions of some properties.

- [#44](https://github.com/dsv-rp/DDS/pull/44) [`d51e2ee`](https://github.com/dsv-rp/DDS/commit/d51e2eed13d3772542fb8141bb524489e2570602) Thanks [@poetrainy](https://github.com/poetrainy)! - Add Table Component.

## 0.5.0

### Minor Changes

- [#80](https://github.com/dsv-rp/DDS/pull/80) [`108e3c1`](https://github.com/dsv-rp/DDS/commit/108e3c152e7ad0589f34eb32f6f0345ec167fb73) Thanks [@poetrainy](https://github.com/poetrainy)! - **BREAKING CHANGE** Tab: The `tablist` CSS part has been removed since we started providing default styles. (DDS-1430)
  Tab: Updated appearance. (DDS-1430)

- [#86](https://github.com/dsv-rp/DDS/pull/86) [`923224e`](https://github.com/dsv-rp/DDS/commit/923224e8f90b34c58e9cd32d88d42b6bb9a4b233) Thanks [@poetrainy](https://github.com/poetrainy)! - Radio: Update appearance. (DDS-1350)
  Checkbox: Update appearance. (DDS-1288)
  Toggle: Update appearance. (DDS-1374)
  Accordion: Update appearance. (DDS-1414)
  List: Update appearance. (DDS-1414)

- [#74](https://github.com/dsv-rp/DDS/pull/74) [`3151097`](https://github.com/dsv-rp/DDS/commit/3151097362d40e58e18e70914c5dd2ee83f6c430) Thanks [@poetrainy](https://github.com/poetrainy)! - **BREAKING CHANGE** Tooltip: The `closeOnClick` attribute has been removed. (DDS-1501)
  **BREAKING CHANGE** Tooltip: The `trigger` and `tooltip` CSS parts have been removed. (DDS-1501)
  **BREAKING CHANGE** Tooltip: The `tooltip` slot has been renamed to `description` . (DDS-1501)
  Tooltip: The `trigger` attribute now accepts value of `"click"` . (DDS-1501)
  Tooltip: The `popover-value` attribute has been added. (DDS-1501)

- [#64](https://github.com/dsv-rp/DDS/pull/64) [`d0c031d`](https://github.com/dsv-rp/DDS/commit/d0c031d28a6eeac5043546ee01209e86c9f5fc2a) Thanks [@poetrainy](https://github.com/poetrainy)! - **BREAKING CHANGE** Text Area: Renamed Textarea (`daikin-textarea`) to Text Area (`daikin-text-area`). (DDS-1327)
  **BREAKING CHANGE** Text Area: The `maxlength` attribute have been removed. (DDS-1327)
  **BREAKING CHANGE** Input Group: The `textareaCounter` attribute has been removed and the `textareaMaxCount` attribute has been added. (DDS-1327)
  Text Area: The `resizable` , `name` and `error` attributes has been added. (DDS-1327)
  Text Area: Updated appearance. (DDS-1327)

- [#62](https://github.com/dsv-rp/DDS/pull/62) [`94d6548`](https://github.com/dsv-rp/DDS/commit/94d65484625bebb2f17f023bb55b565d29d8c972) Thanks [@poetrainy](https://github.com/poetrainy)! - **BREAKING CHANGE** Text Field: Renamed Text Input to Text Field. (DDS-1325)
  **BREAKING CHANGE** Input Group: The value accepted by `required` attribute has been changed from `boolean` to `string` (DDS-1325)
  Text Field: The `left-icon` and `right-icon` slots have been accepted. (DDS-1325)
  Text Field: Updated appearance. (DDS-1325)
  Input Group: Updated appearance. (DDS-1325)

### Patch Changes

- [#25](https://github.com/dsv-rp/DDS/pull/25) [`2a59211`](https://github.com/dsv-rp/DDS/commit/2a592110b5e5b1aaf23060832403acba21336845) Thanks [@poetrainy](https://github.com/poetrainy)! - Add Dropdown Component.

- [#65](https://github.com/dsv-rp/DDS/pull/65) [`c72d763`](https://github.com/dsv-rp/DDS/commit/c72d76356cb42c36b3c782a12654e95790ecc837) Thanks [@rinjInTokyo](https://github.com/rinjInTokyo)! - Add radio group component. (DDS-1361)

- [#83](https://github.com/dsv-rp/DDS/pull/83) [`9eae0b8`](https://github.com/dsv-rp/DDS/commit/9eae0b866bbff612c33b8920e9dda95835007dc1) Thanks [@poetrainy](https://github.com/poetrainy)! - Add Select Component. (DDS-1566)

- [#47](https://github.com/dsv-rp/DDS/pull/47) [`32ed03c`](https://github.com/dsv-rp/DDS/commit/32ed03cdb2cafb562c57776ac136a3f7be90d8c3) Thanks [@poetrainy](https://github.com/poetrainy)! - Add Progress Indicator Component. (DDS-921)

## 0.4.0

### Minor Changes

- [#72](https://github.com/dsv-rp/DDS/pull/72) [`70391aa`](https://github.com/dsv-rp/DDS/commit/70391aab75eaf72fcf2951b4cb2664d8afa4cbf4) Thanks [@poetrainy](https://github.com/poetrainy)! - Progress Bar: The `size` property has been added. (DDS-1385)
  Progress Bar: Updated appearance. (DDS-1385)

- [#60](https://github.com/dsv-rp/DDS/pull/60) [`b6d7d9f`](https://github.com/dsv-rp/DDS/commit/b6d7d9f4bb5286bb9a8dc719628624dcca3c0f75) Thanks [@poetrainy](https://github.com/poetrainy)! - **BREAKING CHANGE** Checkbox: The `readonly`, `size` and `error` property has been removed. (DDS-1288)
  **BREAKING CHANGE** Checkbox: The `labelPosition` property now removed `"left"` value. (DDS-1288)
  **BREAKING CHANGE** Checkbox: The `labelPosition` attribute (not property) has been renamed to `label-position` . (DDS-1288)
  Checkbox: The `labelPosition` property now accepts `"hidden"` value. (DDS-1288)
  Checkbox: Updated appearance. (DDS-1288)

- [#75](https://github.com/dsv-rp/DDS/pull/75) [`3922068`](https://github.com/dsv-rp/DDS/commit/3922068e28efcd5786f576435f68c35983f252c2) Thanks [@rinjInTokyo](https://github.com/rinjInTokyo)! - Improve breadcrumb accessibility. (DDS-1482)
  **BREAKING CHANGE** Remove `link` slot from `daikin-breadcrumb-item` .

- [#69](https://github.com/dsv-rp/DDS/pull/69) [`3fcbc38`](https://github.com/dsv-rp/DDS/commit/3fcbc38a1affb1f3d50dbfb4e1aeb1fd34f301a7) Thanks [@poetrainy](https://github.com/poetrainy)! - **BREAKING CHANGE** Accordion: The `title` attribute has been removed and replaced with a `summary` slot. (DDS-1414)
  Accordion: Updated appearance. (DDS-1414)
  Accordion Item: Updated appearance. (DDS-1414)

- [#61](https://github.com/dsv-rp/DDS/pull/61) [`36ef955`](https://github.com/dsv-rp/DDS/commit/36ef9551a504de318a51a738b9b6b58edfb7f6f9) Thanks [@poetrainy](https://github.com/poetrainy)! - **BREAKING CHANGE** Radio: The `readonly`, `size` and `error` properties have been removed. (DDS-1350)
  **BREAKING CHANGE** Radio: The `labelPosition` property no longer supports `"left"` . Instead, it now supports `"hidden"` . (DDS-1350)
  **BREAKING CHANGE** Radio: The `labelPosition` attribute (not property) has been renamed to `label-position` .
  Radio: Updated appearance. (DDS-1350)

- [#56](https://github.com/dsv-rp/DDS/pull/56) [`a81916a`](https://github.com/dsv-rp/DDS/commit/a81916ac21c4fec5e85eb1e8bf9005137887a662) Thanks [@poetrainy](https://github.com/poetrainy)! - **BREAKING CHANGE** Button: The `role` attribute/property is renamed to `button-role` attribute and `buttonRole` property to avoid conflicts with standard HTML attributes.
  **BREAKING CHANGE** Button: The `variant` attribute now accepts values of `"fill"` , `"outline"` and `"ghost"` , instead of `"primary"` , `"secondary"` , `"tertiary"` and `"primaryDanger"` .
  **BREAKING CHANGE** Button: The `isLoading` attribute has been removed.
  **BREAKING CHANGE** Button: The `leftIcon` and `rightIcon` attributes have been renamed to `left-icon` and `right-icon` respectively.
  **BREAKING CHANGE** Button: The `type` attribute now accepts `"link"` , and whether the button becomes a link is now determined by the `type` attribute, not by the presence of the `href` attribute. If `href` is omitted with `type="link"` , it is treated as a disabled state.
  Button: Added `color` attribute that accepts values of `"default"` and `"danger"` .
  Button: Updated appearance. (DDS-1284)

- [#50](https://github.com/dsv-rp/DDS/pull/50) [`4a34db7`](https://github.com/dsv-rp/DDS/commit/4a34db738bc08e347a790c0620bc602bbf1eac5b) Thanks [@poetrainy](https://github.com/poetrainy)! - **BREAKING CHANGE** Notification: The `title` and `description` attributes have been removed, and their contents are now specified using slots with the same names.

- [#67](https://github.com/dsv-rp/DDS/pull/67) [`d377f50`](https://github.com/dsv-rp/DDS/commit/d377f5043f8d12c37a28772e44173b0e2a778003) Thanks [@poetrainy](https://github.com/poetrainy)! - **BREAKING CHANGE** Tabs: The name of the component has been changed from `Tab Group` to `Tabs`. Use `<daikin-tabs>` instead of `<daikin-tab-group>`. (DDS-1450)
  **BREAKING CHANGE** Tabs: The signatures of the `beforechange` and `change` events have been updated to match those of other components. (DDS-1450)
  **BREAKING CHANGE** Tab Panels: The name of the component has been changed from `Panel Switcher` to `Tab panels` . Use `<daikin-tab-panels>` instead of `<daikin-panel-switcher>` . (DDS-1450)
  **BREAKING CHANGE** Tab: The `size` property has been removed. (DDS-1450)
  Tab: Updated appearance. (DDS-1450)

- [#63](https://github.com/dsv-rp/DDS/pull/63) [`535464e`](https://github.com/dsv-rp/DDS/commit/535464e625a3edb60e7e94ca867e16b390e3097e) Thanks [@poetrainy](https://github.com/poetrainy)! - **BREAKING CHANGE** Toggle: The `size` and `error` properties has been removed. (DDS-1374)
  Toggle: Updated appearance. (DDS-1374)

### Patch Changes

- [#82](https://github.com/dsv-rp/DDS/pull/82) [`db7f9f3`](https://github.com/dsv-rp/DDS/commit/db7f9f331650d21d07d192d7032fd2689a849e3d) Thanks [@rinjInTokyo](https://github.com/rinjInTokyo)! - Delete Stories area from component documentation page.

- [#77](https://github.com/dsv-rp/DDS/pull/77) [`dce6fa9`](https://github.com/dsv-rp/DDS/commit/dce6fa9128c84d55baf64b3d0ad8f35c4d8ea69c) Thanks [@rinjInTokyo](https://github.com/rinjInTokyo)! - Add component import guideline to documentation.

- [#59](https://github.com/dsv-rp/DDS/pull/59) [`dcfaef3`](https://github.com/dsv-rp/DDS/commit/dcfaef3e5aabe47e61b3ed815d2c74fcb14afc68) Thanks [@yodas7](https://github.com/yodas7)! - Storybook: Improve the code displayed by "Show code".
  Storybook: Added a common description of the event to the beginning of the Events section of the component documentation.

- [#55](https://github.com/dsv-rp/DDS/pull/55) [`5d5c051`](https://github.com/dsv-rp/DDS/commit/5d5c0513febb1c38a500850806c9eef0c210a756) Thanks [@rinjInTokyo](https://github.com/rinjInTokyo)! - Toggle: Fix `checked` property not updated on `change` event. (DDS-1317)
  Tab Group: Fix `value` property not updated on `change` event. (DDS-1317)

- [#45](https://github.com/dsv-rp/DDS/pull/45) [`42f6d1b`](https://github.com/dsv-rp/DDS/commit/42f6d1b27e4020db4e1c286f16d632aa305457d9) Thanks [@poetrainy](https://github.com/poetrainy)! - Text Input: Fixed an issue where the size of components could not be changed. (DDS-1279)
  Textarea: Fixed an issue where the size of components could not be changed. (DDS-1279)

- [#78](https://github.com/dsv-rp/DDS/pull/78) [`fbd2adb`](https://github.com/dsv-rp/DDS/commit/fbd2adbd671a9d928fb92eec7d548260e5bbaa87) Thanks [@poetrainy](https://github.com/poetrainy)! - Toggle: Assign the `switch` role. (DDS-1531)

- [#70](https://github.com/dsv-rp/DDS/pull/70) [`144a2ad`](https://github.com/dsv-rp/DDS/commit/144a2adbe9043f345f88f42c80a0106fcb68f542) Thanks [@poetrainy](https://github.com/poetrainy)! - Add List Component.

## 0.3.2

### Patch Changes

- [#24](https://github.com/dsv-rp/DDS/pull/24) [`b2971f4`](https://github.com/dsv-rp/DDS/commit/b2971f4f4fff45d7615157e00314ea26ccc747f9) Thanks [@rinjInTokyo](https://github.com/rinjInTokyo)! - Add Breadcrumbs Component

- [#42](https://github.com/dsv-rp/DDS/pull/42) [`7db6d0e`](https://github.com/dsv-rp/DDS/commit/7db6d0e0f2f823d9c0ff80e287060b92f32a89ff) Thanks [@yodas7](https://github.com/yodas7)! - Update dependencies.

  - lit: ^3.1.4 -> ^3.2.0

- [#34](https://github.com/dsv-rp/DDS/pull/34) [`dc2640a`](https://github.com/dsv-rp/DDS/commit/dc2640a012c9fb8ab74b969c4721c15a3f814e2c) Thanks [@poetrainy](https://github.com/poetrainy)! - Add Progress Bar Component.

- [#40](https://github.com/dsv-rp/DDS/pull/40) [`d11ec1d`](https://github.com/dsv-rp/DDS/commit/d11ec1d49f9d8c7b9a32582954b9b3f96123c1ef) Thanks [@yodas7](https://github.com/yodas7)! - Include CHANGELOG.md in the package.

- [#29](https://github.com/dsv-rp/DDS/pull/29) [`38a7063`](https://github.com/dsv-rp/DDS/commit/38a706337a4008b163b05fe4f4b90b838b4be4fc) Thanks [@rinjInTokyo](https://github.com/rinjInTokyo)! - Add Tooltip Component.

- [#52](https://github.com/dsv-rp/DDS/pull/52) [`d477bae`](https://github.com/dsv-rp/DDS/commit/d477baec057acf00c42038ebcbd7eeba5a13989e) Thanks [@rinjInTokyo](https://github.com/rinjInTokyo)! - Add document to breadcrumb component.

## 0.3.1

### Patch Changes

- [#38](https://github.com/dsv-rp/DDS/pull/38) [`8be9351`](https://github.com/dsv-rp/DDS/commit/8be93513040a738f36c0ade2d3a7bb2dc7b0d91f) Thanks [@yodas7](https://github.com/yodas7)! - Fix package not released successfully due to the lack of repository field.

## 0.3.0

### Minor Changes

- [#7](https://github.com/dsv-rp/DDS/pull/7) Navigation Tab
- [#18](https://github.com/dsv-rp/DDS/pull/18) Icon
- [#20](https://github.com/dsv-rp/DDS/pull/20) Accordion
- [#30](https://github.com/dsv-rp/DDS/pull/30) Toggle Switch
- Add icon to button component
- Add icon to notification component

### Patch Changes

- [#33](https://github.com/dsv-rp/DDS/pull/33) [`7dabcfc`](https://github.com/dsv-rp/DDS/commit/7dabcfc08dd3bf9f7dbcc368e0afc25b878f53d0) Thanks [@rinjInTokyo](https://github.com/rinjInTokyo)! - Improve Storybook documents

- [#31](https://github.com/dsv-rp/DDS/pull/31) [`f72fbbd`](https://github.com/dsv-rp/DDS/commit/f72fbbd4791a0aad32fe9359ff30bc506d14afff) Thanks [@yodas7](https://github.com/yodas7)! - Introduce Changesets.

- [#35](https://github.com/dsv-rp/DDS/pull/35) Fix button text being wrapped
