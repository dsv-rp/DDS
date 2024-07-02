# Daikin Design System - Web Components

This project is an implementation of the Daikin Design Kit using web components.

---

## Usage

Start by installing the package:

```bash
npm i @daikin-oss/design-system-web-components
```

You can then import necessary components in your bundle:

```javascript
import "@daikin-oss/design-system-web-components/dist/components/button/index.js";
```

By default, out-of-the-box, the styles are for Daikin brand in light mode.

### Dark Mode and Brands/Themes

For dark-mode support and non-daikin brands, you need to add the `tokens` package and include the CSS reference in your html:

```bash
npm install '@daikin-oss/dds-tokens
```

#### Dark Mode

Reference the CSS in HTML:

```html
<link
  rel="stylesheet"
  href="node_modules/@daikin-oss/dds-tokens/build/css/DKN/Dark/buttons.css"
  media="(prefers-color-scheme: dark)"
/>
```

Using CSS `@import` with `prefers-color-scheme`:

```css
@import "@daikin-oss/dds-tokens/css/daikin/Dark/buttons.css"
  (prefers-color-scheme: dark);
```

#### Other brands/themes

Reference the CSS in HTML:

```html
<link
  rel="stylesheet"
  href="node_modules/@daikin-oss/dds-tokens/build/css/AAF/Dark/buttons.css"
  media="(prefers-color-scheme: light)"
/>
<link
  rel="stylesheet"
  href="node_modules/@daikin-oss/dds-tokens/build/css/AAF/Dark/buttons.css"
  media="(prefers-color-scheme: dark)"
/>
```

Using CSS `@import` with `prefers-color-scheme`:

```css
@import "@daikin-oss/dds-tokens/css/aaf/Light/buttons.css"
  (prefers-color-scheme: light);
@import "@daikin-oss/dds-tokens/css/aaf/Dark/buttons.css"
  (prefers-color-scheme: dark);
```

---

## Contributors

The following are instructions for package contributors.

### Setup

Clone and install dependencies:

```bash
git clone https://github.com/dsv-rp/DDS.git
cd DDS
npm i
```

### Build

To build files for production:

```bash
npm run build
```

Rollup is used to transform TypeScript code into JavaScript that runs in modern browsers.
Tailwind classes are also purged.

Build components and output in /dist:

### Documentation

Storybook is used to document design system components/tools/examples.

To run in development:

```bash
npm run storybook
```

To produce distributable files in /storybook-static folder:

```bash
npm run build-storybook
```

### Testing

Visual regression testing is done by a combination of jest and puppeteer.
Currently, web components has full support in most major frameworks [except for React](https://custom-elements-everywhere.com/).
As such, we test both web components by themselves, and also test when imported by React:

```bash
npm run test
```

### Linting

Linting is done by ESLint for general linting of TypeScript and JavaScript, and [lit-analyzer](https://www.npmjs.com/package/lit-analyzer) to type check bindings in lit-html templates.

To lint the project run:

```bash
npm run lint
```

### Design Tokens

1. **Source of Truth**: The `tokens` we use is the foundation of our design styles and was grabbed from https://github.com/dsv-rp/dds-tokens/tree/main.

2. **Using in Components**: For the most part, we use the js variables to apply as the default style:

```javascript
import {
    buttonColorBackgroundPrimaryActive
} from '@daikin-oss/dds-tokens/js/daikin/Light/variables.js';

class DaikinButton extends LitElement implements DaikinButtonProps {
    static styles = css`
        :host {
            --defaultButtonColorBackgroundPrimaryActive: ${unsafeCSS(
                buttonColorBackgroundPrimaryActive
            )};
        }
    `;

    ...rest of the code
}
```

### Tailwind

There is a custom `daikinPlugin` managed [here](https://github.com/dsv-rp/tailwind)

### Using with VSCode

If you are using VSCode, there is a great [extension](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) you can use for auto-complete

Add the following to your VSCode `settings.json` file:

```json
{
  "editor.quickSuggestions": {
    "other": true,
    "comments": false,
    "strings": true
  },
  "tailwindCSS.experimental.classRegex": ["ctl[(]`([^`]*)"]
}
```

You may need to set the regex if using a library like [classnames-template-literals](https://github.com/netlify/classnames-template-literals)

References [Daikin Design Kit](https://www.figma.com/file/VyaaU8Ta9yzyf0PsURWSSf/DDS%3A-Design-Kit?node-id=2421%3A7943)
