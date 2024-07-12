import "#package/components/panel-switcher/daikin-panel-switcher";
import "#package/components/tab-group/daikin-tab-group";
import "#package/components/tab/daikin-tab";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import "../../../storybook-tailwind.css";
import { parseTab, type DaikinTabGroupStoryArgs } from "./common";

export const metadata: Meta<DaikinTabGroupStoryArgs> = {
  render: ({ value, size, tabs, onBeforeChange, onChange }) => html`
    <!--
      Here, tab container is styled by "::part(tablist)" pseudo element (the notation is extended by tailwindcss plugin).
      We use "flex-none" to keep bar height and "flex w-full overflow-auto" to make tabs scrollable.
    -->
    <daikin-tab-group
      class="w-[600px] h-[400px] flex flex-col items-stretch part-[tablist]:flex-none part-[tablist]:flex part-[tablist]:w-full part-[tablist]:overflow-auto"
      value=${value}
      @beforechange=${onBeforeChange}
      @change=${onChange}
    >
      <!-- Tabs. -->
      ${tabs.map((tab) => {
        const [label, value, disabled] = parseTab(tab);
        return html`<daikin-tab
          size=${size}
          value=${value}
          ?disabled=${disabled}
        >
          ${label}
        </daikin-tab>`;
      })}
      <!-- Panel switcher. Here, we use "flex-1 overflow-hidden" to limit panel height. -->
      <daikin-panel-switcher slot="panels" class="flex-1 overflow-hidden">
        ${tabs.map((tab) => {
          const [label, value] = parseTab(tab);
          // Individual panels. Here, we use "h-full overflow-auto" to make panel scrollable.
          // We can specify "overflow-auto" in `daikin-panel-switcher` instead to share the scroll position across panels.
          return html`<div
            slot=${`panel:${value}`}
            class="font-daikinSerif w-full h-full overflow-auto bg-red-500/10"
            tabindex="0"
          >
            <p class="pb-[500px]">Content of tab ${label}. (Scrollable)</p>
            <p>Bottom</p>
          </div>`;
        })}
      </daikin-panel-switcher>
    </daikin-tab-group>
  `,
};
