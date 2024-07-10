import { definePlay, isVisible } from "#storybook";
import { metadata } from "#storybook-framework";
import { clearAllMocks, expect, fn, userEvent } from "@storybook/test";
import { getByShadowRole, getByShadowText } from "shadow-dom-testing-library";
import { DAIKIN_TAB_GROUP_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Tab Group",
  tags: ["autodocs"],
  argTypes: DAIKIN_TAB_GROUP_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    tabs: ["Foo", "!Bar", "Baz"],
    value: "foo",
    size: "default",
    onBeforeChange: fn(),
    onChange: fn(),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-tab-group")[0];
    await expect(root).toBeInTheDocument();

    const fooTab = getByShadowRole(root, "tab", {
      name: "Foo",
    });
    const barTab = getByShadowRole(root, "tab", {
      name: "Bar",
    });
    const bazTab = getByShadowRole(root, "tab", {
      name: "Baz",
    });

    await expect(
      isVisible(getByShadowText(root, "Content of tab Foo. (Scrollable)"))
    ).toBe(true);

    // should react if baz tab clicked
    await step("Try to click baz tab", async () => {
      clearAllMocks();
      await userEvent.click(bazTab);
      await expect(args.onBeforeChange).toHaveBeenCalledOnce();
      await expect(args.onChange).toHaveBeenCalledOnce();
      await expect(root.value).toBe("baz");

      await expect(
        isVisible(getByShadowText(root, "Content of tab Foo. (Scrollable)"))
      ).toBe(false);
      await expect(
        isVisible(getByShadowText(root, "Content of tab Baz. (Scrollable)"))
      ).toBe(true);
    });

    // should not react if bar tab (disabled tab) clicked
    await step("Try to click bar tab", async () => {
      clearAllMocks();
      await userEvent.click(barTab);
      await expect(args.onBeforeChange).not.toHaveBeenCalled();
      await expect(args.onChange).not.toHaveBeenCalled();
      await expect(root.value).toBe("baz");

      await expect(
        isVisible(getByShadowText(root, "Content of tab Foo. (Scrollable)"))
      ).toBe(false);
      await expect(
        isVisible(getByShadowText(root, "Content of tab Bar. (Scrollable)"))
      ).toBe(false);
      await expect(
        isVisible(getByShadowText(root, "Content of tab Baz. (Scrollable)"))
      ).toBe(true);
    });

    // should react if foo tab clicked
    await step("Try to click foo tab", async () => {
      clearAllMocks();
      await userEvent.click(fooTab);
      await expect(args.onBeforeChange).toHaveBeenCalledOnce();
      await expect(args.onChange).toHaveBeenCalledOnce();
      await expect(root.value).toBe("foo");

      await expect(
        isVisible(getByShadowText(root, "Content of tab Foo. (Scrollable)"))
      ).toBe(true);
      await expect(
        isVisible(getByShadowText(root, "Content of tab Baz. (Scrollable)"))
      ).toBe(false);
    });

    await step("Keyboard navigation 1 (skip disabled tab)", async () => {
      clearAllMocks();
      fooTab.focus();
      await userEvent.keyboard("[ArrowRight]");
      await expect(document.activeElement).not.toBeNull();
      await expect(
        getByShadowRole(document.activeElement as HTMLElement, "tab")
      ).toBe(bazTab);

      await userEvent.keyboard("[Space]");
      await expect(args.onBeforeChange).toHaveBeenCalledOnce();
      await expect(args.onChange).toHaveBeenCalledOnce();
      await expect(root.value).toBe("baz");

      await expect(
        isVisible(getByShadowText(root, "Content of tab Foo. (Scrollable)"))
      ).toBe(false);
      await expect(
        isVisible(getByShadowText(root, "Content of tab Baz. (Scrollable)"))
      ).toBe(true);
    });

    await step("Keyboard navigation 2 (rightmost to leftmost)", async () => {
      clearAllMocks();
      bazTab.focus();
      await userEvent.keyboard("[ArrowRight]");
      await expect(document.activeElement).not.toBeNull();
      await expect(
        getByShadowRole(document.activeElement as HTMLElement, "tab")
      ).toBe(fooTab);

      await userEvent.keyboard("[Space]");
      await expect(args.onBeforeChange).toHaveBeenCalledOnce();
      await expect(args.onChange).toHaveBeenCalledOnce();
      await expect(root.value).toBe("foo");

      await expect(
        isVisible(getByShadowText(root, "Content of tab Foo. (Scrollable)"))
      ).toBe(true);
      await expect(
        isVisible(getByShadowText(root, "Content of tab Baz. (Scrollable)"))
      ).toBe(false);
    });

    await step("Keyboard navigation 3 (leftmost to rightmost)", async () => {
      clearAllMocks();
      fooTab.focus();
      await userEvent.keyboard("[ArrowLeft]");
      await expect(document.activeElement).not.toBeNull();
      await expect(
        getByShadowRole(document.activeElement as HTMLElement, "tab")
      ).toBe(bazTab);

      await userEvent.keyboard("[Space]");
      await expect(args.onBeforeChange).toHaveBeenCalledOnce();
      await expect(args.onChange).toHaveBeenCalledOnce();
      await expect(root.value).toBe("baz");

      await expect(
        isVisible(getByShadowText(root, "Content of tab Foo. (Scrollable)"))
      ).toBe(false);
      await expect(
        isVisible(getByShadowText(root, "Content of tab Baz. (Scrollable)"))
      ).toBe(true);
    });

    await userEvent.click(fooTab);
  }),
};

export const Single: Story = {
  args: {
    tabs: ["Foo"],
    value: "foo",
    size: "default",
    onBeforeChange: fn(),
    onChange: fn(),
  },
};

export const Many: Story = {
  args: {
    tabs: new Array(20).fill("").map((_, i) => `Tab ${i + 1}`),
    value: "tab1",
    size: "default",
    onBeforeChange: fn(),
    onChange: fn(),
  },
};

export const PreventBeforeChange: Story = {
  args: {
    tabs: ["Foo", "!Bar", "Baz"],
    value: "foo",
    size: "default",
    onBeforeChange: (event: Event) => {
      event.preventDefault();
    },
    onChange: fn(),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-tab-group")[0];
    await expect(root).toBeInTheDocument();

    const fooTab = getByShadowRole(root, "tab", {
      name: "Foo",
    });
    const bazTab = getByShadowRole(root, "tab", {
      name: "Baz",
    });

    // should not react if baz tab clicked
    await step("Try to click baz tab", async () => {
      await userEvent.click(bazTab);
      await expect(args.onChange).not.toHaveBeenCalled();
      await expect(root.value).toBe("foo");

      await expect(
        isVisible(getByShadowText(root, "Content of tab Foo. (Scrollable)"))
      ).toBe(true);
      await expect(
        isVisible(getByShadowText(root, "Content of tab Baz. (Scrollable)"))
      ).toBe(false);
    });

    // should not also react if foo tab clicked
    await step("Try to click foo tab", async () => {
      await userEvent.click(fooTab);
      await expect(args.onChange).not.toHaveBeenCalled();
      await expect(root.value).toBe("foo");

      await expect(
        isVisible(getByShadowText(root, "Content of tab Foo. (Scrollable)"))
      ).toBe(true);
      await expect(
        isVisible(getByShadowText(root, "Content of tab Baz. (Scrollable)"))
      ).toBe(false);
    });

    await step("Keyboard navigation", async () => {
      clearAllMocks();
      fooTab.focus();
      await userEvent.keyboard("[ArrowRight]");
      await expect(document.activeElement).not.toBeNull();
      await expect(
        getByShadowRole(document.activeElement as HTMLElement, "tab")
      ).toBe(bazTab);

      await userEvent.keyboard("[Space]");
      await expect(args.onChange).not.toHaveBeenCalled();
      await expect(root.value).toBe("foo");

      await expect(
        isVisible(getByShadowText(root, "Content of tab Foo. (Scrollable)"))
      ).toBe(true);
      await expect(
        isVisible(getByShadowText(root, "Content of tab Baz. (Scrollable)"))
      ).toBe(false);
    });
  }),
};
