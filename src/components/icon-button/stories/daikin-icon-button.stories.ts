// This will import either "./framework-wc" or "./framework-react". See `build/vite/storybook-framework-loader.ts`.
import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, fn, userEvent } from "@storybook/test";
import { getByShadowRole, queryByShadowRole } from "shadow-dom-testing-library";
import { DAIKIN_ICON_BUTTON_ARG_TYPES, type Story } from "./common";

// The default export must have a static `title` property starting from Storybook v7.
// See https://storybook.js.org/docs/writing-stories#default-export.
export default {
  title: "Components/Icon Button",
  tags: ["autodocs"],
  argTypes: DAIKIN_ICON_BUTTON_ARG_TYPES,
  ...metadata,
};

export const Fill: Story = {
  args: {
    variant: "fill",
    color: "default",
    disabled: false,
    type: "button",
    icon: "cross",
    buttonAriaLabel: "Icon button label",
    onClick: fn((event: Event) => {
      event.preventDefault();
    }),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-icon-button")[0];
    await expect(root).toBeInTheDocument();

    const button = getByShadowRole(root, "button", {
      name: "Icon button label",
    });
    await expect(button).toBeInTheDocument();

    // should react if inner button clicked
    await step("Try to click inner button", async () => {
      await userEvent.click(button);
      await expect(args.onClick).toHaveBeenCalledOnce();
    });
  }),
};

export const Outline: Story = {
  args: {
    ...Fill.args,
    variant: "outline",
    onClick: fn((event: Event) => {
      event.preventDefault();
    }),
  },
};

export const Ghost: Story = {
  args: {
    ...Fill.args,
    variant: "ghost",
    onClick: fn((event: Event) => {
      event.preventDefault();
    }),
  },
};

export const Neutral: Story = {
  args: {
    ...Fill.args,
    color: "neutral",
    onClick: fn((event: Event) => {
      event.preventDefault();
    }),
  },
};

export const Danger: Story = {
  args: {
    ...Fill.args,
    color: "danger",
    onClick: fn((event: Event) => {
      event.preventDefault();
    }),
  },
};

export const Disabled: Story = {
  args: {
    ...Fill.args,
    disabled: true,
    onClick: fn((event: Event) => {
      event.preventDefault();
    }),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-icon-button")[0];
    await expect(root).toBeInTheDocument();

    const button = getByShadowRole(root, "button", {
      name: "Icon button label",
    });
    await expect(button).toBeInTheDocument();

    // should not react if inner button clicked
    await step("Try to click inner button", async () => {
      await userEvent.click(button);
      await expect(args.onClick).not.toHaveBeenCalledOnce();
    });
  }),
};

export const Link: Story = {
  args: {
    ...Fill.args,
    type: "link",
    href: "#",
    onClick: fn((event: Event) => {
      event.preventDefault();
    }),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-icon-button")[0];
    await expect(root).toBeInTheDocument();

    // No buttons
    await expect(queryByShadowRole(root, "button")).toBe(null);

    const innerLink = getByShadowRole(root, "link", {
      name: "Icon button label",
    });
    await expect(innerLink).toBeInTheDocument();

    // should react if inner link clicked
    await step("Try to click inner link", async () => {
      await userEvent.click(innerLink);
      await expect(args.onClick).toHaveBeenCalled();
    });
  }),
};

export const LinkDisabled: Story = {
  args: {
    ...Link.args,
    disabled: true,
    onClick: fn((event: Event) => {
      event.preventDefault();
    }),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-icon-button")[0];
    await expect(root).toBeInTheDocument();

    // No buttons
    await expect(queryByShadowRole(root, "button")).toBe(null);

    const innerLink = getByShadowRole(root, "link", {
      name: "Icon button label",
    });
    await expect(innerLink).toBeInTheDocument();

    // should not react if inner link clicked
    await step("Try to click inner link", async () => {
      await userEvent.click(innerLink);
      await expect(args.onClick).not.toHaveBeenCalled();
    });
  }),
};
