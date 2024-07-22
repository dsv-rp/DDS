import "#package/components/dropdown-item/daikin-dropdown-item";
import "#package/components/dropdown/daikin-dropdown";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { DaikinDropdownStoryArgs } from "./common";

export const metadata: Meta<DaikinDropdownStoryArgs> = {
  render: ({
    label,
    size,
    labelPosition,
    leftIcon,
    open,
    ariaLabel,
    onChange,
    onClick,
  }) => html`
    <div data-testid="vrt-container" style="width:max-content; height:240px;">
      <daikin-dropdown
        label=${ifDefined(label)}
        size=${size}
        label-position=${labelPosition}
        left-icon=${leftIcon}
        ?open=${open}
        aria-label=${ariaLabel}
        @change=${onChange}
        @click=${onClick}
      >
        <daikin-dropdown-item value="value1">Item 1</daikin-dropdown-item>
        <daikin-dropdown-item value="value2">Item 2</daikin-dropdown-item>
        <daikin-dropdown-item value="value3">Item 3</daikin-dropdown-item>
      </daikin-dropdown>
    </div>
  `,
};
