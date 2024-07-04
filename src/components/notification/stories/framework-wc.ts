import "#package/components/notification/daikin-notification";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
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
    onClose,
  }) => html`
    <daikin-notification
      ?open=${open}
      ?closeButton=${closeButton}
      title=${ifDefined(title)}
      description=${description}
      variant=${ifDefined(variant)}
      line=${ifDefined(line)}
      status=${ifDefined(status)}
      @close=${onClose}
    ></daikin-notification>
  `,
};
