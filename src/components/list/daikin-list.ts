import { html } from "lit";
import { DDSElement, ddsElement } from "../../base";

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
  override render() {
    return html`<div role="list">
      <slot></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-list": DaikinList;
  }
}

export default DaikinList;
