import { DaikinTable } from "#package/components/table/daikin-table";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { ReactDaikinButton } from "../../button/stories/framework-react";
import type { DaikinTableStoryArgs } from "./common";

const ReactDaikinTable = createComponent({
  tagName: "daikin-table",
  elementClass: DaikinTable,
  react: React,
  events: {
    onChangeCheck: "change-check",
    onChangePage: "change-page",
    onChangeSort: "change-sort",
    onSearch: "search",
  },
});

export const metadata: Meta<DaikinTableStoryArgs> = {
  component: ({ ...props }: DaikinTableStoryArgs) => (
    <ReactDaikinTable {...props}>
      {props.hasSlot &&
        props.rows.map(({ id, price }) => (
          <ReactDaikinButton key={id} slot={`cell:${id}:price`}>
            {price}
          </ReactDaikinButton>
        ))}
    </ReactDaikinTable>
  ),
};
