import { definePlay } from "#storybook";
// This will import either "./framework-wc" or "./framework-react". See `build/vite/storybook-framework-loader.ts`.
import { metadata } from "#storybook-framework";
import { expect, fn, userEvent } from "@storybook/test";
import { getByShadowRole } from "shadow-dom-testing-library";
import { DAIKIN_AVATAR_ARG_TYPES, type Story } from "./common";

// The default export must have a static `title` property starting from Storybook v7.
// See https://storybook.js.org/docs/writing-stories#default-export.
export default {
  title: "Components/Avatar",
  tags: ["autodocs"],
  argTypes: DAIKIN_AVATAR_ARG_TYPES,
  ...metadata,
};

export const IconDefault: Story = {
  args: {
    type: "icon",
    alt: "avatar",
    href: "https://dsv-rp.github.io/DDS",
    disabled: false,
    onClick: fn((event: Event) => {
      event.preventDefault();
    }),
  },
};

export const ButtonDefault: Story = {
  args: {
    type: "button",
    alt: "avatar",
    href: "https://dsv-rp.github.io/DDS",
    disabled: false,
    onClick: fn((event: Event) => {
      event.preventDefault();
    }),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-avatar")[0];
    await expect(root).toBeInTheDocument();

    const innerButton = getByShadowRole(root, "button");
    await expect(innerButton).toBeInTheDocument();

    // should react if inner button clicked
    await step("Try to click inner button", async () => {
      await userEvent.click(innerButton);
      await expect(args.onClick).toHaveBeenCalledOnce();
    });

    // should also react if outer button clicked
    await step("Try to click outer daikin-avatar", async () => {
      await userEvent.click(root);
      await expect(args.onClick).toHaveBeenCalledTimes(2);
    });
  }),
};

export const ButtonDisabled: Story = {
  args: {
    type: "button",
    alt: "avatar",
    href: "https://dsv-rp.github.io/DDS",
    disabled: true,
    onClick: fn((event: Event) => {
      event.preventDefault();
    }),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-avatar")[0];
    await expect(root).toBeInTheDocument();

    const innerButton = getByShadowRole(root, "button");
    await expect(innerButton).toBeInTheDocument();

    // should react if inner button clicked
    await step("Try to click inner button", async () => {
      await userEvent.click(innerButton);
      await expect(args.onClick).not.toHaveBeenCalledOnce();
    });

    // should also react if outer button clicked
    await step("Try to click outer daikin-avatar", async () => {
      await userEvent.click(root);
      await expect(args.onClick).not.toHaveBeenCalledOnce();
    });
  }),
};

export const LinkDefault: Story = {
  args: {
    type: "link",
    alt: "avatar",
    href: "https://dsv-rp.github.io/DDS",
    disabled: false,
    onClick: fn((event: Event) => {
      event.preventDefault();
    }),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-avatar")[0];
    await expect(root).toBeInTheDocument();

    const innerLink = getByShadowRole(root, "link");
    await expect(innerLink).toBeInTheDocument();

    // should react if inner link clicked
    await step("Try to click inner link", async () => {
      await userEvent.click(innerLink);
      await expect(args.onClick).toHaveBeenCalledOnce();
    });

    // should also react if outer link clicked
    await step("Try to click outer daikin-avatar", async () => {
      await userEvent.click(root);
      await expect(args.onClick).toHaveBeenCalledTimes(2);
    });
  }),
};

export const LinkDisabled: Story = {
  args: {
    type: "link",
    alt: "avatar",
    href: "https://dsv-rp.github.io/DDS",
    disabled: true,
    onClick: fn((event: Event) => {
      event.preventDefault();
    }),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-avatar")[0];
    await expect(root).toBeInTheDocument();

    const innerLink = getByShadowRole(root, "link");
    await expect(innerLink).toBeInTheDocument();

    // should react if inner link clicked
    await step("Try to click inner link", async () => {
      await userEvent.click(innerLink);
      await expect(args.onClick).not.toHaveBeenCalledOnce();
    });

    // should also react if outer link clicked
    await step("Try to click outer daikin-avatar", async () => {
      await userEvent.click(root);
      await expect(args.onClick).not.toHaveBeenCalledTimes(2);
    });
  }),
};
