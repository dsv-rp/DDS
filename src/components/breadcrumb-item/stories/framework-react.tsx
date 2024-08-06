import { DaikinBreadcrumbItem } from "#package/components/breadcrumb-item/daikin-breadcrumb-item";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import type { DaikinBreadcrumbItemStoryArgs } from "./common";

const ReactDaikinBreadcrumbItem = createComponent({
  react: React,
  tagName: "daikin-breadcrumb-item",
  elementClass: DaikinBreadcrumbItem,
  events: {},
});

export const metadata: Meta<DaikinBreadcrumbItemStoryArgs> = {
  component: ({ ...props }: DaikinBreadcrumbItemStoryArgs) => (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <ReactDaikinBreadcrumbItem {...props}>
        Breadcrumb Item 1
      </ReactDaikinBreadcrumbItem>
    </div>
  ),
};
