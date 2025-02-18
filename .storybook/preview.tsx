import {
  Controls,
  Description,
  Primary,
  Subtitle,
  Title,
} from "@storybook/blocks";
import { useGlobals } from "@storybook/preview-api";
import type { Preview } from "@storybook/web-components";
import "./docs.css";
import "./theme.scss";

// @ts-expect-error shadow-dom-testing-library (wrongly) uses `process` so we have to provide a mock.
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
globalThis.process ??= { env: {} };

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "light",
      values: [
        // The content of `/*...*/` in the `value`s below will be used as a value of the `<html>`'s `data-color-scheme` attribute.
        { name: "light", value: "var(--sb-background,#fff/*light*/)" },
        { name: "dark", value: "var(--sb-background,#212121/*dark*/)" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls sort="alpha" />
        </>
      ),
    },
  },
  globalTypes: {
    theme: {
      description: "Theme Selector",
      defaultValue: "DKN",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        // The values below will be used as a value of the `<html>`'s `data-theme` attribute.
        items: ["DKN", "AAF"],
        // Change title based on selected value
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    // Note that this file is shared between Web Components and React so decorators have to be compatible for both frameworks.
    (story, context) => {
      const sp = new URLSearchParams(location.search);

      const [{ theme: userTheme }] = useGlobals();
      const theme = sp.get("theme-override") ?? (userTheme as string);

      const background = (context.globals.backgrounds ??
        (context.parameters.backgrounds as { values: { value: string }[] })
          .values[0]) as
        | {
            value: string;
          }
        | undefined;
      const colorScheme =
        sp.get("color-scheme-override") ??
        /\/\*(\w+)\*\//.exec(background?.value ?? "")?.[1] ??
        "light";

      document.documentElement.dataset.theme = theme;
      document.documentElement.dataset.colorScheme = colorScheme;

      document.documentElement.classList.toggle("no-bg", sp.has("no-bg"));

      return story();
    },
  ],
};

export default preview;
