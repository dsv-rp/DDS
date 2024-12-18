import "#package/components/icon/daikin-icon";
import "#package/components/link/daikin-link";
import type { Meta } from "@storybook/web-components";
import { html, nothing } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { DaikinLinkLocalParameters, DaikinLinkStoryArgs } from "./common";

export const metadata: Meta<DaikinLinkStoryArgs> = {
  decorators: [
    (story, { parameters }) => {
      const local = parameters._ddsLocal as
        | DaikinLinkLocalParameters
        | undefined;

      if (local?.withSentence) {
        return html`
          <p
            data-testid="link-container"
            class="w-[400px] text-ddt-color-common-text-primary p-0 m-0 font-daikinSerif"
          >
            Here, we are using a long sentence. If you use the link component,
            ${story()} and will work.
          </p>
        `;
      }

      return story();
    },
  ],
  render: ({
    href,
    target,
    disabled,
    showVisited,
    label,
    leftIcon,
    rightIcon,
  }) =>
    html`<daikin-link
      href=${ifDefined(href ?? undefined)}
      target=${ifDefined(target ?? undefined)}
      ?disabled=${disabled}
      ?show-visited=${showVisited}
      >${leftIcon
        ? html`<daikin-icon
            slot="left-icon"
            icon=${leftIcon}
            size="current"
            color="current"
          ></daikin-icon>`
        : nothing}${label}${rightIcon
        ? html`<daikin-icon
            slot="right-icon"
            icon=${rightIcon}
            size="current"
            color="current"
          ></daikin-icon>`
        : nothing}</daikin-link
    >`,
};
