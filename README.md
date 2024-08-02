# Daikin Design System - Web Components

This project is an implementation of the Daikin Design Kit using Web Components.

---

## Usage

Start by installing the package:

```sh
npm install @daikin-oss/design-system-web-components
```

You can then import necessary components in your bundle (the .js extension is optional):

```js
import "@daikin-oss/design-system-web-components/components/button/index.js";
```

By default, out-of-the-box, the styles are for Daikin brand in light mode.

### Fonts

We use Roboto as the font for our UI components.
This font is not included in our package, so developers will need to include it in their apps.

The required weights and variants are as follows:

- Regular (400), Normal
- Bold (700), Normal

#### With Google Fonts

If you can use an external CDN, you can use Google Fonts to load it.

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
  rel="stylesheet"
/>
```

#### With Fontsource

If you want to deliver fonts within your app without relying on an external CDN, you can use a package like [Fontsource](https://fontsource.org/fonts/roboto) to do this.

Install the package with:

```sh
npm install @fontsource/roboto
```

Then import it in your app:

```js
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";
```

### Dark Mode and Brands/Themes

_Due to the encapsulation of styles by the Web Components specification, how themes are applied may change in the future._

For dark-mode support and non-daikin brands, you need to add the `tokens` package and include the CSS reference in your html:

```sh
npm install @daikin-oss/dds-tokens
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

## Contribution

The following are instructions for package contributors.

### Setup

Clone and install dependencies:

```bash
git clone https://github.com/dsv-rp/DDS.git
cd DDS

# install dependencies
npm i

# install Playwright browsers
npx playwright install
```

### Build

To build files for production:

```bash
npm run build
```

Vite is used to transform TypeScript code into JavaScript that runs in modern browsers.

The built files are written to `/dist`.

### Documentation

Storybook is used to document design system components/tools/examples.

To run in development mode:

```bash
# Web Components version
npm run storybook

# or React version
npm run storybook:react
```

To produce distributable files in `/storybook-static/web-components` and `/storybook-static/react` folder:

```bash
npm run build-storybook
```

### Testing

There are currently two test suites: VRT (Visual Regression Test) and Interaction Test.

Visual regression testing, placed in `*.visual.test.ts`, is done by Playwright running in a container.
To eliminate rendering differences between environments, the browser which takes the screenshots must run on a container.

Currently, Web Components has full support in most major frameworks [except for React](https://custom-elements-everywhere.com/).
As such, we test both Web Components by themselves, and also test when imported by React:

```bash
# start a container for running the browsers
docker compose up -d

# run VRT for Web Components and React versions
npm run test:visual

# stop the container
docker compose down
```

For Podman users, use `podman-compose -f compose.podman.yaml` or `podman compose -f compose.podman.yaml` instead of `docker compose`.

To update snapshots, use `npm run test:visual-update`

---

Interaction testing, placed in `*.stories.ts`, is performed by Storybook, which also uses Playwright internally.
Interaction tests do not use containers since rendering differences between environments do not matter.

```bash
npm run test:interaction
```

### Linting and Type checking

Linting is performed by ESLint for general linting of JavaScript and TypeScript, and [lit-analyzer](https://www.npmjs.com/package/lit-analyzer) to type check bindings in lit-html templates.
[cSpell](https://cspell.org/) is used for spell checking.
[ls-lint](https://ls-lint.org/) is also used to ensure that consistent filenames are used.

To lint the project, run:

```bash
npm run lint
npx tsc -b
```

If you encounter an `Unknown word` error, add the word to the `cspell-dictionary.txt`.

### Design Tokens

_We are looking for a more efficient way to import tokens._

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

  /* ...rest of the code */
}
```

### TailwindCSS

There is a custom `daikinPlugin` managed [here](https://github.com/dsv-rp/tailwind).

### Developing with VSCode

This project provides recommended extensions and workspace settings for VSCode.

References [Daikin Design Kit](https://www.figma.com/file/VyaaU8Ta9yzyf0PsURWSSf/DDS%3A-Design-Kit?node-id=2421%3A7943)
