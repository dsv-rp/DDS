import { cva } from "class-variance-authority";
import { LitElement, css, html, nothing, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import "../icon/daikin-icon";
import type { IconType } from "../icon/daikin-icon";

const cvaList = cva(
  [
    "flex",
    "justify-between",
    "items-center",
    "gap-2",
    "w-full",
    "min-h-12",
    "p-3",
    "focus-visible:outline",
    "focus-visible:outline-1",
    "focus-visible:-outline-offset-1",
    "focus-visible:outline-daikinBlue-700",
  ],
  {
    variants: {
      disabled: {
        false: ["hover:bg-daikinNeutral-100", "active:bg-daikinNeutral-200"],
        true: ["text-daikinNeutral-200", "[&>*]:text-daikinNeutral-200"],
      },
    },
  }
);

/**
 * The list item component functions as a child element of the list component, and is used to actually list items.
 *
 * You can choose between the `button` type, which uses the HTML button tag, and the `link` type, which uses the a tag, and use them according to your needs.
 *
 * Hierarchy:
 * - `daikin-list` > `daikin-list-item`
 *
 * @fires click - A retargeted event of a [click event](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event). Suppressed if `disabled` is true.
 *
 * @slot - A slot for the list items. Place `daikin-list-item` elements here.
 *
 * @example
 *
 * ```html
 * <daikin-list-item>List item label</daikin-list-item>
 * ```
 */
@customElement("daikin-list-item")
export class DaikinListItem extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}
  `;

  /**
   * Type of List
   */
  @property({ type: String })
  type: "button" | "link" = "button";

  /**
   * Destination when the link is clicked
   */
  @property({ type: String })
  href: string | null = null;

  /**
   * Whether the list is disabled
   */
  @property({ type: Boolean })
  disabled: boolean = false;

  /**
   * Set a icon in the left of label
   */
  @property({ type: String, attribute: "left-icon" })
  leftIcon: IconType | null = null;

  override render() {
    const isLink = this.type === "link" && !!this.href;
    const variant =
      isLink && this.disabled ? "linkDisabled" : isLink ? "link" : "button";
    const LIST_CLASS_NAME = cvaList({ disabled: this.disabled });

    const content = html`<div class="flex items-center gap-2">
        ${this.leftIcon
          ? html`<daikin-icon
              icon=${this.leftIcon}
              size="xl"
              color="current"
            ></daikin-icon>`
          : nothing}
        <slot></slot>
      </div>
      <daikin-icon
        icon="chevron-right"
        size="l"
        color="current"
      ></daikin-icon>`;

    const list = {
      button: html`<button
        type="button"
        class=${LIST_CLASS_NAME}
        ?disabled=${this.disabled}
      >
        ${content}
      </button>`,
      link: html`<a href=${this.href as string} class=${LIST_CLASS_NAME}>
        ${content}
      </a>`,
      linkDisabled: html`<div class=${LIST_CLASS_NAME}>${content}</div>`,
    }[variant];

    return list;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-list-item": DaikinListItem;
  }
}

export default DaikinListItem;
