import "#package/components/icon/daikin-icon";
import "#package/components/text-link/daikin-text-link";
import type { Meta } from "@storybook/web-components";
import { html, nothing } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { DaikinTextLinkStoryArgs } from "./common";

export const metadata: Meta<DaikinTextLinkStoryArgs> = {
  render: ({
    href,
    target,
    disabled,
    hasVisited,
    label,
    leftIcon,
    rightIcon,
  }) => html`
    <daikin-text-link
      href=${ifDefined(href ?? undefined)}
      target=${ifDefined(target ?? undefined)}
      ?disabled=${disabled}
      ?hasVisited=${hasVisited}
    >
      ${leftIcon
        ? html`<daikin-icon
            slot="left-icon"
            icon=${leftIcon}
            size="m"
            color="current"
          ></daikin-icon>`
        : nothing}
      ${label}
      ${rightIcon
        ? html`<daikin-icon
            slot="right-icon"
            icon=${rightIcon}
            size="m"
            color="current"
          ></daikin-icon>`
        : nothing}
    </daikin-text-link>
  `,
};
