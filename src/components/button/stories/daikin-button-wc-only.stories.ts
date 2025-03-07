import { renderKitchenSink } from "#storybook";
import { action } from "@storybook/addon-actions";
import type { StoryFn } from "@storybook/web-components";
import { type TemplateResult, html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

//action function
const handleButtonClick = (context: {
  color: string;
  variant: string;
  type: string;
  size: string;
}) => {
  // use Storybook action
  action("button-clicked")(context);
  console.log("Button activated:", context);
};

export default {
  title: "Components/Button",
  tags: [],
  argTypes: {},
};

//KitchenSink area
export const KitchenSink: StoryFn = (): TemplateResult =>
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
        href=${ifDefined(type === "link" ? "#" : undefined)}
        ?disabled=${color === "disabled"}

        @click=${color !== "disabled" //click event,when click set information to handleButtonClick function
          ? (e: Event) => {
              e.stopPropagation();
              handleButtonClick({
                color: color,
                variant: variant,
                type: type,
                size: size,
              });
            }
          : undefined}
      >
        ${[color, variant, type, size]
          .filter(Boolean)
          .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
          .join(" ")}
      </daikin-button>
    `
  );
