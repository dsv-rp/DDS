import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, userEvent } from "@storybook/test";
import { getByShadowRole } from "shadow-dom-testing-library";
import { DAIKIN_LIST_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/List",
  tags: ["autodocs"],
  argTypes: DAIKIN_LIST_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {},
  play: definePlay(async ({ canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-list")[0];
    await expect(root).toBeInTheDocument();

    const firstTarget = (root.shadowRoot
      ?.querySelector("slot")
      ?.assignedElements({ flatten: true }) ?? [])[0] as HTMLElement;

    await step(
      "Pressing the Arrow Down button will move to the next focusable content",
      async () => {
        firstTarget.focus();
        await userEvent.keyboard("[ArrowDown]");

        await expect(
          getByShadowRole(root, "link", { name: "List item label 2" })
        ).toBeInTheDocument();
      }
    );

    await step(
      "Pressing the Arrow Up button will move to the previous focusable content",
      async () => {
        await userEvent.keyboard("[ArrowUp]");

        await expect(
          getByShadowRole(root, "button", { name: "List item label 1" })
        ).toBeInTheDocument();
      }
    );
  }),
};
