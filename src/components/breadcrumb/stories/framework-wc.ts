import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinBreadcrumbItemStoryArgs } from "./common";

import "../daikin-breadcrumb";
import "../daikin-breadcrumb-item";

export const meta: Meta<DaikinBreadcrumbItemStoryArgs> = {
  title: "Components/Breadcrumb",
  tags: ["autodocs"],
  render: (args) => html`
    <daikin-breadcrumb>
      <daikin-breadcrumb-item>test1</daikin-breadcrumb-item>
      <daikin-breadcrumb-item>test2</daikin-breadcrumb-item>
      <daikin-breadcrumb-item>test3</daikin-breadcrumb-item>
    </daikin-breadcrumb>
  `,
};
