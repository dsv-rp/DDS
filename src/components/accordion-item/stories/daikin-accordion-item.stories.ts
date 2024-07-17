import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, userEvent, waitFor } from "@storybook/test";
import { getByShadowText } from "shadow-dom-testing-library";
import { DAIKIN_ACCORDION_ITEM_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Accordion Item",
  tags: ["autodocs"],
  argTypes: DAIKIN_ACCORDION_ITEM_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    title: "Accordion-title",
    open: false,
    disabled: false,
  },
  play: definePlay(async ({ canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-accordion-item")[0];
    await expect(root).toBeInTheDocument();

    await expect(root).not.toHaveAttribute("open");

    const innerSummary = getByShadowText(root, "Accordion-title");
    await expect(innerSummary).toBeInTheDocument();

    await step("Try to click inner summary", async () => {
      await userEvent.click(innerSummary);
      await expect(root).toHaveAttribute("open");
    });

    await step("Try to click inner summary again", async () => {
      await userEvent.click(innerSummary);
      await waitFor(() => expect(root).not.toHaveAttribute("open"), {
        timeout: 500,
      });
    });
  }),
};

export const Open: Story = {
  args: {
    ...Default.args,
    open: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
  play: definePlay(async ({ canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-accordion-item")[0];
    await expect(root).toBeInTheDocument();

    const innerSummary = getByShadowText(root, "Accordion-title");
    await expect(innerSummary).toBeInTheDocument();

    // should not react if inner summary clicked
    await step("Try to click inner summary", async () => {
      await userEvent.click(innerSummary);
      await expect(root).not.toHaveAttribute("open");
    });
  }),
};
