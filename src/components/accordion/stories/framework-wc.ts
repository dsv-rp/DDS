import "#package/components/accordion-item/daikin-accordion-item";
import "#package/components/accordion/daikin-accordion";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinAccordionStoryArgs } from "./common";

export const metadata: Meta<DaikinAccordionStoryArgs> = {
  render: () => html`
    <div style="width:256px;">
      <daikin-accordion>
        <daikin-accordion-item>
          <span slot="summary">Accordion summary 1</span>
          <span>Accordion content 1</span>
        </daikin-accordion-item>
        <daikin-accordion-item open>
          <span slot="summary">Accordion summary 2</span>
          <span>Accordion content 2</span>
        </daikin-accordion-item>
        <!-- 'open' is ignored when 'disabled' -->
        <daikin-accordion-item disabled open>
          <span slot="summary">Accordion summary 3</span>
          <span>Accordion content 3</span>
        </daikin-accordion-item>
        <daikin-accordion-item disabled>
          <span slot="summary">Accordion summary 4</span>
          <span>Accordion content 4</span>
        </daikin-accordion-item>
        <daikin-accordion-item>
          <span slot="summary">Accordion summary 5</span>
          <span>Accordion content 5</span>
        </daikin-accordion-item>
      </daikin-accordion>
    </div>
  `,
};
