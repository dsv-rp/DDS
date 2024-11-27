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
  component: ({ hasSlot, ...props }: DaikinTableStoryArgs) => (
    <ReactDaikinTable {...props}>
      {hasSlot && (
        <>
          {props.rows.map(({ id, name, price }) => (
            <Fragment key={String(id)}>
              <ReactDaikinTableCell slot={`cell:${id}:name`}>
                {name}
                <span slot="subtitle">It's subtitle.</span>
              </ReactDaikinTableCell>
              <ReactDaikinTableCell slot={`cell:${id}:price`} alignment="right">
                <ReactDaikinButton>{price}</ReactDaikinButton>
              </ReactDaikinTableCell>
            </Fragment>
          ))}
          {props.headers.map(({ key, label, alignment, sortable }) => (
            <ReactDaikinTableHeaderCell
              slot={`header:${key}`}
              alignment={alignment ?? "left"}
              sortable={props.sortable && sortable}
            >
              {label}
              <ReactDaikinIcon
                slot="left-icon"
                icon="positive"
                size="current"
                color="current"
              />
            </ReactDaikinTableHeaderCell>
          ))}
        </>
      )}
    </ReactDaikinTable>
  ),
};
