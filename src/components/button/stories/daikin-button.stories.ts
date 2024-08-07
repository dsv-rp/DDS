import { definePlay } from "#storybook";
// This will import either "./framework-wc" or "./framework-react". See `build/vite/storybook-framework-loader.ts`.
import { metadata } from "#storybook-framework";
import { expect, fn, userEvent } from "@storybook/test";
import { getByShadowRole } from "shadow-dom-testing-library";
import { DAIKIN_BUTTON_ARG_TYPES, type Story } from "./common";

// The default export must have a static `title` property starting from Storybook v7.
// See https://storybook.js.org/docs/writing-stories#default-export.
export default {
  title: "Components/Button",
  tags: ["autodocs"],
  argTypes: DAIKIN_BUTTON_ARG_TYPES,
  ...metadata,
};

export const Primary: Story = {
  args: {
    variant: "primary",
    disabled: false,
    label: "button",
    size: "default",
    type: "button",
    onClick: fn(),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-button")[0];
    await expect(root).toBeInTheDocument();

    const innerButton = getByShadowRole(root, "button", { name: "button" });
    await expect(innerButton).toBeInTheDocument();

    // should react if inner button clicked
    await step("Try to click inner button", async () => {
      await userEvent.click(innerButton);
      await expect(args.onClick).toHaveBeenCalledOnce();
    });

    // should also react if outer button clicked
    await step("Try to click outer daikin-button", async () => {
      await userEvent.click(root);
      await expect(args.onClick).toHaveBeenCalledTimes(2);
    });
  }),
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    variant: "secondary",
    onClick: fn(),
  },
};

export const Tertiary: Story = {
  args: {
    ...Primary.args,
    variant: "tertiary",
    onClick: fn(),
  },
};

export const PrimaryDanger: Story = {
  args: {
    ...Primary.args,
    variant: "primaryDanger",
    onClick: fn(),
  },
};

export const Disabled: Story = {
  args: {
    ...Primary.args,
    disabled: true,
    onClick: fn(),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-button")[0];
    await expect(root).toBeInTheDocument();

    const innerButton = getByShadowRole(root, "button", { name: "button" });
    await expect(innerButton).toBeInTheDocument();

    // should not react if inner button clicked
    await step("Try to click inner button", async () => {
      await userEvent.click(innerButton);
      await expect(args.onClick).not.toHaveBeenCalled();
    });

    // also should not react if outer button clicked
    // FIXME: this case fails because click event not captured in the daikin-button component
    /*
    await step("Try to click outer daikin-button", async () => {
      await userEvent.click(root);
      await expect(args.onClick).not.toHaveBeenCalled();
    });
    */
  }),
};
