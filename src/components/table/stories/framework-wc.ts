import "#package/components/table/daikin-table";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { DaikinTableStoryArgs } from "./common";

export const metadata: Meta<DaikinTableStoryArgs> = {
  render: ({
    headers,
    rows,
    hasCheckbox,
    hasSearch,
    hasPagination,
    hasSort,
    checkedIds,
    keyword,
    orderBy,
    currentPage,
    sort,
    sortedKey,
    selectedRange,
    ranges,
    onChangeCheck,
    onChangePage,
    onChangeSort,
    onSearch,
  }) => {
    const fallbackCheckedIds = (checkedIds as string[] | null) ?? [];
    const fallbackRanges = (ranges as (number | "All")[] | null) ?? [
      5,
      10,
      25,
      50,
      100,
      "All",
    ];
    const fallbackSelectedRange =
      (selectedRange as number | "All" | null) ?? "All";

    return html`<daikin-table
      .headers=${headers}
      .rows=${rows}
      .sort=${sort}
      .orderBy=${orderBy}
      .checkedIds=${fallbackCheckedIds}
      .keyword=${keyword}
      currentPage=${ifDefined(currentPage)}
      .sortedKey=${sortedKey}
      .ranges=${fallbackRanges}
      selected-range=${fallbackSelectedRange}
      ?hasCheckbox=${hasCheckbox}
      ?hasSearch=${hasSearch}
      ?hasPagination=${hasPagination}
      ?hasSort=${hasSort}
      @change-check=${onChangeCheck}
      @change-page=${onChangePage}
      @change-sort=${onChangeSort}
      @search=${onSearch}
    ></daikin-table>`;
  },
};
