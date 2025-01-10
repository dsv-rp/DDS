import "#package/components/accordion-item/daikin-accordion-item";
import "#package/components/accordion/daikin-accordion";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import { repeat } from "lit/directives/repeat.js";
import type { DaikinAccordionStoryArgs } from "./common";

export const metadata: Meta<DaikinAccordionStoryArgs> = {
  render: ({ value, exclusive }) => html`
    <div style="width:360px;">
      <daikin-accordion .value=${value} ?exclusive=${exclusive}>
        ${repeat(
          [...Array(5).keys()],
          (index) => index,
          (index) =>
            html`<daikin-accordion-item
              value=${`value${index + 1}`}
              ?disabled=${[2, 3].includes(index)}
            >
              <span slot="summary">${`Accordion summary ${index + 1}`}</span>
              <span>${`Accordion content ${index + 1}`}</span>
            </daikin-accordion-item>`
        )}
      </daikin-accordion>
    </div>
  `,
};
