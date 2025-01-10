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
        width: "360px",
      }}
    >
      <ReactDaikinAccordion {...props}>
        {[...Array(5).keys()].map((index) => (
          <ReactDaikinAccordionItem
            value={`value${index + 1}`}
            disabled={[2, 3].includes(index)}
          >
            <span slot="summary">{`Accordion summary ${index + 1}`}</span>
            <span>{`Accordion content ${index + 1}`}</span>
          </ReactDaikinAccordionItem>
        ))}
      </ReactDaikinAccordion>
    </div>
  ),
};
