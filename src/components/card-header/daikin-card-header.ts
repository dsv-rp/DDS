import { cva } from "class-variance-authority";
import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";

const cvaTitle = cva([
  "flex-none",
  "text-ddt-color-common-text-primary",
  "font-daikinSerif",
  "text-base",
  "leading-[1.3]",
  "not-italic",
  "font-bold",
])();

const cvaDescription = cva([
  "flex-none",
  "text-ddt-color-common-text-secondary",
  "font-daikinSerif",
  "text-sm",
  "leading-normal",
  "not-italic",
  "font-normal",
])();

/**
 * `daikin-card-header` is used to represent header of the card component, and is used as a child element of the `daikin-card` component.
 *
 * Hierarchy:
 * - `daikin-card` > `daikin-card-header`
 *
 * @slot description - An optional slot for description.
 * @slot left-icon - An optional slot for an icon to be placed to the left of the text. Place a `daikin-icon` element or something similar.
 * @slot - A slot for card title.
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/card-header/index.js";
 * ```
 *
 * ```html
 * <!-- See `daikin-card` component for complete example. -->
 * <daikin-card-header>
 *   <daikin-icon slot="left-icon" icon="alarm" size="xl" color="current"></daikin-icon>
 *   <span slot="description">Description</span>
 *   <span>Card Title</span>
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
    return html`<div class="flex w-full gap-1">
      <slot
        name="left-icon"
        class="flex-none icon-size-6 text-ddt-color-common-text-primary"
      ></slot>
      <div class="flex-1 flex flex-col pt-0.5 gap-1">
        <slot class=${cvaTitle}></slot>
        <slot name="description" class=${cvaDescription}></slot>
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-card-header": DaikinCardHeader;
  }
}
