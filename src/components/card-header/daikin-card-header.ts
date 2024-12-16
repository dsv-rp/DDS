import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";

import { cva } from "class-variance-authority";
import tailwindStyles from "../../tailwind.css?inline";

const cvaTitle = cva([
  "text-[#414141]",
  "font-daikinSerif",
  "text-base",
  "not-italic",
  "font-bold",
]);

const cvaDescription = cva([
  "text-[#616161]",
  "font-daikinSerif",
  "text-[14px]",
  "not-italic",
  "font-normal",
]);

/**
 * `daikin-card-header` is used to represent header of the card component, and is used as a child element of the `daikin-card` component.
 *
 * Hierarchy:
 * - `daikin-card` > `daikin-card-header`
 *
 * @slot icon - A slot for card header icon. Place a `daikin-icon` element here.
 * @slot label - A slot for card header text content. Place a text here.
 * @slot link - A slot for card header link. Place a link element here.
 * @slot action - A slot for card header button. Place a `daikin-button` element here.
 *
 * @example
 *
 * ```html
 * <!-- See `daikin-card` component for complete example. -->
 * <daikin-card-header>
 *  <span slot="label">Card Header</span>
 * </daikin-card-header>
 * ```
 */
@customElement("daikin-card-header")
export class DaikinCardHeader extends LitElement {
  static override styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: flex;
      align-items: center;
    }
  `;

  override render() {
    return html` <div class="flex w-full gap-1">
      <slot name="left-icon"></slot>
      <div class="flex flex-col pt-0.5 gap-[1px]">
        <slot class=${cvaTitle()}></slot>
        <slot name="description" class=${cvaDescription()}></slot>
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-card-header": DaikinCardHeader;
  }
}
