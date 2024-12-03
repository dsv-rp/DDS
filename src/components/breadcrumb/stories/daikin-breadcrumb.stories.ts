import { metadata } from "#storybook-framework";
import { DAIKIN_BREADCRUMB_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Breadcrumb",
  tags: ["autodocs"],
  argTypes: DAIKIN_BREADCRUMB_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    showVisited: false,
  },
};

export const ShowVisited: Story = {
  args: {
    ...Default.args,
    showVisited: true,
  },
};
