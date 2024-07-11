import { metadata } from "#storybook-framework";
import { DAIKIN_ACCORDION_GROUP_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Accordion Group",
  tags: ["autodocs"],
  argTypes: DAIKIN_ACCORDION_GROUP_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    title: "Accordion-title",
  },
};
