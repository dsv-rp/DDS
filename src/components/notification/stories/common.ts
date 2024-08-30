import type { DaikinNotification } from "#package/components/notification/daikin-notification";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinNotificationStoryArgs
  extends Required<ElementProps<DaikinNotification>> {
  slotTitle?: string;
  slotDescription?: string;
  onClose: () => void;
}

export const DAIKIN_NOTIFICATION_ARG_TYPES = {
  variant: {
    defaultValue: "toast",
    control: { type: "radio" },
    options: ["toast", "inline"],
  },
  status: {
    defaultValue: "positive",
    control: { type: "radio" },
    options: ["positive", "negative", "warning", "alarm", "information"],
  },
  line: {
    defaultValue: "single",
    control: { type: "radio" },
    options: ["single", "multi"],
  },
  open: {
    defaultValue: true,
    type: "boolean",
  },
  closeButton: {
    defaultValue: false,
    type: "boolean",
  },
  slotTitle: {
    type: "string",
    defaultValue: "Notification title",
  },
  slotDescription: {
    type: "string",
    defaultValue: "Notification description",
  },
} satisfies Meta<DaikinNotificationStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinNotificationStoryArgs>;
