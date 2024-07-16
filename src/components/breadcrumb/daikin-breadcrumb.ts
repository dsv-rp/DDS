import { css, html, LitElement, unsafeCSS, type PropertyValues } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import tailwindStyles from "../../tailwind.css?inline";

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
  get _slottedDaikinBreadCrumbItems() {
    const daikinBreadCrumbItems = this.shadowRoot
      ?.querySelector("slot")
      ?.assignedElements({ flatten: true });
    return daikinBreadCrumbItems;
  }

  // get the last daikin-breadcrumb-item from shadow root
  get _slottedLastDaikinBreadCrumbItem() {
    const daikinBreadCrumbItems = this.shadowRoot
      ?.querySelector("slot")
      ?.assignedElements({ flatten: true });
    if (!daikinBreadCrumbItems) {
      return null;
    }
    return daikinBreadCrumbItems[daikinBreadCrumbItems.length - 1];
  }

  // get div element from daikin-breadcrumb
  @query("div")
  private _divWrap: HTMLElement | null | undefined;

  @property({ type: Boolean, reflect: true, attribute: "trailing-slash" })
  trailingSlash = false;

  @property({ type: String, reflect: true })
  overflow: "visible" | "ellipsis" = "visible";

  private divOriginalWidth: number = 0;

  private omissionMode: boolean = false;

  get _isEllipsis() {
    return this.overflow === "ellipsis";
  }

  _omit() {
    // remove items and add omission if daikin-breadcrumb is to long
    const divWidth = this._divWrap?.offsetWidth;
    const breadcrumbWidth = this.offsetWidth;
    const daikinBreadCrumbItems = this._slottedDaikinBreadCrumbItems;
    if (
      divWidth &&
      divWidth >= breadcrumbWidth &&
      this._isEllipsis &&
      !this.omissionMode
    ) {
      daikinBreadCrumbItems?.forEach(
        (value: Element, index: number, array: Element[]) => {
          if (index === 0) {
            return;
          } else if (index === 1) {
            value.setAttribute("size", "min");
            return;
          } else if (index >= array.length - 2) {
            return;
          }
          value.setAttribute("hidden", "");
        }
      );
      this.omissionMode = true;
    } else if (
      (breadcrumbWidth > this.divOriginalWidth || !this._isEllipsis) &&
      this.omissionMode
    ) {
      daikinBreadCrumbItems?.forEach((value: Element) => {
        value.setAttribute("size", "max");
        value.removeAttribute("hidden");
      });
      this.omissionMode = false;
    }
  }

  _handleLastItem() {
    // set last item to disabled
    const lastDaikinBreadCrumbItem = this._slottedLastDaikinBreadCrumbItem;
    if (!lastDaikinBreadCrumbItem) {
      return;
    }
    lastDaikinBreadCrumbItem.setAttribute("disabled", "");
    // remove last item slash if trailingSlash is false
    if (!this.trailingSlash) {
      lastDaikinBreadCrumbItem.removeAttribute("trailing-slash");
    } else {
      lastDaikinBreadCrumbItem.setAttribute("trailing-slash", "");
    }
  }

  _addSlash() {
    const daikinBreadCrumbItems = this._slottedDaikinBreadCrumbItems;
    if (!daikinBreadCrumbItems) {
      return;
    }
    daikinBreadCrumbItems.forEach((item: Element) => {
      item.setAttribute("trailing-slash", "");
    });
  }

  _handleChange() {
    this._addSlash();
    this._handleLastItem();
  }

  _handleResizeObserver() {
    if (this._isEllipsis) {
      this.resizeObserver.observe(this);
    } else {
      this.resizeObserver.disconnect();
    }
  }

  override render() {
    return html`
      <div class="flex gap-2">
        <slot @slotchange=${this._handleChange}></slot>
      </div>
    `;
  }

  override updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has("trailingSlash")) {
      this._handleLastItem();
    }
    if (changedProperties.has("overflow")) {
      this._omit();
      this._handleResizeObserver();
    }
  }

  override async firstUpdated(): Promise<void> {
    this._handleLastItem();
    this._omit();
    this._handleResizeObserver();

    await this.updateComplete.then(() => {
      const divElement = this._divWrap;
      if (!divElement) {
        return;
      }
      this.divOriginalWidth = divElement.offsetWidth;
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-breadcrumb": DaikinBreadcrumb;
  }
}
