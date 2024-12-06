// This will import either "./framework-wc" or "./framework-react". See `build/vite/storybook-framework-loader.ts`.
import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, userEvent } from "@storybook/test";
import { getByShadowRole, getByShadowText } from "shadow-dom-testing-library";
import {
  DAIKIN_LINK_ARG_TYPES,
  type DaikinLinkLocalParameters,
  type Story,
} from "./common";

// The default export must have a static `title` property starting from Storybook v7.
// See https://storybook.js.org/docs/writing-stories#default-export.
export default {
  title: "Components/Link",
  tags: ["autodocs"],
  argTypes: DAIKIN_LINK_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    href: "https://dsv-rp.github.io/DDS",
    disabled: false,
    showVisited: false,
    label: "Link label",
  },
  play: definePlay(async ({ canvasElement }) => {
    const root = canvasElement.getElementsByTagName("daikin-link")[0];
    await expect(root).toBeInTheDocument();

    const innerLink = getByShadowRole(root, "link", { name: "Link label" });
    await expect(innerLink).toBeInTheDocument();
  }),
};

export const ShowVisited: Story = {
  args: {
    ...Default.args,
    showVisited: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
  play: definePlay(async ({ canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-link")[0];
    await expect(root).toBeInTheDocument();

    const innerLink = getByShadowText(root, "Link label");
    await expect(innerLink).toBeInTheDocument();

    // should not react if inner link clicked
    await step("Try to click inner link", async () => {
      await userEvent.click(innerLink);
    });
  }),
};

export const WithSentence: Story = {
  args: {
    ...Default.args,
    label:
      "even links within sentences will respond correctly to line breaks and other elements,",
  },
  parameters: {
    _ddsLocal: {
      withSentence: true,
    } satisfies DaikinLinkLocalParameters,
  },
};
