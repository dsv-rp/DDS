import type { StoryObj } from "@storybook/web-components";

import type { DaikinNotificationProps } from "../daikin-notification";

export interface DaikinNotificationStoryArgs extends DaikinNotificationProps {}

type Story = StoryObj<DaikinNotificationStoryArgs>;

export const Toast: Story = {
  args: {
    title: "Notification-title",
    description: "Notification-description: Toast",
    variant: "toast",
    status: "positive",
    line: "single",
    open: true,
    closeButton: false,
  },
};

export const Inline: Story = {
  args: {
    title: "Notification-title",
    description: "Notification-description: Inline",
    variant: "inline",
    status: "positive",
    line: "single",
    open: true,
    closeButton: false,
  },
};
