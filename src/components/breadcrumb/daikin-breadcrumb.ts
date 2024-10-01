import { css, html, LitElement, unsafeCSS, type PropertyValues } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
} from "lit/decorators.js";

import { createRef, ref, type Ref } from "lit/directives/ref.js";
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
      display: flex;
      align-items: center;
    }
  `;

  private resizeObserver = new ResizeObserver(() => {
    this._omit();
  });

  // get daikin-breadcrumb-item from shadow root
  @queryAssignedElements()
  private _slottedDaikinBreadCrumbItems!: Array<DaikinBreadcrumbItem>;

  // get div element from daikin-breadcrumb
  private _divWrapRef: Ref<HTMLDivElement> = createRef();

  /**
   * Whether the last breadcrumb item should have trailing slash.
   */
  @property({ type: Boolean, reflect: true, attribute: "trailing-slash" })
  trailingSlash = false;

  /**
   * Specifies overflow.
   * If `ellipsis`, some breadcrumb items will be omitted when the total width exceeds the container width.
   */
  @property({ type: String, reflect: true })
  overflow: "visible" | "ellipsis" = "visible";

  private _expandedContentWidth: number = 0;

  private omitted: boolean = false;

  get _isEllipsis() {
    return this.overflow === "ellipsis";
  }

  private _omit() {
    // remove items and add omission if daikin-breadcrumb is to long
    const shouldOmit =
      this._isEllipsis && this.offsetWidth < this._expandedContentWidth;
    if (this.omitted === shouldOmit) {
      return;
    }
    this.omitted = shouldOmit;

    const daikinBreadCrumbItems = this._slottedDaikinBreadCrumbItems;
    for (const [index, item] of daikinBreadCrumbItems.entries()) {
      let mode = "normal";
      if (shouldOmit) {
        if (index === 0 || index >= daikinBreadCrumbItems.length - 2) {
          continue;
        } else if (index === 1) {
          mode = "ellipsis";
        } else {
          mode = "hidden";
        }
      }
      item.hidden = mode === "hidden";
      item.variant = mode === "ellipsis" ? "ellipsis" : "normal";
    }
  }

  private _updateBreadcrumbs() {
    const daikinBreadCrumbItems = this._slottedDaikinBreadCrumbItems;
    for (const [index, item] of daikinBreadCrumbItems.entries()) {
      const linkElement = item.shadowRoot?.querySelector("a");
      if (index === daikinBreadCrumbItems.length - 1) {
        // last item
        item.trailingSlash = this.trailingSlash;
        item.disabled = true;
        linkElement?.setAttribute("tabindex", "-1");
        continue;
      }
      item.trailingSlash = true;
      linkElement?.setAttribute("tabindex", "0");
    }
  }

  private _handleChange() {
    this._updateBreadcrumbs();
  }

  private _handleResizeObserver() {
    if (this._isEllipsis) {
      this.resizeObserver.observe(this);
    } else {
      this.resizeObserver.disconnect();
    }
  }

  override render() {
    return html`
      <div class="flex gap-2" ${ref(this._divWrapRef)}>
        <slot @slotchange=${this._handleChange}></slot>
      </div>
    `;
  }

  override updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has("trailingSlash")) {
      this._updateBreadcrumbs();
    }
    if (changedProperties.has("overflow")) {
      this._omit();
      this._handleResizeObserver();
    }
  }

  override firstUpdated(): void {
    this._updateBreadcrumbs();
    this._omit();
    this._handleResizeObserver();

    this.updateComplete
      .then(() => {
        const divElement = this._divWrapRef.value;
        if (!divElement) {
          return;
        }
        this._expandedContentWidth = divElement.offsetWidth;
      })
      .catch(() => {
        // do nothing
      });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-breadcrumb": DaikinBreadcrumb;
  }
}
