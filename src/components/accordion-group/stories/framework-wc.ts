import "#package/components/accordion-group/daikin-accordion-group";
import "#package/components/accordion/daikin-accordion";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinAccordionGroupStoryArgs } from "./common";

export const metadata: Meta<DaikinAccordionGroupStoryArgs> = {
  render: () => html`
    <daikin-accordion-group
      ><daikin-accordion title="Accordion-1-title"
        >Accordion-1-content</daikin-accordion
      ><daikin-accordion title="Accordion-2-title" open
        >Accordion-2-content</daikin-accordion
      ><daikin-accordion title="Accordion-3-title" disabled
        >Accordion-3-content</daikin-accordion
      ><daikin-accordion title="Accordion-4-title" open disabled
        >Accordion-4-content</daikin-accordion
      ></daikin-accordion-group
    >
  `,
};
