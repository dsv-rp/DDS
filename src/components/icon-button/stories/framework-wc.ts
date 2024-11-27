import "#package/components/icon-button/daikin-icon-button";
import "#package/components/icon/daikin-icon";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { DaikinIconButtonStoryArgs } from "./common";

export const metadata: Meta<DaikinIconButtonStoryArgs> = {
  render: ({
    variant,
    color,
    disabled,
    href,
    type,
    buttonAriaLabel,
    buttonRole,
    icon,
    onClick,
  }) => html`
    <daikin-icon-button
      variant=${variant}
      color=${color}
      href=${ifDefined(href)}
      type=${type}
      button-aria-label=${ifDefined(buttonAriaLabel)}
      button-role=${ifDefined(buttonRole)}
      ?disabled=${disabled}
      @click=${onClick}
    >
      <daikin-icon icon=${icon} size="current" color="current"></daikin-icon>
    </daikin-icon-button>
  `,
};
