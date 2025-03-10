import { css, html, unsafeCSS } from "lit";
import { DDSElement, ddsElement } from "../../base";
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
 * ```js
 * import "@daikin-oss/design-system-web-components/components/card-footer/index.js";
 * ```
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
@ddsElement("daikin-card-footer")
export class DaikinCardFooter extends DDSElement {
  static override styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: flex-end;
    }
  `;

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-card-footer": DaikinCardFooter;
  }
}
