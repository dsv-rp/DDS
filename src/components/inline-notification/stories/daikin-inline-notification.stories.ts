import { metadata } from "#storybook-framework";
import { fn } from "@storybook/test";
import { DAIKIN_INLINE_NOTIFICATION_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Inline Notification",
  tags: ["autodocs"],
  argTypes: DAIKIN_INLINE_NOTIFICATION_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    status: "positive",
    layout: "horizontal",
    closable: true,
    slotTitle: "Inline title",
    slotDescription: "Inline description",
    slotAction: false,
    onClose: fn(),
  },
};

export const HasTimestamp: Story = {
  args: {
    ...Default.args,
    timestamp: new Date("2025-01-01"),
  },
};
