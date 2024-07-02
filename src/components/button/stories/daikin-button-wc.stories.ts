import "#package/components/button/daikin-button";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import { DAIKIN_BUTTON_ARG_TYPES, type DaikinButtonStoryArgs } from "./common";

export default {
  title: "Components/Button",
  tags: ["autodocs"],
  render: ({ disabled, href, label, size, type, variant, onClick }) => html`
    <daikin-button
      variant=${variant}
      href=${href}
      size=${size}
      type=${type}
      ?disabled=${disabled}
      @click=${onClick}
    >
      ${label}
    </daikin-button>
  `,
  argTypes: DAIKIN_BUTTON_ARG_TYPES,
} satisfies Meta<DaikinButtonStoryArgs>;

export {
  Primary,
  PrimaryDanger,
  Secondary,
  Tertiary,
  Disabled,
} from "./commonStories";
