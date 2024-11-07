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
  }) => {
    const color = { enabled: "#414141", disabled: "#BFBFBF" }[
      disabled ? "disabled" : "enabled"
    ];

    const style = `display:flex; align-items:center; color:${color};`;

    return html`
      <daikin-list-item
        type=${type}
        href=${ifDefined(href)}
        ?disabled=${disabled}
        @click=${onClick}
      >
        ${label}
        ${leftIcon
          ? html`<span slot="left-icon" style=${style}>
              <daikin-icon
                icon=${leftIcon}
                size="xl"
                color="current"
              ></daikin-icon>
            </span>`
          : nothing}
        ${rightIcon
          ? html`<span slot="right-icon" style=${style}>
              <daikin-icon
                icon=${rightIcon}
                size="xl"
                color="current"
              ></daikin-icon>
            </span>`
          : nothing}
        ${action
          ? html`<daikin-checkbox
              slot="action"
              label="Label"
              label-position="hidden"
              ?disabled=${disabled}
            ></daikin-checkbox>`
          : nothing}
      </daikin-list-item>
    `;
  },
};
