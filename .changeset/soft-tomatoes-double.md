---
"@daikin-oss/design-system-web-components": minor
---

**BREAKING CHANGE** Some attributes and properties have been renamed or removed.

The following attribute and property have been renamed because they conflict with standard HTML attribute:

- `<daikin-accordion-item>`: ~~`title`~~ -> `heading`

The following attributes (not properties) have been renamed to kebab case:

- `<daikin-button>`: ~~`leftIcon`~~ -> `left-icon`
- `<daikin-button>`: ~~`rightIcon`~~ -> `right-icon`
- `<daikin-checkbox>`: ~~`rightIcon`~~ -> `right-icon`
- `<daikin-input-group>`: ~~`textareaCounter`~~ -> `textarea-counter`
- `<daikin-tooltip>`: ~~`closeOnClick`~~ -> `close-on-click`

The following attribute and property have been removed as they are not used:

- `<daikin-button>`: ~~`isLoading`~~
