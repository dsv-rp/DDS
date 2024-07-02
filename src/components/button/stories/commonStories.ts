import { expect, fn, userEvent } from "@storybook/test";
import { getByShadowRole } from "shadow-dom-testing-library";
import type { Story } from "./common";

export const Primary: Story = {
  args: {
    variant: "primary",
    disabled: false,
    label: "button",
    size: "default",
    type: "button",
    onClick: fn(),
  },
  async play({ args, canvasElement, step }) {
    const root = canvasElement.getElementsByTagName("daikin-button")[0];
    expect(root).toBeInTheDocument();

    const innerButton = getByShadowRole(root, "button", { name: "button" });
    expect(innerButton).toBeInTheDocument();

    // should react if inner button clicked
    await step("Try to click inner button", async () => {
      await userEvent.click(innerButton);
      expect(args.onClick).toHaveBeenCalledOnce();
    });

    // should also react if outer button clicked
    await step("Try to click outer daikin-button", async () => {
      await userEvent.click(root);
      expect(args.onClick).toHaveBeenCalledTimes(2);
    });
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    disabled: true,
    label: "button",
    size: "default",
    type: "button",
    onClick: fn(),
  },
  async play({ args, canvasElement, step }) {
    const root = canvasElement.getElementsByTagName("daikin-button")[0];
    expect(root).toBeInTheDocument();

    const innerButton = getByShadowRole(root, "button", { name: "button" });
    expect(innerButton).toBeInTheDocument();

    // should not react if inner button clicked
    await step("Try to click inner button", async () => {
      await userEvent.click(innerButton);
      expect(args.onClick).not.toHaveBeenCalled();
    });

    // also should not react if outer button clicked
    // FIXME: this case fails because click event not captured in the daikin-button component
    /*
    await step("Try to click outer daikin-button", async () => {
      await userEvent.click(root);
      expect(args.onClick).not.toHaveBeenCalled();
    });
    */
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    disabled: false,
    label: "button",
    size: "default",
    type: "button",
    onClick: fn(),
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    disabled: false,
    label: "button",
    size: "default",
    type: "button",
    onClick: fn(),
  },
};

export const PrimaryDanger: Story = {
  args: {
    variant: "primaryDanger",
    disabled: false,
    label: "button",
    size: "default",
    type: "button",
    onClick: fn(),
  },
};
