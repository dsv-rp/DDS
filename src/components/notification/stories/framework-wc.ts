import "#package/components/notification/daikin-notification";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { DaikinNotificationStoryArgs } from "./common";

export const metadata: Meta<DaikinNotificationStoryArgs> = {
  render: ({
    open,
    closeButton,
    heading,
    description,
    variant,
    line,
    status,
    onClose,
  }) => html`
    <daikin-notification
      ?open=${open}
      ?closeButton=${closeButton}
      heading=${ifDefined(heading)}
      description=${description}
      variant=${variant}
      line=${line}
      status=${status}
      @close=${onClose}
    ></daikin-notification>
  `,
};
