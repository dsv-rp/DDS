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
    chevron,
    disabled,
    hasSlot,
    onClick,
  }) => html`
    <daikin-list-item
      type=${type}
      href=${ifDefined(href)}
      left-icon=${ifDefined(leftIcon)}
      ?chevron=${chevron}
      ?disabled=${disabled}
      @click=${onClick}
    >
      List item label
      ${hasSlot
        ? html`<span slot="action">
            <daikin-checkbox
              label="Label"
              label-position="hidden"
            ></daikin-checkbox>
          </span>`
        : nothing}
    </daikin-list-item>
  `,
};
