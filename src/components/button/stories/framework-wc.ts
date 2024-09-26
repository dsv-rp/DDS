import "#package/components/button/daikin-button";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { DaikinButtonStoryArgs } from "./common";

export const metadata: Meta<DaikinButtonStoryArgs> = {
  render: ({
    variant,
    color,
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
      href=${ifDefined(href ?? undefined)}
      type=${type}
      left-icon=${ifDefined(leftIcon ?? undefined)}
      right-icon=${ifDefined(rightIcon ?? undefined)}
      ?disabled=${disabled}
      @click=${onClick}
    >
      ${label}
    </daikin-button>
  `,
};
