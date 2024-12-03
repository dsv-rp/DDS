import { DaikinBreadcrumbItem } from "#package/components/breadcrumb-item/daikin-breadcrumb-item";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import type { DaikinBreadcrumbItemStoryArgs } from "./common";

export const ReactDaikinBreadcrumbItem = createComponent({
  react: React,
  tagName: "daikin-breadcrumb-item",
  elementClass: DaikinBreadcrumbItem,
});

export const metadata: Meta<DaikinBreadcrumbItemStoryArgs> = {
  component: ({ ...props }: DaikinBreadcrumbItemStoryArgs) => (
    <ReactDaikinBreadcrumbItem {...props}>
      Breadcrumb item
    </ReactDaikinBreadcrumbItem>
  ),
};
