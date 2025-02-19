import type { DaikinAccordionItem } from "#package/components/accordion-item";
import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, userEvent, waitFor } from "@storybook/test";
import { getByShadowText } from "shadow-dom-testing-library";
import { DAIKIN_ACCORDION_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Accordion",
  tags: ["autodocs"],
  argTypes: DAIKIN_ACCORDION_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    openItems: ["value2"],
    exclusive: false,
  },
  play: definePlay(async ({ canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-accordion")[0];
    await expect(root).toBeInTheDocument();

    await step("Try to click", async () => {
      const items = root.getElementsByTagName("daikin-accordion-item");

      await userEvent.click(getByShadowText(root, "Accordion summary 1"));
      await waitFor(() => expect(items[0]).toHaveAttribute("open"), {
        timeout: 500,
      });
      await expect(items[1]).toHaveAttribute("open");
    });

    await userEvent.click(getByShadowText(root, "Accordion summary 2"));

    await step("Try to keyboard navigation", async () => {
      root.getElementsByTagName("daikin-accordion-item")[0].focus();

      await userEvent.keyboard("[ArrowDown]");
      await expect(
        getByShadowText(
          document.activeElement as DaikinAccordionItem,
          "Accordion summary 2"
        )
      ).toBeInTheDocument();
      await userEvent.keyboard("[ArrowDown]");
      await expect(
        getByShadowText(
          document.activeElement as DaikinAccordionItem,
          "Accordion summary 5"
        )
      ).toBeInTheDocument();
      await userEvent.keyboard("[ArrowDown]");
      await expect(
        getByShadowText(
          document.activeElement as DaikinAccordionItem,
          "Accordion summary 1"
        )
      ).toBeInTheDocument();
      await userEvent.keyboard("[ArrowUp]");
      await expect(
        getByShadowText(
          document.activeElement as DaikinAccordionItem,
          "Accordion summary 5"
        )
      ).toBeInTheDocument();

      (document.activeElement as DaikinAccordionItem).blur();
    });
  }),
};

export const Exclusive: Story = {
  args: {
    ...Default.args,
    exclusive: true,
  },
  play: definePlay(async ({ canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-accordion")[0];
    await expect(root).toBeInTheDocument();

    await step("Try to click", async () => {
      const items = root.getElementsByTagName("daikin-accordion-item");

      await userEvent.click(getByShadowText(root, "Accordion summary 1"));
      await waitFor(() => expect(items[0]).toHaveAttribute("open"), {
        timeout: 500,
      });
      await waitFor(() => expect(items[1]).not.toHaveAttribute("open"), {
        timeout: 500,
      });

      await userEvent.click(getByShadowText(root, "Accordion summary 2"));
      await waitFor(() => expect(items[0]).not.toHaveAttribute("open"), {
        timeout: 500,
      });
      await waitFor(() => expect(items[1]).toHaveAttribute("open"), {
        timeout: 500,
      });
    });

    await userEvent.click(getByShadowText(root, "Accordion summary 1"));
  }),
};
