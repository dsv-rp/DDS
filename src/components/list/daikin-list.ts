import { css, html, unsafeCSS, type PropertyValues } from "lit";
import { property, queryAssignedElements } from "lit/decorators.js";
import { DDSElement, ddsElement } from "../../base";
import tailwindStyles from "../../tailwind.css?inline";
import type { DaikinListItem } from "../list-item";

/**
 * The list component is used to list items using the list item component.
 *
 * Hierarchy:
 * - `daikin-list` > `daikin-list-item`
 *
 * @slot - A slot for the list items. Place `daikin-list-item` elements here.
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/list/index.js";
 * import "@daikin-oss/design-system-web-components/components/list-item/index.js";
 * ```
 *
 * ```html
 * <daikin-list>
 *   <daikin-list-item>List item label 1</daikin-list-item>
 *   <daikin-list-item>List item label 2</daikin-list-item>
 *   <daikin-list-item>List item label 3</daikin-list-item>
 * </daikin-list>
 * ```
 */
@ddsElement("daikin-list")
export class DaikinList extends DDSElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: inline-block;
      width: 100%;
    }
  `;

  @queryAssignedElements({ selector: "daikin-list-item" })
  private readonly _listItems!: Array<DaikinListItem>;

  /**
   * Whether the list has divider.
   */
  @property({ type: Boolean, reflect: true })
  divider = false;

  private _reflectSlotProperties(): void {
    for (const [index, listItem] of this._listItems.entries()) {
      if (index != this._listItems.length - 1) listItem.divider = this.divider;
    }
  }

  override render() {
    return html`<div role="list">
      <slot></slot>
    </div>`;
  }

  protected override updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has("divider")) {
      this._reflectSlotProperties();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-list": DaikinList;
  }
}

export default DaikinList;
