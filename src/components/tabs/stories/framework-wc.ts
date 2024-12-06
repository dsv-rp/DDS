import "#package/components/tab-panels/daikin-tab-panels";
import "#package/components/tab/daikin-tab";
import "#package/components/tabs/daikin-tabs";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import "../../../storybook-tailwind.css";
import { parseTab, type DaikinTabsStoryArgs } from "./common";

export const metadata: Meta<DaikinTabsStoryArgs> = {
  render: ({ value, tabs, onBeforeChange, onChange, scrollable }) => html`
    <daikin-tabs
      class=${ifDefined(
        scrollable
          ? "w-[600px] h-[400px] flex flex-col items-stretch"
          : undefined
      )}
      value=${value}
      @beforechange=${onBeforeChange}
      @change=${onChange}
    >
      <!-- 
        Tab.
        We can use 'w-fit' in the daikin-tab class to make the width of the daikin-tab fit the content inside
        You can check this example in 'Single'. 
      -->
      ${tabs.map((tab) => {
        const [label, value, disabled] = parseTab(tab);
        return html`<daikin-tab
          class=${ifDefined(tabs.length === 1 ? "w-fit" : undefined)}
          value=${value}
          ?disabled=${disabled}
        >
          ${label}
        </daikin-tab>`;
      })}
      <!-- Tab panels. Here, we use "flex-1 overflow-hidden" to limit panel height. -->
      <daikin-tab-panels
        slot="panels"
        class="text-ddt-color-common-text-primary flex-1 overflow-hidden"
      >
        ${tabs.map((tab) => {
          const [label, value] = parseTab(tab);
          // Individual panels. Here, we use "h-full overflow-auto" to make panel scrollable.
          // We can specify "overflow-auto" in `daikin-tab-panels` instead to share the scroll position across panels.
          return html`<div
            slot=${`panel:${value}`}
            class="h-full font-daikinSerif overflow-auto"
            tabindex="0"
          >
            ${scrollable
              ? html`<p class="pb-[800px]">
                    ${`Content of tab ${label}. (Scrollable)`}
                  </p>
                  <p>Bottom</p>`
              : html`<p>${`Content of tab ${label}`}.</p>`}
          </div>`;
        })}
      </daikin-tab-panels>
    </daikin-tabs>
  `,
};
