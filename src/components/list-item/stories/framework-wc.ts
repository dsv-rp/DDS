import "#package/components/checkbox/daikin-checkbox";
import "#package/components/list-item/daikin-list-item";
import type { Meta } from "@storybook/web-components";
import { html, nothing } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { DaikinListItemStoryArgs } from "./common";

export const metadata: Meta<DaikinListItemStoryArgs> = {
  render: ({
    label,
    type,
    href,
    leftIcon,
    rightArrowIcon,
    disabled,
    hasSlot,
    onClick,
  }) => html`
    <daikin-list-item
      label=${label}
      type=${type}
      href=${ifDefined(href)}
      left-icon=${ifDefined(leftIcon)}
      ?right-arrow-icon=${rightArrowIcon}
      ?disabled=${disabled}
      @click=${onClick}
      >${hasSlot
        ? html`<daikin-checkbox
            label="Label"
            label-position="hidden"
          ></daikin-checkbox>`
        : nothing}</daikin-list-item
    >
  `,
};
