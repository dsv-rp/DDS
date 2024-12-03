import "#package/components/breadcrumb-item/daikin-breadcrumb-item";
import "#package/components/breadcrumb/daikin-breadcrumb";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinBreadcrumbStoryArgs } from "./common";

export const metadata: Meta<DaikinBreadcrumbStoryArgs> = {
  render: () =>
    html`<daikin-breadcrumb
      ><daikin-breadcrumb-item href="https://dsv-rp.github.io/DDS"
        >Breadcrumb item 1</daikin-breadcrumb-item
      ><daikin-breadcrumb-item href="https://dsv-rp.github.io/DDS"
        >Breadcrumb item 2</daikin-breadcrumb-item
      ><daikin-breadcrumb-item href="https://dsv-rp.github.io/DDS"
        >Breadcrumb item 3</daikin-breadcrumb-item
      ><daikin-breadcrumb-item href="https://dsv-rp.github.io/DDS"
        >Breadcrumb item 4</daikin-breadcrumb-item
      ><daikin-breadcrumb-item href="https://dsv-rp.github.io/DDS"
        >Breadcrumb item 5</daikin-breadcrumb-item
      ></daikin-breadcrumb
    > `,
};
