import "#package/components/button/daikin-button";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinButtonStoryArgs } from "./common";

export const metadata: Meta<DaikinButtonStoryArgs> = {
  render: ({
    disabled,
    href,
    label,
    size,
    type,
    variant,
    leftIcon,
    rightIcon,
    onClick,
  }) => html`
    <daikin-button
      variant=${variant}
      href=${href}
      size=${size}
      type=${type}
      ?disabled=${disabled}
      leftIcon=${leftIcon}
      rightIcon=${rightIcon}
      @click=${onClick}
    >
      ${label}
    </daikin-button>
  `,
};
