import { metadata } from "#storybook-framework";
import { DAIKIN_TAB_GROUP_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/TabGroup",
  tags: ["autodocs"],
  argTypes: DAIKIN_TAB_GROUP_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    tabs: ["Foo", "!Bar", "Baz"],
    value: "foo",
    size: "default",
  },
};

export const Single: Story = {
  args: {
    tabs: ["Foo"],
    value: "foo",
    size: "default",
  },
};

export const Many: Story = {
  args: {
    tabs: new Array(20).fill("").map((_, i) => `Tab ${i + 1}`),
    value: "tab1",
    size: "default",
  },
};
