// This will import either "./framework-wc" or "./framework-react". See `build/vite/storybook-framework-loader.ts`.
import { metadata } from "#storybook-framework";
import { fn } from "@storybook/test";
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
};
