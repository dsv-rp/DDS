import { DaikinAccordion } from "#package/components/accordion/daikin-accordion";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { ReactDaikinAccordionItem } from "../../accordion-item/stories/framework-react";
import type { DaikinAccordionStoryArgs } from "./common";

const ReactDaikinAccordion = createComponent({
  tagName: "daikin-accordion",
  elementClass: DaikinAccordion,
  react: React,
});

export const metadata: Meta<DaikinAccordionStoryArgs> = {
  component: ({ ...props }: DaikinAccordionStoryArgs) => (
    <div
      style={{
        width: "320px",
      }}
    >
      <ReactDaikinAccordion {...props}>
        <ReactDaikinAccordionItem>
          <span slot="summary">Accordion summary 1</span>
          <span>Accordion content 1</span>
        </ReactDaikinAccordionItem>
        <ReactDaikinAccordionItem open>
          <span slot="summary">Accordion summary 2</span>
          <span>Accordion content 2</span>
        </ReactDaikinAccordionItem>
        {/* `open` is ignored when `disabled` */}
        <ReactDaikinAccordionItem disabled open>
          <span slot="summary">Accordion summary 3</span>
          <span>Accordion content 3</span>
        </ReactDaikinAccordionItem>
        <ReactDaikinAccordionItem disabled>
          <span slot="summary">Accordion summary 4</span>
          <span>Accordion content 4</span>
        </ReactDaikinAccordionItem>
        <ReactDaikinAccordionItem>
          <span slot="summary">Accordion summary 5</span>
          <span>Accordion content 5</span>
        </ReactDaikinAccordionItem>
      </ReactDaikinAccordion>
    </div>
  ),
};
