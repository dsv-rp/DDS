import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinBreadcrumbStoryArgs } from "./common";

import "../daikin-breadcrumb";
import "../daikin-breadcrumb-item";

export const meta: Meta<DaikinBreadcrumbStoryArgs> = {
  title: "Components/Breadcrumb",
  tags: ["autodocs"],
  render: (args) => html`
    <daikin-breadcrumb
      ?no-trailing-slash=${args.noTrailingSlash}
      ?omission=${args.omission}
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
