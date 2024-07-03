import aafDark from "@daikin-oss/dds-tokens/css/aaf/Dark/variables.css?inline";
import aafLight from "@daikin-oss/dds-tokens/css/aaf/Light/variables.css?inline";
import dknDark from "@daikin-oss/dds-tokens/css/daikin/Dark/variables.css?inline";
import dknLight from "@daikin-oss/dds-tokens/css/daikin/Light/variables.css?inline";
import { useGlobals } from "@storybook/preview-api";
import type { Preview } from "@storybook/web-components";

import "./previewCommon";

// Map themes and modes to their respective stylesheets
const stylesheets = {
  DKN: {
    Light: dknLight,
    Dark: dknDark,
  },
  AAF: {
    Light: aafLight,
    Dark: aafDark,
  },
};

// Function to change the stylesheet
function switchStylesheet(theme: string, mode: string) {
  let themeStylesheetLink = document.getElementById(
    "theme-stylesheet"
  ) as HTMLLinkElement;

  if (!themeStylesheetLink) {
    themeStylesheetLink = document.createElement("style") as HTMLLinkElement;
    themeStylesheetLink.id = "theme-stylesheet";
    themeStylesheetLink.rel = "stylesheet";
    document.head.appendChild(themeStylesheetLink);
  }

  // Apply the stylesheet content dynamically
  themeStylesheetLink.innerHTML = stylesheets[theme][mode];
}

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#000000" },
      ],
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  globalTypes: {
    theme: {
      description: "Theme Selector",
      defaultValue: "DKN",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: ["DKN", "AAF"],
        // Change title based on selected value
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (story, context) => {
      const [{ theme }] = useGlobals();
      const background =
        context.globals.backgrounds || context.parameters.backgrounds;

      const mode = background.value === "#000000" ? "Dark" : "Light";

      switchStylesheet(theme, mode);

      return story();
    },
  ],
};

export default preview;
