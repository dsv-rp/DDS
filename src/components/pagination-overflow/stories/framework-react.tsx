import { DaikinPaginationOverflow } from "#package/components/pagination-overflow/daikin-pagination-overflow";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import type { DaikinPaginationOverflowStoryArgs } from "./common";

const ReactDaikinPaginationOverflow = createComponent({
  react: React,
  tagName: "daikin-pagination-overflow",
  elementClass: DaikinPaginationOverflow,
  events: {
    onChange: "page-change",
    onClick: "click",
  },
});

export const metadata: Meta<DaikinPaginationOverflowStoryArgs> = {
  component: ({ ...props }: DaikinPaginationOverflowStoryArgs) => (
    <ReactDaikinPaginationOverflow {...props} />
  ),
};
