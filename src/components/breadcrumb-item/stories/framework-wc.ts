import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinBreadcrumbItemStoryArgs } from "./common";

import "#package/components/breadcrumb-item/daikin-breadcrumb-item";
import { ifDefined } from "lit/directives/if-defined.js";

export const metadata: Meta<DaikinBreadcrumbItemStoryArgs> = {
  title: "Components/Breadcrumb",
  tags: ["autodocs"],
  render: ({ href, target, variant, disabled }) => html`
    <daikin-breadcrumb-item
      href=${ifDefined(href)}
      target=${ifDefined(target)}
      variant=${variant}
      ?disabled=${disabled}
    >
      Breadcrumb item
    </daikin-breadcrumb-item>
  `,
};
