import { css, html, LitElement, unsafeCSS } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
} from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { DaikinBreadcrumbItem } from "../breadcrumb-item/daikin-breadcrumb-item";

/**
 * `daikin-breadcrumb` is a component for representing a breadcrumb list, and is used together with the `daikin-breadcrumb-item` component.
 *
 * Hierarchy:
 * - `daikin-breadcrumb` > `daikin-breadcrumb-item`
 *
 * @slot - A slot for breadcrumb items. Place `breadcrumb-item` elements here.
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/breadcrumb/index.js";
 * import "@daikin-oss/design-system-web-components/components/breadcrumb-item/index.js";
 * ```
 *
 * ```html
 * <daikin-breadcrumb>
 *  <daikin-breadcrumb-item href="https://www.example.com/1">
 *   Breadcrumb item 1
 *  </daikin-breadcrumb-item>
 *  <daikin-breadcrumb-item href="https://www.example.com/2">
 *   Breadcrumb item 2
 *  </daikin-breadcrumb-item>
 * </daikin-breadcrumb>
 * ```
 */
@customElement("daikin-breadcrumb")
export class DaikinBreadcrumb extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
    }
  `;

  /**
   * Whether or not to change the color of visited links.
   */
  @property({ type: Boolean, reflect: true, attribute: "show-visited" })
  showVisited = false;

  @queryAssignedElements({ selector: "daikin-breadcrumb-item" })
  private readonly _items!: readonly DaikinBreadcrumbItem[];

  private _updateBreadcrumbs() {
    const items = this._items;

    items.forEach((item, index) => {
      item.variant = index === items.length - 1 ? "current" : "normal";
      item.showVisited = this.showVisited;
      item.showDivider = index < items.length - 1;
    });
  }

  private _handleSlotChange() {
    this._updateBreadcrumbs();
  }

  override render() {
    return html`<nav class="inline-block">
      <div class="inline-block" role="list">
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
    </nav>`;
  }

  protected override firstUpdated(): void {
    this._updateBreadcrumbs();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-breadcrumb": DaikinBreadcrumb;
  }
}
