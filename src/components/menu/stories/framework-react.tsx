import { DaikinMenu } from "#package/components/menu/daikin-menu";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { ReactDaikinIconButton } from "../../icon-button/stories/framework-react";
import { ReactDaikinListItem } from "../../list-item/stories/framework-react";
import { ReactDaikinList } from "../../list/stories/framework-react";
import { cvaContainer, cvaViewArea, type DaikinMenuStoryArgs } from "./common";

const ReactDaikinMenu = createComponent({
  react: React,
  tagName: "daikin-menu",
  elementClass: DaikinMenu,
  events: {
    onBeforeToggle: "beforetoggle",
    onClick: "click",
    onToggle: "toggle",
  },
});

export const metadata: Meta<DaikinMenuStoryArgs> = {
  component: ({ __vrtContainer__, ...props }: DaikinMenuStoryArgs) => (
    <div
      data-testid="view-area"
      className={cvaViewArea({ viewArea: "small", isVrt: !!__vrtContainer__ })}
    >
      <div className={cvaContainer({ isVrt: __vrtContainer__ })}>
        <ReactDaikinMenu {...props}>
          <ReactDaikinIconButton button-aria-label="Trigger">
            <span className="block size-6 i-daikin-status-information" />
          </ReactDaikinIconButton>
          <div slot="description" style={{ width: "360px" }}>
            <ReactDaikinList>
              <ReactDaikinListItem>List item label 1</ReactDaikinListItem>
              <ReactDaikinListItem>List item label 2</ReactDaikinListItem>
              <ReactDaikinListItem>List item label 3</ReactDaikinListItem>
            </ReactDaikinList>
          </div>
        </ReactDaikinMenu>
      </div>
    </div>
  ),
  parameters: {
    layout: "centered",
  },
};
