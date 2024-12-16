import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinCardFooterStoryArgs } from "./common";

import "#package/components/button/daikin-button";
import "#package/components/card-footer/daikin-card-footer";
import "#package/components/icon/daikin-icon";
import "#package/components/link/daikin-link";

export const metadata: Meta<DaikinCardFooterStoryArgs> = {
  title: "Components/CardTitle",
  tags: ["autodocs"],
  render: (args) => html`
    <div style="width: 248px">
      <daikin-card-footer>
        ${args.actionType === "button"
          ? html`<daikin-button size="small" color="default">
              Button
            </daikin-button>`
          : html`<daikin-link href="https://dsv-rp.github.io/DDS"
              >Link</daikin-link
            >`}
      </daikin-card-footer>
    </div>
  `,
};
