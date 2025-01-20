import "#package/components/dropdown-item/daikin-dropdown-item";
import "#package/components/dropdown/daikin-dropdown";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { repeat } from "lit/directives/repeat.js";
import type { DaikinDropdownStoryArgs } from "./common";

export const objects = {
  default: 3,
  single: 1,
  many: 20,
};

export const vrtMultipleValue: Record<"none" | "single" | "many", string[]> = {
  none: [],
  single: ["value1"],
  many: ["value1", "value2", "value19", "value20"],
};

export const metadata: Meta<DaikinDropdownStoryArgs> = {
  render: ({
    value,
    placeholder,
    multiple,
    selectedOptions,
    open,
    disabled,
    required,
    error,
    maxViewLabel,
    option,
    __vrtMultipleValue__,
    onChange,
    onClick,
  }) => html`
    <div data-testid="vrt-container" style="width:480px; height:256px;">
      <daikin-dropdown
        value=${ifDefined(value ?? undefined)}
        .selectedOptions=${__vrtMultipleValue__
          ? vrtMultipleValue[__vrtMultipleValue__]
          : selectedOptions}
        placeholder=${placeholder}
        max-view-label=${ifDefined(maxViewLabel ?? undefined)}
        ?multiple=${multiple}
        ?open=${open}
        ?disabled=${disabled}
        ?required=${required}
        ?error=${error}
        @change=${onChange}
        @click=${onClick}
      >
        ${repeat(
          [...Array(objects[option]).keys()],
          (index) => index,
          (index) =>
            html`<daikin-dropdown-item
              value=${`value${index + 1}`}
              ?disabled=${[2, 3].includes(index)}
              >${`Dropdown item ${index + 1}`}</daikin-dropdown-item
            >`
        )}
      </daikin-dropdown>
    </div>
  `,
};
