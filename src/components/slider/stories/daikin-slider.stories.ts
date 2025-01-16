import { metadata } from "#storybook-framework";
import { fn } from "@storybook/test";
import { DAIKIN_SLIDER_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Slider",
  tags: ["autodocs"],
  argTypes: DAIKIN_SLIDER_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    name: "Slider label",
    value: "1",
    min: "1",
    max: "100",
    step: "1",
    onChange: fn(),
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    onChange: fn(),
  },
};
