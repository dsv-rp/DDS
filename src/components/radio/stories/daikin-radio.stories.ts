import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, fn, userEvent } from "@storybook/test";
import { getByShadowRole, getByShadowText } from "shadow-dom-testing-library";
import { DAIKIN_RADIO_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Radio",
  tags: ["autodocs"],
  argTypes: DAIKIN_RADIO_ARG_TYPES,
  ...metadata,
};

export const Small: Story = {
  args: {
    size: "small",
    disabled: false,
    readonly: false,
    label: "Radio label",
    onChange: fn(),
    onClick: fn(),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-radio")[0];
    await expect(root).toBeInTheDocument();

    const innerRadio = getByShadowRole(root, "radio", {
      name: "Radio label",
    });
    await expect(innerRadio).toBeInTheDocument();

    const label = getByShadowText(root, "Radio label");
    await expect(label).toBeInTheDocument();

    await expect(innerRadio).not.toBeChecked();

    // should react if inner radio clicked
    await step("Try to click inner radio", async () => {
      await userEvent.click(innerRadio);
      await expect(args.onChange).toHaveBeenCalledOnce();
      await expect(innerRadio).toBeChecked();
      root.checked = false;
    });

    // should also react if label clicked
    await step("Try to click label", async () => {
      await userEvent.click(label);
      await expect(args.onChange).toHaveBeenCalledTimes(2);
      await expect(innerRadio).toBeChecked();
      root.checked = false;
    });
  }),
};

export const Large: Story = {
  args: {
    ...Small.args,
    size: "large",
    onChange: fn(),
    onClick: fn(),
  },
};

export const Disabled: Story = {
  args: {
    ...Small.args,
    disabled: true,
    onChange: fn(),
    onClick: fn(),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-radio")[0];
    await expect(root).toBeInTheDocument();

    const innerRadio = getByShadowRole(root, "radio", {
      name: "Radio label",
    });
    await expect(innerRadio).toBeInTheDocument();

    const label = getByShadowText(root, "Radio label");
    await expect(label).toBeInTheDocument();

    await expect(innerRadio).not.toBeChecked();

    // should not react if inner radio clicked
    await step("Try to click inner radio", async () => {
      await userEvent.click(innerRadio);
      await expect(args.onChange).not.toHaveBeenCalled();
      await expect(innerRadio).not.toBeChecked();
    });

    // also should not react if label clicked
    await step("Try to click label", async () => {
      await userEvent.click(label);
      await expect(args.onChange).not.toHaveBeenCalled();
      await expect(innerRadio).not.toBeChecked();
    });
  }),
};

export const Readonly: Story = {
  args: {
    ...Small.args,
    readonly: true,
    onChange: fn(),
    onClick: fn(),
  },
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- Disabled has play function
  play: Disabled.play!,
};
