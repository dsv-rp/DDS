import type { DaikinDropdown } from "#package/components/dropdown";
import { metadata } from "#storybook-framework";
import { expect, fn, userEvent } from "@storybook/test";
import { PointerEventsCheckLevel } from "@testing-library/user-event";
import { getByShadowRole, getByShadowText } from "shadow-dom-testing-library";
import { definePlay } from "../../../storybook/define-play";
import { DAIKIN_DROPDOWN_ARG_TYPES, type Story } from "./common";

const resetArgs = {
  value: null,
  selectedOptions: [],
};

export default {
  title: "Components/Dropdown",
  tags: ["autodocs"],
  argTypes: DAIKIN_DROPDOWN_ARG_TYPES,
  ...metadata,
};

function eventPayloadTransformer(event: Event) {
  // We need to retrieve `event.target.value` inside the event listeners not to miss problems caused by the timing of acquisition.
  return {
    value: (event.target as DaikinDropdown).value,
  };
}

export const Default: Story = {
  args: {
    open: false,
    placeholder: "Choose an Option",
    disabled: false,
    required: false,
    error: false,
    multiple: false,
    option: "default",
    value: "value1",
    selectedOptions: ["value1"],
    onClick: fn(eventPayloadTransformer),
    onChange: fn(eventPayloadTransformer),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-dropdown")[0];
    await expect(root).toBeInTheDocument();
    await expect(root).not.toHaveAttribute("open");

    const dropdown = getByShadowRole(root, "combobox");

    // should not react if inner button clicked
    await step("Try to click inner button", async () => {
      await userEvent.click(dropdown);

      await expect(args.onClick).toHaveBeenCalledTimes(1);
      await expect(root).toHaveAttribute("open");
    });

    await step("Selecting a dropdown will reflect the value", async () => {
      await expect(document.activeElement?.textContent).toBe("Dropdown item 1");
      await userEvent.keyboard("[ArrowDown]");
      await expect(document.activeElement?.textContent).toBe("Dropdown item 2");
      await userEvent.keyboard("[ArrowDown]");
      await expect(document.activeElement?.textContent).toBe("Dropdown item 1");
      await userEvent.keyboard("[Space]");

      await expect(args.onChange).toHaveBeenCalledTimes(1);
      await expect(args.onChange).toHaveLastReturnedWith({
        value: "value1",
      });
      await expect(root).not.toHaveAttribute("open");
    });

    await step("Try to keyboard navigation", async () => {
      dropdown.focus();
      await userEvent.keyboard("[Escape]");

      await userEvent.keyboard("[ArrowDown]");
      await expect(document.activeElement?.textContent).toBe("Dropdown item 1");
    });

    await step("Try to select the disabled option", async () => {
      await userEvent.click(dropdown);
      await userEvent.click(
        getByShadowRole(root, "option", {
          name: "Dropdown item 3",
        }),
        {
          pointerEventsCheck: PointerEventsCheckLevel.Never,
        }
      );

      await expect(args.onChange).toHaveBeenCalledTimes(1);
    });

    await step("Try to keyboard navigation", async () => {
      dropdown.focus();

      await userEvent.keyboard("[Space]");
      await userEvent.keyboard("[Escape]");
      await expect(root).not.toHaveAttribute("open");
    });

    await step("Try to keyboard navigation", async () => {
      dropdown.focus();

      await userEvent.keyboard("[Escape]");
    });

    dropdown.blur();
  }),
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    ...resetArgs,
    disabled: true,
    onClick: fn(eventPayloadTransformer),
    onChange: fn(eventPayloadTransformer),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-dropdown")[0];
    await expect(root).toBeInTheDocument();
    await expect(root).not.toHaveAttribute("open");

    // should not react if inner button clicked
    await step("Try to click inner button", async () => {
      await userEvent.click(getByShadowRole(root, "combobox"));

      await expect(args.onClick).not.toHaveBeenCalled();
    });
  }),
};

export const Error: Story = {
  args: {
    ...Default.args,
    ...resetArgs,
    error: true,
  },
};

export const SingleItem: Story = {
  args: {
    ...Default.args,
    ...resetArgs,
    option: "single",
  },
};

export const ManyItems: Story = {
  args: {
    ...Default.args,
    ...resetArgs,
    option: "many",
  },
};

export const MultipleSelection: Story = {
  args: {
    ...Default.args,
    ...resetArgs,
    placeholder: "Choose Options",
    multiple: true,
    maxLabels: 3,
    option: "many",
    onClick: fn(eventPayloadTransformer),
    onChange: fn(eventPayloadTransformer),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-dropdown")[0];
    await expect(root).toBeInTheDocument();
    await expect(root).not.toHaveAttribute("open");
    const dropdown = getByShadowRole(root, "combobox");

    // should not react if inner button clicked
    await step("Try to click inner button", async () => {
      await userEvent.click(dropdown);
      await expect(args.onClick).toHaveBeenCalledTimes(1);

      await expect(root).toHaveAttribute("open");
    });

    await step("Selecting a dropdown will reflect the value", async () => {
      await userEvent.keyboard("[ArrowDown]");
      await userEvent.keyboard("[Enter]");
      await userEvent.keyboard("[ArrowUp]");
      await userEvent.keyboard("[Enter]");
      await userEvent.keyboard("[ArrowUp]");
      await userEvent.keyboard("[Enter]");

      await expect(args.onChange).toHaveBeenCalledTimes(3);
      await expect(args.onChange).toHaveLastReturnedWith({
        value: "value20",
      });
      await expect(
        getByShadowText(
          root,
          "Dropdown item 2, Dropdown item 1, Dropdown item 20"
        )
      ).toBeInTheDocument();
    });

    await step("Selecting a dropdown will reflect the value", async () => {
      await userEvent.keyboard("[ArrowUp]");
      await userEvent.keyboard("[Enter]");

      await expect(args.onChange).toHaveBeenCalledTimes(4);
      await expect(
        getByShadowText(root, "4 items selected")
      ).toBeInTheDocument();
    });

    await step("", async () => {
      dropdown.focus();
      await userEvent.keyboard("[Escape]");
      await expect(root).not.toHaveAttribute("open");
      await userEvent.keyboard("[Escape]");
      getByShadowText(
        root,
        "Dropdown item 2, Dropdown item 1, Dropdown item 20"
      );
      await userEvent.keyboard("[Escape]");
      getByShadowText(root, "Dropdown item 2, Dropdown item 1");
      await userEvent.keyboard("[Escape]");
      await userEvent.keyboard("[Escape]");
      await expect(getByShadowText(root, "Choose Options")).toBeInTheDocument();
    });
    dropdown.blur();
  }),
};
