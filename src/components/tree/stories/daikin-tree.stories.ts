import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, userEvent } from "@storybook/test";
import { getByShadowRole } from "shadow-dom-testing-library";
import { DAIKIN_TREE_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Tree",
  tags: ["autodocs"],
  argTypes: DAIKIN_TREE_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {},
  play: definePlay(async ({ canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-tree")[0];
    await expect(root).toBeInTheDocument();

    const firstTarget = (root.shadowRoot
      ?.querySelector("slot")
      ?.assignedElements({ flatten: true }) ?? [])[0] as HTMLElement;

    await step("Try to click inner section label", async () => {
      await expect(firstTarget).toHaveAttribute("open");
      await userEvent.click(
        getByShadowRole(root, "button", { name: "Tree section 1" })
      );

      await expect(firstTarget).not.toHaveAttribute("open");
    });

    await step("Try to keyboard navigation", async () => {
      firstTarget.focus();
      await userEvent.keyboard("[ArrowDown]");
      await userEvent.keyboard("[ArrowRight]");
      await userEvent.keyboard("[ArrowDown]");
      await userEvent.keyboard("[ArrowDown]");
      await expect(document.activeElement?.textContent).toBe("Tree item 2-1-1");
      await userEvent.keyboard("[ArrowDown]");
      await expect(document.activeElement?.textContent).toBe("Tree item 2-1-2");
      await userEvent.keyboard("[ArrowDown]");
      await expect(document.activeElement?.textContent).toBe("Tree item 2-2");
      await userEvent.keyboard("[ArrowDown]");
      await userEvent.keyboard("[ArrowDown]");
      await expect(document.activeElement?.textContent).toBe("Tree item 2-3-1");
      await userEvent.keyboard("[ArrowLeft]");
      await userEvent.keyboard("[ArrowDown]");
      await expect(document.activeElement?.textContent).toBe("Tree item 5");
    });
  }),
};
