import type { DaikinMenu } from "#package/components/menu/daikin-menu";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";
import { cva } from "class-variance-authority";

export interface DaikinMenuStoryArgs
  extends Required<ElementProps<DaikinMenu>> {
  hasSlot: boolean;
  viewArea: "small" | "full";
  onClick: (event: Event) => void;
  onToggle: (event: Event) => void;
  onBeforeToggle: (event: Event) => void;
  __vrtContainer__: boolean;
}

export const DAIKIN_MENU_ARG_TYPES = {
  placement: {
    control: "radio",
    options: ["top", "bottom", "left", "right"],
  },
  color: {
    control: "radio",
    options: ["default", "inverse"],
  },
  open: {
    type: "boolean",
  },
  description: {
    type: "string",
  },
  popoverValue: {
    control: "radio",
    options: ["auto", "manual"],
  },
  trigger: {
    control: "radio",
    options: ["hover", "click", "manual"],
  },
  hasSlot: {
    type: "boolean",
  },
  viewArea: {
    control: "radio",
    options: ["small", "full"],
  },
  __vrtContainer__: {
    name: "",
    type: "boolean",
  },
} as const satisfies Meta<DaikinMenuStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinMenuStoryArgs>;

export const MENU_SLOT_TEXT =
  "This is a description using a slot. It also supports content other than character strings.";

export const cvaViewArea = cva(["overflow-auto", "border-[#ccc]"], {
  variants: {
    viewArea: {
      small: ["w-[800px]"],
      full: ["w-[100vw]"],
    },
    isVrt: {
      false: ["h-[500px]"],
      true: ["h-[900px]"],
    },
  },
});

export const cvaContainer = cva(
  ["w-[1500px]", "flex", "items-center", "justify-center"],
  {
    variants: {
      isVrt: {
        false: ["h-[900px]"],
        true: ["h-[1700px]"],
      },
    },
  }
);
