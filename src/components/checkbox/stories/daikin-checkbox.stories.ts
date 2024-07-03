import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, fn, userEvent } from "@storybook/test";
import { getByShadowRole, getByShadowText } from "shadow-dom-testing-library";
import { DAIKIN_CHECKBOX_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Checkbox",
  tags: ["autodocs"],
  argTypes: DAIKIN_CHECKBOX_ARG_TYPES,
  ...metadata,
};

export const Small: Story = {
  args: {
    size: "small",
    disabled: false,
    readonly: false,
    label: "Checkbox label",
    onChange: fn(),
    onClick: fn(),
  },
  play: definePlay<Story>(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-checkbox")[0];
    await expect(root).toBeInTheDocument();

    const innerCheckbox = getByShadowRole(root, "checkbox", {
      name: "Checkbox label",
    });
    await expect(innerCheckbox).toBeInTheDocument();

    const label = getByShadowText(root, "Checkbox label");
    await expect(label).toBeInTheDocument();

    await expect(innerCheckbox).not.toBeChecked();

    // should react if inner checkbox clicked
    await step("Try to click inner checkbox", async () => {
      await userEvent.click(innerCheckbox);
      await expect(args.onChange).toHaveBeenCalledOnce();
      await expect(innerCheckbox).toBeChecked();
    });

    // should also react if label clicked
    await step("Try to click label", async () => {
      await userEvent.click(label);
      await expect(args.onChange).toHaveBeenCalledTimes(2);
      await expect(innerCheckbox).not.toBeChecked();
    });

    root.checkState = "unchecked";
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
  play: definePlay<Story>(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-checkbox")[0];
    await expect(root).toBeInTheDocument();

    const innerCheckbox = getByShadowRole(root, "checkbox", {
      name: "Checkbox label",
    });
    await expect(innerCheckbox).toBeInTheDocument();

    const label = getByShadowText(root, "Checkbox label");
    await expect(label).toBeInTheDocument();

    await expect(innerCheckbox).not.toBeChecked();

    // should not react if inner checkbox clicked
    await step("Try to click inner checkbox", async () => {
      await userEvent.click(innerCheckbox);
      await expect(args.onChange).not.toHaveBeenCalled();
      await expect(innerCheckbox).not.toBeChecked();
    });

    // also should not react if label clicked
    await step("Try to click label", async () => {
      await userEvent.click(label);
      await expect(args.onChange).not.toHaveBeenCalled();
      await expect(innerCheckbox).not.toBeChecked();
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
  play: Disabled.play,
};
