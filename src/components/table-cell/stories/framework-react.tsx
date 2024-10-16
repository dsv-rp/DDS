import { DaikinTableCell } from "#package/components/table-cell/daikin-table-cell";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import type { DaikinTableCellStoryArgs } from "./common";

export const ReactDaikinTableCell = createComponent({
  tagName: "daikin-table-cell",
  elementClass: DaikinTableCell,
  react: React,
});

export const metadata: Meta<DaikinTableCellStoryArgs> = {
  component: ({ ...props }: DaikinTableCellStoryArgs) => (
    <ReactDaikinTableCell {...props}>
      Table cell label
      {props.subtitle && <span slot="subtitle">{props.subtitle}</span>}
    </ReactDaikinTableCell>
  ),
};
