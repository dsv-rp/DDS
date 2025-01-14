import type { DaikinToastNotification } from "#package/components/toast-notification/daikin-toast-notification";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinToastNotificationStoryArgs
  extends Required<ElementProps<DaikinToastNotification>> {
  slotTitle: string;
  slotDescription: string;
  slotAction: boolean;
  onClose: () => void;
}

export const DAIKIN_TOAST_NOTIFICATION_ARG_TYPES = {
  name: {
    type: "string",
  },
  status: {
    control: "radio",
    options: ["positive", "negative", "warning", "alarm", "information"],
  },
  line: {
    control: "radio",
    options: ["single", "multiple"],
  },
  closable: {
    type: "boolean",
  },
  timestamp: {
    type: "boolean",
  },
  slotTitle: {
    type: "string",
  },
  slotDescription: {
    type: "string",
  },
  slotAction: {
    type: "boolean",
  },
  // Hide event listeners
  onClose: { name: "" },
} satisfies Meta<DaikinToastNotificationStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinToastNotificationStoryArgs>;
