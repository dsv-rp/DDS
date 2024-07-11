import { DaikinBreadcrumb } from "#package/components/breadcrumb/daikin-breadcrumb";
import { DaikinBreadcrumbItem } from "#package/components/breadcrumb/daikin-breadcrumb-item";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import type { DaikinBreadcrumbItemStoryArgs } from "./common";

const ReactDaikinBreadcrumb = createComponent({
  react: React,
  tagName: "daikin-breadcrumb",
  elementClass: DaikinBreadcrumb,
  events: {
    change: "onChange",
    click: "onClick",
  },
});

const ReactDaikinBreadcrumbItem = createComponent({
  react: React,
  tagName: "daikin-breadcrumb-item",
  elementClass: DaikinBreadcrumbItem,
  events: {
    change: "onChange",
    click: "onClick",
  },
});

export const metadata: Meta<DaikinBreadcrumbItemStoryArgs> = {
  component: ({ ...props }: DaikinBreadcrumbItemStoryArgs) => (
    <ReactDaikinBreadcrumb noTrailingSlash={true}>
      <ReactDaikinBreadcrumbItem href="test1url">
        DaikinBreadcrumbItem1
      </ReactDaikinBreadcrumbItem>
      <ReactDaikinBreadcrumbItem href="url2">
        DaikinBreadcrumbItem2
      </ReactDaikinBreadcrumbItem>
      <ReactDaikinBreadcrumbItem href="url3">
        DaikinBreadcrumbItem3
      </ReactDaikinBreadcrumbItem>
      <ReactDaikinBreadcrumbItem href="url4" size={props.size}>
        DaikinBreadcrumbItem4
      </ReactDaikinBreadcrumbItem>
      <ReactDaikinBreadcrumbItem href={props.href}>
        DaikinBreadcrumbItem5
      </ReactDaikinBreadcrumbItem>
    </ReactDaikinBreadcrumb>
  ),
};
