import { DaikinBreadcrumbItem } from "#package/components/breadcrumb-item/daikin-breadcrumb-item";
import { DaikinBreadcrumb } from "#package/components/breadcrumb/daikin-breadcrumb";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import type { DaikinBreadcrumbStoryArgs } from "./common";

const ReactDaikinBreadcrumb = createComponent({
  react: React,
  tagName: "daikin-breadcrumb",
  elementClass: DaikinBreadcrumb,
  events: {},
});

const ReactDaikinBreadcrumbItem = createComponent({
  react: React,
  tagName: "daikin-breadcrumb-item",
  elementClass: DaikinBreadcrumbItem,
  events: {},
});

export const metadata: Meta<DaikinBreadcrumbStoryArgs> = {
  component: ({ ...props }: DaikinBreadcrumbStoryArgs) => (
    <ReactDaikinBreadcrumb {...props}>
      <ReactDaikinBreadcrumbItem href="#">
        DaikinBreadcrumbItem1
      </ReactDaikinBreadcrumbItem>
      <ReactDaikinBreadcrumbItem href="#">
        DaikinBreadcrumbItem2
      </ReactDaikinBreadcrumbItem>
      <ReactDaikinBreadcrumbItem href="#">
        DaikinBreadcrumbItem3
      </ReactDaikinBreadcrumbItem>
      <ReactDaikinBreadcrumbItem href="#">
        DaikinBreadcrumbItem4
      </ReactDaikinBreadcrumbItem>
      <ReactDaikinBreadcrumbItem href="#">
        DaikinBreadcrumbItem5
      </ReactDaikinBreadcrumbItem>
    </ReactDaikinBreadcrumb>
  ),
};
