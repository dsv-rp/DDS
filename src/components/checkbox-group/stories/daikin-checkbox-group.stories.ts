import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, userEvent } from "@storybook/test";
import { getByShadowRole } from "shadow-dom-testing-library";
import { DAIKIN_CHECKBOX_GROUP_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Checkbox Group",
  tags: ["autodocs"],
  argTypes: DAIKIN_CHECKBOX_GROUP_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    orientation: "horizontal",
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-checkbox-group")[0];
    await expect(root).toBeInTheDocument();
    const firstCheckbox = getByShadowRole(root, "checkbox", {
      name: "Label Text 1",
    });
    const secondCheckbox = getByShadowRole(root, "checkbox", {
      name: "Label Text 2",
    });
    const thirdCheckbox = getByShadowRole(root, "checkbox", {
      name: "Label Text 3",
    });

    // The checkbox be clicked should be checked and the others should be unchecked
    await step("Try to click second checkbox", async () => {
      await userEvent.click(secondCheckbox);
      await expect(args.onChange).toHaveBeenCalledOnce();
      await expect(args.onChange).toHaveLastReturnedWith({ value: "value2" });
      await expect(secondCheckbox).toBeChecked();
      await expect(firstCheckbox).not.toBeChecked();
      await expect(thirdCheckbox).not.toBeChecked();
    });

    await step("Try to click third checkbox", async () => {
      await userEvent.click(thirdCheckbox);
      await expect(args.onChange).toBeCalledTimes(2);
      await expect(args.onChange).toHaveLastReturnedWith({ value: "value3" });
      await expect(thirdCheckbox).toBeChecked();
      await expect(firstCheckbox).not.toBeChecked();
      await expect(secondCheckbox).not.toBeChecked();
    });

    // Click the same checkbox and onchange event will not fired
    await step("Try to click third checkbox again", async () => {
      await userEvent.click(thirdCheckbox);
      await expect(args.onChange).toBeCalledTimes(2);
      await expect(thirdCheckbox).toBeChecked();
      await expect(firstCheckbox).not.toBeChecked();
      await expect(secondCheckbox).not.toBeChecked();
    });

    await step("Try to use keyboard to select checkbox", async () => {
      await userEvent.keyboard("[ArrowLeft]");
      await userEvent.keyboard("[ArrowUp]");
      await expect(firstCheckbox).toBeChecked();
      await expect(secondCheckbox).not.toBeChecked();
      await expect(thirdCheckbox).not.toBeChecked();
    });
  }),
};
