import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinBreadcrumbItemStoryArgs } from "./common";

import "../daikin-breadcrumb";
import "../daikin-breadcrumb-item";

export const meta: Meta<DaikinBreadcrumbItemStoryArgs> = {
  title: "Components/Breadcrumb",
  tags: ["autodocs"],
  render: (args) => html`
    <daikin-breadcrumb ?no-trailing-slash=${true}>
      <daikin-breadcrumb-item href="url1"
        >DaikinBreadcrumbItem1</daikin-breadcrumb-item
      >
      <daikin-breadcrumb-item href="url2"
        >DaikinBreadcrumbItem2</daikin-breadcrumb-item
      >
      <daikin-breadcrumb-item href="url3"
        >DaikinBreadcrumbItem3</daikin-breadcrumb-item
      >
      <daikin-breadcrumb-item href="url4" size=${args.size}
        >DaikinBreadcrumbItem4</daikin-breadcrumb-item
      >
      <daikin-breadcrumb-item href=${args.href}
        >DaikinBreadcrumbItem5</daikin-breadcrumb-item
      >
    </daikin-breadcrumb>
  `,
};
