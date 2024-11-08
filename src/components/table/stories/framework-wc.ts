import "#package/components/button/daikin-button";
import "#package/components/icon/daikin-icon";
import "#package/components/table-cell/daikin-table-cell";
import "#package/components/table-header-cell/daikin-table-header-cell";
import "#package/components/table/daikin-table";
import type { Meta } from "@storybook/web-components";
import { html, nothing } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { DaikinTableStoryArgs } from "./common";

export const metadata: Meta<DaikinTableStoryArgs> = {
  render: ({
    headers,
    rows,
    selectable,
    sortable,
    selection,
    order,
    sort,
    sortFunction,
    hasCellSlot,
    hasHeaderCellSlot,
    onChangeCheck,
    onChangeSort,
  }) =>
    html`<daikin-table
      .headers=${headers}
      .rows=${rows}
      .sort=${sort}
      .order=${order}
      .selection=${selection}
      .sortFunction=${sortFunction}
      ?selectable=${selectable}
      ?sortable=${sortable}
      @change-check=${onChangeCheck}
      @change-sort=${onChangeSort}
    >
      ${hasCellSlot
        ? rows.map(
            ({ id, name, price }) =>
              html`<daikin-table-cell slot=${`cell:name:${id}`}>
                  ${name}
                  <span slot="subtitle">It's subtitle.</span>
                </daikin-table-cell>
                <daikin-table-cell slot=${`cell:price:${id}`} alignment="right">
                  <daikin-button>${price}</daikin-button>
                </daikin-table-cell>`
          )
        : nothing}
      ${hasHeaderCellSlot
        ? headers.map(
            ({ key, label, alignment, sortable }) =>
              html`<daikin-table-header-cell
                slot=${`header:${key}`}
                alignment=${ifDefined(alignment)}
                ?sortable=${sortable}
              >
                ${label}
                <daikin-icon
                  slot="left-icon"
                  icon="positive"
                  size="xl"
                  color="current"
                ></daikin-icon>
              </daikin-table-header-cell>`
          )
        : nothing}
    </daikin-table>`,
};
