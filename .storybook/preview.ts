import { useGlobals } from "@storybook/preview-api";
import type { Preview } from "@storybook/web-components";

import aafDark from "@daikin-oss/dds-tokens/css/aaf/Dark/variables.css?inline";
import aafLight from "@daikin-oss/dds-tokens/css/aaf/Light/variables.css?inline";
import dknDark from "@daikin-oss/dds-tokens/css/daikin/Dark/variables.css?inline";
import dknLight from "@daikin-oss/dds-tokens/css/daikin/Light/variables.css?inline";

import "./preview-common";

import "./previewCommon";

// Map themes and modes to their respective stylesheets
const THEME_MAP = {
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
function switchStylesheet(
  theme: keyof typeof THEME_MAP,
  mode: keyof (typeof THEME_MAP)[keyof typeof THEME_MAP]
) {
  let themeStylesheet = document.getElementById(
    "theme-stylesheet"
  ) as HTMLStyleElement | null;

  if (!themeStylesheet) {
    themeStylesheet = document.createElement("style");
    themeStylesheet.id = "theme-stylesheet";
    document.head.appendChild(themeStylesheet);
  }

  // Apply the stylesheet content dynamically
  themeStylesheet.innerHTML = THEME_MAP[theme][mode];
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
      const background = (context.globals.backgrounds ||
        context.parameters.backgrounds) as { value: string };
      const mode = background.value === "#000000" ? "Dark" : "Light";

      switchStylesheet(theme as "DKN" | "AAF", mode);

      return story();
    },
  ],
};

export default preview;
