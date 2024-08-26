import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

import { cva } from "class-variance-authority";
import tailwindStyles from "../../tailwind.css?inline";

const cvaContainer = cva(
  ["flex", "items-center", "w-full", "justify-between", "last:pr-6"],
  {
    variants: {
      underLine: {
        true: ["border-b", "border-[#E6F1F5]"],
        false: [],
      },
    },
  }
);

const cvaLabel = cva(
  [
    "py-4",
    "text-[#1C2325]",
    "font-daikinSerif",
    "text-[19px]",
    "not-italic",
    "font-bold",
    "leading-[26px]",
    "pl-3",
  ],
  {
    variants: {
      withIcon: {
        true: [],
        false: [],
      },
    },
  }
);

/**
 * `daikin-card-title` is used to represent header of the card component, and is used as a child element of the `daikin-card` component.
 *
 * Hierarchy:
 * - `daikin-card` > `daikin-card-title`
 *
 * @slot icon - A slot for card title icon. Place `daikin-icon` element here.
 *
 * @slot label - A slot for card title Text content. Place a text element here.
 *
 * @slot link - A slot for card title link. Place link elements here.
 *
 * @slot action - A slot for card title button. Place `daikin-button` elements here.
 *
 * @example
 *
 * ```html
 * <!-- See `daikin-card` component for complete example. -->
 * <daikin-card-title>
 *  <span slot="label">Card Header</span>
 *  <daikin-button slot="action" size="condensed" variant="secondary">
 *    Edit
 *  </daikin-button>
 * </daikin-card-title>
 * ```
 */
@customElement("daikin-card-title")
export class DaikinCardTitle extends LitElement {
  static override styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: flex;
      align-items: center;
    }
  `;

  /**
   * If `true` will show a blue line under the card
   */
  @property({ type: Boolean, reflect: true, attribute: "under-line" })
  underLine = false;

  private withIcon = false;

  override render() {
    const containerClassName = cvaContainer({
      underLine: this.underLine,
    });

    const labelClassName = cvaLabel({
      withIcon: this.withIcon,
    });

    return html` <div class="${containerClassName}">
      <div class="flex items-center ml-4">
        <slot name="icon"><span class="w-4 h-4 -mr-5"></span></slot>
        <div class=${labelClassName}>
          <slot name="label"></slot>
        </div>
      </div>
      <div class="flex gap-3">
        <slot name="link"></slot>
        <slot name="action"></slot>
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-card-title": DaikinCardTitle;
  }
}
