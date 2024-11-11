# @daikin-oss/design-system-web-components

## 0.4.0

### Minor Changes

- [#72](https://github.com/dsv-rp/DDS/pull/72) [`70391aa`](https://github.com/dsv-rp/DDS/commit/70391aab75eaf72fcf2951b4cb2664d8afa4cbf4) Thanks [@poetrainy](https://github.com/poetrainy)! - Progress Bar: The `size` property has been added. (DDS-1385)
  Progress Bar: Updated appearance. (DDS-1385)

- [#60](https://github.com/dsv-rp/DDS/pull/60) [`b6d7d9f`](https://github.com/dsv-rp/DDS/commit/b6d7d9f4bb5286bb9a8dc719628624dcca3c0f75) Thanks [@poetrainy](https://github.com/poetrainy)! - **BREAKING CHANGE** Checkbox: The `readonly`, `size` and `error` property has been removed. (DDS-1288)
  **BREAKING CHANGE** Checkbox: The `labelPosition` property now removed `"left"` value. (DDS-1288)
  **BREAKING CHANGE** Checkbox: The `labelPosition` attribute (not property) has been renamed to `label-position`. (DDS-1288)
  Checkbox: The `labelPosition` property now accepts `"hidden"` value. (DDS-1288)
  Checkbox: Updated appearance. (DDS-1288)

- [#75](https://github.com/dsv-rp/DDS/pull/75) [`3922068`](https://github.com/dsv-rp/DDS/commit/3922068e28efcd5786f576435f68c35983f252c2) Thanks [@rinjInTokyo](https://github.com/rinjInTokyo)! - Improve breadcrumb accessibility. (DDS-1482)
  **BREAKING CHANGE** Remove `link` slot from `daikin-breadcrumb-item`.

- [#69](https://github.com/dsv-rp/DDS/pull/69) [`3fcbc38`](https://github.com/dsv-rp/DDS/commit/3fcbc38a1affb1f3d50dbfb4e1aeb1fd34f301a7) Thanks [@poetrainy](https://github.com/poetrainy)! - **BREAKING CHANGE** Accordion: The `title` attribute has been removed and replaced with a `summary` slot. (DDS-1414)
  Accordion: Updated appearance. (DDS-1414)
  Accordion Item: Updated appearance. (DDS-1414)

- [#61](https://github.com/dsv-rp/DDS/pull/61) [`36ef955`](https://github.com/dsv-rp/DDS/commit/36ef9551a504de318a51a738b9b6b58edfb7f6f9) Thanks [@poetrainy](https://github.com/poetrainy)! - **BREAKING CHANGE** Radio: The `readonly`, `size` and `error` properties have been removed. (DDS-1350)
  **BREAKING CHANGE** Radio: The `labelPosition` property no longer supports `"left"`. Instead, it now supports `"hidden"`. (DDS-1350)
  **BREAKING CHANGE** Radio: The `labelPosition` attribute (not property) has been renamed to `label-position`.
  Radio: Updated appearance. (DDS-1350)

- [#56](https://github.com/dsv-rp/DDS/pull/56) [`a81916a`](https://github.com/dsv-rp/DDS/commit/a81916ac21c4fec5e85eb1e8bf9005137887a662) Thanks [@poetrainy](https://github.com/poetrainy)! - **BREAKING CHANGE** Button: The `role` attribute/property is renamed to `button-role` attribute and `buttonRole` property to avoid conflicts with standard HTML attributes.
  **BREAKING CHANGE** Button: The `variant` attribute now accepts values of `"fill"`, `"outline"` and `"ghost"`, instead of `"primary"`, `"secondary"`, `"tertiary"` and `"primaryDanger"`.
  **BREAKING CHANGE** Button: The `isLoading` attribute has been removed.
  **BREAKING CHANGE** Button: The `leftIcon` and `rightIcon` attributes have been renamed to `left-icon` and `right-icon` respectively.
  **BREAKING CHANGE** Button: The `type` attribute now accepts `"link"`, and whether the button becomes a link is now determined by the `type` attribute, not by the presence of the `href` attribute. If `href` is omitted with `type="link"`, it is treated as a disabled state.
  Button: Added `color` attribute that accepts values of `"default"` and `"danger"`.
  Button: Updated appearance. (DDS-1284)

- [#50](https://github.com/dsv-rp/DDS/pull/50) [`4a34db7`](https://github.com/dsv-rp/DDS/commit/4a34db738bc08e347a790c0620bc602bbf1eac5b) Thanks [@poetrainy](https://github.com/poetrainy)! - **BREAKING CHANGE** Notification: The `title` and `description` attributes have been removed, and their contents are now specified using slots with the same names.

- [#67](https://github.com/dsv-rp/DDS/pull/67) [`d377f50`](https://github.com/dsv-rp/DDS/commit/d377f5043f8d12c37a28772e44173b0e2a778003) Thanks [@poetrainy](https://github.com/poetrainy)! - **BREAKING CHANGE** Tabs: The name of the component has been changed from `Tab Group` to `Tabs`. Use `<daikin-tabs>` instead of `<daikin-tab-group>`. (DDS-1450)
  **BREAKING CHANGE** Tabs: The signatures of the `beforechange` and `change` events have been updated to match those of other components. (DDS-1450)
  **BREAKING CHANGE** Tab Panels: The name of the component has been changed from `Panel Switcher` to `Tab panels`. Use `<daikin-tab-panels>` instead of `<daikin-panel-switcher>`. (DDS-1450)
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
