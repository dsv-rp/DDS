import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";

import tailwindStyles from "../../tailwind.css?inline";

/**
 * `daikin-card-footer` is used to represent footer of the card component, and is used as a child element of the `daikin-card` component.
 *
 * Hierarchy:
 * - `daikin-card` > `daikin-card-footer`
 *
 * @slot A slot for card footer action element. Place a `daikin-button` or `daikin-link` element here.
 *
 * @example
 *
 * ```html
 * <!-- See `daikin-card` component for complete example. -->
 * <daikin-card-footer>
 *  <daikin-button size="small" color="default">
 *    Button
 *  </daikin-button>
 * </daikin-card-footer>
 * ```
 */
@customElement("daikin-card-footer")
export class DaikinCardFooter extends LitElement {
  static override styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: flex;
      align-items: center;
    }
  `;

  override render() {
    return html`
      <div class="flex w-full justify-end">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-card-footer": DaikinCardFooter;
  }
}
