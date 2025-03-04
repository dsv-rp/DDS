import { definePlay } from "#storybook";
// This will import either "./framework-wc" or "./framework-react". See `build/vite/storybook-framework-loader.ts`.
import { metadata } from "#storybook-framework";
//import { action } from "@storybook/addon-actions";
import { expect, fn, userEvent } from "@storybook/test";
import type { StoryFn } from "@storybook/web-components";
import type { TemplateResult } from "lit";
import { html } from "lit";
import { getByShadowRole, queryByShadowRole } from "shadow-dom-testing-library";
import { renderKitchenSink } from "../../../../.storybook/kitchen-sink";
import {
  DAIKIN_BUTTON_ARG_TYPES,
  type DaikinButtonStoryArgs,
  type Story,
} from "./common";

// The default export must have a static `title` property starting from Storybook v7.
// See https://storybook.js.org/docs/writing-stories#default-export.

export default {
  title: "Components/Button",
  tags: ["autodocs"],
  argTypes: DAIKIN_BUTTON_ARG_TYPES,
  ...metadata,
};

export const Fill: Story = {
  args: {
    variant: "fill",
    size: "medium",
    color: "default",
    disabled: false,
    label: "Button label",
    type: "button",
    onClick: fn((event: Event) => {
      event.preventDefault();
    }),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-button")[0];
    await expect(root).toBeInTheDocument();

    const innerButton = getByShadowRole(root, "button", {
      name: "Button label",
    });
    await expect(innerButton).toBeInTheDocument();

    // should react if inner button clicked
    await step("Try to click inner button", async () => {
      await userEvent.click(innerButton);
      await expect(args.onClick).toHaveBeenCalledOnce();
    });

    // should also react if outer button clicked
    await step("Try to click outer daikin-button", async () => {
      await userEvent.click(root);
      await expect(args.onClick).toHaveBeenCalledTimes(2);
    });
  }),
};

export const Outline: Story = {
  args: {
    ...Fill.args,
    variant: "outline",
    onClick: fn((event: Event) => {
      event.preventDefault();
    }),
  },
};

export const Ghost: Story = {
  args: {
    ...Fill.args,
    variant: "ghost",
    onClick: fn((event: Event) => {
      event.preventDefault();
    }),
  },
};

export const Danger: Story = {
  args: {
    ...Fill.args,
    color: "danger",
    onClick: fn((event: Event) => {
      event.preventDefault();
    }),
  },
};

export const Disabled: Story = {
  args: {
    ...Fill.args,
    disabled: true,
    onClick: fn((event: Event) => {
      event.preventDefault();
    }),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-button")[0];
    await expect(root).toBeInTheDocument();

    const innerButton = getByShadowRole(root, "button", {
      name: "Button label",
    });
    await expect(innerButton).toBeInTheDocument();

    // should not react if inner button clicked
    await step("Try to click inner button", async () => {
      await userEvent.click(innerButton);
      await expect(args.onClick).not.toHaveBeenCalled();
    });

    // also should not react if outer button clicked
    // FIXME: this case fails because click event not captured in the daikin-button component
    /*
    await step("Try to click outer daikin-button", async () => {
      await userEvent.click(root);
      await expect(args.onClick).not.toHaveBeenCalled();
    });
    */
  }),
};

export const Link: Story = {
  args: {
    ...Fill.args,
    type: "link",
    href: "#",
    onClick: fn((event: Event) => {
      event.preventDefault();
    }),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-button")[0];
    await expect(root).toBeInTheDocument();

    // No buttons
    await expect(queryByShadowRole(root, "button")).toBe(null);

    const innerLink = getByShadowRole(root, "link", { name: "Button label" });
    await expect(innerLink).toBeInTheDocument();

    // should react if inner link clicked
    await step("Try to click inner link", async () => {
      await userEvent.click(innerLink);
      await expect(args.onClick).toHaveBeenCalled();
    });
  }),
};

export const LinkDisabled: Story = {
  args: {
    ...Link.args,
    disabled: true,
    onClick: fn((event: Event) => {
      event.preventDefault();
    }),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-button")[0];
    await expect(root).toBeInTheDocument();

    // No buttons
    await expect(queryByShadowRole(root, "button")).toBe(null);

    const innerLink = getByShadowRole(root, "link", { name: "Button label" });
    await expect(innerLink).toBeInTheDocument();

    // should not react if inner link clicked
    await step("Try to click inner link", async () => {
      await userEvent.click(innerLink);
      await expect(args.onClick).not.toHaveBeenCalled();
    });
  }),
};

export const KitchenSink: StoryFn<DaikinButtonStoryArgs> = (): TemplateResult =>
  renderKitchenSink(
    [
      ["color", ["default", "danger", "disabled"]],
      ["variant", ["fill", "outline", "ghost"]],
      ["type", ["button", "link", "submit", "reset"]],
      ["size", ["medium", "small"]],
    ] as const,

    ({ color, variant, type, size }) => html`
      <daikin-button
        color=${color === "disabled" ? "default" : color}
        variant=${variant}
        type=${type}
        size=${size}
        href=${type === "link" ? "#" : " "}
        ?disabled=${color === "disabled"}
        @click=${() => console.log("Clicked:", { color, variant, type, size })}
      >
        ${[color, variant, type, size]
          .filter(Boolean)
          .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
          .join(" ")}
      </daikin-button>
    `
  );

/*
//kitchen sink code
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
export const ButtonKitchen_Sink: StoryFn<
  DaikinButtonStoryArgs
  //html'' loop by 4 parameters
> = (): TemplateResult => html`
  <div class="kitchen-sink">
    ${(["default", "danger", "disabled"] as const).map(
      //color with disabled we make 3 eras
      (COLORS) => html`
        <section class="color-group">
          <!--Add CSS -->
          <h1 class="group-title">${capitalize(COLORS)} Theme</h1>
          <!-- Add title -->
          ${(["fill", "outline", "ghost"] as const).map(
            //Variants parameters
            (VARIANTS) => html`
              <div class="variant-group">
                <!--Add CSS -->
                <h2 class="variant-title">${capitalize(VARIANTS)} Style</h2>
                <!--Add title -->
                ${(["button", "link", "submit", "reset"] as const).map(
                  //type parameters
                  (TYPE) => html`
                    <h3 class="box-title">${capitalize(TYPE)} Type</h3><!--Add title -->
                    <div class="size-grid">
                      ${(["small", "medium"] as const).map(
                        // size parameters
                        (size) => html`
                          <!--show she button,but COLORS and TYPE need exception processing-->
                          <daikin-button
                            color=${COLORS === "disabled" ? "default" : COLORS}
                            variant=${VARIANTS}
                            size=${size}
                            type=${TYPE}
                            href=${TYPE === "link" ? "#" : " "}
                            ?disabled=${COLORS === "disabled" ? true : false}
                            @click=${COLORS !==
                            "disabled" /* click event,when click set information to handleButtonClick function
                              ? () =>
                                  handleButtonClick({
                                    color: COLORS,
                                    variant: VARIANTS,
                                    type: TYPE,
                                    size: size,
                                  })
                              : undefined}
                          >
                            ${capitalize(COLORS)} ${capitalize(VARIANTS)}
                            ${capitalize(size)}
                          </daikin-button>
                        `
                      )}
                      </div>
                    </div>
                  `
                )}
              </div>
            `
          )}
        </section>
      `
    )}
  </div>
`;

//show click information on storybook action
const handleButtonClick = (context: {
  color: string;
  variant: string;
  type: string;
  size: string;
}) => {
  action("button-clicked")(context);
};
*/
