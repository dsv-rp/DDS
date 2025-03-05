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
    orientation: "vertical",
    disabled: false,
  },
  play: definePlay(async ({ canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-checkbox-group")[0];
    await expect(root).toBeInTheDocument();
    const firstCheckbox = getByShadowRole(root, "checkbox", {
      name: "Checkbox Item 1",
    });
    const secondCheckbox = getByShadowRole(root, "checkbox", {
      name: "Checkbox Item 2",
    });
    const thirdCheckbox = getByShadowRole(root, "checkbox", {
      name: "Checkbox Item 3",
    });

    // The checkbox be clicked should be checked and the others should be unchecked
    await step("Try to click first checkbox", async () => {
      await userEvent.click(firstCheckbox);
      await expect(firstCheckbox).toBeChecked();
      await expect(secondCheckbox).not.toBeChecked();
      await expect(thirdCheckbox).not.toBeChecked();
    });

    await step("Try to click second checkbox", async () => {
      await userEvent.click(secondCheckbox);
      await expect(firstCheckbox).toBeChecked();
      await expect(secondCheckbox).toBeChecked();
      await expect(thirdCheckbox).not.toBeChecked();
    });
  }),
};

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
    disabled: false,
  },
  play: definePlay(async ({ canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-checkbox-group")[0];
    await expect(root).toBeInTheDocument();
    const firstCheckbox = getByShadowRole(root, "checkbox", {
      name: "Checkbox Item 1",
    });
    const secondCheckbox = getByShadowRole(root, "checkbox", {
      name: "Checkbox Item 2",
    });
    const thirdCheckbox = getByShadowRole(root, "checkbox", {
      name: "Checkbox Item 3",
    });

    // The checkbox be clicked should be checked and the others should be unchecked
    await step("Try to click first checkbox", async () => {
      await userEvent.click(firstCheckbox);
      await expect(firstCheckbox).toBeChecked();
      await expect(secondCheckbox).not.toBeChecked();
      await expect(thirdCheckbox).not.toBeChecked();
    });

    await step("Try to click second checkbox", async () => {
      await userEvent.click(secondCheckbox);
      await expect(firstCheckbox).toBeChecked();
      await expect(secondCheckbox).toBeChecked();
      await expect(thirdCheckbox).not.toBeChecked();
    });
  }),
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
  play: definePlay(async ({ canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-checkbox-group")[0];
    await expect(root).toBeInTheDocument();
    const firstCheckbox = getByShadowRole(root, "checkbox", {
      name: "Checkbox Item 1",
    });
    const secondCheckbox = getByShadowRole(root, "checkbox", {
      name: "Checkbox Item 2",
    });
    const thirdCheckbox = getByShadowRole(root, "checkbox", {
      name: "Checkbox Item 3",
    });

    // Checkboxes in checkbox group should be disabled
    await expect(firstCheckbox).toBeDisabled();
    await expect(secondCheckbox).toBeDisabled();
    await expect(thirdCheckbox).toBeDisabled();
    // The checkbox be clicked should be checked and the others should be unchecked
    await step("Try to click all checkboxes", async () => {
      await userEvent.click(firstCheckbox);
      await userEvent.click(secondCheckbox);
      await userEvent.click(thirdCheckbox);
      await expect(firstCheckbox).not.toBeChecked();
      await expect(secondCheckbox).not.toBeChecked();
      await expect(thirdCheckbox).not.toBeChecked();
    });
  }),
};
