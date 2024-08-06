import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinBreadcrumbItemStoryArgs } from "./common";

import "#package/components/breadcrumb-item/daikin-breadcrumb-item";
import { ifDefined } from "lit/directives/if-defined.js";

export const metadata: Meta<DaikinBreadcrumbItemStoryArgs> = {
  title: "Components/Breadcrumb",
  tags: ["autodocs"],
  render: (args) => html`
    <daikin-breadcrumb-item
      href=${args.href}
      target=${
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- workaround lit-analyzer checking
        ifDefined(args.target) as any
      }
      variant=${args.variant}
      ?disabled=${args.disabled}
      ?trailing-slash=${args.trailingSlash}
      >Breadcrumb Item 1</daikin-breadcrumb-item
    >
  `,
};
