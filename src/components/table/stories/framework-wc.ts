import "#package/components/table/daikin-table";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import "../../pagination/daikin-pagination";
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
    onSearch,
    onChangeSort,
    onChangePage,
  }) =>
    html`<daikin-table
      .headers=${headers}
      .rows=${rows}
      .sort=${sort}
      .orderBy=${orderBy}
      .checkedIds=${checkedIds}
      .keyword=${keyword}
      .currentPage=${currentPage}
      .sortedKey=${sortedKey}
      .ranges=${ranges}
      selected-range=${selectedRange}
      ?hasCheckbox=${hasCheckbox}
      ?hasSearch=${hasSearch}
      ?hasPagination=${hasPagination}
      ?hasSort=${hasSort}
      @change-check=${onChangeCheck}
      @search=${onSearch}
      @change-sort=${onChangeSort}
      @change-page=${onChangePage}
    >
    </daikin-table>`,
};
