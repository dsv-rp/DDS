import { cva } from "class-variance-authority";
import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";

const cvaContainer = cva(
  [
    "flex",
    "flex-col",
    "gap-4",
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
@customElement("daikin-card")
export class DaikinCard extends LitElement {
  static override styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: flex;
      width: fit-content;
    }
  `;

  /**
   * Specify whether the card border to be visible or not.
   */
  @property({ type: Boolean, reflect: true })
  outline = false;

  override render() {
    return html` <div
      class=${cvaContainer({
        outline: this.outline,
      })}
    >
      <slot></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-card": DaikinCard;
  }
}
