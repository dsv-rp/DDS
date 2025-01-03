import "#package/components/breadcrumb-item/daikin-breadcrumb-item";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { DaikinBreadcrumbItemStoryArgs } from "./common";

export const metadata: Meta<DaikinBreadcrumbItemStoryArgs> = {
  title: "Components/Breadcrumb",
  tags: ["autodocs"],
  render: ({ href, target, variant, showVisited, label }) =>
    html`<daikin-breadcrumb-item
      href=${ifDefined(href)}
      target=${ifDefined(target)}
      variant=${variant}
      ?show-visited=${showVisited}
      >${label}</daikin-breadcrumb-item
    >`,
};
