import "#package/components/tab-panels/daikin-tab-panels";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import "../../../storybook-tailwind.css";
import type { DaikinTabPanelsStoryArgs } from "./common";

export const metadata: Meta<DaikinTabPanelsStoryArgs> = {
  render: ({ content, value, panels }) => html`
    <daikin-tab-panels
      .panels=${panels}
      value=${value}
      class="block w-[600px] h-[400px] overflow-auto bg-red-500/10"
    >
      ${panels.map((panel) => {
        switch (content) {
          case "text":
            return html`<p
              slot=${`panel:${panel}`}
              class="font-daikinSerif bg-blue-500/10"
            >
              ${panel} panel.
            </p>`;

          case "form":
            return html`<div
              slot=${`panel:${panel}`}
              class="font-daikinSerif bg-blue-500/10"
            >
              ${panel} panel.<br />
              <input
                class="border px-1"
                data-testid=${`panel-${panel}-input`}
                type="text"
                value=${panel}
              />
            </div>`;

          case "long": {
            const count = Number(panel.match(/-x(\d+)/)?.[1] ?? "1");
            return html`<p
              slot=${`panel:${panel}`}
              class="font-daikinSerif bg-blue-500/10"
            >
              ${new Array(count)
                .fill(0)
                .map(
                  (_, i) =>
                    html`<span data-testid=${`panel-${panel}-line-${i + 1}`}
                        >${panel} panel. (${i + 1})</span
                      ><br />`
                )}
            </p>`;
          }
        }
      })}
    </daikin-tab-panels>
  `,
};
