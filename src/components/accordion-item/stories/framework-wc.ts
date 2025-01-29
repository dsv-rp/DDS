import "#package/components/accordion-item/daikin-accordion-item";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinAccordionItemStoryArgs } from "./common";

export const metadata: Meta<DaikinAccordionItemStoryArgs> = {
  render: ({ name, open, disabled, onToggle }) => html`
    <daikin-accordion-item
      name=${name}
      ?open=${open}
      ?disabled=${disabled}
      @toggle=${onToggle}
    >
      <span slot="summary">Accordion summary</span>
      <span>Accordion content</span>
    </daikin-accordion-item>
  `,
};
