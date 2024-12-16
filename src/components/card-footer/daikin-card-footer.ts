import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";

import tailwindStyles from "../../tailwind.css?inline";

/**
 * `daikin-card-footer` is used to represent footer of the card component, and is used as a child element of the `daikin-card` component.
 *
 * Hierarchy:
 * - `daikin-card` > `daikin-card-footer`
 *
 * @slot icon - A slot for card footer icon. Place a `daikin-icon` element here.
 * @slot label - A slot for card footer text content. Place a text here.
 * @slot link - A slot for card footer link. Place a link element here.
 * @slot action - A slot for card footer button. Place a `daikin-button` element here.
 *
 * @example
 *
 * ```html
 * <!-- See `daikin-card` component for complete example. -->
 * <daikin-card-footer>
 *  <span slot="label">Card footer</span>
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
