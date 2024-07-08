import type { DaikinNotification } from "#package/components/notification/daikin-notification";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinNotificationStoryArgs
  extends Required<ElementProps<DaikinNotification>> {
  onClose: () => void;
}

export const DAIKIN_NOTIFICATION_ARG_TYPES = {
  title: {
    description: "Title text",
    type: "string",
  },
  description: {
    description: "Description text",
    type: "string",
  },
  variant: {
    description: "Type of notification",
    defaultValue: "toast",
    control: { type: "select" },
    options: ["toast", "inline"],
  },
  status: {
    description: "Status of notification",
    defaultValue: "positive",
    control: { type: "select" },
    options: ["positive", "negative", "warning", "alarm", "information"],
  },
  line: {
    description: "Display in single or multiple lines",
    defaultValue: "single",
    control: { type: "select" },
    options: ["single", "multi"],
  },
  open: {
    description: "Whether the component is open",
    defaultValue: true,
    type: "boolean",
  },
  closeButton: {
    description: "Whether to display the close button",
    defaultValue: false,
    type: "boolean",
  },
} satisfies Meta<DaikinNotificationStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinNotificationStoryArgs>;
