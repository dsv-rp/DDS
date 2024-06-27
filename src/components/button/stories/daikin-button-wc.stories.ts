import { action } from "@storybook/addon-actions";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import "../daikin-button";
import { DAIKIN_BUTTON_ARG_TYPES, type DaikinButtonStoryArgs } from "./common";

const meta = {
  title: "Components/Button",
  tags: ["autodocs"],
  render: ({
    disabled,
    href,
    isLoading,
    label,
    role,
    size,
    type,
    variant,
  }) => html`
    <daikin-button
      variant=${variant}
      href=${href}
      role=${role}
      size=${size}
      type=${type}
      ?disabled=${disabled}
      ?isLoading=${isLoading}
      @click=${action("button-click")}
    >
      ${label}
    </daikin-button>
  `,
  argTypes: DAIKIN_BUTTON_ARG_TYPES,
} satisfies Meta<DaikinButtonStoryArgs>;

export default meta;

export { Primary, PrimaryDanger, Secondary, Tertiary } from "./common";
