import "#package/components/accordion-item/daikin-accordion-item";
import "#package/components/accordion/daikin-accordion";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinAccordionStoryArgs } from "./common";

export const metadata: Meta<DaikinAccordionStoryArgs> = {
  render: () => html`
    <daikin-accordion
      ><daikin-accordion-item title="Accordion-1-title"
        >Accordion-1-content</daikin-accordion-item
      ><daikin-accordion-item title="Accordion-2-title" open
        >Accordion-2-content</daikin-accordion-item
      ><daikin-accordion-item title="Accordion-3-title" disabled
        >Accordion-3-content</daikin-accordion-item
      ><daikin-accordion-item title="Accordion-4-title" open disabled
        >Accordion-4-content</daikin-accordion-item
      ></daikin-accordion
    >
  `,
};
