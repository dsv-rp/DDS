import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinBreadcrumbStoryArgs } from "./common";

import "#package/components/breadcrumb-item/daikin-breadcrumb-item";
import "#package/components/breadcrumb/daikin-breadcrumb";

export const metadata: Meta<DaikinBreadcrumbStoryArgs> = {
  title: "Components/Breadcrumb",
  tags: ["autodocs"],
  render: (args) => html`
    <daikin-breadcrumb
      ?trailing-slash=${args.trailingSlash}
      overflow=${args.overflow}
    >
      <daikin-breadcrumb-item href="#"
        >DaikinBreadcrumbItem1</daikin-breadcrumb-item
      >
      <daikin-breadcrumb-item href="#"
        >DaikinBreadcrumbItem2</daikin-breadcrumb-item
      >
      <daikin-breadcrumb-item href="#"
        >DaikinBreadcrumbItem3</daikin-breadcrumb-item
      >
      <daikin-breadcrumb-item href="#"
        >DaikinBreadcrumbItem4</daikin-breadcrumb-item
      >
      <daikin-breadcrumb-item href="#"
        >DaikinBreadcrumbItem5</daikin-breadcrumb-item
      >
    </daikin-breadcrumb>
  `,
};
