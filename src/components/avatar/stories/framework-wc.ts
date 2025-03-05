import "#package/components/avatar/daikin-avatar";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { DaikinAvatarStoryArgs } from "./common";

export const metadata: Meta<DaikinAvatarStoryArgs> = {
  render: ({ size, as, disabled, href, alt, onClick }) => html`
    <daikin-avatar
      size=${size}
      as=${as}
      href=${ifDefined(href ?? undefined)}
      alt=${ifDefined(alt ?? undefined)}
      ?disabled=${disabled}
      @click=${onClick}
    >
    </daikin-avatar>
  `,
};
