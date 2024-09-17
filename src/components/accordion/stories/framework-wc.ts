import "#package/components/accordion-item/daikin-accordion-item";
import "#package/components/accordion/daikin-accordion";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinAccordionStoryArgs } from "./common";

export const metadata: Meta<DaikinAccordionStoryArgs> = {
  render: () => html`
    <div style="width:256px;">
      <daikin-accordion>
        <daikin-accordion-item title="Accordion heading 1">
          Accordion content 1
        </daikin-accordion-item>
        <daikin-accordion-item title="Accordion heading 2" open>
          Accordion content 2
        </daikin-accordion-item>
        <daikin-accordion-item title="Accordion heading 3" disabled>
          Accordion content 3
        </daikin-accordion-item>
        <daikin-accordion-item title="Accordion heading 4" open disabled>
          Accordion content 4
        </daikin-accordion-item>
      </daikin-accordion>
    </div>
  `,
};
