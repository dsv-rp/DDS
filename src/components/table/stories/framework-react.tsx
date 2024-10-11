import { DaikinTable } from "#package/components/table/daikin-table";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React, { Fragment } from "react";
import { ReactDaikinButton } from "../../button/stories/framework-react";
import { ReactDaikinIcon } from "../../icon/stories/framework-react";
import { ReactDaikinTableCell } from "../../table-cell/stories/framework-react";
import { ReactDaikinTableHeaderCell } from "../../table-header-cell/stories/framework-react";
import type { DaikinTableStoryArgs } from "./common";

const ReactDaikinTable = createComponent({
  tagName: "daikin-table",
  elementClass: DaikinTable,
  react: React,
  events: {
    onChangeCheck: "change-check",
    onChangeSort: "change-sort",
  },
});

export const metadata: Meta<DaikinTableStoryArgs> = {
  component: ({
    hasCellSlot,
    hasHeaderCellSlot,
    ...props
  }: DaikinTableStoryArgs) => (
    <ReactDaikinTable {...props}>
      {hasCellSlot &&
        props.rows.map(({ id, name, price }) => (
          <Fragment key={id}>
            <ReactDaikinTableCell slot={`cell:name:${id}`}>
              {name}
              <span slot="subtitle">It's subtitle.</span>
            </ReactDaikinTableCell>
            <ReactDaikinTableCell slot={`cell:price:${id}`}>
              <ReactDaikinButton>{price}</ReactDaikinButton>
            </ReactDaikinTableCell>
          </Fragment>
        ))}
      {hasHeaderCellSlot &&
        props.headers.map(({ key, label }) => (
          <ReactDaikinTableHeaderCell slot={`header:${key}`}>
            {label}
            <ReactDaikinIcon
              slot="left-icon"
              icon="positive"
              size="xl"
              color="current"
            />
          </ReactDaikinTableHeaderCell>
        ))}
    </ReactDaikinTable>
  ),
};
