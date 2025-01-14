import type { DaikinInlineNotification } from "#package/components/inline-notification/daikin-inline-notification";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinInlineNotificationStoryArgs
  extends Required<ElementProps<DaikinInlineNotification>> {
  slotTitle: string;
  slotDescription: string;
  slotAction: boolean;
  onClose: () => void;
}

export const DAIKIN_INLINE_NOTIFICATION_ARG_TYPES = {
  status: {
    control: "radio",
    options: ["positive", "negative", "warning", "alarm", "information"],
  },
  line: {
    control: "radio",
    options: ["single", "multiple"],
  },
  open: {
    type: "boolean",
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
} satisfies Meta<DaikinInlineNotificationStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinInlineNotificationStoryArgs>;
