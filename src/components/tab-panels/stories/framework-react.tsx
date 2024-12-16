import { DaikinTabPanels } from "#package/components/tab-panels/daikin-tab-panels";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React, { Fragment } from "react";
import type { DaikinTabPanelsStoryArgs } from "./common";

export const ReactDaikinTabPanels = createComponent({
  tagName: "daikin-tab-panels",
  elementClass: DaikinTabPanels,
  react: React,
});

export const metadata: Meta<DaikinTabPanelsStoryArgs> = {
  component: ({ content, panels, ...props }: DaikinTabPanelsStoryArgs) => (
    <ReactDaikinTabPanels
      {...props}
      panels={panels}
      className="block w-[600px] h-[400px] overflow-auto bg-red-500/10"
    >
      {panels.map((panel) => {
        switch (content) {
          case "text":
            return (
              <p
                key={panel}
                slot={`panel:${panel}`}
                className="font-daikinSerif bg-blue-500/10"
              >
                {panel} panel.
              </p>
            );

          case "form":
            return (
              <div
                key={panel}
                slot={`panel:${panel}`}
                className="font-daikinSerif bg-blue-500/10"
              >
                {panel} panel.
                <br />
                <input
                  data-testid={`panel-${panel}-input`}
                  type="text"
                  defaultValue={panel}
                />
              </div>
            );

          case "long": {
            const count = Number(panel.match(/-x(\d+)/)?.[1] ?? "1");
            return (
              <p
                key={panel}
                slot={`panel:${panel}`}
                className="font-daikinSerif bg-blue-500/10"
              >
                {new Array(count).fill(0).map((_, i) => (
                  <Fragment key={i}>
                    <span data-testid={`panel-${panel}-line-${i + 1}`}>
                      {panel} panel. ({i + 1})
                    </span>
                    <br />
                  </Fragment>
                ))}
              </p>
            );
          }
        }
      })}
    </ReactDaikinTabPanels>
  ),
};
