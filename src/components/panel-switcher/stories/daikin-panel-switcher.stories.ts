import { definePlay, isInViewport, isVisible } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, userEvent, waitFor } from "@storybook/test";
import { getByShadowTestId, getByShadowText } from "shadow-dom-testing-library";
import { DAIKIN_PANEL_SWITCHER_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Panel Switcher",
  tags: ["autodocs"],
  argTypes: DAIKIN_PANEL_SWITCHER_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    content: "text",
    panels: ["foo", "bar", "baz"],
    value: "foo",
  },
  play: definePlay(async ({ canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-panel-switcher")[0];
    await expect(root).toBeInTheDocument();

    await step("Initial panel", async () => {
      // NOTE: we cannot use `toBeVisible()` here, since it cannot handle shadow DOM correctly.
      await expect(isVisible(getByShadowText(root, "foo panel."))).toBe(true);
      await expect(isVisible(getByShadowText(root, "baz panel."))).toBe(false);
    });

    // should show baz panel if value set
    await step("Try to switch to baz panel", async () => {
      root.value = "baz";
      // Wait for rendering
      await waitFor(
        () =>
          expect(isVisible(getByShadowText(root, "foo panel."))).toBe(false),
        { timeout: 500 }
      );
      await expect(isVisible(getByShadowText(root, "baz panel."))).toBe(true);
    });

    root.value = "foo";
  }),
};

export const FormInput: Story = {
  args: {
    ...Default.args,
    content: "form",
  },
  play: definePlay(async ({ canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-panel-switcher")[0];
    await expect(root).toBeInTheDocument();

    await step("Type something", async () => {
      const fooInput = getByShadowTestId(root, "panel-foo-input");
      await userEvent.clear(fooInput);
      await userEvent.type(fooInput, "Example");
      await expect(fooInput).toHaveValue("Example");
    });

    await step("Try to switch to bar panel (short)", async () => {
      root.value = "bar";
      await waitFor(
        () =>
          expect(isVisible(getByShadowTestId(root, "panel-bar-input"))).toBe(
            true
          ),
        { timeout: 500 }
      );
      await expect(isVisible(getByShadowTestId(root, "panel-foo-input"))).toBe(
        false
      );
    });

    await step("Try to switch back to foo panel (long)", async () => {
      root.value = "foo";
      await waitFor(
        () =>
          expect(isVisible(getByShadowTestId(root, "panel-foo-input"))).toBe(
            true
          ),
        { timeout: 500 }
      );

      // Form values should be preserved.
      const fooInput = getByShadowTestId(root, "panel-foo-input");
      await expect(fooInput).toHaveValue("Example");
    });
  }),
};

export const LongContent: Story = {
  args: {
    content: "long",
    panels: ["foo-x100", "bar-x5", "baz-x50"],
    value: "foo-x100",
  },
  play: definePlay(async ({ canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-panel-switcher")[0];
    await expect(root).toBeInTheDocument();

    await step("Scroll down", async () => {
      getByShadowTestId(root, "panel-foo-x100-line-90").scrollIntoView({
        behavior: "instant",
      });
      await expect(
        isInViewport(getByShadowTestId(root, "panel-foo-x100-line-1"))
      ).toBe(false);
      await expect(
        isInViewport(getByShadowTestId(root, "panel-foo-x100-line-90"))
      ).toBe(true);
    });

    await step("Try to switch to bar panel (short)", async () => {
      root.value = "bar-x5";
      await waitFor(
        () =>
          expect(
            isVisible(getByShadowTestId(root, "panel-bar-x5-line-1"))
          ).toBe(true),
        { timeout: 500 }
      );
      await expect(
        isInViewport(getByShadowTestId(root, "panel-foo-x100-line-1"))
      ).toBe(false);
      await expect(
        isInViewport(getByShadowTestId(root, "panel-foo-x100-line-90"))
      ).toBe(false);
    });

    await step("Try to switch back to foo panel (long)", async () => {
      root.value = "foo-x100";
      await waitFor(
        () =>
          expect(
            isVisible(getByShadowTestId(root, "panel-foo-x100-line-1"))
          ).toBe(true),
        { timeout: 500 }
      );

      // Currently we don't preserve scroll positions.
      await expect(
        isInViewport(getByShadowTestId(root, "panel-foo-x100-line-1"))
      ).toBe(true);
      await expect(
        isInViewport(getByShadowTestId(root, "panel-foo-x100-line-90"))
      ).toBe(false);
    });
  }),
};
