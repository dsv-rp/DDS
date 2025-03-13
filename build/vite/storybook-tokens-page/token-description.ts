import type { UnifiedTokenType } from "./unify-token-type";

export const TYPE_DESCRIPTION_MAP = {
  border: {
    name: "Border",
    description:
      "Border tokens are tokens that come in sets with different border colors, styles, and thicknesses. As there is no theme category in Tailwind CSS that directly corresponds to this type of token, we have adopted our own utility class name.",
    tailwindUsages: [
      {
        exampleClass: "border-*",
        url: null,
      },
    ],
  },
  borderRadius: {
    name: "Border Radius",
    description:
      "Border radius tokens define the roundness of an object's corners. Contrary to its name, it does not require the use of borders.",
    tailwindUsages: [
      {
        exampleClass: "rounded-dds-border-radius-200",
        url: "https://tailwindcss.com/docs/border-radius",
      },
    ],
  },
  borderWidth: {
    name: "Border Width",
    description: "Border width tokens define the thickness of borders.",
    tailwindUsages: [
      {
        exampleClass: "border-dds-border-width-100",
        url: "https://tailwindcss.com/docs/border-width",
      },
    ],
  },
  color: {
    name: "Color",
    description:
      "Color tokens define the colors used for text, backgrounds, etc.",
    tailwindUsages: [
      {
        exampleClass: "text-dds-color-common-brand-default",
        url: "https://tailwindcss.com/docs/color",
      },
      {
        exampleClass: "bg-dds-color-common-brand-default",
        url: "https://tailwindcss.com/docs/background-color",
      },
      {
        exampleClass: "border-dds-color-common-brand-default",
        url: "https://tailwindcss.com/docs/border-color",
      },
      {
        exampleClass: "outline-dds-color-common-brand-default",
        url: "https://tailwindcss.com/docs/outline-color",
      },
    ],
  },
  dimension: {
    name: "Dimension",
    description:
      "Dimension tokens define the size of objects. The Tailwind plugin currently consolidates all size-related tokens into spacing category.",
    tailwindUsages: [
      {
        exampleClass: "w-dds-*", // No actual token prepared yet.
        url: "https://tailwindcss.com/docs/width",
      },
      {
        exampleClass: "h-dds-*", // No actual token prepared yet.
        url: "https://tailwindcss.com/docs/height",
      },
    ],
  },
  fontFamily: {
    name: "Font Family",
    description: "Font family tokens define the font family of text.",
    tailwindUsages: [
      {
        exampleClass: "font-dds-font-family-base",
        url: "https://tailwindcss.com/docs/font-family",
      },
    ],
  },
  fontSize: {
    name: "Font Size",
    description: "Font size tokens define the font size of text.",
    tailwindUsages: [
      {
        exampleClass: "text-dds-font-size-400",
        url: "https://tailwindcss.com/docs/font-size",
      },
    ],
  },
  fontWeight: {
    name: "Font Weight",
    description: "Font weight tokens define the font weight of text.",
    tailwindUsages: [
      {
        exampleClass: "font-dds-font-weight-bold",
        url: "https://tailwindcss.com/docs/font-weight",
      },
    ],
  },
  lineHeight: {
    name: "Line Height",
    description:
      "Line height tokens define the leading, or line height, of text.",
    tailwindUsages: [
      {
        exampleClass: "leading-dds-font-line-height-tight",
        url: "https://tailwindcss.com/docs/line-height",
      },
    ],
  },
  shadow: {
    name: "Shadow",
    description: "Shadow tokens define the shadow of objects.",
    tailwindUsages: [
      {
        exampleClass: "shadow-dds-*", // No actual token prepared yet.
        url: "https://tailwindcss.com/docs/box-shadow",
      },
    ],
  },
  sizing: {
    name: "Sizing",
    description:
      "Sizing tokens define the size of objects. The Tailwind plugin currently consolidates all size-related tokens into spacing category.",
    tailwindUsages: [
      {
        exampleClass: "w-dds-*", // No actual token prepared yet.
        url: "https://tailwindcss.com/docs/width",
      },
      {
        exampleClass: "h-dds-*", // No actual token prepared yet.
        url: "https://tailwindcss.com/docs/height",
      },
    ],
  },
  spacing: {
    name: "Spacing",
    description:
      "Spacing tokens define the distance and size of objects. The Tailwind plugin currently consolidates all size-related tokens into spacing category.",
    tailwindUsages: [
      {
        exampleClass: "m-dds-space-200",
        url: "https://tailwindcss.com/docs/margin",
      },
      {
        exampleClass: "p-dds-space-200",
        url: "https://tailwindcss.com/docs/padding",
      },
      {
        exampleClass: "gap-dds-space-200",
        url: "https://tailwindcss.com/docs/gap",
      },
      {
        exampleClass: "w-dds-space-200",
        url: "https://tailwindcss.com/docs/width",
      },
      {
        exampleClass: "h-dds-space-200",
        url: "https://tailwindcss.com/docs/height",
      },
    ],
  },
  typography: {
    name: "Typography",
    description:
      "Typography tokens are tokens that come in sets with different font families, sizes, weights, and line heights. As there is no theme category in Tailwind CSS that directly corresponds to this type of token, we have adopted our own utility class name.",
    tailwindUsages: [
      {
        exampleClass: "type-dds-font-regular-bold-normal-400",
        url: null,
      },
    ],
  },
} satisfies Record<
  UnifiedTokenType,
  {
    name: string;
    description: string;
    tailwindUsages: { exampleClass: string; url: string | null }[];
  }
>;
