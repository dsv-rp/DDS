import { DaikinBreadcrumb } from "#package/components/breadcrumb/daikin-breadcrumb";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { ReactDaikinBreadcrumbItem } from "../../breadcrumb-item/stories/framework-react";
import type { DaikinBreadcrumbStoryArgs } from "./common";

const ReactDaikinBreadcrumb = createComponent({
  react: React,
  tagName: "daikin-breadcrumb",
  elementClass: DaikinBreadcrumb,
});

export const metadata: Meta<DaikinBreadcrumbStoryArgs> = {
  component: ({ ...props }: DaikinBreadcrumbStoryArgs) => (
    <ReactDaikinBreadcrumb {...props}>
      <ReactDaikinBreadcrumbItem href="https://dsv-rp.github.io/DDS">
        Breadcrumb item 1
      </ReactDaikinBreadcrumbItem>
      <ReactDaikinBreadcrumbItem href="https://dsv-rp.github.io/DDS">
        Breadcrumb item 2
      </ReactDaikinBreadcrumbItem>
      <ReactDaikinBreadcrumbItem href="https://dsv-rp.github.io/DDS">
        Breadcrumb item 3
      </ReactDaikinBreadcrumbItem>
      <ReactDaikinBreadcrumbItem href="https://dsv-rp.github.io/DDS">
        Breadcrumb item 4
      </ReactDaikinBreadcrumbItem>
      <ReactDaikinBreadcrumbItem href="https://dsv-rp.github.io/DDS">
        Breadcrumb item 5
      </ReactDaikinBreadcrumbItem>
    </ReactDaikinBreadcrumb>
  ),
};
