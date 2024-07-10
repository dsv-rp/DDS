import {
  space12,
  space16,
  space20,
  space24,
} from "@daikin-oss/dds-tokens/js/daikin/Light/variables.js";
import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";

export const ICONS = [
  "alarm",
  "close",
  "information",
  "negative",
  "positive",
  "warning",
] as const;

type IconType = (typeof ICONS)[number];

const ICON_MAP: Record<IconType, string> = {
  alarm: "i-daikin-notification-status-alarm",
  close: "i-daikin-notification-close",
  information: "i-daikin-notification-status-information",
  negative: "i-daikin-notification-status-negative",
  positive: "i-daikin-notification-status-positive",
  warning: "i-daikin-notification-status-warning",
};

const ICON_COLOR_MAP: Record<IconType, string> = {
  alarm: "#000000",
  close: "#a0a0a0",
  information: "#000000",
  negative: "#000000",
  positive: "#000000",
  warning: "#000000",
};

const cvaIcon = cva(["block"], {
  variants: {
    icon: ICON_MAP,
    size: {
      s: [`w-[--size-s]`, `h-[--size-s]`],
      m: [`w-[--size-m]`, `h-[--size-m]`],
      l: [`w-[--size-l]`, `h-[--size-l]`],
      xl: [`w-[--size-xl]`, `h-[--size-xl]`],
    },
    color: {
      black: ["text-black"],
      white: ["text-white"],
      colored: ["text-[--default-color]"],
    },
  },
  defaultVariants: {
    size: "m",
    color: "black",
  },
});

export type IconVariantProps = MergeVariantProps<typeof cvaIcon>;

/**
 * Primary UI component for user interaction
 */
@customElement("daikin-icon")
export class DaikinIcon extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      --size-s: ${unsafeCSS(space12)};
      --size-m: ${unsafeCSS(space16)};
      --size-l: ${unsafeCSS(space20)};
      --size-xl: ${unsafeCSS(space24)};
      display: block;
      width: max-content;
    }
  `;

  /**
   * Specify the name of the icon
   */
  @property({ type: String, reflect: true })
  icon = "";

  /**
   * Specify icon color
   */
  @property({ type: String, reflect: true })
  color: IconVariantProps["color"] = "black";

  /**
   * Specify the height and width of the icon
   */
  @property({ type: String, reflect: true })
  size: IconVariantProps["size"] = "m";

  override render() {
    return html`<span
      class=${cvaIcon({
        icon: this.icon as IconType,
        color: this.color,
        size: this.size,
      })}
      style="--default-color:${ICON_COLOR_MAP[this.icon as IconType]}"
      role="presentation"
    ></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-icon": DaikinIcon;
  }
}

export default DaikinIcon;
