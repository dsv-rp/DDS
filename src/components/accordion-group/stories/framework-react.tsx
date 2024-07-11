import { DaikinAccordionGroup } from "#package/components/accordion-group/daikin-accordion-group";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { ReactDaikinAccordion } from "../../accordion/stories/framework-react";
import type { DaikinAccordionGroupStoryArgs } from "./common";

const ReactDaikinAccordionGroup = createComponent({
  tagName: "daikin-accordion-group",
  elementClass: DaikinAccordionGroup,
  react: React,
});

export const metadata: Meta<DaikinAccordionGroupStoryArgs> = {
  component: ({ ...props }: DaikinAccordionGroupStoryArgs) => (
    <ReactDaikinAccordionGroup {...props}>
      <ReactDaikinAccordion title="Accordion-1-title">
        Accordion-1-content
      </ReactDaikinAccordion>
      <ReactDaikinAccordion title="Accordion-2-title" open>
        Accordion-2-content
      </ReactDaikinAccordion>
      <ReactDaikinAccordion title="Accordion-3-title" disabled>
        Accordion-3-content
      </ReactDaikinAccordion>
      <ReactDaikinAccordion title="Accordion-4-title" open disabled>
        Accordion-4-content
      </ReactDaikinAccordion>
    </ReactDaikinAccordionGroup>
  ),
};
