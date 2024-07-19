import type { Preview } from "@storybook/react";
import React from "react";

import "../preview-common";

import "../previewCommon";

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
