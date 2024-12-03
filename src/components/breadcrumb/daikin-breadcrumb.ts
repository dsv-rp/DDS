import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement, queryAssignedElements } from "lit/decorators.js";
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
 * ```
 *
 * ```html
 * <daikin-breadcrumb>
 *  <daikin-breadcrumb-item href="#">
 *   Breadcrumb Item 1
 *  </daikin-breadcrumb-item>
 *  <daikin-breadcrumb-item href="#">
 *   Breadcrumb Item 2
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

    ::slotted(daikin-breadcrumb-item) {
      --breadcrumb-separator-display: inline;
      --breadcrumb-gap: 0.5rem;
    }

    ::slotted(daikin-breadcrumb-item:last-child) {
      --breadcrumb-separator-display: none;
      --breadcrumb-gap: 0;
    }
  `;

  @queryAssignedElements({ selector: "daikin-breadcrumb-item" })
  private readonly _items!: readonly DaikinBreadcrumbItem[];

  private _updateBreadcrumbs() {
    const items = this._items;

    items.forEach(
      (item, index) =>
        (item.variant = index === items.length - 1 ? "current" : "normal")
    );
  }

  private _handleSlotChange() {
    this._updateBreadcrumbs();
  }

  override render() {
    return html`<slot @slotchange=${this._handleSlotChange}></slot>`;
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
