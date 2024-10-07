import "#package/components/button/daikin-button";
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
            ({ id, price }) =>
              html`<daikin-button slot=${`cell:price:${id}`}>
                ${price}
              </daikin-button>`
          )
        : nothing}
    </daikin-table>`;
  },
};
