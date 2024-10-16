import { DaikinTableHeaderCell } from "#package/components/table-header-cell/daikin-table-header-cell";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { ReactDaikinIcon } from "../../icon/stories/framework-react";
import type { DaikinTableHeaderCellStoryArgs } from "./common";

export const ReactDaikinTableHeaderCell = createComponent({
  tagName: "daikin-table-header-cell",
  elementClass: DaikinTableHeaderCell,
  react: React,
  events: {
    onChangeSort: "change-sort",
  },
});

export const metadata: Meta<DaikinTableHeaderCellStoryArgs> = {
  component: ({ leftIcon, ...props }: DaikinTableHeaderCellStoryArgs) => (
    <ReactDaikinTableHeaderCell {...props}>
      Table Header Cell
      {leftIcon && (
        <ReactDaikinIcon
          slot="left-icon"
          icon={leftIcon}
          size="xl"
          color="current"
        />
      )}
    </ReactDaikinTableHeaderCell>
  ),
};
