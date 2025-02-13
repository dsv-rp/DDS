import type { DaikinToastNotification } from "#package/components/toast-notification/daikin-toast-notification";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export const vrtDate = new Date("2025-01-15T00:00:00+09:00");

export interface DaikinToastNotificationStoryArgs
  extends Required<ElementProps<DaikinToastNotification>> {
  slotTitle: string;
  slotDescription: string;
  slotAction: boolean;
  isVrt: boolean;
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
  layout: {
    control: "radio",
    options: ["horizontal", "vertical"],
  },
  duration: {
    type: "number",
  },
  closable: {
    type: "boolean",
  },
  timestamp: {
    control: "object",
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
  isVrt: {
    name: "",
    type: "boolean",
  },
  // Hide event listeners
  onClose: {
    name: "",
  },
} satisfies Meta<DaikinToastNotificationStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinToastNotificationStoryArgs>;
