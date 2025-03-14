import { cva } from "class-variance-authority";
import { css, html, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { DDSElement, ddsElement } from "../../base";
import tailwindStyles from "../../tailwind.css?inline";

const cvaContainer = cva(
  [
    "flex",
    "flex-col",
    "gap-4",
    "size-full",
    "p-4",
    "rounded-lg",
    "bg-ddt-color-common-background-default",
  ],
  {
    variants: {
      outline: {
        true: ["border", "border-ddt-color-divider"],
        false: [],
      },
    },
  }
);

/**
 * `daikin-card` is a component for display content related to a single subject. The content can consist of multiple elements of varying types and sizes.
 *
 * Hierarchy:
 * - `daikin-card` > `daikin-card-header`
 * - `daikin-card` > `daikin-card-footer`
 *
 * @slot - A slot for card header, body, card footer. Place `daikin-card-header`, custom body content, `daikin-card-footer` here in order.
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/card/index.js";
 * import "@daikin-oss/design-system-web-components/components/card-footer/index.js";
 * import "@daikin-oss/design-system-web-components/components/card-header/index.js";
 * ```
 *
 * ```html
 * <daikin-card outline>
 *   <daikin-card-header>
 *     <daikin-card-header>
 *       <daikin-icon slot="left-icon" icon="alarm" size="xl" color="current"></daikin-icon>
 *       <span slot="description">Description</span>
 *       <span>Card Title</span>
 *       <span slot="description">Description</span>
 *     </daikin-card-header>
 *   </daikin-card-header>
 *   <p>Card body.</p>
 *   <daikin-card-footer>
 *     <daikin-button size="small">Button</daikin-button>
 *   </daikin-card-footer>
 * </daikin-card>
 * ```
 */
@ddsElement("daikin-card")
export class DaikinCard extends DDSElement {
  static override styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
      width: 100%;
    }
  `;

  /**
   * Specify whether the card border to be visible or not.
   */
  @property({ type: Boolean, reflect: true })
  outline = false;

  override render() {
    return html`<div
      class=${cvaContainer({
        outline: this.outline,
      })}
    >
      <slot class="text-ddt-color-common-text-primary"></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-card": DaikinCard;
  }
}
