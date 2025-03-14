import type { DaikinCalendar } from "#package/components/calendar/daikin-calendar";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinCalendarStoryArgs
  extends Required<ElementProps<DaikinCalendar>> {
  onSelect: () => void;
  isVrtSelected: boolean;
}

export const DAIKIN_CALENDER_ARG_TYPES = {
  value: {
    type: "string",
  },
  min: {
    type: "string",
  },
  max: {
    type: "string",
  },
  defaultValue: {
    type: "string",
  },
  view: {
    control: "radio",
    options: ["year", "month", "date"],
  },
  onSelect: {
    name: "",
  },
  isVrtSelected: {
    name: "",
    type: "boolean",
  },
} as const satisfies Meta<DaikinCalendarStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinCalendarStoryArgs>;

export const vrtSelectedDate: (fixed: boolean) => string = (fixed: boolean) =>
  fixed ? "2020-01-10" : "2025-01-25";
