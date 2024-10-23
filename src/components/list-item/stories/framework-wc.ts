import "#package/components/checkbox/daikin-checkbox";
import "#package/components/icon/daikin-icon";
import "#package/components/list-item/daikin-list-item";
import type { Meta } from "@storybook/web-components";
import { html, nothing } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { DaikinListItemStoryArgs } from "./common";

export const metadata: Meta<DaikinListItemStoryArgs> = {
  render: ({
    type,
    href,
    leftIcon,
    rightIcon,
    disabled,
    label,
    action,
    onClick,
  }) => html`
    <daikin-list-item
      type=${type}
      href=${ifDefined(href)}
      ?disabled=${disabled}
      @click=${onClick}
    >
      ${label}
      ${leftIcon
        ? html`<daikin-icon
            slot="left-icon"
            icon=${leftIcon}
            size="xl"
            color="current"
          ></daikin-icon>`
        : nothing}
      ${rightIcon
        ? html`<daikin-icon
            slot="right-icon"
            icon=${rightIcon}
            size="xl"
            color="current"
          ></daikin-icon>`
        : nothing}
      ${action
        ? html`<daikin-checkbox
            label="Label"
            label-position="hidden"
            slot="action"
          ></daikin-checkbox>`
        : nothing}
    </daikin-list-item>
  `,
};
