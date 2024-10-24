import type { DaikinNotification } from "#package/components/notification/daikin-notification";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinNotificationStoryArgs
  extends Required<ElementProps<DaikinNotification>> {
  slotTitle: string;
  slotDescription: string;
  onClose: () => void;
}

export const DAIKIN_NOTIFICATION_ARG_TYPES = {
  variant: {
    control: "radio",
    options: ["toast", "inline"],
  },
  status: {
    control: "radio",
    options: ["positive", "negative", "warning", "alarm", "information"],
  },
  line: {
    control: "radio",
    options: ["single", "multi"],
  },
  open: {
    type: "boolean",
  },
  closeButton: {
    type: "boolean",
  },
  slotTitle: {
    type: "string",
  },
  slotDescription: {
    type: "string",
  },
  onClose: {
    name: "",
  },
} satisfies Meta<DaikinNotificationStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinNotificationStoryArgs>;
