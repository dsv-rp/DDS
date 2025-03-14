import { css, html, unsafeCSS } from "lit";
import { property, queryAssignedElements } from "lit/decorators.js";
import { DDSElement, ddsElement } from "../../base";
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
@ddsElement("daikin-breadcrumb")
export class DaikinBreadcrumb extends DDSElement {
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
      const isLast = index === items.length - 1;

      item.variant = isLast ? "current" : "normal";
      item.showVisited = this.showVisited;
      item.appendDivider = !isLast;
    });
  }

  private _handleSlotChange() {
    this._updateBreadcrumbs();
  }

  override render() {
    return html`<nav class="inline-block" aria-label="Breadcrumbs">
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
