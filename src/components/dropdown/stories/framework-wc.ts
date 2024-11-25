import "#package/components/dropdown-item/daikin-dropdown-item";
import "#package/components/dropdown/daikin-dropdown";
import type { Meta } from "@storybook/web-components";
import { html, nothing } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { DaikinDropdownStoryArgs } from "./common";

export const metadata: Meta<DaikinDropdownStoryArgs> = {
  render: ({
    value,
    placeholder,
    open,
    disabled,
    required,
    error,
    option,
    onChange,
    onClick,
  }) => html`
    <div data-testid="vrt-container" style="width:360px; height:256px;">
      <daikin-dropdown
        value=${ifDefined(value)}
        placeholder=${placeholder}
        ?open=${open}
        ?disabled=${disabled}
        ?required=${required}
        ?error=${error}
        @change=${onChange}
        @click=${onClick}
      >
        ${option === "default"
          ? html`
              <daikin-dropdown-item value="value1"
                >Dropdown item 1</daikin-dropdown-item
              >
              <daikin-dropdown-item value="value2"
                >Dropdown item 2</daikin-dropdown-item
              >
              <daikin-dropdown-item value="value3" disabled
                >Dropdown item 3</daikin-dropdown-item
              >
            `
          : nothing}
        ${option === "single"
          ? html`
              <daikin-dropdown-item value="value1">
                Dropdown item 1
              </daikin-dropdown-item>
            `
          : nothing}
        ${option === "many"
          ? html`
              <daikin-dropdown-item value="value1">
                Dropdown item 1
              </daikin-dropdown-item>
              <daikin-dropdown-item value="value2">
                Dropdown item 2
              </daikin-dropdown-item>
              <daikin-dropdown-item value="value3" disabled>
                Dropdown item 3
              </daikin-dropdown-item>
              <daikin-dropdown-item value="value4" disabled>
                Dropdown item 4
              </daikin-dropdown-item>
              <daikin-dropdown-item value="value5">
                Dropdown item 5
              </daikin-dropdown-item>
              <daikin-dropdown-item value="value6">
                Dropdown item 6
              </daikin-dropdown-item>
              <daikin-dropdown-item value="value7">
                Dropdown item 7
              </daikin-dropdown-item>
              <daikin-dropdown-item value="value8">
                Dropdown item 8
              </daikin-dropdown-item>
              <daikin-dropdown-item value="value9">
                Dropdown item 9
              </daikin-dropdown-item>
              <daikin-dropdown-item value="value10">
                Dropdown item 10
              </daikin-dropdown-item>
              <daikin-dropdown-item value="value11">
                Dropdown item 11
              </daikin-dropdown-item>
              <daikin-dropdown-item value="value12">
                Dropdown item 12
              </daikin-dropdown-item>
              <daikin-dropdown-item value="value13">
                Dropdown item 13
              </daikin-dropdown-item>
              <daikin-dropdown-item value="value14">
                Dropdown item 14
              </daikin-dropdown-item>
              <daikin-dropdown-item value="value15">
                Dropdown item 15
              </daikin-dropdown-item>
              <daikin-dropdown-item value="value16">
                Dropdown item 16
              </daikin-dropdown-item>
              <daikin-dropdown-item value="value17">
                Dropdown item 17
              </daikin-dropdown-item>
              <daikin-dropdown-item value="value18">
                Dropdown item 18
              </daikin-dropdown-item>
              <daikin-dropdown-item value="value19">
                Dropdown item 19
              </daikin-dropdown-item>
              <daikin-dropdown-item value="value20">
                Dropdown item 20
              </daikin-dropdown-item>
            `
          : nothing}
      </daikin-dropdown>
    </div>
  `,
};
