import type { DaikinNotification } from "#package/components/notification/daikin-notification";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinNotificationStoryArgs
  extends Required<ElementProps<DaikinNotification>> {
  __vrtTitle__?: string;
  __vrtDescription__?: string;
  onClose: () => void;
}

export const DAIKIN_NOTIFICATION_ARG_TYPES = {
  variant: {
    defaultValue: "toast",
    control: { type: "radio" },
    options: ["toast", "inline"],
    description: "Type of notification",
  },
  status: {
    defaultValue: "positive",
    control: { type: "radio" },
    options: ["positive", "negative", "warning", "alarm", "information"],
    description: "Status of notification",
  },
  line: {
    defaultValue: "single",
    control: { type: "radio" },
    options: ["single", "multi"],
    description: "Display in single or multiple lines",
  },
  open: {
    defaultValue: true,
    type: "boolean",
    description: "Whether the component is open",
  },
  closeButton: {
    defaultValue: false,
    type: "boolean",
    description: "Whether to display the close button",
  },
  __vrtTitle__: {
    name: "",
    type: "string",
    defaultValue: "",
    description:
      "Content of `title` slot. (only for the Visual Regression Test)",
  },
  __vrtDescription__: {
    name: "",
    type: "string",
    defaultValue: "",
    description:
      "Content of `description` slot. (only for the Visual Regression Test)",
  },
} satisfies Meta<DaikinNotificationStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinNotificationStoryArgs>;
