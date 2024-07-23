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
    value,
    open,
    option,
    onChange,
    onClick,
  }) => html`
    <div data-testid="vrt-container" style="width:max-content; height:240px;">
      <daikin-dropdown
        label=${ifDefined(label)}
        size=${size}
        label-position=${labelPosition}
        left-icon=${leftIcon}
        value=${value}
        ?open=${open}
        @change=${onChange}
        @click=${onClick}
      >
        ${option === "default"
          ? html`
              <daikin-dropdown-item value="value1">Item 1</daikin-dropdown-item>
              <daikin-dropdown-item value="value2">Item 2</daikin-dropdown-item>
              <daikin-dropdown-item value="value3">Item 3</daikin-dropdown-item>
            `
          : null}
        ${option === "single"
          ? html`
              <daikin-dropdown-item value="value1">Item 1</daikin-dropdown-item>
            `
          : null}
        ${option === "multiple"
          ? html`
              <daikin-dropdown-item value="value1">Item 1</daikin-dropdown-item>
              <daikin-dropdown-item value="value2">Item 2</daikin-dropdown-item>
              <daikin-dropdown-item value="value3">Item 3</daikin-dropdown-item>
              <daikin-dropdown-item value="value4">Item 4</daikin-dropdown-item>
              <daikin-dropdown-item value="value5">Item 5</daikin-dropdown-item>
              <daikin-dropdown-item value="value6">Item 6</daikin-dropdown-item>
              <daikin-dropdown-item value="value7">Item 7</daikin-dropdown-item>
              <daikin-dropdown-item value="value8">Item 8</daikin-dropdown-item>
              <daikin-dropdown-item value="value9">Item 9</daikin-dropdown-item>
              <daikin-dropdown-item value="value10">
                Item 10
              </daikin-dropdown-item>
              <daikin-dropdown-item value="value11">
                Item 11
              </daikin-dropdown-item>
              <daikin-dropdown-item value="value12">
                Item 12
              </daikin-dropdown-item>
              <daikin-dropdown-item value="value13">
                Item 13
              </daikin-dropdown-item>
              <daikin-dropdown-item value="value14">
                Item 14
              </daikin-dropdown-item>
              <daikin-dropdown-item value="value15">
                Item 15
              </daikin-dropdown-item>
              <daikin-dropdown-item value="value16">
                Item 16
              </daikin-dropdown-item>
              <daikin-dropdown-item value="value17">
                Item 17
              </daikin-dropdown-item>
              <daikin-dropdown-item value="value18">
                Item 18
              </daikin-dropdown-item>
              <daikin-dropdown-item value="value19">
                Item 19
              </daikin-dropdown-item>
              <daikin-dropdown-item value="value20">
                Item 20
              </daikin-dropdown-item>
            `
          : null}
      </daikin-dropdown>
    </div>
  `,
};
