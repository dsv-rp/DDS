import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinBreadcrumbItemStoryArgs } from "./common";

import "../daikin-breadcrumb";
import "../daikin-breadcrumb-item";

export const meta: Meta<DaikinBreadcrumbItemStoryArgs> = {
  title: "Components/Breadcrumb",
  tags: ["autodocs"],
  render: (args) => html`
    <daikin-breadcrumb-item
      href=${args.href}
      target=${args.target}
      size=${args.size}
      ?disabled=${args.disabled}
      >DaikinBreadcrumbItem1</daikin-breadcrumb-item
    >
  `,
};
