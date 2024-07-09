import type { Preview } from "@storybook/react";
import React from "react";

import "../preview-common";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

global.React = React;

export default preview;
