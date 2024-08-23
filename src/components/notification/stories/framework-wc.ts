import "#package/components/notification/daikin-notification";
import type { Meta } from "@storybook/web-components";
import { html, nothing } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { DaikinNotificationStoryArgs } from "./common";

export const metadata: Meta<DaikinNotificationStoryArgs> = {
  render: ({
    open,
    closeButton,
    title,
    description,
    variant,
    line,
    status,
    __vrtTitle__,
    __vrtDescription__,
    onClose,
  }) => html`
    <daikin-notification
      ?open=${open}
      ?closeButton=${closeButton}
      title=${ifDefined(title)}
      description=${description}
      variant=${variant}
      line=${line}
      status=${status}
      @close=${onClose}
    >
      ${__vrtTitle__.length
        ? html`<span slot="title">${__vrtTitle__}</span>`
        : nothing}
      ${__vrtDescription__.length
        ? html`<span slot="description">${__vrtDescription__}</span>`
        : nothing}
    </daikin-notification>
  `,
};
