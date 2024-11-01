import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";
import { icons } from "./icons.json";

export const iconList = Object.keys(icons);

export type IconType = keyof typeof icons;

const iconClassMap = Object.fromEntries(
  Object.entries(icons).map(([name, object]) => [name, object.class])
);

const cvaIcon = cva(["block"], {
  variants: {
    icon: iconClassMap,
    color: {
      black: ["text-black"],
      white: ["text-white"],
      default: ["text-[--default-color]"],
      current: [], // uses `currentColor`
    },
  },
});

export type IconVariantProps = MergeVariantProps<typeof cvaIcon>;

/**
 * The icon component is a versatile UI element used to display small graphical symbols or images that represent actions, objects, or concepts within an application.
 * The icon set is provided by DDS.
 *
 * To use an arbitrary color, specify `"current"` for the `color` property and set the `color` CSS property to the color you want to use.
 *
 * If you try to use an icon that does not exist, a blank space will be displayed.
 * In the development build, warnings will be displayed in the console, so please check there if you encounter any unexpected behavior.
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/icon/index.js";
 * ```
 *
 * ```html
 * <daikin-icon icon="information" color="black" size="m"></daikin-icon>
 * ```
 */
@customElement("daikin-icon")
export class DaikinIcon extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: inline-block;
      width: var(--dds-icon-size);
      height: var(--dds-icon-size);
    }

    :host([size="s"]) {
      --dds-icon-size: 12px;
    }

    :host([size="m"]) {
      --dds-icon-size: 16px;
    }

    :host([size="l"]) {
      --dds-icon-size: 20px;
    }

    :host([size="xl"]) {
      --dds-icon-size: 24px;
    }
  `;

  /**
   * Specify the name of the icon
   */
  @property({ type: String, reflect: true })
  icon: IconType | null = null;

  /**
   * Specify icon color
   */
  @property({ type: String, reflect: true })
  color: IconVariantProps["color"] = "default";

  /**
   * Specify the height and width of the icon
   */
  @property({ type: String, reflect: true })
  size: "s" | "m" | "l" | "xl" = "m";

  override render() {
    const defaultColor = (
      icons as Record<string, (typeof icons)[keyof typeof icons] | undefined>
    )[this.icon ?? ""]?.color;

    if (import.meta.env.DEV) {
      if (!this.icon) {
        console.warn("icon property is not specified");
      } else if (!(this.icon in icons)) {
        console.warn(`There is no icon named "${this.icon}".`);
      } else if (this.color === "default" && !defaultColor) {
        console.warn(`The icon "${this.icon}" does not have a default color.`);
      }
    }

    return html`<span
      class=${cvaIcon({
        icon: this.icon,
        color: this.color,
      })}
      style=${`--default-color:${defaultColor ?? "#000000"}`}
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
