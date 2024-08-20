import { DaikinTable } from "#package/components/table/daikin-table";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import type { DaikinTableStoryArgs } from "./common";

const ReactDaikinTable = createComponent({
  tagName: "daikin-table",
  elementClass: DaikinTable,
  react: React,
  events: {
    onChangeCheck: "change-check",
    onSearch: "search",
    onChangeSort: "change-sort",
    onChangePage: "change-page",
  },
});

export const metadata: Meta<DaikinTableStoryArgs> = {
  component: ({ ...props }: DaikinTableStoryArgs) => (
    <ReactDaikinTable {...props}></ReactDaikinTable>
  ),
};
