import type { DaikinTreeSection } from "#package/components/tree-section";
import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, userEvent } from "@storybook/test";
import { getByShadowRole, getByShadowText } from "shadow-dom-testing-library";
import { DAIKIN_TREE_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Tree",
  tags: ["autodocs"],
  argTypes: DAIKIN_TREE_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    selectable: true,
    selected: "1",
  },
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

    await step(
      "Pressing the Arrow Down button will move to the next focusable content",
      async () => {
        firstTarget.focus();
        await userEvent.keyboard("[ArrowDown]");

        await expect(
          getByShadowText(
            document.activeElement as DaikinTreeSection,
            "Tree section 2"
          )
        ).toBeInTheDocument();
      }
    );

    await step(
      "Pressing the Arrow Right button will open to the tree item",
      async () => {
        await expect(document.activeElement).not.toHaveAttribute("open");
        await userEvent.keyboard("[ArrowRight]");
        await expect(document.activeElement).toHaveAttribute("open");
      }
    );

    await step(
      "Pressing the Arrow Down button will move down even if there are sibling and child elements mixed in with the section items.",
      async () => {
        await userEvent.keyboard("[ArrowDown]");
        await expect(
          getByShadowText(
            document.activeElement as DaikinTreeSection,
            "Tree section 2-1"
          )
        ).toBeInTheDocument();
        await userEvent.keyboard("[ArrowDown]");
        await expect(document.activeElement?.textContent).toBe(
          "Tree item 2-1-1"
        );
        await userEvent.keyboard("[ArrowDown]");
        await expect(document.activeElement?.textContent).toBe(
          "Tree item 2-1-2"
        );
        await userEvent.keyboard("[ArrowDown]");
        await expect(document.activeElement?.textContent).toBe("Tree item 2-2");
        await userEvent.keyboard("[ArrowDown]");
        await expect(
          getByShadowText(
            document.activeElement as DaikinTreeSection,
            "Tree section 2-3"
          )
        ).toBeInTheDocument();
        await userEvent.keyboard("[ArrowDown]");
        await expect(document.activeElement?.textContent).toBe(
          "Tree item 2-3-1"
        );
      }
    );

    await step(
      "Pressing the Arrow Left button will close to the tree item",
      async () => {
        await userEvent.keyboard("[ArrowLeft]");
        await expect(
          getByShadowText(
            document.activeElement as DaikinTreeSection,
            "Tree section 2-3"
          )
        ).toBeInTheDocument();
        await userEvent.keyboard("[ArrowLeft]");
        await expect(document.activeElement).not.toHaveAttribute("open");
      }
    );

    await step(
      "Pressing the Arrow Down button will move to the next focusable element, ignoring any sections or items that are disabled",
      async () => {
        await userEvent.keyboard("[ArrowDown]");
        await expect(
          getByShadowText(
            document.activeElement as DaikinTreeSection,
            "Tree item 5"
          )
        ).toBeInTheDocument();
      }
    );

    await step("Return to the top section correctly", async () => {
      getByShadowText(
        document.activeElement as DaikinTreeSection,
        "Tree item 5"
      ).focus();
      await userEvent.keyboard("[ArrowUp]");
      await userEvent.keyboard("[ArrowUp]");
      await userEvent.keyboard("[ArrowUp]");
      await userEvent.keyboard("[ArrowUp]");
      await userEvent.keyboard("[ArrowUp]");
      await userEvent.keyboard("[ArrowUp]");
      await userEvent.keyboard("[ArrowUp]");

      await expect(
        getByShadowText(
          document.activeElement as DaikinTreeSection,
          "Tree section 1"
        )
      ).toBeInTheDocument();

      (document.activeElement as DaikinTreeSection).blur();
    });
  }),
};
