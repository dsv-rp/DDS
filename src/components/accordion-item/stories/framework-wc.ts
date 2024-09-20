import "#package/components/accordion-item/daikin-accordion-item";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinAccordionItemStoryArgs } from "./common";

export const metadata: Meta<DaikinAccordionItemStoryArgs> = {
  render: ({ heading, open, disabled }) => html`
    <daikin-accordion-item
      heading=${heading}
      ?open=${open}
      ?disabled=${disabled}
    >
      Accordion content
    </daikin-accordion-item>
  `,
};
