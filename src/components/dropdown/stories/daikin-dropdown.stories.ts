import { metadata } from "#storybook-framework";
import { expect, fn, userEvent } from "@storybook/test";
import {
  getAllByShadowRole,
  getByShadowRole,
} from "shadow-dom-testing-library";
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
    label: "Dropdown-label",
    size: "medium",
    labelPosition: "top",
    open: false,
    ariaLabel: "Dropdown",
    onClick: fn(),
    onChange: fn(),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-dropdown")[0];
    await expect(root).toBeInTheDocument();
    await expect(root).not.toHaveAttribute("open");

    const innerButtons = getAllByShadowRole(root, "button", {
      name: "Value1",
    });
    await expect(innerButtons).toHaveLength(2);

    // should not react if inner button clicked
    await step("Try to click inner button", async () => {
      await userEvent.click(innerButtons[0]);
      await expect(args.onClick).toHaveBeenCalled();

      await expect(root).toHaveAttribute("open");
    });

    await step("Selecting a dropdown will reflect the value", async () => {
      await userEvent.click(
        getByShadowRole(root, "button", { name: "Value2" })
      );
      await expect(args.onChange).toHaveBeenCalled();

      await expect(root).not.toHaveAttribute("open");
      await expect(
        getAllByShadowRole(root, "button", { name: "Value2" })
      ).toHaveLength(2);
    });

    await userEvent.click(
      getAllByShadowRole(root, "button", { name: "Value2" })[0]
    );
    await userEvent.click(getByShadowRole(root, "button", { name: "Value1" }));
  }),
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: "small",
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
