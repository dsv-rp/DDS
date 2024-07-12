import "#package/components/accordion-item/daikin-accordion-item";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { DaikinAccordionItemStoryArgs } from "./common";

export const metadata: Meta<DaikinAccordionItemStoryArgs> = {
  render: ({ title, detailsOpen, disabled }) => html`
    <daikin-accordion-item
      title=${ifDefined(title)}
      ?detailsOpen=${detailsOpen}
      ?disabled=${disabled}
    >
      Accordion-content
    </daikin-accordion-item>
  `,
};
