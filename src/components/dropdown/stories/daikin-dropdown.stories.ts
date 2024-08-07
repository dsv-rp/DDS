import { metadata } from "#storybook-framework";
import { expect, fn, userEvent } from "@storybook/test";
import { getByShadowRole } from "shadow-dom-testing-library";
import { definePlay } from "../../../storybook/define-play";
import { DAIKIN_DROPDOWN_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Dropdown",
  tags: ["autodocs"],
  argTypes: DAIKIN_DROPDOWN_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    label: "Dropdown label",
    size: "medium",
    value: "value1",
    labelPosition: "top",
    open: false,
    disabled: false,
    option: "default",
    onClick: fn(),
    onChange: fn(),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-dropdown")[0];
    await expect(root).toBeInTheDocument();
    await expect(root).not.toHaveAttribute("open");

    // should not react if inner button clicked
    await step("Try to click inner button", async () => {
      await userEvent.click(
        getByShadowRole(root, "button", { name: "Dropdown item 1" })
      );
      await expect(args.onClick).toHaveBeenCalled();

      await expect(root).toHaveAttribute("open");
    });

    await step("Selecting a dropdown will reflect the value", async () => {
      await userEvent.click(
        getByShadowRole(root, "option", { name: "Dropdown item 2" })
      );
      await expect(args.onChange).toHaveBeenCalled();

      await expect(root).not.toHaveAttribute("open");
      await expect(
        getByShadowRole(root, "button", { name: "Dropdown item 2" })
      ).toBeInTheDocument();
    });

    await step("Try to keyboard navigation", async () => {
      getByShadowRole(root, "button", { name: "Dropdown item 2" }).focus();
      await userEvent.keyboard("[Space]");
      await userEvent.keyboard("[ArrowDown]");
      await userEvent.keyboard("[Space]");

      await expect(
        getByShadowRole(root, "button", { name: "Dropdown item 1" })
      ).toBeInTheDocument();
    });
  }),
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: "small",
  },
};
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const LabelLeft: Story = {
  args: {
    ...Default.args,
    labelPosition: "left",
  },
};

export const NonLabel: Story = {
  args: {
    ...Default.args,
    label: "",
  },
};

export const Icon: Story = {
  args: {
    ...Default.args,
    leftIcon: "positive",
  },
};

export const SingleItem: Story = {
  args: {
    ...Default.args,
    option: "single",
  },
};

export const MultipleItem: Story = {
  args: {
    ...Default.args,
    option: "multiple",
  },
};
