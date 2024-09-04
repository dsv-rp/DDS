import "#package/components/button/daikin-button";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { DaikinButtonStoryArgs } from "./common";

export const metadata: Meta<DaikinButtonStoryArgs> = {
  render: ({
    variant,
    color,
    size,
    label,
    disabled,
    href,
    type,
    leftIcon,
    rightIcon,
    onClick,
  }) => html`
    <daikin-button
      variant=${variant}
      color=${color}
      size=${size}
      href=${href}
      type=${type}
      ?disabled=${disabled}
      left-icon=${ifDefined(leftIcon)}
      right-icon=${ifDefined(rightIcon)}
      @click=${onClick}
    >
      ${label}
    </daikin-button>
  `,
};
