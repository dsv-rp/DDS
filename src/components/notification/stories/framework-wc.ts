import "#package/components/notification/daikin-notification";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinNotificationStoryArgs } from "./common";

export const metadata: Meta<DaikinNotificationStoryArgs> = {
  render: ({
    open,
    closeButton,
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
      variant=${variant}
      line=${line}
      status=${status}
      @close=${onClose}
    >
      <span slot="title">${__vrtTitle__}</span>
      <span slot="description">${__vrtDescription__}</span>
    </daikin-notification>
  `,
};
