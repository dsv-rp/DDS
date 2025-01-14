import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, fn, userEvent } from "@storybook/test";
import { getByShadowRole } from "shadow-dom-testing-library";
import { DAIKIN_TOAST_NOTIFICATION_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Toast Notification",
  tags: ["autodocs"],
  argTypes: DAIKIN_TOAST_NOTIFICATION_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    status: "positive",
    line: "single",
    closable: true,
    timestamp: false,
    slotTitle: "Toast title",
    slotDescription: "Toast description",
    slotAction: false,
    onClose: fn(),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName(
      "daikin-toast-notification"
    )[0];
    await expect(root).toBeInTheDocument();

    await step(
      "`close` event should be emitted when close button clicked",
      async () => {
        await userEvent.click(
          getByShadowRole(root, "button", {
            name: "Close",
          })
        );
        await expect(args.onClose).toHaveBeenCalledOnce();
      }
    );
  }),
};
