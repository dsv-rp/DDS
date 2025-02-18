import "#package/components/button/daikin-button";
import "#package/components/icon/daikin-icon";
import type { Meta } from "@storybook/web-components";
import { html, nothing } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { DaikinButtonStoryArgs } from "./common";

export const metadata: Meta<DaikinButtonStoryArgs> = {
  render: ({
    variant,
    size,
    color,
    label,
    disabled,
    href,
    type,
    buttonRole,
    leftIcon,
    rightIcon,
    onClick,
  }) => html`
    <daikin-button
      variant=${variant}
      size=${size}
      color=${color}
      href=${ifDefined(href ?? undefined)}
      type=${type}
      button-role=${ifDefined(buttonRole)}
      ?disabled=${disabled}
      @click=${onClick}
    >
      ${label}
      ${leftIcon
        ? html`<daikin-icon
            slot="left-icon"
            icon=${leftIcon}
            size="current"
            color="current"
          ></daikin-icon>`
        : nothing}
      ${rightIcon
        ? html`<daikin-icon
            slot="right-icon"
            icon=${rightIcon}
            size="current"
            color="current"
          ></daikin-icon>`
        : nothing}
    </daikin-button>
  `,
};
