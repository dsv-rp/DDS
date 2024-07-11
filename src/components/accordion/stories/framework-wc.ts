import "#package/components/accordion/daikin-accordion";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { DaikinAccordionStoryArgs } from "./common";

export const metadata: Meta<DaikinAccordionStoryArgs> = {
  render: ({ title, open, disabled }) => html`
    <daikin-accordion
      title=${ifDefined(title)}
      ?open=${open}
      ?disabled=${disabled}
      >Accordion-content</daikin-accordion
    >
  `,
};
