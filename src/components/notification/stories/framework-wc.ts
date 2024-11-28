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
    slotTitle,
    slotDescription,
    onClose,
  }) => html`
    <daikin-notification
      ?open=${open}
      ?close-button=${closeButton}
      variant=${variant}
      line=${line}
      status=${status}
      @close=${onClose}
    >
      <span slot="title">${slotTitle}</span>
      <span slot="description">${slotDescription}</span>
    </daikin-notification>
  `,
};
