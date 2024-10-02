import "#package/components/checkbox/daikin-checkbox";
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
    hasSlot,
    onClick,
  }) => html`
    <daikin-list-item
      type=${type}
      href=${ifDefined(href)}
      left-icon=${ifDefined(leftIcon)}
      right-icon=${ifDefined(rightIcon)}
      ?disabled=${disabled}
      @click=${onClick}
    >
      List item label
      ${hasSlot
        ? html`<daikin-checkbox
            label="Label"
            label-position="hidden"
            slot="action"
          ></daikin-checkbox>`
        : nothing}
    </daikin-list-item>
  `,
};
