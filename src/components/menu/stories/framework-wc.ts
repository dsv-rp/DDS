import "#package/components/button/daikin-button";
import "#package/components/list-item/daikin-list-item";
import "#package/components/list/daikin-list";
import "#package/components/menu/daikin-menu";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import { cvaContainer, cvaViewArea, type DaikinMenuStoryArgs } from "./common";

export const metadata: Meta<DaikinMenuStoryArgs> = {
  render: ({
    placement,
    open,
    popoverValue,
    trigger,
    viewArea,
    divider,
    onToggle,
    onBeforeToggle,
    __vrtContainer__,
  }) =>
    html`<div
      data-testid="view-area"
      class=${cvaViewArea({ viewArea, isVrt: !!__vrtContainer__ })}
    >
      <div class=${cvaContainer({ isVrt: !!__vrtContainer__ })}>
        <daikin-menu
          placement=${placement}
          ?open=${open}
          popover-value=${popoverValue}
          trigger=${trigger}
          ?divider=${divider}
          @toggle=${onToggle}
          @beforetoggle=${onBeforeToggle}
        >
          <daikin-button>Menu</daikin-button>
          <daikin-list slot="menu" style="width:256px">
            <daikin-list-item>List item label 1</daikin-list-item>
            <daikin-list-item>List item label 2</daikin-list-item>
            <daikin-list-item>List item label 3</daikin-list-item>
          </daikin-list>
        </daikin-menu>
      </div>
    </div>`,
  parameters: {
    layout: "centered",
  },
};
