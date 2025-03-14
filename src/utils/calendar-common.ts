import { cva } from "class-variance-authority";

export const MIN_YEAR = 1900;
export const MAX_YEAR = 2099;
export const FIRST_DAY = 1;

export const cvaIconButton = cva(
  ["flex", "justify-center", "items-center", "flex-none", "text-current"],
  {
    variants: {
      intent: {
        previous: ["size-5", "i-daikin-chevron-left"],
        next: ["size-5", "i-daikin-chevron-right"],
        calender: ["size-6", "i-daikin-calendar"],
        pulldown: ["size-6", "i-daikin-pulldown-down"],
      },
      rotate: {
        default: [],
        inverse: ["scale-y-[-1]"],
      },
    },
    defaultVariants: {
      rotate: "default",
    },
  }
);

/**
 * It receives the string type and converts it to `Date` type.
 */
export const formatDate: (str: string | null) => Date | null = (
  str: string | null
) => {
  const date = new Date(str ?? "");

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
};

/**
 * For `value`, `min`, `max` and `default-value` attributes,
 * the received string is validated and, if correct, a Date type is returned.
 * If it is incorrect, a console warning is output as necessary.
 */
export const formatDateWithMessage = (
  str: string | null,
  propertyName: string,
  fallbackStr?: string
) => {
  const date = formatDate(str);

  // If the attribute does not exist in the first place, nothing will be done.
  if (!str && !fallbackStr) {
    return null;
  }

  if (!date) {
    if (import.meta.env.DEV) {
      console.warn(
        `Invalid '${propertyName}' property: The format is incorrect.`
      );
    }

    return fallbackStr ? new Date(fallbackStr) : null;
  }

  return date;
};

/**
 * It receives `Date` type and converts it to the string type.
 * It is used for the UI.
 */
export const formatDateToProperty = (date: Date) =>
  date.toLocaleDateString(undefined, { dateStyle: "medium" });

/**
 * When the number of days or months is one digit, it is converted to two digits.
 * When this is present, the time information when converting to Date type will match.
 */
export const formatTwoDigit = (number: number) =>
  String(number).length === 2 ? String(number) : `0${number}`;

export const getNewDate = (year: number, month: number, date = FIRST_DAY) =>
  new Date(`${year}-${formatTwoDigit(month)}-${formatTwoDigit(date)}`);
