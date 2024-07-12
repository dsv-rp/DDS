import { DaikinPanelSwitcher } from "#package/components/panel-switcher/daikin-panel-switcher";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React, { Fragment } from "react";
import "../../../storybook-tailwind.css";
import type { DaikinPanelSwitcherStoryArgs } from "./common";

export const ReactDaikinPanelSwitcher = createComponent({
  tagName: "daikin-panel-switcher",
  elementClass: DaikinPanelSwitcher,
  react: React,
});

export const metadata: Meta<DaikinPanelSwitcherStoryArgs> = {
  component: ({ content, panels, ...props }: DaikinPanelSwitcherStoryArgs) => (
    <ReactDaikinPanelSwitcher
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
                className="font-daikinSerif"
                slot={`panel:${panel}`}
              >
                {panel} panel.
              </p>
            );

          case "form":
            return (
              <div
                key={panel}
                className="font-daikinSerif"
                slot={`panel:${panel}`}
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
                className="font-daikinSerif"
                slot={`panel:${panel}`}
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
    </ReactDaikinPanelSwitcher>
  ),
};
