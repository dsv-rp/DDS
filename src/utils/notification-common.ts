import { cva } from "class-variance-authority";

/** The duration of the animation in the appearance and disappearance of the toast (in msec). */
export const TOAST_ANIMATION_DURATION = 200;

export function formatDate(date: Date): string {
  return date.toLocaleDateString(undefined, { dateStyle: "medium" });
}

export const cvaContainer = cva(
  [
    "flex",
    "items-center",
    "gap-4",
    "w-full",
    "text-ddt-color-common-text-primary",
    "bg-ddt-color-common-background-default",
    "py-4",
    "pl-5",
    "pr-4",
    "overflow-hidden",
    "font-daikinSerif",
    "transition",
    "box-border",

    "before:size-6",
    "before:flex-none",
  ],
  {
    variants: {
      variant: {
        toast: ["rounded-lg", "border", "border-ddt-color-divider"],
        inline: [],
      },
      status: {
        positive: [
          "before:text-ddt-color-common-success",
          "before:i-daikin-status-positive",
        ],
        negative: [
          "before:text-ddt-color-common-danger-default",
          "before:i-daikin-status-negative",
        ],
        warning: [
          "before:text-ddt-color-common-warning",
          "before:i-daikin-status-warning",
        ],
        alarm: [
          "before:text-ddt-color-common-alarm",
          "before:i-daikin-status-alarm",
        ],
        information: [
          "before:text-ddt-color-common-information",
          "before:i-daikin-status-information",
        ],
      },
    },
  }
);

export const cvaContent = cva(["flex", "flex-glow", "items-center", "w-full"], {
  variants: {
    layout: {
      horizontal: ["gap-2", "overflow-hidden"],
      vertical: ["items-stretch", "flex-col", "gap-1"],
    },
  },
});

export const cvaTimestamp = cva(
  [
    "text-ddt-color-common-text-secondary",
    "text-xs",
    "leading-[130%]",
    "whitespace-nowrap",
  ],
  {
    variants: {
      layout: {
        horizontal: ["flex-grow", "text-right"],
        vertical: [],
      },
    },
  }
);
