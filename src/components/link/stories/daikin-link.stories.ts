// This will import either "./framework-wc" or "./framework-react". See `build/vite/storybook-framework-loader.ts`.
import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, userEvent } from "@storybook/test";
import { getByShadowRole, getByShadowText } from "shadow-dom-testing-library";
import { DAIKIN_LINK_ARG_TYPES, type Story } from "./common";

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
    hasVisited: false,
    label: "Link label",
  },
  play: definePlay(async ({ canvasElement }) => {
    const root = canvasElement.getElementsByTagName("daikin-link")[0];
    await expect(root).toBeInTheDocument();

    const innerLink = getByShadowRole(root, "link", { name: "Link label" });
    await expect(innerLink).toBeInTheDocument();
  }),
};

export const HasVisited: Story = {
  args: {
    ...Default.args,
    hasVisited: true,
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
