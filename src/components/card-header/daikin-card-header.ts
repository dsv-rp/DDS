import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";

import { cva } from "class-variance-authority";
import tailwindStyles from "../../tailwind.css?inline";

const cvaTitle = cva([
  "text-ddt-color-common-text-primary",
  "font-daikinSerif",
  "text-base",
  "leading-[1.3]",
  "not-italic",
  "font-bold",
]);

const cvaDescription = cva([
  "text-ddt-color-common-text-secondary",
  "font-daikinSerif",
  "text-sm",
  "leading-normal",
  "not-italic",
  "font-normal",
]);

/**
 * `daikin-card-header` is used to represent header of the card component, and is used as a child element of the `daikin-card` component.
 *
 * Hierarchy:
 * - `daikin-card` > `daikin-card-header`
 *
 * @slot left-icon - A slot for card header icon. Place a `daikin-icon` element here.
 * @slot - A slot for card title content. Place header title content here.
 * @slot description - A slot for card header description. Place a description content here.
 *
 * @example
 *
 * ```html
 * <!-- See `daikin-card` component for complete example. -->
 * <daikin-card-header>
 *   <daikin-icon slot="left-icon" icon="alarm" size="xl" color="current"></daikin-icon>
 *   <span>Label Title</span>
 *   <span slot="description">Description</span>
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
      <slot name="left-icon" class="text-ddt-color-common-text-primary"></slot>
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
