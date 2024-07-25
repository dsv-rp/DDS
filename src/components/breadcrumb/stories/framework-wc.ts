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
        >Breadcrumb Item 1</daikin-breadcrumb-item
      >
      <daikin-breadcrumb-item href="#"
        >Breadcrumb Item 2</daikin-breadcrumb-item
      >
      <daikin-breadcrumb-item href="#"
        >Breadcrumb Item 3</daikin-breadcrumb-item
      >
      <daikin-breadcrumb-item href="#"
        >Breadcrumb Item 4</daikin-breadcrumb-item
      >
      <daikin-breadcrumb-item href="#"
        >Breadcrumb Item 5</daikin-breadcrumb-item
      >
    </daikin-breadcrumb>
  `,
};
