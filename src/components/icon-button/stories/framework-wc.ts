import "#package/components/icon-button/daikin-icon-button";
import "#package/components/icon/daikin-icon";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { DaikinIconButtonStoryArgs } from "./common";

export const metadata: Meta<DaikinIconButtonStoryArgs> = {
  render: ({
    type,
    variant,
    color,
    disabled,
    buttonAriaLabel,
    icon,
    onClick,
  }) => html`
    <daikin-icon-button
      type=${type}
      variant=${variant}
      color=${color}
      button-aria-label=${ifDefined(buttonAriaLabel)}
      ?disabled=${disabled}
      @click=${onClick}
    >
      <daikin-icon icon=${icon} size="full" color="current"></daikin-icon>
    </daikin-icon-button>
  `,
};
