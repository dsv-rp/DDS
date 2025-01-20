import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, fn, userEvent, waitFor } from "@storybook/test";
import { getByShadowRole, getByShadowText } from "shadow-dom-testing-library";
import { DAIKIN_TOAST_MANAGER_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Toast Notification Manager",
  tags: ["autodocs"],
  argTypes: DAIKIN_TOAST_MANAGER_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    position: "bottom-right",
    onClose: fn(),
  },
};

export const AutomationClose: Story = {
  args: {
    ...Default.args,
    duration: 3000,
    onClose: fn(),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName(
      "daikin-toast-notification-container"
    )[0];
    await expect(root).toBeInTheDocument();

    const button = getByShadowRole(root, "button", {
      name: "View new toast",
    });
    await expect(button).toBeInTheDocument();

    await step(
      "Should disappear the toast when click the close button",
      async () => {
        await userEvent.click(button);
        await userEvent.click(
          getByShadowRole(root, "button", {
            name: "Close",
          })
        );

        await waitFor(() => expect(args.onClose).toHaveBeenCalledTimes(1));
      }
    );

    await step(
      "Should disappear automatically the toast after a certain amount of time has passed",
      async () => {
        await userEvent.click(button);
        await waitFor(() =>
          expect(getByShadowText(root, "New toast 2")).toBeInTheDocument()
        );
        button.blur();

        await waitFor(() => expect(args.onClose).toHaveBeenCalledTimes(2), {
          timeout: 3300,
        });
      }
    );
  }),
};
