# Daikin Design System - Web Components

This project is an implementation of the Daikin Design Kit using web components.

## Setup

Install dependencies:

```bash
npm i
```

## Build

Rollup is used to transform TypeScript code into JavaScript that runs in modern browsers.
Tailwind classes are also purged.

Build components and output in /dist:

```bash
npm run build
```

## Documentation

Storybook is used to document design system components/tools/examples.

To run in development:

```bash
npm run storybook
```

To produce distributable files in /storybook-static folder:

```bash
npm run storybook:build
```

## Linting

Linting is done by ESLint for general linting of TypeScript and JavaScript, and [lit-analyzer](https://www.npmjs.com/package/lit-analyzer) to type check bindings in lit-html templates.

To lint the project run:

```bash
npm run lint
```

## Testing

Visual regression testing is done by a combination of jest and puppeteer.
Currently, web components has full support in most major frameworks [except for React](https://custom-elements-everywhere.com/).
As such, we test both web components by themselves, and also test when imported by React:

```bash
npm run test
```

## Design Tokens

1. **Source of Truth**: The `tokens` we use is the foundation of our design styles and was grabbed from https://github.com/dsv-rp/dds-tokens/tree/main.

2. **Using in Components**: For the most part, we use the js variables to apply as the default style:

```
import {
    buttonColorBackgroundPrimaryActive
} from '@daikinlab/dds-tokens/js/daikin/Light/variables.js';

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

## Usage

```
import '@daikin-zen/design-system-web-components/dist/components/button/index.js';
```

By default, out-of-the-box, the styles are for Daikin brand in light mode.

### Dark Mode and Brands/Themes

For dark-mode support and non-daikin brands, you need to add the `tokens` package and include the CSS reference in your html:

```
npm install '@daikinlab/dds-tokens
```

#### Dark Mode

Reference the CSS in HTML:

```
<link rel="stylesheet" href="node_modules/@daikinlab/dds-tokens/build/css/DKN/Dark/buttons.css" media="(prefers-color-scheme: dark)">
```

Using CSS `@import` with `prefers-color-scheme`:

```
@import '@daikinlab/dds-tokens/css/daikin/Dark/buttons.css'
    (prefers-color-scheme: dark);

```

#### Other brands/themes

Reference the CSS in HTML:

```
<link rel="stylesheet" href="node_modules/@daikinlab/dds-tokens/build/css/AAF/Dark/buttons.css" media="(prefers-color-scheme: light)">
<link rel="stylesheet" href="node_modules/@daikinlab/dds-tokens/build/css/AAF/Dark/buttons.css" media="(prefers-color-scheme: dark)">
```

Using CSS `@import` with `prefers-color-scheme`:

```
@import '@daikinlab/dds-tokens/css/aaf/Light/buttons.css'
    (prefers-color-scheme: light);
@import '@daikinlab/dds-tokens/css/aaf/Dark/buttons.css'
    (prefers-color-scheme: dark);
```

## Tailwind

There is a custom `daikinPlugin` managed [here](https://github.com/daikin-dsv/tailwind)

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
