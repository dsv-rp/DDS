import "#package/components/button/daikin-button";
import "#package/components/table-cell/daikin-table-cell";
import "#package/components/table/daikin-table";
import type { Meta } from "@storybook/web-components";
import { html, nothing } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { DaikinTableStoryArgs } from "./common";

export const metadata: Meta<DaikinTableStoryArgs> = {
  render: ({
    headers,
    rows,
    hasCheckbox,
    hasSort,
    checkedIds,
    orderBy,
    sort,
    sortedKey,
    selectedRowId,
    hasSlot,
    onChangeCheck,
    onChangeSort,
  }) => {
    const fallbackCheckedIds = (checkedIds as string[] | null) ?? [];

    return html`<daikin-table
      .headers=${headers}
      .rows=${rows}
      .sort=${sort}
      .orderBy=${orderBy}
      .checkedIds=${fallbackCheckedIds}
      .sortedKey=${sortedKey}
      selected-row-id=${ifDefined(selectedRowId)}
      ?has-checkbox=${hasCheckbox}
      ?has-sort=${hasSort}
      @change-check=${onChangeCheck}
      @change-sort=${onChangeSort}
    >
      ${hasSlot
        ? rows.map(
            ({ id, name, price }) =>
              html`<daikin-table-cell
                  slot=${`cell:name:${id}`}
                  alignment="left"
                >
                  ${name}
                  <span slot="subtitle">It's subtitle.</span>
                </daikin-table-cell>
                <daikin-table-cell slot=${`cell:price:${id}`} alignment="right">
                  <daikin-button>${price}</daikin-button>
                </daikin-table-cell>`
          )
        : nothing}
    </daikin-table>`;
  },
};
