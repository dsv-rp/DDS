import type { DaikinInlineNotification } from "#package/components/inline-notification/daikin-inline-notification";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export const vrtDate = new Date("2025-01-15T00:00:00+09:00");

export interface DaikinInlineNotificationStoryArgs
  extends Required<ElementProps<DaikinInlineNotification>> {
  slotTitle: string;
  slotDescription: string;
  slotAction: boolean;
  isVrt: boolean;
  onClose: () => void;
}

export const DAIKIN_INLINE_NOTIFICATION_ARG_TYPES = {
  status: {
    control: "radio",
    options: ["positive", "negative", "warning", "alarm", "information"],
  },
  layout: {
    control: "radio",
    options: ["horizontal", "vertical"],
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
} satisfies Meta<DaikinInlineNotificationStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinInlineNotificationStoryArgs>;
