import "#package/components/accordion-item/daikin-accordion-item";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinAccordionItemStoryArgs } from "./common";

export const metadata: Meta<DaikinAccordionItemStoryArgs> = {
  render: ({ open, disabled }) => html`
    <daikin-accordion-item ?open=${open} ?disabled=${disabled}>
      <span slot="summary">Accordion summary</span>
      <span>Accordion content</span>
    </daikin-accordion-item>
  `,
};
