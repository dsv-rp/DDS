import { DaikinPagination } from "#package/components/pagination/daikin-pagination";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import type { DaikinPaginationStoryArgs } from "./common";

const ReactDaikinPagination = createComponent({
  react: React,
  tagName: "daikin-pagination",
  elementClass: DaikinPagination,
  events: {
    onChange: "change",
    onClick: "click",
  },
});

export const metadata: Meta<DaikinPaginationStoryArgs> = {
  component: ({ ...props }: DaikinPaginationStoryArgs) => (
    <ReactDaikinPagination {...props} />
  ),
};
